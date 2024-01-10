import { db } from '@/lib/db';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { name, age, birthday, interests } = req.body;

        await db.run("INSERT INTO person (name, age, birthday, interests) VALUES (?, ?, ?, ?)", name, age, birthday, interests);

        res.json({ message: "Person created" });
    } else {
        res.status(405).json({ message: "We only support POST" });
    }
}

// 30:07