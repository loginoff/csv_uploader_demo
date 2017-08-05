const ObjectTrie = require('./trie');

let testdata = [
{ id: '199987', 
  name: 'Harry Gregory', 
  age: '38', 
  address: 'Jefsu Square, 1253 Rodvu Place', 
  color: 'YELLOW' } ,
{ id: '199988', 
  name: 'Flora Burgess', 
  age: '60', 
  address: 'Lumzo Key, 1072 Jufi Glen', 
  color: 'RED' } ,
{ id: '199989', 
  name: 'Rosa Vasquez', 
  age: '35', 
  address: 'Mabal Avenue, 1282 Uwzos Manor', 
  color: 'YELLOW' } ,
{ id: '199990', 
  name: 'Teresa Crawford', 
  age: '36', 
  address: 'Jema Ridge, 1614 Cuji Park', 
  color: 'GREEN' } ,
{ id: '199991', 
  name: 'Mabel Santos', 
  age: '30', 
  address: 'Besih Drive, 1502 Buca Key', 
  color: 'GREEN' } ,
{ id: '199992', 
  name: 'Alvin Brooks', 
  age: '62', 
  address: 'Ezita Center, 411 Wamu Highway', 
  color: 'WHITE' } ,
{ id: '199993', 
  name: 'Joseph Mitchell', 
  age: '46', 
  address: 'Voise Court, 129 Nazga Extension', 
  color: 'BLUE' } ,
{ id: '199994', 
  name: 'Lawrence Nichols', 
  age: '55', 
  address: 'Iriibo Road, 169 Zojhe Way', 
  color: 'RED' } ,
{ id: '199995', 
  name: 'Viola Delgado', 
  age: '65', 
  address: 'Uwsan Manor, 560 Alelu Pass', 
  color: 'RED' } ,
{ id: '199996', 
  name: 'Inez Price', 
  age: '62', 
  address: 'Nezaj Mill, 928 Aflaf Center', 
  color: 'WHITE' } ,
{ id: '199997', 
  name: 'Corey Adkins', 
  age: '63', 
  address: 'Zirje Park, 416 Afnud Lane', 
  color: 'GREEN' } ,
{ id: '199998', 
  name: 'Vincent Conner', 
  age: '29', 
  address: 'Kawo Court, 504 Hiig Mill', 
  color: 'WHITE' }
];

test('Tokenize address', () => {
    let words = ObjectTrie.prototype._tokenizeStringIntoWords('Zirje Park, 416 Afnud Lane')
    expect(words).toContain('zirje');
    expect(words).toContain('park');
    expect(words).toContain('416');
    expect(words).toContain('afnud');
    expect(words).toContain('lane');
    expect(words.length).toBe(5);
});

test('Initial objects processed correctly', () => {
    t = new ObjectTrie(['name', 'address'], testdata);
    expect(t.objectcount).toBe(testdata.length);
});

test('Test query', () => {
    t = new ObjectTrie(['name', 'address'], testdata);
    res = t.queryObject('kaw');
    expect(res[0].id).toBe("199998");
});