// Person.js
import { db } from "@/lib/db";
import { useQuery } from "react-query";
import { useRouter } from 'next/router';
import CreatePresent from "@/pages/components/CreatePresent";

export default function Person({
    id,
    name,
    age,
    birthday,
    interests
}) {
    const router = useRouter();
    const { data: presents, isLoading, error } = useQuery("presents", () =>
        fetch(`/api/getPresents?personID=${id}`).then((res) => res.json())
    );

    return (
        <div>
            <div>
                <h1>Name: {name}</h1>
                <h2>Person id: {id}</h2>
                <p>Age: {age}</p>
                <p>Birthday: {birthday}</p>
                <p>Interests: {interests}</p>
            </div>
            <h3 className="text-xl mt-4 font-bold">Create present:</h3>
            <CreatePresent person_id={id} />
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
                onClick={() => router.push("/dashboard")}
            >
                Go back to dashboard
            </button>
            <div>
                <h3 className="text-xl mt-4 font-bold">List of presents:</h3>
                <div className="flex flex-col gap-4 mt-4">
                    {isLoading ? (
                        "Loading presents..."
                    ) : !presents || presents.length === 0 ? (
                        <p>No presents added yet.</p>
                    ) : (
                        presents.map((present) => (
                            <div key={present.id}>
                                <h4 className="bg-blue-200">{present.name}</h4>
                                <p>{present.price}</p>
                                <p>{present.from_where}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    const person = await db.get("SELECT * FROM person WHERE name = ?", params.id);

    return {
        props: person
    }
}