'use client';

import { useRouter } from 'next/navigation';
import { Entry } from '@/actions/models';
import CreateEntryForm from './CreateEntryForm';
import { postEntry } from '@/actions/actions';

export default function CreateEntryPage() {
  const router = useRouter();

  const handleCreate = async (data: Entry) => {
    await postEntry(data);
    router.push('/'); // ✅ Redirect to homepage
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Race Event</h1>
      <CreateEntryForm onSubmit={handleCreate} />
    </div>
  );
}