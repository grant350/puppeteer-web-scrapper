var puppeteer = require('puppeteer');
const regeneratorRuntime = require("regenerator-runtime");
var DomParser = require('dom-parser')
var parser = new DomParser();

function ParsePage(options, domParser){
return  new Promise ((res,rej)=>{
  async function puppet(){
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        '--no-sandbox'
      ]
    });
    const page = await browser.newPage();
    await page.goto(options.puppetURL,{"waitUntil" : "networkidle0"});
    await page.setViewport({width:800, height:1000})
    await page.evaluate(function (){
      var amount = 0
      return new Promise((resolve,reject)=>{
        var timer = setInterval(function(){
          window.scrollBy(0,amount)
          if (amount > 4900 ){
            clearInterval(timer)
            resolve(true);
          }
          amount += 200
        },250)
      }).catch(err=>{
        console.log(err)
      })
    });

     var table = await page.$eval('table', (table) => {
      return table.outerHTML
    })
    await browser.close();
    if (options.updateDataTestFile){
      fs.writeFile(options.pathToWriteDataHTML, table, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }
    var dom = parser.parseFromString(table);
    var coins = domParser(dom);
    if (coins ){
      res(coins)
    } else {
      rej(new Error('no dom'))
    }
  }
  puppet();
}).catch(err=>{
  console.log(err)
})
}
module.exports = ParsePage;