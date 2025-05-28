'use client';

import { RaceEvent } from '@/actions/models';
import { useState } from 'react';

interface CreateEventFormProps {
  onSubmit: (event: RaceEvent) => void;
}

export default function CreateEventForm({ onSubmit }: CreateEventFormProps) {
  const [form, setForm] = useState<RaceEvent>({_id:''} as RaceEvent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    console.log("Form submitted:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Event Name"
        className="border p-2 rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Create Event
      </button>
    </form>
  );
}
