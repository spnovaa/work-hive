import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../api/auth';
import Cookies from 'js-cookie';
import sImage from '../assets/s.png';

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
        alert('ورود با موفقیت انجام شد!');
      }
    } catch (error) {
      setError('server', { message: error.message || 'ورود ناموفق بود' });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300"
      style={{ direction: 'rtl' }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
  <div className="text-center mb-6 flex items-center justify-center space-x-reverse space-x-2">
    <img src={sImage} alt="میزیتو" className="h-12" />
    <div className="flex items-center space-x-reverse space-x-2">
      <i className="fas fa-user text-gray-500 text-xl"></i>
      <span className="font-bold text-gray-700 text-lg">میزیتو</span>
    </div>
  </div>
</div>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Phone Number Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">شماره همراه</label>
            <div className="relative">
              <input
                type="text"
                {...register('phone', { required: 'شماره همراه خود را وارد نمایید' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="09123456789"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">کلمه عبور</label>
            <div className="relative">
              <input
                type="password"
                {...register('password', { required: 'کلمه عبور خود را وارد نمایید' })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="******"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>

          {errors.server && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {errors.server.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-medium shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
