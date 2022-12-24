var mongo = require('./backend/DATABASE/db');
const regeneratorRuntime = require("regenerator-runtime");

describe('test mongo', ()=>{
var db;
  beforeAll( async()=>{
     db =  new mongo(null)
    await db.setUp();
  })

  test('adds coins', async ()=>{
    var coin1 = {coinname:'grantcoin0',img:'http://localhost:4000',price:3.33};
    var coin2 = {coinname:'grantcoin1',img:'http://localhost:4000',price:5.33};
    var arrayOfCoins = [coin1,coin2];
    await db.UpdateAll(arrayOfCoins);
    var coins = await db.fetchCoins();
    expect(coins[0].coinname).not.toBeUndefined()
  })

  test('deletes all coins', async ()=>{
    const coins = await db.deleteAll();
    expect(coins[0]).toBeUndefined()
  })

})

// xdescribe('check users', ()=>{
//   // var db;
//   //   beforeAll( async()=>{
//   //      db =  new mongo(null)
//   //     await db.setUp();
//   //   })

//   //   test('adds coins', async ()=>{
//   //     var coin1 = {coinname:'grantcoin0',img:'http://localhost:4000',price:3.33};
//   //     var coin2 = {coinname:'grantcoin1',img:'http://localhost:4000',price:5.33};
//   //     var arrayOfCoins = [coin1,coin2];
//   //     await db.UpdateAll(arrayOfCoins);
//   //     var coins = await db.fetchCoins();
//   //     expect(coins[0].coinname).not.toBeUndefined()
//   //   })

//   //   test('deletes all coins', async ()=>{
//   //     const coins = await db.deleteAll();
//   //     expect(coins[0]).toBeUndefined()
//   //   })

//   })