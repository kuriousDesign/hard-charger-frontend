"use client"

import { useEffect, useState } from "react";
import { fetchRacesByEvent} from "@/actions/actions";
import { Race } from "@/actions/models";
import router from "next/router";


export const RacesCard = ({ eventId }: { eventId: string })  => {
    const [data, setData] = useState<Race[]>([]);
    useEffect(() => {
        const loadData = async () => {
            const result = await fetchRacesByEvent(eventId);
            console.log("Loaded races:", result);
            setData(result.toSorted((a, b) => a.letter.localeCompare(b.letter)));
        };
        loadData();

    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md max-w-1/3">
            <h2 className="text-xl font-bold mb-4">Races</h2>
            <div className="flex flex-wrap gap-4">
                {data.map((race) => (
                    <button 
                        key={race._id} 
                        className="p-2 hover:bg-gray-50 rounded shadow-sm bg-gray-100 w-fit px-4"
                        onClick={() => router.push(`/race/${race._id}`)}
                    >
                        <p className="font-bold">{race.letter} {race.type}</p>
                        <p className="font-medium">Laps: {race.laps}</p>
                        <p className="font-medium">Cars: {race.num_cars}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};