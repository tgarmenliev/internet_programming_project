import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";

function CreatePresent({person_id}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0.0);
  const [from_where, setFrom] = useState('');
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    mutate: createPresent,
  } = useMutation(
    async (newPresent) => {
      const res = await fetch("../api/createPresent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, from_where, person_id }),
      });

      if (!res.ok) {
        const { message } = await res.json();

        throw new Error(message);
      }

      const present = await res.json();
      return present;
    },
    {
      onSuccess: (presents) => {
        queryClient.invalidateQueries("presents");
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

        <label htmlFor="age">Price:</label>
        <input 
          type="number"
          step="0.01"
          id="price" 
          name="price" 
          className="border border-gray-300 p-1"
          onChange={(event) => {
            const enteredPrice = parseFloat(event.target.value);
            if (!isNaN(enteredPrice) && enteredPrice >= 0) {
              setPrice(enteredPrice);
            }
          }}
          value={price}
        />

        <label htmlFor="birthday">From where:</label>
        <input 
          type="text" 
          id="from_where" 
          name="from_where" 
          className="border border-gray-300 p-1" 
          onChange={(event) => setFrom(event.target.value)}
          value={from_where}
        />

        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={() => createPresent(
            {
              name,
              price,
              from_where
            }
          )}
          disabled={!name || isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </button>
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
}

export default CreatePresent;