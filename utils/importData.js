const { parse } = require('csv-parse');
const stream = require('stream');
const { isDate }  = require('./dateHandlers');

const importCSV = (data) => {
    return new Promise((resolve, reject) => {
        console.log("importing data");
        let readStream;
        let records = [];
        let now = new Date();
        let today = now.toISOString().slice(0,10);

        // Initialize the parser
        const parser = parse({
            delimiter: ','
        });

        if (data instanceof Buffer) {
            readStream = new stream.PassThrough();
            readStream.end(new Buffer(data));
        } else {
            return null;
        }
        
        readStream.pipe(parser);

        // consume records
        parser.on('readable', () => {
            let record;
            while ((record = parser.read()) !== null) {
                
                let endDate = (isDate(record[3])) ? record[3] : today;
                
                let el = {
                    personId: record[0],
                    projectId: record[1],
                    startDate: record[2],
                    endDate: endDate

                }

                records.push(el);
            }
        });

        parser.on('error', (err) => {
            console.error(err.message);
            reject();
        });

        parser.on('end', () => {
            console.log("importing done");
            resolve(records);
        });

    });
}

module.exports = {
    importCSV
}