import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";

function CreatePerson({}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [birthday, setBirthday] = useState('');
  const [interests, setInterests] = useState('');
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    mutate: createPerson,
  } = useMutation(
    async (newPerson) => {
      const res = await fetch("../api/createPerson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, birthday, interests }),
      });

      if (!res.ok) {
        const { message } = await res.json();

        throw new Error(message);
      }

      const person = await res.json();
      return person;
    },
    {
      onSuccess: (people) => {
        queryClient.invalidateQueries("people");
      },
      onError: (err) => {
        setError(err.message);
      },
    }
  );

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
          value={name}
        />

        <label htmlFor="age">Age:</label>
        <input 
          type="number" 
          id="age" 
          name="age" 
          className="border border-gray-300 p-1"
          onChange={(event) => {
            const enteredAge = parseInt(event.target.value, 10);
            if (!isNaN(enteredAge) && enteredAge >= 0) {
              setAge(enteredAge);
            }
          }}
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
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={() => createPerson(
            {
              name,
              age,
              birthday,
              interests,
            }
          )}
          disabled={!name || !birthday || isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </button>
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
}

export default CreatePerson;


  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const clearError = () => {
  //   setError(null);
  // };

  // const createPerson = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await fetch('/api/createPerson', {
  //       method: 'POST',
  //       body: JSON.stringify({ name, age, birthday, interests }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!res.ok) {
  //       const { message } = await res.json();
  //       throw new Error(message);
  //     }

  //     const json = await res.json();
  //     //addPerson(json);

  //     setName('');
  //     setAge('');
  //     setBirthday('');
  //     setInterests('');
  //   } catch (err) {
  //     setError(err.message);
  //     setTimeout(clearError, 3000); // Clear error after 3 seconds
  //   } finally {
  //     setLoading(false);
  //   }
  // };