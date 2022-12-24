var mongo = require('./backend/DATABASE/db');
const regeneratorRuntime = require("regenerator-runtime");
var requests = require('requests');
var optionsClass = require('./deploy')
var options = new optionsClass(false).getOptions();
describe('routes work', ()=>{

    test('request to testpath ',function(done){
      var data = '';
       requests('http://localhost:3000/testpath')
      .on('data', function (chunk) {
        data = chunk
      })
      .on('end', function (err) {
        if (err){
          console.log(err)
        }
        data = JSON.parse(data)
        console.log(data)
        expect(data.hasOwnProperty('here')).toBe(true)
        done()
      });


    })
  })

  describe('adds data to db', ()=>{
    var db;

    beforeAll(async ()=>{
      db =  new mongo(options)
      await db.setUp();
      var data = '';
      await requests('http://localhost:3000/updateCryptos')
     .on('data', function (chunk) {
       data = chunk
     })
     .on('end', function (err) {
       if (err){
         console.log(err)
       }
    })
    })
    test('db has updated coins ',async function(){
      var coins = await db.fetchCoins();
      console.log(coins)
      expect(coins.length > 30).toBe(true)
    });
  })


  describe('retreives data in request', ()=>{

    test('goes to get cryptos', function(done){
      var data = '';
      requests('http://localhost:3000/getCryptos')
     .on('data', function (chunk) {
       data = chunk
     })
     .on('end', function (err) {
       if (err){
         console.log(err)
       }
       data = JSON.parse(data)
       console.log(data)
       expect(data.hasOwnProperty('coins')).toBe(true)
       expect(data.coins.length > 30).toBe(true)
       expect(typeof data.coins[0].coinname).toBe('string')

       done()

      });
    })

  })



//check auth