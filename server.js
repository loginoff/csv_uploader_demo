const express = require("express");

const apisrv = express();

apisrv.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  apisrv.use(express.static("client/build"));
}

apisrv.post("/import", (req, res) => {
    res.json({msg: 'you won!'})
});

apisrv.post("/search", (req, res) => {

});

apisrv.listen(apisrv.get("port"), () => {
    console.log(`csv-import server listening at http://localhost:${apisrv.get("port")}`)
});