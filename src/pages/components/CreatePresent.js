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

        <label htmlFor="price">Price:</label>
        <input 
          type="number"
          step="0.01"
          id="price" 
          name="price" 
          className="input input-bordered input-primary border-solid border-2 border-blue-200 rounded p-3 text-black"
          onChange={(event) => {
            const enteredPrice = parseFloat(event.target.value);
            if (!isNaN(enteredPrice) && enteredPrice >= 0) {
              setPrice(enteredPrice);
            }
          }}
          value={price}
        />

        <label htmlFor="from_where">From where:</label>
        <input 
          type="text" 
          id="from_where" 
          name="from_where" 
          className="input input-bordered input-primary border-solid border-2 border-blue-200 rounded p-3 text-black"
          onChange={(event) => setFrom(event.target.value)}
          value={from_where}
        />

        {isLoading ? (
          <span className="loading loading-ring loading-md"></span>
        ) : (
          <>
            <button 
              type="submit" 
              className="btn bg-orange-500 hover:bg-orange-700 rounded-2xl mt-4"
              onClick={() => createPresent({
                name,
                price,
                from_where,
                person_id
              })}
              disabled={!name || isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
            <p className="text-red-500">{error}</p>
          </>
        )}
      </div>
    </div>

  );
}

export default CreatePresent;