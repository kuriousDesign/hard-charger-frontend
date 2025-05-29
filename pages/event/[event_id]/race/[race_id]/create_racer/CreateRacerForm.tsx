'use client';

import { fetchDrivers, fetchRacersByRaceId } from '@/actions/actions';
import { Driver, Racer } from '@/actions/models';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


interface CreateRacerFormProps {
  onSubmit: (racer: Racer) => void;
}

export default function CreateRacerForm({ onSubmit }: CreateRacerFormProps) {
  const [form, setForm] = useState<Racer>({_id:''} as Racer);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const { race_id } = router.query;
  const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([]);
  //const [racers, setRacers] = useState<Racer[]>([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              // Replace with your actual API endpoint
              const result = await fetchDrivers() as Driver[];

              const resultRacers = await fetchRacersByRaceId(race_id as string);
              // remove all drivers from result that are already in resultRacers
              const existingDriverIds = new Set(resultRacers.map(racer => racer.driver_id));
              const filteredDrivers = result.filter(driver => !existingDriverIds.has(driver._id));
              setAvailableDrivers(filteredDrivers);

          } catch (error) {
              console.error('Error fetching event:', error);
          } finally {
              setLoading(false);
          }
      };
      if (race_id) {
          fetchData();
      }
  }, [race_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.race_id = race_id as string;
    form.current_position = form.starting_position; // Set current position to starting position
  
    const normalized: Racer = {
      ...form,
      current_position: Number(form.current_position),
      starting_position: Number(form.starting_position),
    };
  
    onSubmit(normalized);
    console.log('Race form submitted:', normalized);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        name="starting_position"
        value={form.starting_position}
        onChange={handleChange}
        placeholder="Starting Posiiton"
        className="border p-2 rounded"
        required
      />
      <select
        name="driver_id"
        value={form.driver_id}
        onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
        className="border p-2 rounded"
        required
      >
        <option value="">Select a driver</option>
        {availableDrivers.map((driver) => (
          <option key={driver._id} value={driver._id}>
            {driver.first_name} {driver.last_name} {driver.suffix} - {driver.car_number}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Racer
      </button>
    </form>
  );
}
