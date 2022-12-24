var domparser = require('./backend/Utilities/parseHTMLtoCoins');
var puppetMaster = require('./backend/Utilities/puppetMaster');
const regeneratorRuntime = require("regenerator-runtime");

var deployClass = require('./deploy')
var options = new deployClass(false).getOptions();

describe('test parser', ()=>{
  var dompromise;

  beforeAll(() => {
    dompromise = puppetMaster(options, domparser);
    return dompromise;
  })

  test('returns an array ', () =>{

    return dompromise.then(coins=>{
      expect(Array.isArray(coins)).toBe(true)
      console.log('coins',coins)
    }).catch(err=>{
      console.log(err);
    })
  })

  test('coin should have properties coinname img and price ', async () =>{
    const coins = await dompromise;
    expect(coins[0].hasOwnProperty('img')).toBe(true);
    expect(coins[0].hasOwnProperty('price')).toBe(true);
    expect(coins[0].hasOwnProperty('coinname')).toBe(true);
  })

  test('bitcoin should be the correct float', async () =>{
    const coins = await dompromise;
    expect(coins[0].price).toEqual(39366.80);
  })

})
