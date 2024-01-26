// API route: pages/api/getPresents.js
import { db } from "@/lib/db";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
    if (req.method === "DELETE") {
        try {
            const auth = getAuth(req);
            const { userId } = auth;

            const { presentID } = req.query;

            console.log("presentID:", presentID);

            // Delete the present with the specified ID from the SQL table
            await db.run(
                "DELETE FROM present WHERE id = ? AND user_id = ?",
                presentID, userId
            );

            console.log("deleted")

            res.status(204).end(); // Return a success response with no content
        } catch (error) {
            console.error("Error deleting present:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(404).json({ message: "Not found presents" });
    }
}