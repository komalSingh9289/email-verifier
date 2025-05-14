import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setUser: (name: string) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      setUser(name);
      navigate('/dashboard');

    } else {
      alert("Please enter your name");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
