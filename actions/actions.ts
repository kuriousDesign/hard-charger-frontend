"use server"

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://hard-charger-backend.onrender.com/api";

export async function helloWorldServerAction() {
  return "Hello from server action!";
}

export async function helloWorldServerActionWithParams(name: string) {
  return `Hello, ${name}! This is a server action with parameters.`;
}

export async function fetchEntries() {
    console.log("Fetching entries from backend API:", backendApiUrl);

    try {
        const response = await fetch(`${backendApiUrl}/entries`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
        if (!response.ok) {
            throw new Error(`Error fetching entries: ${response.statusText}`);
        }
        const data = await response.json();
        //const data = {'data': 'test'};
        return data.entries;
    } catch (error) {
        console.error("Failed to fetch entries:", error);
        throw error;
    }

}

// i want to fetch data from the backend api /entries which returns a list of entries
export async function fetchDrivers() {
    console.log("Fetching drivers from backend API:", backendApiUrl);
    try {
        const response = await fetch(`${backendApiUrl}/drivers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
    
        if (!response.ok) {
            throw new Error(`Error fetching drivers: ${response.statusText}`);
        }

        const data = await response.json();
        //const data = {'data': 'test'};
        console.log("Fetched drivers:", data.drivers);
        return data.drivers
    } catch (error) {
        console.error("Failed to fetch drivers:", error);
        throw error;
    }
}   
