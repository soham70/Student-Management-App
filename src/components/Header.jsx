import React, {useEffect,useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Header.css"

const Header = () => {
    
    const [activeTab,setActiveTab]=useState("Home");
    const location =useLocation();

    useEffect(()=>{
        if(location.pathname === "/")
        {
            setActiveTab("Home");
        }
        else if(location.pathname === "/add")
        {
            setActiveTab("AddStudent");
        }
        // else if(location.pathname === "/add")
        // {
        //     setActiveTab("ManageStudent")
        // }
    },[location]);


  return (
    <div className='header'>
        <p className='logo'>Logo</p>
        <div className='header-right'>

        <Link to={"/"}>
        <p className={`${activeTab === "Home" ? "active" : "" }`}
        onClick={()=> setActiveTab("Home")}
        >
          Manage Student  
        </p>
        </Link>

        <Link to={"/add"}>
        <p className={`${activeTab === "AddStudent" ? "active" : "" }`}
        onClick={()=> setActiveTab("AddStudent")}
        >
          Add Student 
        </p>
        </Link>

        

        {/* <Link to={"/login"}>
        <p className={`${activeTab === "Logout" ? "active" : "" }`}
        onClick={()=> setActiveTab("Logout")}
        >
          Logout 
        </p>
        </Link> */}


        </div>
    </div>
  )
}

export default Header