import { db } from '@/lib/db';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { name, age, birthday, interests } = req.body;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if the birthday is in the future
        if(new Date(birthday) > new Date()) {
            res.status(400).json({ message: "Birthday cannot be in the future" });
            return;
        }

        const { lastID } = await db.run(
            "INSERT INTO person (name, age, birthday, interests) VALUES (?, ?, ?, ?)", 
            name, age, birthday, interests
        );

        const post = await db.get("SELECT * FROM person WHERE id = ?", lastID);

        res.json(post);
    } else {
        res.status(405).json({ message: "We only support POST" });
    }
}

// 43:32