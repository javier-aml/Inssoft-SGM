const path = require('path')
const pdfToJson = require('../helpers/pdfToJson');

exports.postPdfToJson = async (req, res) => {
    try{
        if(!req.body) throw new Error('Invalid file')
        else if (!req.body.fileData) throw new Error('Invalid file')

        const fileData = req.body.fileData.split('base64,')[1]
        
        // POLIGON CONFIG(OVERRIDE CONFIG)
        const ocrConfig = {
            // IF DEBBUG MODE SET TO TRUE RETURNS THE FULL RESPONSE
            debugMode: false,

            // TYPE OF COORDINATE ABSOLUTE OR RELATIVE
            // ABSOLUTE IS BASED ON THE ORIGIN OF THE DOCUMENT
            // RELATIVE IS BASED ON THE ORIGIN OF A CERTAIN WORD
            polygons: [
                {
                    title: 'm3Corregidos',
                    coordinateType: 'relative',
                    anchor: {
                        X: {text: 'CONSUMO m3 CORREGIDOS', offset: 0},
                        Y: {text: 'CONSUMO m3 CORREGIDOS', offset: 4}
                    },
                    margin: {
                        X: 3,
                        Y: 3
                    }
                },
                {
                    title: 'referencia',
                    coordinateType: 'relative',
                    anchor: {
                        X: {text: 'Referencia', offset: 0},
                        Y: {text: 'Referencia', offset: 4}
                    },
                    margin: {
                        X: 11,
                        Y: 3
                    }
                }
            ]
        }

        // EXECUTE OCR
        const ocrRes = await pdfToJson(ocrConfig, fileData)

        res.setHeader('Content-Type', 'application/json');
        res.send(ocrRes)
    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
}