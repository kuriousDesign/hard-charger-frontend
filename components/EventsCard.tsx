"use client"

import { useEffect, useState } from "react";
import { fetchEvents} from "@/actions/actions";
import { RaceEvent } from "@/actions/models";
import router from "next/router";
//import { useRouter } from "next/router"; // ✅ Pages Router



export const EventsCard = () => {
    //const router = useRouter();
    const [data, setData] = useState<RaceEvent[]>([]);
    useEffect(() => {
    const loadData = async () => {
        const result = await fetchEvents();
        console.log("Loaded data:", result);
        setData(result);
    };
    loadData();

    }, []);

    return (
        <div className="p-4 bg-gray-300 rounded-lg shadow-md flex flex-col justify-start space-y-4 items-start">
            <h2 className="text-xl font-bold mb-4">Events</h2>
            {data.map((raceEvent) => (
                <button key={raceEvent._id} className="p-2 bg-gray-400 hover:bg-gray-50 shadow-sm" onClick={() => router.push(`/event/${raceEvent._id}`)} >
                    <p className="font-medium">{raceEvent.name}</p>
                    <p className="font-medium">Location: {raceEvent.location}</p>
                    <p className="font-medium">Data: {raceEvent.date}</p>
                </button>
            ))}
            <button 
                onClick={() => router.push('/create_event')} 
                className="bg-blue-600 text-white p-4 rounded-full"
            >
                Create Event
            </button>
        </div>
    );
};