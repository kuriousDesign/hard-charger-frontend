import { useRouter } from 'next/router';
import { DriversCard } from '@/components/DriversCard';

export default function DriversPage() {
    const router = useRouter();

    return (
        <div className='flex flex-col gap-4 w-full h-full p-4'>
            <DriversCard />
            <button
                onClick={() => router.push(`/`)}
                className="mt-4 bg-gray-50 text-gray-700 p-4 rounded-full w-fit min-w-[150px] hover:bg-black hover:text-white transition-colors duration-300 shadow-md"
            >
                Back Home
            </button>
        </div>
    );
}