import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom'
import {Observable} from 'rxjs'
//Core Components;
import Header from './components/header/header.component.js';
import UserList from './components/addCryptos/addCryptos.component.js';
import ListCryptos from './components/listCryptos/listCryptos.component.js';
import Model from './clientModel.js';

var model = new Model(true);
class App extends React.Component {

  constructor(props){
    super(props)
    this.getCryptos = this.getCryptos.bind(this);
    this.add = this.add.bind(this);
    this.calcuate = this.calcuate.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.state = {
      coins: {
       },
       userCoins: {
       },
    total:0.00}
  }

// coins: {
//   'bitcoin':{id:id,price:10.99,img}
// }




    update(qty,key){
      console.log(qty,key)
      qty = parseInt(qty)
      if (typeof qty === 'number' && qty >= 0){
        this.state.userCoins[key].qty = qty;
        this.setState({userCoins: this.state.userCoins})
        this.calcuate()
      } else {
        this.state.userCoins[key].qty = 0;
        this.calcuate()
      }
    }

    calcuate(){
      console.log('calculating')
      var total=0;
      Object.keys(this.state.userCoins).forEach(coinkey=>{
        var obj = this.state.userCoins[coinkey]
        console.log(obj)

        total += (obj.price*obj.qty)
      })
      this.setState({total:total})
    }

    remove(coinkey){
      delete this.state.userCoins[coinkey]
      this.setState({userCoins:this.state.userCoins})
      this.calcuate()

    }
    add(coinkey) {
      console.log('coinkey',coinkey)
      this.state.userCoins[coinkey] = this.state.coins[coinkey];
      this.setState({userCoins:this.state.userCoins})
      this.calcuate()

    }

  getCryptos() {
    var that = this
    var observerable = new Observable((observer)=>{
      observer.next({});
      model.getCryptos(crypto,function(coins){
        var coinObj= {};
        coins.forEach(function(coin){
          coin.qty = 0;
          coinObj[coin.coinname] = coin
        })
        observer.next(coinObj)
      });
    }).subscribe(val=>{
      that.setState({coins:val});
    })

    //request to server to grab cryptos
  }
  componentDidMount(){
    this.getCryptos()
  }

  render(){

    return (<React.Fragment>
      <Header calcuate={this.calcuate} total={this.state.total}></Header>
      <div className="wrapper">
        <UserList remove={this.remove} update={this.update} userCoins={this.state.userCoins} > </UserList>
        <ListCryptos add={this.add} remove={this.remove} coins={this.state.coins}></ListCryptos>
      </div>
    </React.Fragment>);  }

}

//make this a class compoent;


var app = document.getElementById('app');
ReactDOM.render(<App/>, app);