import { db } from '@/lib/db';
import { useState } from 'react';

function CreatePerson() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [birthday, setBirthday] = useState('')
  const [interests, setInterests] = useState('')

  return (
    <div className="w-1/4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          className="border border-gray-300 p-1" 
          onChange={(event) => setName(event.target.value)}
          value={name}/>

        <label htmlFor="age">Age:</label>
        <input 
          type="number" 
          id="age" 
          name="age" 
          className="border border-gray-300 p-1"
          onChange={(event) => setAge(event.target.value)}
          value={age}
          />

        <label htmlFor="birthday">Birthday:</label>
        <input 
          type="date" 
          id="birthday" 
          name="birthday" 
          className="border border-gray-300 p-1" 
          onChange={(event) => setBirthday(event.target.value)}
          value={birthday}
          />

        <label htmlFor="interests">Interests:</label>
        <textarea 
          type="text" 
          id="interests" 
          name="interests" 
          className="border border-gray-300 p-1" 
          onChange={(event) => setInterests(event.target.value)}
          value={interests}
          />

        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={ async () => {
            await fetch('/api/createPerson', {
              method: 'POST',
              body: JSON.stringify({ name, age, birthday, interests }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
          }}>
            Create
        </button>
      </div>
    </div>
  )
}

export default function Home({ people }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Birthday website</h1>
      <h3 className="text-xl mt-4 font-bold">Create person:</h3>
      <div><CreatePerson /></div>
      <h3 className="text-xl mt-4 font-bold">List of people:</h3>
      <div>
        {people.map((person) => (
          <div key={person.id}>
            <h4>{person.name}</h4>
            <p>{person.age}</p>
            <p>{person.birthday}</p>
            <p>{person.interests}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const people = await db.all('SELECT * FROM person');

  return {
    props: {
      people,
    },
  };
}