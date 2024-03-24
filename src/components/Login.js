import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [selectedOption, setSelectedOption] = useState('user');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleRegisterClick = async (email, password) => {
    let registerEndpoint = '';
    switch (selectedOption) {
      case 'user':
        registerEndpoint = 'registerUser';
        break;
      case 'staff':
        registerEndpoint = 'registerStaff';
        break;
      case 'admin':
        registerEndpoint = 'registerAdmin';
        break;
      default:
        console.error('Invalid user type');
        return;
    }
  
    try {
      const response = await axios.post(`http://localhost:8000/${registerEndpoint}`, { email, password });
      console.log(response.data);
      localStorage.setItem('userLogged', email);
      // Redirect to home page
      
      toast.success(' registered successfully');
      setTimeout(() => {
        window.location.href = '/home';
      }, 1000);
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('User already exists');
    }
  };
  

  const handleLoginClick = async (email, password) => {
    let loginEndpoint = '';
    switch (selectedOption) {
      case 'user':
        loginEndpoint = 'loginUser';
        break;
      case 'staff':
        loginEndpoint = 'loginStaff';
        break;
      case 'admin':
        loginEndpoint = 'loginAdmin';
        break;
      default:
        console.error('Invalid user type');
        return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/${loginEndpoint}`, { email, password });
      console.log(response.data);
      localStorage.setItem('userLogged', email);
      // Redirect to home page
      if(selectedOption === 'admin'){
        toast.success('Admin Login Successful');
        setTimeout(() => {
          window.location.href = '/admin';
        })
        
      }
      else if(selectedOption === 'staff'){
        toast.success('Staff Login Successful');
        setTimeout(() => {
          window.location.href = '/staff';
        })
       
      }
      else{
        toast.success('User Login Successful');
        setTimeout(() => {
          window.location.href = '/home';
        }, 1000);
        
      }
    } catch (error) {
      console.error('Error Login user:', error);
      toast.error('Invalid Credentials');
    }
  };

  const LoginForm = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleSignInClick = () => {
      handleLoginClick(email, password);
    };

    const handleRegisterSubmit = () => {
      handleRegisterClick(email, password);
    };

    return (
      <div className='flex justify-center m-5'>
        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
          <h2 className="text-lg font-bold mb-4">{type} Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`${type}-email`}>
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`${type}-email`}
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`${type}-password`}>
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={`${type}-password`}
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className='flex justify-center space-x-4'>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRegisterSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className='overflow-hidden'>
      <div className="flex justify-center mt-20">
        <div className="space-x-4 m-5">
          <button
            className={`${selectedOption === 'user'
              ? 'bg-blue-500 hover:bg-blue-700'
              : 'bg-gray-500 hover:bg-gray-700'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={() => handleOptionClick('user')}
          >
            User Login
          </button>
          <button
            className={`${selectedOption === 'staff'
              ? 'bg-blue-500 hover:bg-blue-700'
              : 'bg-gray-500 hover:bg-gray-700'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={() => handleOptionClick('staff')}
          >
            Staff Login
          </button>
          <button
            className={`${selectedOption === 'admin'
              ? 'bg-blue-500 hover:bg-blue-700'
              : 'bg-gray-500 hover:bg-gray-700'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={() => handleOptionClick('admin')}
          >
            Admin Login
          </button>
        </div>
      </div>
      {selectedOption === 'user' && <LoginForm type="User" />}
      {selectedOption === 'staff' && <LoginForm type="Staff" />}
      {selectedOption === 'admin' && <LoginForm type="Admin" />}
    </div>
  );
};

export default Login;
