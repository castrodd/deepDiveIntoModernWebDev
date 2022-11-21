export interface ExerciseSummary {
  days: number;
  trainingDays: number;
  targetValue: number;
  averageTime: number;
  targetReached: boolean;
  rating: number;
  ratingSummary: RatingText;
}

type RatingText = "Great" | "Okay" | "Poor";

export const calculateExercises = (totalDays: number[], target: number): ExerciseSummary => {
  const average = totalDays.reduce((total, current) => total + current)/totalDays.length;
  const ratingScore = average >= target ? 1 : average > 0 ? 2 : 3;

  return {
    days: totalDays.length,
    trainingDays: totalDays.filter(day => day > 0).length,
    targetValue: target,
    averageTime: average,
    targetReached: average >= target,
    rating: ratingScore,
    ratingSummary: ratingScore == 1 ? "Great" : ratingScore == 2 ? "Okay" : "Poor"
  };
};

// if (process.argv.length < 4) {
//   throw new Error("Requires at least one day and target value!");
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const [_func, _file, ...daysAndTarget] = process.argv;
// const days = daysAndTarget.slice(0, daysAndTarget.length - 1).map(Number);
// const target = Number(daysAndTarget.at(-1));

// console.log(calculateExercises(days, target));