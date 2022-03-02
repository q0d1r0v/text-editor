const express = require("express")
const cors = require("cors")
const router = express.Router()
const db = require("../../db/database")

const app = express()

app.use(cors(""))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get("/api/get-elements", (req, res) => {
    db.query("SELECT * FROM editor_elements", (err, result) => {
        if (err) {
            console.log(err)
            res.send(400, err)
        } else {
            res.send(result.rows)
        }
    })
})

router.put("/api/update", (req, res) => {
    let value = req.body.params.elements
    let id = req.body.params.id
    db.query(`UPDATE editor_elements SET elements = '${value}' WHERE ID = '${id}'`, (err, result) => {
        if (err) {
            console.log(err)
            res.send(400, err)
        } else {
            res.send({
                message: "Ma'lumot muvoffaqiyatli yangilandi!"
            })
        }
    })
})

router.post("/api/create", (req, res) => {
    let elements = req.body.elements
    let id = req.body.id
    db.query(`INSERT INTO editor_elements (elements) VALUES ('${elements}')`, (err, result) => {
        if (err) {
            res.send(400, err)
        } else {
            res.send({
                message: "Element muvoffaqiyatli yaratildi!"
            })
        }
    })
})

router.delete("/api/delete", (req, res) => {
    let id = req.query.id
    db.query(`DELETE FROM editor_elements WHERE id = '${id}'`, (err, result) => {
        if (err) {
            res.send(400, err)
        } else {
            res.send({
                message: "Element muvoffaqiyatli o'chirildi!"
            })
        }
    })
})

module.exports = router