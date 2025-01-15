// Login.jsx - Full UI replication based on the provided screenshot
import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../api/auth';
import Cookies from 'js-cookie';

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
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src="../assets/logo.png" alt="Logo" className="h-12" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Phone Number Field */}
          <div className="relative mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">شماره همراه</label>
            <input
              type="text"
              {...register('phone', { required: 'شماره همراه خود را وارد نمایید' })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="09123456789"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
            <span className="absolute right-3 top-9 text-gray-400">
              <i className="fas fa-user"></i> {/* Placeholder for user icon */}
            </span>
          </div>

          {/* Password Field */}
          <div className="relative mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">کلمه عبور</label>
            <input
              type="password"
              {...register('password', { required: 'کلمه عبور خود را وارد نمایید' })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="******"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
            <span className="absolute right-3 top-9 text-gray-400">
              <i className="fas fa-lock"></i> {/* Placeholder for lock icon */}
            </span>
          </div>

          {errors.server && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {errors.server.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-600 focus:outline-none"
          >
            ورود
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">کلمه عبور را فراموش کرده‌ام</a>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            حساب کاربری ندارید؟{' '}
            <a href="/register" className="text-blue-500 hover:underline">ثبت‌نام</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
