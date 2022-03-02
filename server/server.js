const express = require("express")
const cors = require("cors")
require('dotenv').config()
const editor = require("./routes/first_page/routes")

const app = express()

app.use(cors(""))
app.use(express.json())
app.use("", editor)


const port = process.env.PORT

app.listen(port, () => {
    console.log("server is running on port " + port)
})