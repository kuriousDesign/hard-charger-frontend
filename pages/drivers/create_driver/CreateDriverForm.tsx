'use client';

import { Driver } from '@/actions/models';
import { useState } from 'react';

interface CreateDriverFormProps {
  onSubmit: (driver: Driver) => void;
}

export default function CreateDriverForm({ onSubmit }: CreateDriverFormProps) {
  const [form, setForm] = useState<Driver>({_id:'',suffix:''} as Driver);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    console.log("CreateDriverForm submitted:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        placeholder="First Name"
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="suffix"
        value={form.suffix}
        onChange={handleChange}
        placeholder="Suffix (optional), e.g. Jr. or Sr."
        className="border p-2 rounded"
        required={false} // Suffix is optional
      />
      <input
        type="text"
        name="car_number"
        value={form.car_number}
        onChange={handleChange}
        placeholder="Car Number, e.g. 21K"
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Create Driver
      </button>
    </form>
  );
}
