import React, { useEffect, useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Navigate } from 'react-router-dom'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'

const Register = () => {
  const [input, setInput] =useState({
  fullName: "",
  email: "",
  password: "",
  role: "",
  file:"",
  phoneNumber:"",
   pancard: "",
    adharcard: "",
});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

const changeEventHandler = (e) => {
  setInput({...input, [e.target.name]: e.target.value});
};
const changeFileHandler = (e) => {
  setInput({...input, file: e.target.files?.[0]});
};

const submitHandler = async (e) => {
  e.preventDefault();
  const formData = new FormData();
formData.append("fullName", input.fullName);
  formData.append("email", input.email);
  formData.append("password", input.password);
      formData.append("pancard", input.pancard);
    formData.append("adharcard", input.adharcard);
  formData.append("role", input.role);
  formData.append("phoneNumber", input.phoneNumber);
  if(input.file){
    formData.append("file", input.file);
  }
      try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
       if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
        
      }
     } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
        dispatch(setLoading(false));
      }
};

const { user } = useSelector((store) => store.auth);
 useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);


  return (
    <div>
      <Navbar></Navbar>
     <div className="flex items-center justify-center max-w-5xl mx-auto ">
    <form 
    onSubmit={submitHandler}
    className="w-1/2 border border-gray-500 rounded-md p-4 my-10">
      <h1 className="font-bold text-xl mb-5 text-center text-blue-600 ">Register</h1>
     <div className="my-2">
            <Label>FullName</Label>
            <Input type="text" placeholder="John Doe" value={input.fullName} name="fullName" onChange={changeEventHandler} className="my-2"></Input>
     </div>
     <div className="my-2">
      <Label>Email</Label>
      <Input type="email" placeholder="john@example.com " value={input.email} name="email" onChange={changeEventHandler} className="my-2"></Input>
     </div>
     <div className="my-2">
      <Label>Password</Label>
      <Input type="password" placeholder="••••••••" value={input.password} name="password" onChange={changeEventHandler} className="my-2"></Input>
     </div>
      <div>
            <Label>PAN Card Number</Label>
            <Input
              type="text"
              value={input.pancard}
              name="pancard"
              onChange={changeEventHandler}
              className="my-2"
              placeholder="ABCDEF1234G"
            ></Input>
          </div>
          <div>
            <Label>Adhar Card Number</Label>
            <Input
              type="text"
              value={input.adharcard}
              name="adharcard"
              onChange={changeEventHandler}
              className="my-2"
              placeholder="123456789012"
            ></Input>
          </div>
     <div className="my-2">
      <Label>Phone Number</Label>
      <Input type="tel" placeholder="+1234567890" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} className="my-2"></Input>
     </div>
     <div className="flex items-center justify-between ">
   
    <RadioGroup className='flex items-center gap-4 my-5'>
      <div className="flex items-center space-x-2">
      <Input type="radio" 
      name="role" 
      value="Student" 
       className="cursor-pointer"
      checked={input.role === "Student"}
        onChange={changeEventHandler} />

        <Label htmlFor="r1">Student</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Input type="radio" 
        name="role" 
        value="Recruiter" 
        className="cursor-pointer" 
        checked={input.role === "Recruiter"} 
        onChange={changeEventHandler} />
        <Label htmlFor="r2">Recruiter</Label>
      </div>
    </RadioGroup>
    </div>
      <div className="flex items-center  gap-2 ">
      <Label>Profile Photo</Label>
      <Input type="file" 
      accept="image/*" 
      className="cursor-pointer" onChange={changeFileHandler} />
      </div>

 {loading ? (
            <div className="flex items-center justify-center my-10">
              <div className="spinner-border text-blue-600" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="block w-full py-3 my-3 text-white bg-black hover:bg-black/90 rounded-md"
            >
              Register
            </button>
          )}


        
     {/* already account then login*/}
     <p className="text-gray-500 text-md my-2">
      Already have an account? <Link to="/login" className="text-blue-700 font-semibold" >Login</Link>
       </p>
     </form>
     </div>
    </div>
  );
};

export default Register
