'use client';

import { Race } from '@/actions/models';
import { useState } from 'react';

interface CreateRaceFormProps {
  onSubmit: (race: Race) => void;
}

export default function CreateRaceForm({ onSubmit }: CreateRaceFormProps) {
  const [form, setForm] = useState<Race>({status:'lineup'} as Race);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const normalized: Race = {
    ...form,
    laps: Number(form.laps),
    num_cars: Number(form.num_cars),
    intermission_lap: Number(form.intermission_lap),
    num_transfers: Number(form.num_transfers),
    first_transfer_position: Number(form.first_transfer_position),
  };

  onSubmit(normalized);
  console.log('Race form submitted:', normalized);
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

      {/* <input
        type="text"
        name="event_id"
        value={form.event_id}
        onChange={handleChange}
        placeholder="Event ID"
        className="border p-2 rounded"
        required
      /> */}
      {/* <input
        type="text"
        name="_id"
        value={form._id}
        onChange={handleChange}
        placeholder="id (optional)"
        className="border p-2 rounded"
        required
      /> */}
      <input
        type="number"
        name="intermission_lap"
        value={form.intermission_lap}
        onChange={handleChange}
        placeholder="Intermission Lap (put 0 if there isn't one)"
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="num_transfers"
        value={form.num_transfers}
        onChange={handleChange}
        placeholder="Number of Transfers"
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="first_transfer_position"
        value={form.first_transfer_position}
        onChange={handleChange}
        placeholder="First Transfer Position"
        className="border p-2 rounded"
        required
      />
      {/* <input
        type="text"
        name="status"
        value={form.status}
        onChange={handleChange}
        placeholder="Status (e.g., lineup, in_progress, finished)"
        className="border p-2 rounded"
        required
      />       */}


      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Create Race
      </button>
    </form>
  );
}
