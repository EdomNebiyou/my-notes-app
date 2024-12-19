import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/authSlice';
import { loginUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[navigate,user])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      dispatch(setUser(response.data));
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80 mx-auto mt-10">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 w-full"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
};

export default Login;