// pages/dashboard.js
import { useQuery } from "react-query";
//import { fetchDataFromDatabase } from '../lib/db'; // Adjust based on your code structure
import CreatePerson from './components/CreatePerson';
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage () {
  const { data: people, isLoading, error } = useQuery("people", () => fetch("/api/getPeople").then((res) => res.json()));

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <UserButton />
      <h3 className="text-xl mt-4 font-bold">Create person:</h3>
      <div>
        <CreatePerson />
      </div>
      <h3 className="text-xl mt-4 font-bold">List of people:</h3>
      <div className="flex flex-col gap-4 mt-4">
        {isLoading
          ? "Loading people..."
          : !people || people.length === 0 ? (
              <p>No people added yet.</p>
            ) : (
              people.map((person) => (
                <div key={person.id}>
                  <h4 className="bg-blue-200">{person.name}</h4>
                  <p>{person.birthday}</p>
                  <a
                    href={`/person/${person.name}`}
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                  >
                    Read interests
                  </a>
                </div>
              ))
            )}
      </div>
    </div>
  );
};