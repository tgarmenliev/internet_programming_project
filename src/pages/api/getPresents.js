// API route: pages/api/getPresents.js
import { db } from "@/lib/db";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const auth = getAuth(req);
      const { userId } = auth;

      const { personID } = req.query;

      console.log("personID:", personID);

      const presents = await db.all(
        "SELECT id, name, price, from_where FROM present WHERE person_id = ? AND user_id = ?",
        personID, userId
      );

      if (!presents) {
        res.json([]);
        return;
      }

      res.json(presents);
    } catch (error) {
      console.error("Error fetching presents:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(404).json({ message: "Not found presents" });
  }
}