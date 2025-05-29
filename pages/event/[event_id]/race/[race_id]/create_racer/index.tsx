'use client';

import { useRouter } from 'next/navigation';
import { Racer } from '@/actions/models';
import CreateRacerForm from './CreateRacerForm';
import { postRacer } from '@/actions/actions';

export default function CreateRacerPage() {
  const router = useRouter();

  const handleCreate = async (racer: Racer) => {
    await postRacer(racer);
    router.push(window.location.pathname.replace('/create_racer', '')); // Redirect back to race page
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add Racer</h1>
      <CreateRacerForm onSubmit={handleCreate} />
    </div>
  );
}