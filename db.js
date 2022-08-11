const Pool = require("pg").Pool
const pgtools = require("pgtools");
require("dotenv").config()

const database = "sample_db"
const userModel = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "role" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

const config = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
};

const pool = new Pool ({
    ...config,
    database: database,
})

const initialize_db = async (query) => {
    try {
      await pool.connect();     // gets connection
      await pool.query(query);  // sends queries
      console.log("Database query successful!")
      return true;
    } catch (error) {
      if (error.message === `database "${database}" does not exist`) {
        pgtools.createdb(config, database, function (err, res) {
          if (err) {
            console.error(err.message)
          }
          console.log(res, "Successfully create users table")
          initialize_db(userModel)
        });
      } 
    }
  }

module.exports = { initialize_db, userModel, pool }