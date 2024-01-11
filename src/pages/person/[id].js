import { db } from '@/lib/db';

import { useRouter } from 'next/router';

export default function Person({
    id,
    name,
    age,
    birthday,
    interests
}) {
    const { query } = useRouter();
    return (
        <div>
            <h1>Name: {name}</h1>
            <h2>Person id: {id}</h2>
            <p>Age: {age}</p>
            <p>Birthday: {birthday}</p>
            <p>Interests: {interests}</p>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    const person = await db.get("SELECT * FROM person WHERE name = ?", params.id);

    return {
        props: person
    }
}