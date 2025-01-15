// Login.jsx - UI matching target site's login page
import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../api/auth';
import Cookies from 'js-cookie';
import InputField from '../components/InputField';

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response.success) {
        Cookies.set('jwt', response.token, { secure: true, sameSite: 'Strict' });
        alert('Login successful!');
      }
    } catch (error) {
      setError('server', { message: error });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Username or Email"
            type="text"
            name="username"
            register={register} // Pass the `register` function correctly
            error={errors.username}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            register={register} // Pass the `register` function correctly
            error={errors.password}
          />

          {errors.server && (
            <p className="text-red-500 text-sm text-center">
              {errors.server.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
