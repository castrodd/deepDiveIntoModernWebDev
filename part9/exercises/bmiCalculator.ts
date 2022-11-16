const calculateBmi = (height: number, weight: number): string => {
  let bmi = (weight/100)/height
  if (bmi < 25) return "Normal (healthy weight)"
  if (bmi < 30) return "Overweight (unhealthy weight)"
  return "Obese (very unhealthy weight)"
}

console.log(calculateBmi(180, 74))