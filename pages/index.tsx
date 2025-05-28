"use client";

import { fetchDrivers, fetchRacesByEvent} from "@/actions/actions";
import { Driver, Game, Race } from "@/actions/models";

import { EventsCard } from "@/components/EventsCard";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function Home() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [races, setRaces] = useState<Race[]>([]);


  useEffect(() => {
    const loadGames = async () => {
      //const result = await fetchGames();
      //console.log("Loaded games:", result);
      //setGames(result);
    };
    loadGames();
    const loadDrivers = async () => {
      const result = await fetchDrivers();
      //console.log("Loaded drivers:", result);
      setDrivers(result);
    };
    loadDrivers();
    const loadRaces = async () => {
      const result = await fetchRacesByEvent("6832ff3dbe13cf40e352c847"); // Example
      setRaces(result);
    };
    loadRaces();
  }, []);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className}  w-screen h-screen font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-wrap gap-[32px] items-center sm:items-start w-1/2">

        <EventsCard />
   
        
        {drivers.length === 0 && drivers.map((driver) => (
          <div
          
            key={driver._id} 
            className="flex flex-col gap-[8px] items-start sm:items-center bg-white p-4 rounded-lg shadow-md w-[260px]"
          >
            <h2 className="text-xl font-semibold">{driver.first_name} {driver.last_name} {driver.suffix}</h2>
            <p className="text-gray-700">number: {driver.car_number}</p>
            <p className="text-gray-500">ID: {driver._id}</p>
          </div>
        ))}
        {drivers.length === 0 && (
          <div className="text-gray-500">No drivers found.</div>
        )}
        {races.map((race) => (
            <div
  
            key={race._id} 
            className="flex flex-col gap-[8px] items-start sm:items-center bg-white p-4 rounded-lg shadow-md w-[260px]"
          >
            <h2 className="text-xl font-semibold">{race.letter} {race.type}</h2>
          </div>
        ))}

        </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
