const express = require("express")
const router = express.Router()

const { readData } = require("../utils/fileDB")

router.get("/", (req, res) => {

  const doctors = readData("./data/doctors.json")

  const specialization = req.query.specialization

  if (specialization) {

    const filtered = doctors.filter(
      d => d.specialization === specialization
    )

    return res.json(filtered)
  }

  res.json(doctors)

})

module.exports = router