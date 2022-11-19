import express from 'express'
import { calculateBmi } from './bmiCalculator'
const app = express()

app.get('/hello', (_, res) => {
  res.send('Hello, Full Stack!')
})

app.get('/bmi', (req, res) => {
  let {height, weight} = req.query
  const errorResponse = {
    error: "malformatted parameters"
  }

  if (height == null || weight == null) {
    res.send(errorResponse)
    return
  }

  let heightValue = Number(height)
  let weightValue = Number(weight)

  if (isNaN(heightValue) || isNaN(weightValue)) {
    res.send(errorResponse)
    return
  }

  let bmiResult = calculateBmi(Number(height), Number(weight))
  let response = {
    height: Number(height),
    weight: Number(weight),
    bmi: bmiResult
  }
  res.send(response)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})