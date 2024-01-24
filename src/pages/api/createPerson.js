// pages/api/createPerson.js
import { db } from '@/lib/db';
import { getAuth, clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const auth = getAuth(req);
            const { userId } = auth;

            const { name, age, birthday, interests } = req.body;

            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Check if the birthday is in the future
            if (new Date(birthday) > new Date()) {
                res.status(400).json({ message: "Birthday cannot be in the future" });
                return;
            }

            const { lastID } = await db.run(
                "INSERT INTO person (name, age, birthday, interests, user_id) VALUES (?, ?, ?, ?, ?)",
                name, age, birthday, interests, userId
            );

            const post = await db.get("SELECT * FROM person WHERE id = ?", lastID);

            res.json(post);
        } catch (error) {
            console.error("Error creating person:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(404).json({ message: "Not Found" });
    }
}