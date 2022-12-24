const regeneratorRuntime = require("regenerator-runtime");

var mongoose = require('mongoose');
const {Schema}= mongoose;

//grab deploy.js

    // var newCoin = new Coin({ coinname: 'grantcoin2',img:'ewf',price:323.33 })
    // newCoin.save();

class DB {

  constructor(options){
    this.options = options;
    this.Coin = null;
    this.fetchCoins = this.fetchCoins.bind(this)
    this.UpdateAll = this.UpdateAll.bind(this)
    this.setUp = this.setUp.bind(this)
  }

  async setUp(){
    const conn = await mongoose.connect(this.options.db,this.dbOptions)
    const coinSchema = new mongoose.Schema({
      coinname: String,
      price: Number,
      img: String
    });
    this.Coin = mongoose.model('Coin', coinSchema)
  }
  deleteAll(){
    return this.Coin.deleteMany()
  }
  UpdateAll(arrayOfCoins){
    //extend for options later'
    return this.Coin.deleteMany().then(res=>{
      return this.Coin.insertMany(arrayOfCoins)
    }).catch(err=>{
      console.log(err)
    })
  }

  fetchCoins(){
    return this.Coin.find()
  }

}
module.exports = DB