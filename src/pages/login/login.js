import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import "../home/home.css";
import Sun from "../../images/sun.svg";
import Eye from "../../images/crossed-eye.svg"

const Login = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const init = search.get('init') ?? 'true';
  const state = init === 'true';
  const [isLogin, setIsLogin] = useState(state);
  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-row items-center
    bg-[#FCFEF1]'>
      <div
      className="flex justify-center w-full h-full items-center relative">
        <h1 className="text-7xl absolute top-24 custom-font-text3">{isLogin ? 'Welcome back' : 'Welcome'}</h1>
      {isLogin ? (
        <div className="relative flex flex-col gap-5 items-center text-xl">
          <div className='flex flex-col'>
            <span className="text-center custom-font-text6 text-4xl mb-2">username</span>
            <input
            type="text"
            className="w-80 p-[0.6rem] px-5 rounded-2xl shadow-xs 
            bg-[#f1f4ea] focus:outline-none focus:ring-0 mb-2"
            required/>
          </div>
          <div className="flex flex-col">
            <span className="text-center custom-font-text6 text-4xl mb-2">password</span>
            <input
            type="password"
            className="w-80 p-[0.6rem] px-5 rounded-2xl shadow-xs 
            bg-[#f1f4ea] focus:outline-none focus:ring-0"
            required/>
          </div>
          <div className="flex flex-row w-full custom-font-text5 relative">
            {/* img */}
            <input type="checkbox" className="appearance-none bg-white 
        w-[17.6px] h-[0.57rem] rounded-[9999px] checked:bg-black inline-block self-center align-middle cursor-pointer"
            required>
            </input>
            <img src={Eye} className="w-5 h-5 absolute right-5 bottom-[3.1rem]" />
            <img src={Sun} className='w-6 h-6 absolute flex self-center pointer-events-none -left-2'/>
            <span className="text-left text-xs ml-2  w-full">Remember Me</span>
            <button className="text-right text-xs w-full"
            onClick={() => setIsLogin(false)}>Don't have an account?</button>
          </div>
          <button
          className="flex custom-font-text3 text-4xl"
          onClick={() => navigate('/')}
          >sign in</button>
        </div>
      ) : (
        <div className="relative flex flex-col gap-5 items-center text-xl">
          <div className='flex flex-col'>
            <span className="text-center custom-font-text6 text-4xl mb-2">username</span>
            <input
            type="text"
            className="w-80 p-[0.6rem] px-5 rounded-2xl shadow-xs 
            bg-[#f1f4ea] focus:outline-none focus:ring-0"
            required/>
          </div>
          <div className="flex flex-col">
            <span className="text-center text-4xl custom-font-text6 mb-2">password</span>
            <input
            type="password"
            className="w-80 p-[0.6rem] px-5 rounded-2xl shadow-xs 
            bg-[#f1f4ea] focus:outline-none focus:ring-0"
            required/>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-center custom-font-text6 text-4xl mb-2">Re-enter password</span>
            <input
            type="password"
            className="w-80 p-[0.6rem] px-5 rounded-2xl shadow-xs 
            bg-[#f1f4ea] focus:outline-none focus:ring-0"
            required/>
          </div>
          <div className="flex flex-row w-full relative custom-font-text5">
            {/* img */}
            <input type="checkbox" className="appearance-none bg-white 
        w-[17.6px] h-[0.57rem] rounded-[9999px] checked:bg-black inline-block self-center align-middle cursor-pointer"
            required>
            </input>
            <img src={Eye} className="w-5 h-5 absolute right-[4.2rem] bottom-[3.1rem]" />
            <img src={Sun} className='w-6 h-6 absolute flex self-center pointer-events-none -left-2'/>
            <span className="text-left text-xs ml-2 w-full ">Remember Me</span>
            <button className="text-right text-xs w-full"
            onClick={() => setIsLogin(true)}>Already have an account?</button>
          </div>
          <button
          className="flex custom-font-text3 text-4xl"
          onClick={() => navigate('/')}
          >sign up</button>
        </div>
      )}
      <h1 className="flex absolute bottom-3 custom-font-text3 text-4xl right-10">
        Weatherpro
      </h1>
      </div>
    </div>
  );
}; 

export default Login;
