type BmiScore = "Normal (healthy weight)"
  | "Overweight (unhealthy weight)"
  | "Obese (very unhealthy weight)";

const calculateBmi = (height: number, weight: number): BmiScore => {
  let bmi = weight/(height/100)**2
  if (bmi < 25) return "Normal (healthy weight)"
  if (bmi < 30) return "Overweight (unhealthy weight)"
  return "Obese (very unhealthy weight)"
}

console.log(calculateBmi(180, 74))