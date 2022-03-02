const { Pool } = require("pg")

const db = {
    user: "postgres",
    host: "localhost",
    database: "editordb",
    password: "123",
    port: 5432
}

const database = new Pool(db)

module.exports = database