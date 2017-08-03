let DB = function() {
    this.entries = [];
}

DB.prototype = {
    Add: function(entry) {
        this.entries.push(entry);
    }
}

module.exports = DB;