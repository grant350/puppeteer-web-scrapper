
import $ from  'jquery';
var configOptions = {
  deployURL:'/',
  developmentURL:'http://localhost:3000/'
}

class Model {
  constructor(deploy) {
    this.deploy = deploy;
    this.url = ''
    if (this.deploy){
      this.url = configOptions.deployURL
    } else {
      this.url = configOptions.developmentURL;
    }

    this.getCryptos = this.getCryptos.bind(this);
  }

  getCryptos(crypto, cb) {
    //getTextcrypto back
    //use node to find it
    // use jquery
    $.ajax({
      method:'GET',
      url:this.url+'getCryptos',
      contentType:'application/json',
      success: function(results) {
        cb(results.coins)
      }
    })
  }



}

export default Model;