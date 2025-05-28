'use client';

import { useState } from 'react';
import { Entry, TopFinisher, HardCharger } from '@/actions/models';

interface CreateEntryFormProps {
  onSubmit: (entry: Entry) => void;
}

export default function CreateEntryForm({ onSubmit }: CreateEntryFormProps) {
  const [form, setForm] = useState<Entry>({} as Entry);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;

  if (type === 'checkbox') {
    const checked = (e.target as HTMLInputElement).checked;
    setForm({
      ...form,
      [name]: checked,
    });
  } else {
    setForm({
      ...form,
      [name]: name === 'phone_number' ? Number(value) : value,
    });
  }
};


  const handleTopFinishersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const entries = e.target.value.split(',').map((pair) => {
      const [racer_id, pos] = pair.trim().split(':');
      return { racer_id, position_guess: Number(pos) } as TopFinisher;
    });
    setForm({ ...form, top_finishers: entries });
  };

  const handleHardChargersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const entries = e.target.value.split(',').map((pair) => {
      const [racer_id, gain] = pair.trim().split(':');
      return { racer_id, gain_guess: Number(gain) } as HardCharger;
    });
    setForm({ ...form, hard_chargers: entries });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    console.log('Entry submitted:', form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        name="game_id"
        value={form.game_id}
        onChange={handleChange}
        placeholder="Game ID"
        className="border p-2 rounded"
        required
      />

      <input
        type="text"
        name="player_name"
        value={form.player_name}
        onChange={handleChange}
        placeholder="Player Name"
        className="border p-2 rounded"
        required
      />

      <input
        type="text"
        name="entry_nickname"
        value={form.entry_nickname}
        onChange={handleChange}
        placeholder="Entry Nickname"
        className="border p-2 rounded"
        required
      />

      <input
        type="number"
        name="phone_number"
        value={form.phone_number}
        onChange={handleChange}
        placeholder="Phone Number"
        className="border p-2 rounded"
        required
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="paid_status"
          checked={form.paid_status}
          onChange={handleChange}
        />
        Paid?
      </label>

      <select
        name="payment_type"
        value={form.payment_type}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="">Select Payment Type</option>
        <option value="cash">Cash</option>
        <option value="card">Card</option>
        <option value="venmo">Venmo</option>
      </select>

      <input
        type="text"
        placeholder="Top Finishers (racerId:pos,...)"
        onChange={handleTopFinishersChange}
        className="border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Hard Chargers (racerId:gain,...)"
        onChange={handleHardChargersChange}
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit Entry
      </button>
    </form>
  );
}
