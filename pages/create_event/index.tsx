'use client';

import { useRouter } from 'next/navigation';
import { RaceEvent } from '@/actions/models';
import CreateEventForm from './CreateEventForm';
import { postRaceEvent } from '@/actions/actions';

export default function CreateEventPage() {
  const router = useRouter();

  const handleCreate = async (event: RaceEvent) => {
    await postRaceEvent(event);
    router.push('/'); // ✅ Redirect to homepage
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Race Event</h1>
      <CreateEventForm onSubmit={handleCreate} />
    </div>
  );
}