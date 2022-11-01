import React, {useState} from "react";
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""}) 
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
     const   {name,email,password} = credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/");
            props.showAlert("Successfully Account Created","success")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }

        
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container mt-2">
       <h2 className="my-2">Create Account to use Inotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"  onChange={onChange}
            aria-describedby="emailHelp"
            
          />
          
        </div>


        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1" onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>


        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password" onChange={onChange}
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword" onChange={onChange}
            placeholder="Password"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
