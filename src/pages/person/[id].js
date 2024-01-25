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
        <div className="inline-block w-full">
            <div>
                <div className="border-solid border-2 border-blue-900 rounded-xl p-4 mb-4 inline-block gap-4">
                    <div className="flex" >
                        <h1> Name: {name} </h1>
                    </div>
                </div>
                <div className="border-solid border-2 border-blue-900 rounded-xl p-4 mb-4 inline-block gap-4">
                    <div className="flex" >
                        <p>Age: {age}</p>
                    </div>
                </div>
                <div className="border-solid border-2 border-blue-900 rounded-xl p-4 mb-4 inline-block gap-4">
                    <div className="flex" >
                        <p>Birthday: {birthday}</p>
                    </div>
                </div>
                <div className="border-solid border-2 border-blue-900 rounded-xl p-4 mb-4 inline-block gap-4">
                    <div className="flex" >
                    <p>Interests: {interests}</p>
                    </div>
                </div>
                
            </div>

            <div className="flex justify-around mt-6">

                <div className="flex mr-[30px] ml-[30px] justify-center items-center">
                    <div className="flex-1 bg-black-100 rounded-md">
                        <h3 className="text-xl font-bold p-4">Create present</h3>
                        <CreatePresent person_id={id} />
                        <button
                            type="submit"
                            className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 text-center mt-4"
                            onClick={() => router.push("/dashboard")}
                        >
                            Go back to dashboard
                        </button>
                    </div>
                </div>

                <div className="flex-auto">
                    <div className="flex-1 items-center mr-[30px]">
                        <h3 className="text-xl font-bold p-4">List of presents</h3>
                        <div className="flex flex-col gap-4">
                            {isLoading ? (
                                "Loading presents..."
                            ) : !presents || presents.length === 0 ? (
                                <p>No presents added yet.</p>
                            ) : (
                                presents.map((present) => (
                                    <div key={present.id} className="border-4 border-blue-500 rounded p-4">
                                        <div className="bg-sky-200 border-blue-500 rounded">
                                            <h4 className="text-black">{present.name}</h4>
                                        </div>
                                        <div className="border-blue-500 rounded">
                                            <p className="text-black">Price: {present.price}</p>
                                        </div>
                                        <div className="border-blue-500 rounded">
                                            <p className="text-black">From where: {present.from_where}</p>
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

export async function getServerSideProps({ params }) {
    const person = await db.get("SELECT * FROM person WHERE name = ?", params.id);

    return {
        props: person
    }
}