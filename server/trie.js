function TrieNode() {
    this.children = {};
    this.objs = null;
}

/**
 * @param { List } index_keys - list of strings representing which keys 
 * to index on the objects.
 * @param { List } object - an optional list of object to index inside the trie
 */
function ObjectTrie(options) {
    this.root = new TrieNode('');
    this.objectcount = 0;
    if ('indexKeys' in options) {
        let index_keys = options['indexKeys'];
        this.index_keys = index_keys.constructor === String ? [index_keys] : index_keys;
    } else {
        throw new Error("'indexKeys' has to be defined");
    }

    this.limitQueryResults = options['limitQueryResults'];
    this.keyProcessingFunc = options['keyProcessingFunc'] || this._tokenizeStringIntoWords;
}

ObjectTrie.prototype = {
    //-----Public functions, the ObjectTrie API-----------

    //Processes and adds an object to the trie
    addObject: function (obj) {
        for (let key of this.index_keys) {
            let words = this.keyProcessingFunc(obj[key]);
            for (let word of words) {
                this._addWord(word, obj);
            }
            //We also need to add the full key without tokenizing
            let keyval = obj[key].replace(/\W/g, '').toLowerCase();
            this._addWord(keyval, obj);
        }
        this.objectcount++;
    },

    queryObject: function (prefix) {
        let node = this.root;
        let stridx = 0;
        let strlen = prefix.length;
        let results = [];

        while (stridx < strlen) {
            if (prefix[stridx] in node.children) {
                node = node.children[prefix[stridx]];
                stridx++;
            } else {
                node = null;
                break;
            }
        }

        let limit = this.limitQueryResults;
        console.log('limit', limit);
        //If there exists a node corresponding to the last letter of the prefix,
        //we gather all objects from the subtree starting with this node.
        if (node) {
            function dfs(n) {
                if (n.objs) {
                    for (let i = 0; i < n.objs.length; i++) {
                        if (results.length >= limit) {
                            return;
                        }
                        results.push(n.objs[i]);
                    }
                }
                for (let child in n.children) {
                    dfs(n.children[child]);
                }
            }
            dfs(node);
        }

        return results;
    },

    //-----Private functions-----------------
    _addWord: function (word, obj) {
        let node = this.root;
        let stridx = 0;
        let strlen = word.length;

        while (stridx < strlen) {
            if (!(word[stridx] in node.children)) {
                node.children[word[stridx]] = new TrieNode();
            }

            node = node.children[word[stridx]];

            //We have reached the end of the word
            if (stridx == strlen - 1) {
                if (node.objs) {
                    node.objs.push(obj);
                } else {
                    node.objs = [obj];
                }
            }
            stridx++;
        }
    },

    _tokenizeStringIntoWords: function (str) {
        words = str.split(' ');
        words = words.map((w) => {
            return w.replace(/\W/g, '').toLowerCase();
        })
        return words;
    },
    _printTrie: function () {
        let printNode = (ident, node) => {
            for (child in node.children) {
                let ch = node.children[child];
                let objcount = '';
                if (ch.objs && ch.objs.length > 0) {
                    objcount = ` (objects: ${ch.objs.length})`;
                }
                console.log('|' + '-'.repeat(ident) + child + objcount)

                printNode(ident + 2, node.children[child]);
            }
        }
        console.log('root');
        printNode(0, this.root);
    }
}

/*
t = new ObjectTrie(['name', 'address'], [
    {
        id: '199998',
        name: 'Vincent Conner',
        age: '29',
        address: 'Kawo Court, 504 Hiig Mill',
        color: 'WHITE'
    },
    {
        id: '199998',
        name: 'Vin Conner',
        age: '29',
        address: 'Kawo Court, 504 Hiig Mill',
        color: 'WHITE'
    }
]);
*/

module.exports = ObjectTrie;
