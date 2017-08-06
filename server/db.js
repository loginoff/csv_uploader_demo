const ObjectTrie = require('./trie');

let DB = function () {
    this.entries = {};
    this.index = new ObjectTrie({
        indexKeys: ['name'],
        limitQueryResults: 20
    });

}

DB.prototype = {
    Add: function (entry) {
        if(!(entry.id in this.entries)) {
            this.index.addObject(entry);
            this.entries[entry.id] = true;
        }
    },
    Query: function(query) {
        let normalized_query = query.replace(/\W/g, '').toLowerCase();
        return this.index.queryObject(normalized_query);
    },
    Size: function() {
        return this.index.objectcount;
    }
}

module.exports = DB;
