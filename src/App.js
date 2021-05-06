import React, { Component } from 'react';
import Grid from './Details';
import Vdetail from './Vdetail';
const axios = require('axios').default;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pinval : '',allcenter: [], idstate: '', iddistrict: '', idcheck: '', checkedtiffin: false, checkedwater: false, checkedpaper: false, checkedmilk: false, showsubmit: false, showInfo: false, posts: [], boxval: '', milk: '', isCheckedm: '', paper: '', tiffin: '', watercan: '', allcity: [], showsubmitpin: true, showsubmitdis: false, }
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
    this.setState({ idcheck: body.id ? body.id : 0, checkedtiffin: (body.TIFFIN == 'YES') ? true : false, checkedwater: (body.water == 'YES') ? true : false, showInfo: true, showsubmit: false, watercan: (body.watercan == 'YES') ? true : false, tiffin: (body.tiffin == 'YES') ? true : false, paper: (body.paper == 'YES') ? true : false, checkedpaper: (body.paper == 'YES') ? true : false, milk: (body.milk == 'YES') ? true : false, checkedmilk: (body.milk == 'YES') ? true : false, boxval: op })

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
      "id": Math.floor(Math.random() * (999 - 100 + 1) + 100)
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


  findcenter = async e => {

    let district = this.state.iddistrict;
    let datesplit = this.state.boxval.split('-');
    let corredate = datesplit[2] + '-' + datesplit[1] + '-' + datesplit[0];



    this.callApidistrictcenter(district, corredate).then(
      res => this.setState({ allcenter: res.sessions })
    ).catch(err => console.log(err));




  };

  findcenterbypin = async e =>{
    let datesplit = this.state.boxval.split('-');
    let corredate = datesplit[2] + '-' + datesplit[1] + '-' + datesplit[0];
    let pincode = this.state.pinval;
    this.callApidistrictcenterPin(pincode, corredate).then(
      res => this.setState({ allcenter: res.sessions })
    ).catch(err => console.log(err));
}


  updatedetails = async e => {

    let date = this.state.boxval;



    let obj = {
      "date": date,
      "milk": (this.state.checkedmilk && this.state.checkedmilk != '') ? "YES" : "NO",
      "paper": (this.state.checkedpaper && this.state.checkedpaper != '') ? "YES" : "NO",
      "TIFFIN": (this.state.checkedtiffin && this.state.checkedtiffin != '') ? "YES" : "NO",
      "water": (this.state.checkedwater && this.state.checkedwater != '') ? "YES" : "NO",
      "id": Math.floor(Math.random() * (999 - 100 + 1) + 100)
    }

    if (this.state.checkedpaper == "")
      obj.paper = 'NO';

    if (this.state.checkedtiffin == "")
      obj.TIFFIN = 'NO';

    if (this.state.checkedwater == "")
      obj.water = 'NO';


    axios.post('user/updateuser/' + e.target.value, obj)
      .then(response => this.fetchList());

  };

  changedate = (e) =>{
  this.setState({ boxval: e.target.value });
  this.findcenter();
  }

  fetchdistrict = (e) => {
    console.log(e.target.value);


    this.setState({ idstate: e.target.value })

    this.callApidistrict(e.target.value).then(
      res => this.setState({ allcity: res.districts })
    ).catch(err => console.log(err));

  }

  fetchdistrictcenter = (e) => {
    console.log(e.target.value);

    console.log('dis', e.target.value);

    this.setState({ iddistrict: e.target.value })



    let datesplit = this.state.boxval.split('-');

    let corredate = datesplit[2] + '-' + datesplit[1] + '-' + datesplit[0];


    this.callApidistrictcenter(e.target.value, corredate).then(
      res => this.setState({ allcenter: res.sessions })
    ).catch(err => console.log(err));


  }

  fetchList = () => {
    this.callApi().then(

      res => this.setState({ posts: res.states })


    ).catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchList();
  }

  callApidistrict = async (id) => {
    const response = await fetch('https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + id);
    const body = await response.json();
    console.log('cities', body);
    this.setState({ showsubmit: false })
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  callApidistrictcenter = async (id, date) => {
    const response = await fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=' + id + '&date=' + date);
    const body = await response.json();
    console.log('cities', body);
    this.setState({ showsubmit: true })
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  callApidistrictcenterPin = async (pincode, date) => {
    const response = await fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+pincode+ '&date='+date);
    const body = await response.json();
    console.log('bypin', body);
    // this.setState({ showsubmit: true })
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  callApi = async () => {
    const response = await fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states');
    const body = await response.json();
    console.log('agaub', body);
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (

      <div>

        <div className='row'>

        <label>Search by : </label>
        <div className='form-group col-md-3'>
        <input type="radio" id="male" name="gender" value="male"/>
        <label for="male">Male</label>
        </div>

        <div className='form-group col-md-3'>
        <input type="radio" id="female" name="gender" value="female"/>
        <label for="female">Female</label>
        </div>
</div>


<div style={{ display: this.state.showsubmitpin ? "block" : "none" }} className='row'>

<div className='form-group col-md-3'>
  <label>Choose Date : </label>

   <input className='form-control' type="date"  onChange={this.changedate}  value={this.state.boxval} />

   </div>






 <div className='form-group col-md-3'>
 <label for="city"> Enter pincode : </label>
   <input type="text" value={this.state.pinval} onChange={e => this.setState({ pinval: e.target.value })} />
  </div>

 <div className='form-group col-md-3'>
   <label className='emplbl' ></label>
  <button  onClick={this.findcenterbypin}  type="button" class="btn btn-outline-primary">Find by pin</button>
  </div>

  </div>

       <div style={{ display: this.state.showsubmitdis ? "block" : "none" }} className='row'>

       <div className='form-group col-md-3'>
         <label>Choose Date : </label>

          <input className='form-control' type="date"  onChange={this.changedate}  value={this.state.boxval} />

          </div>

          <div className='form-group col-md-3'>
        <label for="state"> Choose state : </label>
        <select className='form-control' onChange={this.fetchdistrict} name="state" id="state">
          <option value="0">select state</option>{
            this.state.posts.map((post, index) => (
              <option value={post.state_id}>{post.state_name}</option>
            ))}
        </select>
        </div>

        <div className='form-group col-md-3'>
        <label for="city"> Choose City : </label>
        <select className='form-control' onChange={this.fetchdistrictcenter} name="City" id="City">
          <option value="0">select City</option>{
            this.state.allcity.map((post, index) => (
              <option value={post.district_id}>{post.district_name}</option>
            ))}
        </select>
        </div>

        {/* <div> OR </div>

        <div className='form-group col-md-3'>
        <label for="city"> Enter pincode : </label>
          <input type="tex" value="" />
         </div> */}

        <div className='form-group col-md-3'>
          <label className='emplbl' ></label>
         <button  onClick={this.findcenter}  type="button" class="btn btn-outline-primary">Find</button>
         </div>

         </div>

         <br></br>
        <Vdetail date={this.state.boxval} data={this.state.allcenter} />

        {/* <Grid data={this.state.posts} simplifiedFunction={this.deleteData} getde={this.getsData} /> */}

        <div className="bg-blue">
                <div className="row px-2 py-2">
                <div className="col-md-6">
                <small >Copyright &copy; 2021. All rights reserved.</small>
                </div>
                <div className="col-md-6">

               <div className="text-right">
                Developed by <a href="https://www.linkedin.com/in/amar-jain-3b36603b/" target="_blank" > <b>Amar Jain</b></a>

                 {/* <span class="fa fa-facebook mr-4 text-sm"></span>
                 <span class="fa fa-google-plus mr-4 text-sm"></span>
                 <span class="fa fa-linkedin mr-4 text-sm"></span>
                 <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>  */}

                 </div>
                </div>

                </div>
            </div>

      </div>
    );
  }
}
export default App;