'use client';

import { useRouter } from 'next/navigation';
import { Driver } from '@/actions/models';
import CreateDriverForm from './CreateDriverForm';
import { postDriver } from '@/actions/actions';

export default function CreateDriverPage() {
  const router = useRouter();

  const handleCreate = async (driver: Driver) => {
    await postDriver(driver);
    router.push(window.location.pathname.replace('/create_driver', '')); // Redirect back to race page
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add Racer</h1>
      <CreateDriverForm onSubmit={handleCreate} />
    </div>
  );
}