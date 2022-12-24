import React from 'react';
import './style.scss'


const ListCryptos = function (props) {

  function addData(e){
    props.add(this.key)
  }
  function removeData(e){
    props.remove(this.key)
  }
  return (
    <div className="listCryptosCt">
      <span className="titleList">Cryptos</span>
    <table className="listCryptos">
    <tbody>
 {Object.keys(props.coins).map(function(key, index){
   var data = props.coins[key];
   return <tr key={index} >
   <td>
     <img src={data.img}/>
   </td>
   <td>
     <h3>{data.coinname}</h3></td>
     <td><h3>${data.price}</h3></td>
    <td>
      <div className="btn-wrapper">
      <button className="addCoinBtn" onClick={addData.bind({key:key})}>Add</button>
         <button className="removeCoinBtn" onClick={removeData.bind({key:key})}>remove</button>
           </div>
           </td>
    </tr>
 })}
</tbody>
  </table>
  </div>
   )
}
export default ListCryptos;