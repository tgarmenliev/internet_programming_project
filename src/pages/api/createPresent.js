// pages/api/createPresent.js
import { db } from '@/lib/db';
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        try {
            const auth = getAuth(req);
            const { userId } = auth;

            const { name, price, from_where, person_id } = req.body;

            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Check if the price is negative
            if(price < 0) {
                res.status(400).json({ message: "Price cannot be negative" });
                return;
            }

            const { lastID } = await db.run(
                "INSERT INTO present (name, price, from_where, user_id, person_id) VALUES (?, ?, ?, ?, ?)", 
                name, price, from_where, userId, person_id
            );

            const present = await db.get("SELECT * FROM present WHERE id = ?", lastID);

            res.json(present);
        } catch (error) {
            console.error("Error creating present:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(404).json({ message: "Not Found" });
    }
}