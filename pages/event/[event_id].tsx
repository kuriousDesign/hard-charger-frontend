import { fetchEvent } from '@/actions/actions';
import type { RaceEvent } from '@/actions/models';
import { useEffect, useState } from 'react';
import { GamesCard } from "@/components/GamesCard";
import { RacesCard } from '@/components/RacesCard';
import router from 'next/router';

export default function EventPage() {

    const { event_id } = router.query;
    console.log("Event ID:", event_id);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<RaceEvent | null>(null);

    useEffect(() => {
        if (event_id) {
            fetchData();
        }
    }, [event_id]);

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


    if (loading) return <div>Loading...</div>;
    if (!event) return <div>Event not found</div>;

    return (
        <div className='flex flex-col gap-4 p-6'>
            <div className='bg-white shadow-md rounded-lg p-6 max-w-1/3'>
                <h1 className='text-3xl font-bold'>{data.name}</h1>
                <h2>{data.location}</h2>
                <p className='text-gray-600'>{new Date(data.date).toLocaleDateString()}</p>
                {/* Add your event editing form here */}
            </div>
            <RacesCard eventId={event_id as string} />
            <GamesCard eventId={event_id as string} />
         
        </div>
    );
}