type BmiScore = "Normal (healthy weight)"
  | "Overweight (unhealthy weight)"
  | "Obese (very unhealthy weight)";

const calculateBmi = (height: number, weight: number): BmiScore => {
  let bmi = weight/(height/100)**2
  if (bmi < 25) return "Normal (healthy weight)"
  if (bmi < 30) return "Overweight (unhealthy weight)"
  return "Obese (very unhealthy weight)"
}

const height = Number(process.argv[2])
const weight = Number(process.argv[3])
console.log("Height: ", height, " Weight: ", weight)
console.log(calculateBmi(height, weight))