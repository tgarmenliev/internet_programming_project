const { AsyncDatabase } = require("promised-sqlite3");

const dbPromise = (async () => {
  try {
    const db = await AsyncDatabase.open("./db.sqlite");

    db.inner.on("trace", (sql) => console.log("[TRACE]", sql));

    await db.run(
      `
        CREATE TABLE IF NOT EXISTS person (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL,
            age INTEGER,
            birthday TEXT NOT NULL,
            interests TEXT,
            user_id TEXT NOT NULL
          ); 
      `
    );

    await db.run(
      `
        CREATE TABLE IF NOT EXISTS present (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL,
            price REAL,
            from_where TEXT,
            user_id TEXT NOT NULL,
            person_id INTEGER NOT NULL,
            FOREIGN KEY (person_id) REFERENCES person (id)
          ); 
      `
    );

    return db;
  } catch (err) {
    console.error(err);
  }
})();

const db = {
    async all(...args) {
        return (await dbPromise).all(...args)
    },
    async get(...args) {
        return (await dbPromise).get(...args)
    },
    async run(...args) {
        return (await dbPromise).run(...args)
    },
}

export { db };