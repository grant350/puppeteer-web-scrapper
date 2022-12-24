import React from 'react';
import './style.scss'

const UserList = function (props) {

    function updateUserCoins(e){
      props.update(e.target.value,this.key)
    }
    function removeData(e){
      props.remove(this.key)
    }

    return (
      <div className="userListCryptosCt">
        <span className="titleList">Users Cryptos</span>
      <table className="userListCryptos">
        <tbody>
     {Object.keys(props.userCoins).map(function(key, index){
       var data = props.userCoins[key]
       return <tr key={index} >
       <td>
         <img src={data.img}/>
       </td>
       <td>
         <h3>{data.coinname}</h3></td>
         <td><h3>${data.price}</h3></td>
        <td>qty<input className="qty" onChange={updateUserCoins.bind({key:key})}/>          <button className="removeCoinBtn" onClick={removeData.bind({key:key})}>remove Coin</button>
</td>
        </tr>
     })}
  </tbody>
      </table>
      </div>
     )

}
export default UserList;