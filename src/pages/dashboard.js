import { useQuery } from "react-query";
import { useRouter } from "next/router";
import CreatePresent from "@/pages/components/CreatePresent";
import { UserButton } from "@clerk/nextjs";
import CreatePerson from './components/CreatePerson';
import LogoImage from '/public/next.svg';

export default function DashboardPage() {
  const router = useRouter();

  const { data: people, isLoading } = useQuery("people", () =>
    fetch("/api/getPeople").then((res) => res.json())
  );

  return (
    <div className="inline-block w-full bg-lightyellow p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-[100px] h-[100px] mr-2" />
          <h1 className="text-2xl font-bold">My Present Manager</h1>
        </div>

        <div className="flex items-center">
          <div className="mr-4">
            <UserButton />
          </div>

          <button
            className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded"
            onClick={() => router.push("https://www.youtube.com/watch?v=JV-G0lqDCok")}
          >
            Update person
          </button>
        </div>
      </div>

      {/* Create Person and List of People Section */}
      <div className="flex justify-around mt-4">
        <div className="flex mr-[30px] ml-[30px] justify-center items-center">
          <div className="flex-1 bg-black-100 rounded-md">
            <h3 className="text-xl font-bold p-4">Add new friend</h3>
            <CreatePerson />
          </div>
          
        </div>

        <div className="flex-auto">
          {/* List of People Section */}
          <div className="flex-1 items-center mr-[30px]">
            <h3 className="text-xl font-bold p-4">My friends</h3>
            <div className="flex flex-col gap-4">
              {isLoading
                ? "Loading people..."
                : !people || people.length === 0 ? (
                  <p>No people added yet.</p>
                ) : (
                  people.map((person) => (
                    <div key={person.id} className="border-4 border-blue-500 rounded p-4">
                      <div className="bg-blue-200 rounded p-4">
                        <h4 className="text-black">{person.name}</h4>
                      </div>
                      <div className="rounded p-4">
                        <p>{person.birthday}</p>
                      </div>
                      <div className="rounded p-4">
                        <a
                          href={`/person/${person.name}`}
                          className="bg-blue-900 text-white py-1 px-2 rounded hover:bg-blue-500"
                        >
                          Read interests
                        </a>
                      </div>
                    </div>
                  ))
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
