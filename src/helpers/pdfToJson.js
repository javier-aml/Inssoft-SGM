const AWS = require('aws-sdk');
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

// GENERATES THE AWS OBJECT
function awsTextract () {
    try{
        AWS.config.update({
            region: process.env.PDFTOJSON_AWS_REGION,
            accessKeyId: process.env.PDFTOJSON_AWS_ACCESSKEYID,
            secretAccessKey: process.env.PDFTOJSON_AWS_SECRETACCESSKEY
        });

        return new AWS.Textract();
    } catch(err) {
        throw new Error(err)
    }
}

// FETCH(FILTER) OCR GENERATED DATA
function fetchData(config, dataInput) {
    try{
        if(!dataInput) throw new Error('Invalid data input')

        // IF DEBUG MODE RETUNRNS FULL API RESPONSE
        if(config.debugMode) return dataInput

        const output = []

        // ITERATE THROUGH POLYGONS
        for(let polygon of config.polygons) {
            // GET THE ORIGIN COORDENATE (RELATIVE OR ABSOLUTE)
            let origin = null

            if(polygon.coordinateType === 'relative'){
                let anchorX = null
                let anchorY = null

                // GET ANCHOR COORDINATES
                anchorX = dataInput.Blocks.filter(word => (word.Text ? word.Text : '').trim() === polygon.anchor.X.text)
                anchorX = anchorX.length ? anchorX[0] : []
                anchorY = dataInput.Blocks.filter(word => (word.Text ? word.Text : '').trim() === polygon.anchor.Y.text)
                anchorY = anchorY.length ? anchorY[0] : []

                if(!anchorX && !anchorY) return;

                const offsetX = polygon.anchor.X.offset
                const offsetY = polygon.anchor.Y.offset

                const tlx = anchorX.Geometry.Polygon[3].X
                const tly = anchorY.Geometry.Polygon[3].Y
                const brx = anchorX.Geometry.Polygon[1].X
                const bry = anchorY.Geometry.Polygon[1].Y

                const tlxOffset = tlx * (offsetX/100)
                const tlyOffset = tly * (offsetY/100)
                const brxOffset = brx * (offsetX/100)
                const bryOffset = bry * (offsetY/100)

                origin = {
                    tlx: tlx + tlxOffset,
                    tly: tly + tlyOffset,
                    brx: brx + brxOffset,
                    bry: bry + bryOffset
                }
            } else if(polygon.coordinateType === 'absolute') {
                origin = {
                    tlx: polygon.coordinates.tlx,
                    tly: polygon.coordinates.tly,
                    brx: polygon.coordinates.brx,
                    bry: polygon.coordinates.bry
                }
            } else
                throw new Error('Invalid "coordinateType"')
        
            //CREATES A ROUNDED(UP/DOWN %) POLINGON CONFIG
            const marginX = polygon.margin.X
            const marginY = polygon.margin.Y

            const rDx = 1-(marginX/100)
            const rDy = 1-(marginY/100)
            const rUx = 1+(marginX/100)
            const rUy = 1+(marginY/100)

            const roundedConfig = {
                title: polygon.title,
                tlxD: +origin.tlx * rDx,
                tlyU: +origin.tly * rUy,
                brxU: +origin.brx * rUx,
                bryD: +origin.bry * rDy
            }

            // FILTERS WORDS BLOCKS
            const words = dataInput.Blocks.filter(block => block.BlockType === 'WORD')

            // VALIDATES BOUNDING POLYGON
            words.forEach(word => {
                const bTlx = word.Geometry.Polygon[3].X
                const bTly = word.Geometry.Polygon[3].Y
                const bBrx = word.Geometry.Polygon[1].X
                const bBry = word.Geometry.Polygon[1].Y

                let validationCount = 0

                if(bTlx >= roundedConfig.tlxD && bBrx <= roundedConfig.brxU) validationCount++
                if(bTly <= roundedConfig.tlyU && bBry >= roundedConfig.bryD) validationCount++

                if(validationCount === 2)
                    output.push({
                        title: polygon.title,
                        confidence: word.Confidence,
                        text: word.Text,
                        polygon: word.Geometry.Polygon
                    })         
            })
        }
        
        return output
    } catch(err) {
        return new Error(err)
    }
}

// MAIN METHOD
function pdfToJson (config, fileData) {
    return new Promise(async (resolve, reject) => {
        try{
            if(!config) throw new Error('Invalid configuration')
            if(!fileData) throw new Error('Invalid fileData')

            // GENERATES TEXTRACT OBJECT
            const textract = awsTextract();
            
            // FETCH FILE BASE64 BUFFER
            // const buffer  = await fileToBase64Buffer(filePath)

            const buffer = Buffer.from(fileData, 'base64')

            // TEXTRACT PARAMETERS
            const params = {
                Document: { Bytes: buffer },
                FeatureTypes: ['TABLES']
            };

            // TEXTRACT CALLBACK
            const textractCb = (err, data) => {
                const res = fetchData(config , data)
                
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(res)
                }
            }

            // EXECTUE TEXTRAC
            textract.analyzeDocument(params, textractCb);
        } catch (err) {
            reject(new Error(err))
        }
    })
}

module.exports = pdfToJson