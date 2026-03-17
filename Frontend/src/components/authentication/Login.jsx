import React, { useEffect, useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Link, Navigate } from 'react-router-dom'
import Axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/data.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading ,setUser } from '@/redux/authSlice'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
const Login = () => {
  const [input, setInput] =useState({

  email: "",
  password: "",
  role: "",

});
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const { loading ,user} = useSelector((store) => store.auth);


const changeEventHandler = (e) => {
  setInput({...input, [e.target.name]: e.target.value});
}
const changeFileHandler = (e) => {
  setInput({...input, file: e.target.files?.[0]});
};

const submitHandler = async(e) => {
  e.preventDefault();


      try {
        dispatch(setLoading(true));
        const res = await Axios.post(`${USER_API_ENDPOINT}/login`, input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
       if(res.data.success){
          dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        
      } }catch (error) {
        console.log(error);
toast.error(error.response?.data?.message || error.message || "Login failed");
      }
      finally{
        dispatch(setLoading(false));
      }
};
 useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);


  return (
    <div>

      <div>
        <Navbar></Navbar>
        <div className="flex items-center justify-center max-w-5xl mx-auto ">
          <form onSubmit={submitHandler} className="w-1/2 border border-gray-500 rounded-md p-4 my-10">
            <h1 className="font-bold text-xl mb-5 text-center text-blue-600 ">
              Login</h1>
        
            <div className="my-2">
              <Label>Email</Label>
              <Input type="email" placeholder="john@example.com " className="my-2" value={input.email} name="email" onChange={changeEventHandler}></Input>
            </div>
            <div className="my-2">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" className="my-2" value={input.password} name="password" onChange={changeEventHandler}></Input>
            </div>
      
            <div className="flex items-center justify-between ">

              <RadioGroup className='flex items-center gap-4 my-5'>
                <div className="flex items-center space-x-2">
                  <Input type="radio" name="role" value="Student"  className="cursor-pointer" checked={input.role === "Student"} onChange={changeEventHandler} />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input type="radio" name="role" value="Recruiter" className="cursor-pointer" checked={input.role === "Recruiter"} onChange={changeEventHandler} />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
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
              className="w-3/4 py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-blue-600 hover:bg-blue-800/90 rounded-md"
            >
              Login
            </button>
          )}
            
            {/* No account then register*/}
            <div>
           <p className="text-gray-700 text-md text-center my-2">

            Create new account {""} <Link to="/register" className="text-blue-700" >
           <button className="block w-1/2 py-3 my-3 text-white flex items-center justify-center max-w-5xl mx-auto
           bg-green-600 hover:bg-green-800/90 rounded-md">Register</button>
            </Link>
           </p>
           </div>
          </form>
        </div>
      </div>


    </div>
  )
}

export default Login
