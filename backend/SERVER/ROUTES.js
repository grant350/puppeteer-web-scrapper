var Utilites = {
  ParseHTML: require('../Utilities/parseHTMLtoCoins'),
  puppetMaster: require('../Utilities/puppetMaster'),
  }

  var mongo = require('../DATABASE/db')
//require deployjs

  class ROUTES {

   constructor(options) {
    this.options = options;
    this.addCryptos=this.addCryptos.bind(this)
    this.getCryptos=this.getCryptos.bind(this)
    this.db =  new mongo(options)
    this.db.setUp()
  }

  addCryptos(req,res,data){
    Utilites.puppetMaster(this.options,Utilites.ParseHTML).then(coins=>{

      this.db.UpdateAll(coins).then(results=>{
        if (res){
        res.json({success:'made coins'})
        }
      }).catch(err=>{
        console.log(err)
      })
    })
  }

  getCryptos(req,res,data){
    this.db.fetchCoins().then(coins=>{
      res.json({coins:coins})
    }).catch(err=>{console.log(err)})
  }
  addCoinToUser(req,res, callback){
    //adds crypto to list
  }

  deleteCoinToUser(req,res,callback){
    //deletes crypto off list
  }





}
module.exports = ROUTES