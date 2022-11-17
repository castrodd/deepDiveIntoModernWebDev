interface ExerciseSummary {
  days: number;
  trainingDays: number;
  targetValue: number;
  averageTime: number;
  targetReached: boolean;
  rating: number;
  ratingSummary: string;
}

const calculateExercises = (totalDays: number[], target: number): ExerciseSummary => {

  const average = totalDays.reduce((total, current) => total + current)/totalDays.length;
  const ratingScore = average >= target ? 1 : average > 0 ? 2 : 3;

  return {
    days: totalDays.length,
    trainingDays: totalDays.filter(day => day > 0).length,
    targetValue: target,
    averageTime: average,
    targetReached: average >= target,
    rating: ratingScore,
    ratingSummary: ratingScore == 1 ? "Great" : ratingScore == 2 ? "Good" : "Poor"
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))