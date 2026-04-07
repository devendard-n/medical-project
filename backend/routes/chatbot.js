const express = require("express")
const router = express.Router()

const { readData, writeData } = require("../utils/fileDB")

// Chatbot memory (single user for now)
let userState = {
  step: "ASK_SYMPTOM",
  specialist: null,
  doctor: null,
  availableDoctors: [],
  date: null,
  time: null,
  name: null,
  phone: null
}

// Symptom → specialist map
const symptomMap = {
  "chest pain": "Cardiologist",
  "skin": "Dermatologist",
  "stomach": "Gastroenterologist",
  "bone": "Orthopedic",
  "headache": "Neurologist",
  "fever": "General Physician",
  "cold": "General Physician",
  "cough": "General Physician"
}

router.post("/", (req, res) => {

  const text = (req.body.message || "").toLowerCase().trim()
  console.log("User:", text)

  if (!text) {
    return res.json({ reply: "Please type a message." })
  }

  const doctors = readData("./data/doctors.json")

  const yesWords = ["yes","y","yeah","yep"]
  const noWords = ["no","n","nope"]

  // STEP 1
  if (userState.step === "ASK_SYMPTOM") {

    let specialist = "General Physician"

    for (let key in symptomMap) {
      if (text.includes(key)) {
        specialist = symptomMap[key]
        break
      }
    }

    userState.specialist = specialist
    userState.step = "ASK_BOOKING_CONFIRMATION"

    return res.json({
      reply: `You may need a ${specialist}. Would you like to book an appointment? (yes/no)`
    })
  }

  // STEP 2
  if (userState.step === "ASK_BOOKING_CONFIRMATION") {

    if (yesWords.includes(text)) {

      const availableDoctors = doctors.filter(
        d => d.specialization.toLowerCase() === userState.specialist.toLowerCase()
      )

      if (availableDoctors.length === 0) {
        userState.step = "ASK_SYMPTOM"
        return res.json({ reply: "No doctors available. Try again." })
      }

      userState.availableDoctors = availableDoctors
      userState.step = "CHOOSE_DOCTOR"

      const list = availableDoctors
        .map((d, i) => `${i + 1}. ${d.name}`)
        .join("\n")

      return res.json({
        reply: `Available doctors:\n${list}\nChoose doctor number.`
      })
    }

    if (noWords.includes(text)) {
      userState.step = "ASK_SYMPTOM"
      return res.json({
        reply: "Okay. Tell me your symptoms again."
      })
    }

    return res.json({ reply: "Please answer yes or no." })
  }

  // STEP 3
  if (userState.step === "CHOOSE_DOCTOR") {

    const index = parseInt(text) - 1
    const doctor = userState.availableDoctors[index]

    if (!doctor) {
      return res.json({ reply: "Invalid choice. Try again." })
    }

    userState.doctor = doctor
    userState.step = "ASK_DATE"

    return res.json({
      reply: "Enter appointment date (DD-MM-YYYY)."
    })
  }

  // STEP 4
  if (userState.step === "ASK_DATE") {

    const parts = text.split("-")

    if (parts.length !== 3) {
      return res.json({ reply: "Use format DD-MM-YYYY." })
    }

    const date = new Date(parts[2], parts[1] - 1, parts[0])
    const today = new Date()
    today.setHours(0,0,0,0)

    if (date < today) {
      return res.json({ reply: "Choose a future date." })
    }

    userState.date = text
    userState.step = "CHOOSE_TIME"

    return res.json({
      reply: `Available times: ${userState.doctor.availableTimes.join(", ")}`
    })
  }

  // STEP 5
  if (userState.step === "CHOOSE_TIME") {

    const appointments = readData("./data/appointments.json")

    const exists = appointments.find(a =>
      a.doctor === userState.doctor.name &&
      a.date === userState.date &&
      a.time === text
    )

    if (exists) {
      return res.json({ reply: "Time already booked." })
    }

    userState.time = text
    userState.step = "ASK_NAME"

    return res.json({ reply: "Enter your name." })
  }

  // STEP 6
  if (userState.step === "ASK_NAME") {

    userState.name = text
    userState.step = "ASK_PHONE"

    return res.json({ reply: "Enter phone number." })
  }

  // STEP 7
  if (userState.step === "ASK_PHONE") {

    userState.phone = text

    const appointments = readData("./data/appointments.json")

    const newAppointment = {
      id: Date.now().toString(),
      patientName: userState.name,
      phone: userState.phone,
      doctor: userState.doctor.name,
      date: userState.date,
      time: userState.time,
      status: "confirmed"
    }

    appointments.push(newAppointment)
    writeData("./data/appointments.json", appointments)

    // Reset
    userState = {
      step: "ASK_SYMPTOM",
      specialist: null,
      doctor: null,
      availableDoctors: [],
      date: null,
      time: null,
      name: null,
      phone: null
    }

    return res.json({
      reply: `Appointment confirmed with ${newAppointment.doctor} on ${newAppointment.date} at ${newAppointment.time}`
    })
  }

})

module.exports = router