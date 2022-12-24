

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


    var price =  element.getElementsByClassName('sc-131di3y-0');
    var value = price[0].getElementsByTagName('span')[0].textContent;
    coin['price'] = parseTextToNumber(value)

    coin['coinname'] = element.getElementsByClassName('iworPT')[0].textContent;
    arrayOfCoins.push(coin)
} catch{
  console.log('no img')
}


  })

  return arrayOfCoins;
}


module.exports = parseToCoins;