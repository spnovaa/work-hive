import React from 'react';

const InputField = ({ label, type, register, name, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="w-full border px-3 py-2 rounded"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
