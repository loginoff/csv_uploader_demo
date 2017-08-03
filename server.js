const express = require('express');
const Busboy = require('busboy');
const csv = require('csv-parse');
const DB = require('./db');

//This is our in memory "database" instance
csv_db = new DB();

const apisrv = express();
apisrv.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  apisrv.use(express.static("client/build"));
}

apisrv.post("/import", (req, res) => {
    /*
    if (!req.files) {
        return res.status(500).json({msg: 'No files uploaded'});
    }

    let csvfile = req.files.csvfile;
    if(csvfile.mimetype !== 'text/csv') {
        return res.status(500).json({msg: `The mimetype of ${csvfile.name} should be 'text/csv'`});
    }

    console.log(csv.parse(csvfile.data.toString()));

    return res.status(200).json({msg: "Success"})
    */

    var busboy = new Busboy({headers: req.headers});
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname);
        console.log(filename);
        console.log(encoding);
        console.log(mimetype);
        if(mimetype !=='text/csv') {
            return res.status(500).json({msg: `The mimetype of ${filename} should be 'text/csv'`});
        }
        file.pipe(csv({columns: ['id', 'name', 'age', 'address', 'color']})).on('data', (data) => {
            csv_db.Add(data);
        });

    });

    busboy.on('finish', () => {
        console.log('Done parsing');
        console.log(`In memory DB currently containes ${csv_db.entries.length} entries`);
        res.end();
    })

    req.pipe(busboy);
});

apisrv.post("/search", (req, res) => {

});

apisrv.listen(apisrv.get("port"), () => {
    console.log(`csv-import server listening at http://localhost:${apisrv.get("port")}`)
});