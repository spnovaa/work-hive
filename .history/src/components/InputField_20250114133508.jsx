import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../api/auth';
import Cookies from 'js-cookie';
import InputField from '../components/forms/InputField';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

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
          <p className="text-red-500 text-sm mb-4 text-center">
            {errors.server.message}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
