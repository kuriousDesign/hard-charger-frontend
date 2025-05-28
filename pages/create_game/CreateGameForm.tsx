'use client';

import { Game } from '@/actions/models';
import { useState } from 'react';

interface CreateGameFormProps {
  onSubmit: (game: Game) => void;
}

export function CreateGameForm({ onSubmit }: CreateGameFormProps) {
  const [form, setForm] = useState<Game>({
    _id: '',
    name: '',
    event_id: '',
    entry_fee: 0,
    num_entries: 0,
    num_hard_chargers: 0,
    num_top_finishers: 0,
    races: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumberField = [
      'entry_fee',
      'num_entries',
      'num_hard_chargers',
      'num_top_finishers',
    ].includes(name);

    setForm({
      ...form,
      [name]: isNumberField ? Number(value) : value,
    });
  };

  const handleRacesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raceIds = e.target.value
      .split(',')
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
    setForm({ ...form, races: raceIds });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    console.log('Game form submitted:', form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Game Name"
        className="border p-2 rounded"
        required
      />

      <input
        type="number"
        name="entry_fee"
        value={form.entry_fee}
        onChange={handleChange}
        placeholder="Entry Fee"
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="num_entries"
        value={form.num_entries}
        onChange={handleChange}
        placeholder="Number of Entries"
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="num_hard_chargers"
        value={form.num_hard_chargers}
        onChange={handleChange}
        placeholder="Number of Hard Chargers"
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="num_top_finishers"
        value={form.num_top_finishers}
        onChange={handleChange}
        placeholder="Number of Top Finishers"
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="races"
        placeholder="Comma-separated race IDs (e.g. 1,2,3)"
        onChange={handleRacesChange}
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Create Game
      </button>
    </form>
  );
}
