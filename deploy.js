//grab by env file
var dotenv = require('dotenv').config()

var testingOptions = {
  //https://git.heroku.com/imamonster123.git
  updateDataTestFile: false,
  testingPuppet:true,
  pathToWriteDataHTML: './src/data.html',
  testingURL: 'http://localhost:4000',
  puppetURL: 'https://coinmarketcap.com',
  webURL:'http://localhost:3000',
  db: `mongodb://${process.env.dbTestUsername}:${process.env.dbTestPassword}@127.0.0.1:28015/Crypto`,
  dbOptions:{
  }
}

var deployOptions = {
  webURL:'',
  puppetURL: 'https://coinmarketcap.com',
  db: `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.fivjx.mongodb.net/myFirstDatabase`,
  dbOptions:{
  }
}

class Deploy {
  constructor(deploy){
    this.options = testingOptions;
    if (this.options.testingPuppet){
      this.options.puppetURL = this.options.testingURL+'/data.html'
    }
    if (deploy){
      this.options = deployOptions
    }
    this.getOptions = this.getOptions.bind(this)
  }

  getOptions(){
    return this.options;
  }


}

module.exports = Deploy;