const express = require('express');
const Busboy = require('busboy');
const csv = require('csv-parse');
const bodyParser = require('body-parser');
const DB = require('./db');

//This is our in memory "database" instance
csv_db = new DB();

const apisrv = express();
apisrv.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    apisrv.use(express.static("client/build"));

// The /search path should only deal with JSON
apisrv.use('/search', bodyParser.json());

apisrv.post("/import", (req, res) => {
    var busboy = new Busboy({ headers: req.headers });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        //We check that we only parse the correct filetype
        if (mimetype !== 'text/csv') {
            console.log(`Wrong mimetype ${mimetype}`)
            res.status(500).json({ msg: `The mimetype of ${filename} should be 'text/csv'` });
            return res.end();
        }

        //Pipe .csv file to a parser and add entries to our in memory DB
        file.pipe(csv({ columns: ['id', 'name', 'age', 'address', 'team'] })).on('data', (data) => {
            //csv_db.Add(data);
            csv_db.Add(data);
        });

    });

    busboy.on('finish', () => {
        console.log('Done parsing');
        console.log(`In memory OBjectTrie currently indexes ${csv_db.Size()} entries`);
        // res.end();
        res.status(200).json({ msg: "Success" })
    })

    req.pipe(busboy);
});

apisrv.post("/search", (req, res) => {
    console.log(req.body);
    if ('query' in req.body) {
        let results = csv_db.Query(req.body.query);
        res.status(200).json(
            { 'results': results }
        );
        console.log(`responded with ${results.length} results`);
        return res.end();
    }
    res.status(500).end();
});

apisrv.listen(apisrv.get("port"), () => {
    console.log(`csv-import server listening at http://localhost:${apisrv.get("port")}`)
});
