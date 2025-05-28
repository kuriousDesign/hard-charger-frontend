'use client';

import { Race } from '@/actions/models';
import { useState } from 'react';

interface CreateRaceFormProps {
  onSubmit: (race: Race) => void;
}

export default function CreateRaceForm({ onSubmit }: CreateRaceFormProps) {
  const [form, setForm] = useState<Race>({} as Race);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    console.log('Race form submitted:', form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        name="letter"
        value={form.letter}
        onChange={handleChange}
        placeholder="Race Letter (e.g.,,A, B, C)"
        className="border p-2 rounded"
        required
      />

      <input
        type="text"
        name="type"
        value={form.type}
        onChange={handleChange}
        placeholder="Race Type (e.g.,,Main, Heat)"
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="laps"
        value={form.laps}
        onChange={handleChange}
        placeholder="Number of Laps"
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="num_cars"
        value={form.num_cars}
        onChange={handleChange}
        placeholder="Number of Cars"
        className="border p-2 rounded"
        required
      />


      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Create Race
      </button>
    </form>
  );
}
