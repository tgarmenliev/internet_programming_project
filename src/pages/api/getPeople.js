import { db } from "@/lib/db";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const auth = getAuth(req);
      const { userId } = auth;

      const people = await db.all(
        "SELECT name, age, birthday, interests FROM person WHERE user_id = ?",
        userId
      );

      if (!people) {
        res.json([]);
        return;
      }

      res.json(people);
    } catch (error) {
      console.error("Error fetching people:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}