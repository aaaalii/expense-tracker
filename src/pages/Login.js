import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login(){

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function login(){
    let user = {
      username,
      password,
      auth: true,
    }
    dispatch(setUser(user));
    navigate('/');
  }
  
  return (
    <>
      <div className="d-flex justify-content-center align-items-center full-height">
        <div className="bg-dark text-light">
          <form className="d-flex flex-column p-5" onSubmit={(e) => {
            e.preventDefault();
            login();
          }}>
          <h4>Login</h4>
            <input type="text" placeholder="username" className="mb-2 p-2 rounded" value={username} onChange={(e) => (
              setUsername(e.target.value)
            )} required/>
            <input type="password" placeholder="password" className="mb-2 p-2 rounded" value={password} onChange={(e) => (
              setPassword(e.target.value)
            )}  required/>
            <input type="submit" className="btn btn-primary"/>
          </form>
        </div>
      </div>
    </>
  );
}