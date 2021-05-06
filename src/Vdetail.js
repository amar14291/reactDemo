import React from 'react';
import { CardView } from 'react-card-with-image'
import 'react-card-with-image/dist/index.css'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

function Vdetails(props) {

    const stIcon = {
        'margin-left': '73%',
        'margin-top': '-19%'
    }


    let datesplit = props.date.split('-');

    let corredate = (datesplit[2]) ?  datesplit[2]+'-'+datesplit[1]+'-'+datesplit[0] : undefined ;


    return (
         <div>
        <h5> Status For : { (corredate) ? corredate : ' NA'  }</h5>

        <div>Last update from CoWIN - 3 Minutes ago<div className="roundcl"></div></div>
       <div className="table-responsive">
        <table class="table table-striped">
  <thead>
    <tr>

      <th scope="col">Center Name</th>

      <th style={{"textAlign":"center"}} scope="col">Available capacity</th>
      {/* <th scope="col">District name</th> */}

      {/* <th scope="col">Fee</th> */}
      <th scope="col">Fee type</th>
      <th scope="col">Center open</th>
      <th scope="col">Center closed</th>
      <th scope="col">Min. age limit</th>

      <th scope="col">Pincode</th>
      {/* <th scope="col">Slots</th> */}
      <th scope="col">Vaccine Provided</th>
    </tr>
  </thead>
  <tbody>

  { (props.data.length > 0) ? (

    props.data.map((post, index) => (


    <tr>

      <td>{post.name} ({post.address})</td>
      <td style={{"textAlign":"center"}}>
       <b>{post.available_capacity}</b><br/>
       <a href="https://selfregistration.cowin.gov.in/" target="_blank" color='#007bff'>Book Now</a>
      </td>
      {/* <td>{post.district_name}</td> */}
      {/* <td>{post.fee}</td> */}
      <td>{post.fee_type}
       { (post.fee > 0) ? (post.fee) : ''}
       </td>
      <td>{post.from}</td>
      <td>{post.to}</td>
      <td>{post.min_age_limit}+</td>
      <td>{post.pincode}</td>
      {/* <td>{post.slots}</td> */}
      <td>{post.vaccine}</td>

    </tr>


  ))

  )  : (  <tr ><td colSpan="12">Vaccination may start soon...Please check after some time</td></tr> )
}

  </tbody>
</table>

</div>

</div>
      /*  <div class="card-group">
            {props.data.map((post, index) => (



                <div class="card">
                    &nbsp;&nbsp;&nbsp;
                        <div class="card-body">

                        <h5 class="card-title">{post.name}</h5>

                        <hr></hr>
                        <p class="card-text">Available capacity : {post.available_capacity}   </p>
                        <p class="card-text">District name : {post.district_name}   </p>
                        <p class="card-text">Fee : {post.fee}   </p>
                        <p class="card-text">Fee type : {post.fee_type}   </p>
                        <p class="card-text">Center open  : {post.from}   </p>
                        <p class="card-text">Center closed :  {post.to}  </p>
                        <p class="card-text">Min. age limit : {post.min_age_limit}    </p>
                        <p class="card-text">Pincode : {post.pincode}    </p>
                        <p class="card-text">Slots : {post.slots}   </p>
                        <p class="card-text">Vaccine Provided : {post.vaccine}   </p>


                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>



                    </div>
                </div>



            ))}
        </div>
*/

    );

}


export default Vdetails;