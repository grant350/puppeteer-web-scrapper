

var parseToCoins = function (html) {
  var arrayOfCoins = [];
  var trElements = html.getElementsByTagName('tr');

  function parseTextToNumber(string){
    string=string.replace('$','');
    string=string.replaceAll(',','');
    function precise(x) {
      return Number.parseFloat(x)
    }
    return precise(string);
  }

  trElements.forEach(element=>{
    var coin = {};
    // console.log(element.outerHTML)
    try {
      var img = element.getElementsByTagName('img')[0];
      coin['img'] = img.getAttribute('src')

      var price =  element.getElementsByClassName('sc-cadad039-0');
      var value = price[0].getElementsByTagName('span')[0].textContent;
      coin['price'] = parseTextToNumber(value)

      coin['coinname'] = element.getElementsByClassName('sc-4984dd93-0')[0].textContent;
      arrayOfCoins.push(coin)
      console.log("coin",coin);
    } catch{
      console.log('no img or data')
    }


  })

  return arrayOfCoins;
}


module.exports = parseToCoins;