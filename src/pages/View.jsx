import React,{useState,useEffect} from 'react';
import fireDb from "../firebase";
import {useParams,Link} from 'react-router-dom'
import '../pages/view.css'

const View = () => {
const [user,setUser]=useState({});

const{id}=useParams();

useEffect(()=>{
  fireDb.child(`contacts/${id}`).get().then((snapshot)=>{
    if(snapshot.exists()){
      setUser({...snapshot.val()})
    }
    else{
      setUser({})
    }
  })
},[id])

console.log("user",user);

  return (
    <div style={{marginTop:"50px"}}>
      <div className='card'>
        <div className='card-header'>
          <p>Student Details:</p>
        </div>
        <div className='container'>
        <strong>ID:</strong>
        <span>{id}</span>
        <br/><br/>
        <strong>First Name: </strong>
        <span>{user.fname}</span>
        <br/><br/>
        <strong>Middle Name: </strong>
        <span>{user.mname}</span>
        <br/><br/>
        <strong>Last Name: </strong>
        <span>{user.lname}</span>
        <br/><br/>
        <strong>Class: </strong>
        <span>{user.SelectClass}</span>
        <br/><br/>
        <strong>Division: </strong>
        <span>{user.SelectDivision}</span>
        <br/><br/>
        <strong>Roll No: </strong>
        <span>{user.Rollno}</span>
        <br/><br/>
        <strong>Address Line 1: </strong>
        <span>{user.Address1}</span>
        <br/><br/>
        <strong>Address Line 2: </strong>
        <span>{user.Address2}</span>
        <br/><br/>
        <strong>Landmark:</strong>
        <span>{user.Landmark}</span>
        <br/><br/>
        <strong>City: </strong>
        <span>{user.City}</span>
        <br/><br/>
        <strong>Pincode: </strong>
        <span>{user.Pincode}</span>
        <br/><br/>
      <Link to="/">
        <button className='btn btn-edit'> Go Back</button>
      </Link>

        </div>
      </div>
    </div>
  )
}

export default View