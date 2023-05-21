//grab by env file
var dotenv = require('dotenv').config()

var testingOptions = {
  updateDataTestFile: false,
  testingPuppet:true,
  pathToWriteDataHTML: './src/data.html',
  testingURL: 'http://localhost:4000',
  puppetURL: 'https://coinmarketcap.com',
  webURL:'http://localhost:3000',
  db: `mongodb://grant:password@mongo:27017/crypto`,
  dbOptions:{
  }
}

var deployOptions = {
  webURL:'',
  puppetURL: 'https://coinmarketcap.com',
  db: `mongodb://grant:password@mongo:27017/crypto`,
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