"use client"

import { useEffect, useState } from "react";
import { fetchRacesByEvent} from "@/actions/actions";
import { Race } from "@/actions/models";
import router from "next/router";


export const RacesCard = (eventId:string) => {
    const [data, setData] = useState<Race[]>([]);
    useEffect(() => {
        const loadData = async () => {
            const result = await fetchRacesByEvent(eventId);
            console.log("Loaded races:", result);
            setData(result);
        };
        loadData();

    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Races</h2>
            <ul className="space-y-2">
                {data.map((race) => (
                    <button 
                        key={race._id} 
                        className="p-2 hover:bg-gray-50 rounded"
                        onClick={() => router.push(`/race/${race._id}`)}
                    >
                        <p className="font-medium">{race.letter} {race.type}</p>
                        <p className="font-medium">Laps: {race.laps}</p>
                        <p className="font-medium">Number Of Cars: {race.num_cars}</p>
                    </button>
                ))}
            </ul>
        </div>
    );
};