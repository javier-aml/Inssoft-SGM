const path = require('path')
const pdfToJson = require('../helpers/pdfToJson');

exports.postPdfToJson = async (_, res) => {
     // THIS IS A TEST, TO BE REMOVED
    const filePath= path.join(__dirname, '../public/pdf/TestOCR/TEST2.pdf')
    
    // POLIGON CONFIG(OVERRIDE CONFIG)
    const testConfig = {
        // IF DEBBUG MODE SET TO TRUE RETURNS THE FULL RESPONSE
        debugMode: false,

        // TYPE OF COORDINATE ABSOLUTE OR RELATIVE
        // ABSOLUTE IS BASED ON THE ORIGIN OF THE DOCUMENT
        // RELATIVE IS BASED ON THE ORIGIN OF A CERTAIN WORD
        polygons: [
            {
                title: 'C1(Promedio)',
                coordinateType: 'relative',
                anchor: {
                    X: '%C1',
                    Y: 'Promedios'
                },
                margin: {
                    X: 3,
                    Y: 2
                }
            },{
                title: 'C2(Promedio)',
                coordinateType: 'absolute',
                coordinates: {
                    tlx: 0.15192900598049164,
                    tly: 0.8022553324699402,
                    brx: 0.16991327702999115,
                    bry: 0.7942352294921875                    
                },
                margin: {
                    X: 3,
                    Y: 2
                }
            },{
                title: 'C3(Promedio)',
                coordinateType: 'relative',
                anchor: {
                    X: '%C3',
                    Y: 'Promedios'
                },
                margin: {
                    X: 3,
                    Y: 2
                }
            }
        ]
    }

    // EXECUTE OCR
    const data = await pdfToJson(testConfig, filePath);

    res.setHeader('Content-Type', 'application/json');
    res.send(data)
}