import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";

function CreatePerson({}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [birthday, setBirthday] = useState('');
  const [interests, setInterests] = useState('');
  const queryClient = useQueryClient();
  
  // Rename local error state to avoid conflict
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    // Reset localError after 3 seconds
    const timeoutId = setTimeout(() => {
      setLocalError(null);
    }, 3000);

    // Cleanup the timeout when the component unmounts or when localError changes
    return () => clearTimeout(timeoutId);
  }, [localError]);

  const {
    isLoading,
    error: mutationError, // Rename error to mutationError
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

        setName('');
        setAge('');
        setBirthday('');
        setInterests('');
      },
      onError: (err) => {
        // Corrected: Use setLocalError instead of setError
        setLocalError(err.message);
      },
    }
  );

  return (
    <div className="box w-full">
      <div className="flex flex-col gap-2 border-solid border-2 border-orange-500 rounded-xl p-3">
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          className="input input-bordered input-primary border-solid border-2 border-blue-200 rounded text-black"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />

        <label htmlFor="age">Age:</label>
        <input 
          type="number" 
          id="age" 
          name="age" 
          className="input input-bordered input-primary border-solid border-2 border-blue-200 rounded text-black"
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
          className="input input-bordered input-primary border-solid border-2 border-blue-200 rounded text-black"
          onChange={(event) => setBirthday(event.target.value)}
          value={birthday}
        />

        <label htmlFor="interests">Interests:</label>
        <textarea 
          type="text" 
          id="interests" 
          name="interests" 
          className="input input-bordered input-primary border-solid border-2 border-blue-200 rounded p-3 text-black"
          onChange={(event) => setInterests(event.target.value)}
          value={interests}
        />

        <button 
          type="submit" 
          className={`btn ${(!name || !birthday || isLoading) ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-700'} rounded-2xl mt-4`}
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
        <p className="text-red-500">{localError}</p>
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