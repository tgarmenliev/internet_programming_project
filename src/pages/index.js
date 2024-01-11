import { db } from '@/lib/db';
import { useState } from 'react';
import { useRouter } from 'next/router';
import CreatePerson from './CreatePerson';

export default function Home({ initialPeople }) {
  const [people, setPeople] = useState(initialPeople);
  const router = useRouter();

  return (
    <div>
      <h1 className="text-2xl font-bold">Birthday website</h1>
      <h3 className="text-xl mt-4 font-bold">Create person:</h3>
      <div>
        <CreatePerson addPerson={(person) => setPeople([person, ...people])} />
      </div>
      <h3 className="text-xl mt-4 font-bold">List of people:</h3>
      <div className="flex flex-col gap-4 mt-4">
        {people.map((person) => (
          <div key={person.id}>
            <h4 className="bg-blue-200">{person.name}</h4>
            <p>{person.age}</p>
            <p>{person.birthday}</p>
            <a
              href={`/person/${person.name}`}
              className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/person/${person.name}`);
              }}
            >
              Read interests
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Assuming db and other necessary dependencies are imported here
  const people = await db.all('SELECT * FROM person ORDER BY id DESC');

  return {
    props: {
      initialPeople: people,
    },
  };
}
