const express = require("express")
const router = express.Router()

const { readData, writeData } = require("../utils/fileDB")

router.post("/", (req, res) => {

  const appointments = readData("./data/appointments.json")

  const newAppointment = {
    id: Date.now().toString(),
    ...req.body,
    status: "pending"
  }

  appointments.push(newAppointment)

  writeData("./data/appointments.json", appointments)

  res.json(newAppointment)

})

router.get("/", (req, res) => {

  const appointments = readData("./data/appointments.json")

  res.json(appointments)

})

router.put("/confirm/:id", (req, res) => {

  let appointments = readData("./data/appointments.json")

  appointments = appointments.map(a => {

    if (a.id === req.params.id) {
      a.status = "confirmed"
    }

    return a
  })

  writeData("./data/appointments.json", appointments)

  res.json({ message: "Appointment confirmed" })

})

module.exports = router