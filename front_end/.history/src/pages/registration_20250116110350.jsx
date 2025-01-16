// import React from 'react';
// import { useForm } from 'react-hook-form';
// //import { registerUser } from '../api/auth';
// import Cookies from 'js-cookie';

// const Registration = () => {
//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     if (data.password !== data.confirmPassword) {
//       setError('confirmPassword', { message: 'رمز عبور و تکرار آن باید یکسان باشد' });
//       return;
//     }

//     try {
//     //  const response = await registerUser({
//         username: data.username,
//         email: data.email,
//         password: data.password,
//       });

//       if (response.success) {
//         Cookies.set('jwt', response.token, { secure: true, sameSite: 'Strict' });
//         alert('ثبت‌نام موفقیت‌آمیز بود!');
//       }
//     } catch (error) {
//       setError('server', { message: error });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md" style={{ direction: 'rtl' }}>
//         <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">ثبت‌نام</h1>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Username Field */}
//           <div className="relative mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">نام کاربری</label>
//             <input
//               type="text"
//               {...register('username', { required: 'نام کاربری الزامی است' })}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="نام کاربری"
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
//             )}
//           </div>

//           {/* Email Field */}
//           <div className="relative mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
//             <input
//               type="email"
//               {...register('email', {
//                 required: 'ایمیل الزامی است',
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: 'فرمت ایمیل معتبر نیست',
//                 },
//               })}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="ایمیل"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="relative mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
//             <input
//               type="password"
//               {...register('password', { required: 'رمز عبور الزامی است' })}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="******"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Confirm Password Field */}
//           <div className="relative mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">تکرار رمز عبور</label>
//             <input
//               type="password"
//               {...register('confirmPassword', { required: 'تکرار رمز عبور الزامی است' })}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="******"
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
//             )}
//           </div>

//           {errors.server && (
//             <p className="text-red-500 text-sm mb-4 text-center">
//               {errors.server.message}
//             </p>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
//           >
//             ثبت‌نام
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-500">
//             قبلا ثبت‌نام کرده‌اید؟{' '}
//             <a href="/login" className="text-blue-500 hover:underline">ورود</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Registration;
