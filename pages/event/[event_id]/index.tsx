import { fetchEvent } from '@/actions/actions';
import type { RaceEvent } from '@/actions/models';
import { useEffect, useState } from 'react';
import { GamesCard } from "@/components/GamesCard";
import { RacesCard } from '@/components/RacesCard';
import { useRouter } from 'next/router';

export default function EventPage() {
    const router = useRouter();
    const { event_id } = router.query;
    console.log("Event ID:", event_id);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<RaceEvent | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            // Replace with your actual API endpoint
            const result = await fetchEvent(event_id as string);
            setData(result);
        } catch (error) {
            console.error('Error fetching event:', error);
        } finally {
            setLoading(false);
        }
    };
        if (event_id) {
            fetchData();
        }
    }, [event_id]);

    const EventDiv = () => {
        
        return (
            <div className='bg-white shadow-md rounded-lg p-4'>
                <h1 className='text-xl font-bold text-gray-300'>Event</h1>
                <h1 className='text-3xl font-bold'>{data?.name}</h1>
                <h2 className='text-gray-500'>{data?.location}</h2>
                <p className='text-gray-500'>{new Date(data?.date ?? new Date()).toLocaleDateString()}</p>
                {/* Add your event editing form here */}
            </div>
        );
    };
    if (loading || !event_id) return <div>Loading...</div>;
    if (!data) return <div>Event not found</div>;

    return (
        <div className='flex flex-col gap-4 w-full h-full p-4'>
            {EventDiv()}
            <RacesCard eventId={event_id as string} />
            <GamesCard eventId={event_id as string} />
        </div>
    );
}