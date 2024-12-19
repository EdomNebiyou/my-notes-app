import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { registerUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password });
      dispatch(setUser(response.data));
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-80 mx-auto mt-10">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
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
        onClick={handleRegister}
      >
        Register
      </button>
    </form>
  );
};

export default Register;
