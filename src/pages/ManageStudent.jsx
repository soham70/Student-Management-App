import React,{useState,useEffect} from 'react';
import fireDb from "../firebase"
import { Link } from 'react-router-dom';
import "../pages/Home.css"
import { toast } from 'react-toastify';
import {FaEdit} from 'react-icons/fa'
import {AiOutlineEye} from 'react-icons/ai'
import{MdDelete} from 'react-icons/md'


const ManageStudent = () => {
  const [data,setData]=useState({});

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
  },[]);

  const onDelete =(id)=>{
    if(window.confirm("Do you want to delete the student?")){
      fireDb.child(`contacts/${id}`).remove((err)=>{
        if(err)
        {
          toast.error(err)
        }else{
          toast.success("Student Deleted Sucessfully!!")
        }
      })
    }
  }

  return (
    <div style={{marginTop:"100px"}}>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>First Name</th>
            <th style={{textAlign:"center"}}>Middle Name</th>
            <th style={{textAlign:"center"}}>Last Name</th>
            <th style={{textAlign:"center"}}>Class</th>
            <th style={{textAlign:"center"}}>Division</th>
            <th style={{textAlign:"center"}}>Roll No</th>
            <th style={{textAlign:"center"}}>Address Line 1</th>
            <th style={{textAlign:"center"}}>Address Line 2</th>
            <th style={{textAlign:"center"}}>Landmark</th>
            <th style={{textAlign:"center"}}>City</th>
            <th style={{textAlign:"center"}}>Pincode</th>
            <th className="action" style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id,index) => {
            return(
            <tr key={id}>
              <th scope='row'>{index+1}</th>
              <td>{data[id].fname}</td>
              <td>{data[id].mname}</td>
              <td>{data[id].lname}</td>
              <td>{data[id].SelectClass}</td>
              <td>{data[id].SelectDivision}</td>
              <td>{data[id].Rollno}</td>
              <td>{data[id].Address1}</td>
              <td>{data[id].Address2}</td>
              <td>{data[id].Landmark}</td>
              <td>{data[id].City}</td>
              <td>{data[id].Pincode}</td>

              <td>
                <Link to={`update/${id}`}>
                <button className='btn btn-edit'><FaEdit/></button>
                </Link>
                <button className='btn btn-delete' onClick={()=>onDelete(id)}><MdDelete/></button>
                <Link to={`view/${id}`}>
                <button className='btn btn-view'><AiOutlineEye/></button>
                </Link>
              </td>


            </tr>);
          })}
        </tbody>
      </table>
        {/* <h2>Home</h2> */}
    </div>
  );
}

export default ManageStudent