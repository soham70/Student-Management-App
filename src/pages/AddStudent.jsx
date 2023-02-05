import React,{useState,useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import '../components/AddStudent.css';
import fireDb from '../firebase';
import {toast} from 'react-toastify';
import '../pages/AddStudent.css';


const initialState = {
  fname:"",
  mname:"",
  lname:"",
  Rollno:"",
  Address1:"",
  Address2:"",
  Landmark:"",
  City:"",
  Pincode:"",
  SelectDivision:"",
  SelectClass:""
}


const AddStudent = () => {

const[state,setState]=useState({});
const[data,setData]=useState({});

const {fname,mname,lname,Rollno,SelectClass,SelectDivision,Address1,Address2,Landmark,City,Pincode}=state;


const history=useNavigate();

const {id}=useParams();

useEffect(()=>{
  fireDb.child("contacts").on("value",(snapshot)=>{
    if(snapshot.val()!== null)
    {
      setData({...snapshot.val()});
    }
    else{
      setData({});
    }
  });

  return () =>{
    setData({});
  };
},[id]);

useEffect(()=>{
  if(id){
    setState({...data[id]})
  }
  else{
    setState({...initialState})
  }

  return () =>{
    setState({...initialState});
  };
},[id,data])



const handleSubmit=(e)=>{
  e.preventDefault();

  if(!fname || !mname || !lname || !Rollno || !SelectClass || !SelectDivision || !Address1 || !Address2 || !Landmark || !City || !Pincode)
  {
    toast.error("Please provide value in each field")
  }else if(+Rollno>99){
    toast.error("Please enter a valid 2 digit roll number")
  }else if(!Pincode.match(/^\d{6}$/)){
    toast.error("Please enter a valid 6 digit pin")
  }else{
    if(!id)
    {
      fireDb.child("contacts").push(state, (err)=>{
        if(err){
          toast.error(err);
        }
        else{
          toast.success("Student Added Successfully!!");
        }
      });
    }
    else{
      fireDb.child(`contacts/${id}`).set(state, (err)=>{
        if(err){
          toast.error(err);
        }
        else if(+Rollno>99){
          toast.error("Please enter a valid 2 digit roll number")
        }else if(!Pincode.match(/^\d{6}$/)){
          toast.error("Please enter a valid 6 digit pin")
        }
        else{
          toast.success("Student Updated Successfully!!");
        }
      });
    }

    setTimeout(()=>history.push("/"),500);

  }

};

const handleInputChange=(e)=>{
  const{name,value}=e.target;
  setState({...state,[name]: value});
};


  return (
    <div style={{marginTop:"50px"}}>
      <form style={{
        margin:"auto",
        padding:"20px",
        maxWidth:"550px",
        alignContent:"center",
      }}
      onSubmit={handleSubmit}
      >

        <label htmlFor="fname"></label>
        <input type="text"
          id='fname'
          name='fname'
          placeholder='First Name'
          value={fname || ""}
          onChange={handleInputChange}
        />

 <label htmlFor="mname"></label>
        <input type="text"
          id='mname'
          name='mname'
          placeholder='Middle Name'
          value={mname || ""}
          onChange={handleInputChange}
        />

<label htmlFor="lname"></label>
        <input type="text"
          id='lname'
          name='lname'
          placeholder='Last Name'
          value={lname || ""}
          onChange={handleInputChange}
        /> 

      <label htmlFor="SelectClass">
        {/* Select Class  */}
        <select name='SelectClass' id='SelectClass' placeholder=' Select Class' onChange={handleInputChange} value={SelectClass || "Select Class"}>
       <option value="SelectClass">Select Class</option>
        <option value="Class 1"> Class 1</option>
        <option value="Class 2"> Class 2</option>
        <option value="Class 3"> Class 3</option>
        <option value="Class 4"> Class 4</option>
        <option value="Class 5"> Class 5</option>
        <option value="Class 6"> Class 6</option>
        <option value="Class 7"> Class 7</option>
        <option value="Class 8"> Class 8</option>
        <option value="Class 9"> Class 9</option>
        <option value="Class 10"> Class 10</option>
        <option value="Class 11"> Class 11</option>
        <option value="Class 12"> Class 12</option>

        </select>
      </label>

{/* <label htmlFor="Select Class" ></label>
        <input type=""
          id='email'
          name='email'
          placeholder='Your Email..'
          value={email}
          onChange={handleInputChange}
        /> */}

{/* <label htmlFor="contact"></label>
        <input type="number"
          id='contact'
          name='contact'
          placeholder='Your Contact..'
          value={contact}
          onChange={handleInputChange}
        /> */}


 <label htmlFor="SelectDivision">
        {/* Select Division``  */}
        <select name='SelectDivision' id='SelectDivision' placeholder=' Select Division' onChange={handleInputChange} value={SelectDivision || "Selected Division"}>
        <option value="Select Division">Select Division</option>
        <option value="A"> A</option>
        <option value="B"> B</option>
        <option value="C"> C</option>
        <option value="D"> D</option>
        <option value="E"> E</option>

        </select>
      </label>

      <label htmlFor="Rollno"></label>
        <input type="text"
          id='Rollno'
          name='Rollno'
          placeholder='Enter Roll Number in digits'
          value={Rollno || ""}
          onChange={handleInputChange}
        />

      <label htmlFor="Address1"></label>
        <textarea
          rows="4" 
          cols="72"
          id='Address1'
          name='Address1'
          placeholder='Address Line 1'
          value={Address1 ||""}
          onChange={handleInputChange}
        >
          Address Line 1...
        </textarea>

<label htmlFor="Address2"></label>
        <textarea
          rows="4" 
          cols="72"
          id='Address2'
          name='Address2'
          placeholder='Address Line 2'
          value={Address2 || ""}
          onChange={handleInputChange}
        >
          Address Line 2 ...
        </textarea>

<label htmlFor="Landmark"></label>
        <input type="text"
          id='Landmark'
          name='Landmark'
          placeholder='Landmark'
          value={Landmark || ""}
          onChange={handleInputChange}
        />

<label htmlFor="City"></label>
        <input type="text"
          id='City'
          name='City'
          placeholder='City'
          value={City || ""}
          onChange={handleInputChange}
        />

<label htmlFor="Pincode"></label>
        <input type="text"
          id='Pincode'
          name='Pincode'
          placeholder='Pincode'
          value={Pincode || ""}
          onChange={handleInputChange}
        /> 


<input type="submit" value={id ? "Update" :"Save"}/>
      </form>

    </div>
  )
}

export default AddStudent