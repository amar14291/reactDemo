import React, { Component } from 'react';
import Grid from './Gridcheck';
const axios = require('axios').default;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { idcheck : '' ,checkedtiffin : false,checkedwater : false,checkedpaper : false,checkedmilk : false, showsubmit: true, showInfo: false, posts: [], boxval: '', milk: '', isCheckedm: '', paper: '', tiffin: '', watercan: '' }
  }

  deleteData = async (id) => {
  await axios.delete('/user/deleteuser/' + id).then(res => { console.log('suc'); this.fetchList(); });
  }




  getsData = async (id) => {

    const response = await fetch('user/specific/' + id);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    let str = body.date;
    let op = str.replace(/-/g, '-');
    // console.log(op);
    this.setState({ idcheck : body.id ? body.id : 0 ,checkedtiffin: (body.TIFFIN == 'YES') ? true : false, checkedwater: (body.water == 'YES') ? true  : false, showInfo: true, showsubmit: false, watercan: (body.watercan == 'YES') ? true  : false, tiffin: (body.tiffin == 'YES') ? true : false, paper: (body.paper == 'YES') ? true : false,checkedpaper: (body.paper == 'YES') ? true : false, milk: (body.milk == 'YES') ? true : false,checkedmilk: (body.milk == 'YES') ? true : false, boxval: op })

  }


  submitdetails = async e => {
    e.preventDefault();



    let date = this.state.boxval;
    let obj = {
      "date": date,
      "milk": (this.state.checkedmilk && this.state.checkedmilk != '') ? "YES" : "NO",
      "paper": (this.state.checkedpaper && this.state.checkedpaper != '') ? "YES" : "NO",
      "TIFFIN": (this.state.checkedtiffin && this.state.checkedtiffin != '') ? "YES" : "NO",
      "water": (this.state.checkedwater && this.state.checkedwater != '') ? "YES" : "NO",
      "id" :Math.floor(Math.random()*(999-100+1)+100)
    }

    if (this.state.checkedpaper == "")
      obj.paper = 'NO';

    if (this.state.checkedtiffin == "")
      obj.TIFFIN = 'NO';

    if (this.state.checkedwater == "")
      obj.water = 'NO';

    axios.post('user/postuser', obj)
      .then(response => this.fetchList());

  };


  updatedetails = async e => {

    let date = this.state.boxval;



    let obj = {
      "date": date,
      "milk": (this.state.checkedmilk && this.state.checkedmilk != '') ? "YES" : "NO",
      "paper": (this.state.checkedpaper && this.state.checkedpaper != '') ? "YES" : "NO",
      "TIFFIN": (this.state.checkedtiffin && this.state.checkedtiffin != '') ? "YES" : "NO",
      "water": (this.state.checkedwater && this.state.checkedwater != '') ? "YES" : "NO",
      "id" :Math.floor(Math.random()*(999-100+1)+100)
    }

    if (this.state.checkedpaper == "")
      obj.paper = 'NO';

    if (this.state.checkedtiffin == "")
      obj.TIFFIN = 'NO';

    if (this.state.checkedwater == "")
      obj.water = 'NO';


    axios.post('user/updateuser/'+e.target.value, obj)
      .then(response => this.fetchList());

  };

  fetchList = () => {
    this.callApi().then(res => this.setState({ posts: res })).catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchList();
  }

  callApi = async () => {
    const response = await fetch('/user');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (

      <div>


        {/* <button className='button' onClick={() => alert('click')}></button> */}
        <label>
          Date : <input type="date" onChange={e => this.setState({ boxval: e.target.value })} value={this.state.boxval} /></label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          Milk
          <input name={this.state.checkedmilk}  type="checkbox" checked={ this.state.checkedmilk} onClick={e => this.setState({ checkedmilk: e.target.checked })} /> </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;



        <label>
          Paper <input name={this.state.checkedpaper} type="checkbox" checked={ this.state.checkedpaper}  onClick={e => this.setState({ checkedpaper: e.target.checked })} /> </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <label>
          Water <input name={this.state.checkedwater} type="checkbox" checked={ this.state.checkedwater}  onClick={e => this.setState({ checkedwater: e.target.checked })} /> </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <label>
          Tiffin <input name={this.state.checkedtiffin} checked={ this.state.checkedtiffin}  type="checkbox"  onClick={e => this.setState({ checkedtiffin: e.target.checked })} /> </label>&nbsp;&nbsp;&nbsp;&nbsp;
          <label>
         <button style={{ display: this.state.showsubmit ? "block" : "none" }} type="button" onClick={this.submitdetails} class="btn btn-outline-primary">Add</button>
         <button value = {this.state.idcheck} style={{ display: this.state.showInfo ? "block" : "none" }} type="button" onClick={this.updatedetails } class="btn btn-outline-primary">Update</button>
         </label>
        <br />
        <br />
        <br />
        <Grid data={this.state.posts} simplifiedFunction={this.deleteData} getde={this.getsData} />
      </div>
    );
  }
}
export default App;