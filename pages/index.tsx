import { fetchDrivers } from "@/actions/actions";
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
  const [drivers, setDrivers] = useState<any[]>([]);

  useEffect(() => {
    const loadDrivers = async () => {
      const result = await fetchDrivers();
      setDrivers(result);
    };
    loadDrivers();
  }, []);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-wrap gap-[32px] items-center sm:items-start w-1/2">
        {drivers.map((driver) => (
          <div
          
            key={driver.id} 
            className="flex flex-col gap-[8px] items-start sm:items-center bg-white p-4 rounded-lg shadow-md w-[260px]"
          >
            <h2 className="text-xl font-semibold">{driver.first_name} {driver.last_name} {driver.suffix}</h2>
            <p className="text-gray-700">number: {driver.car_number}</p>
          </div>
        ))}
        {drivers.length === 0 && (
          <div className="text-gray-500">No drivers found.</div>
        )}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
