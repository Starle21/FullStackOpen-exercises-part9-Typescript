interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const totalExerciseHours = dailyExerciseHours.reduce(
    (sum, value) => sum + value,
    0
  );
  const average = totalExerciseHours / periodLength;

  let rating;
  if (totalExerciseHours >= periodLength * target) {
    rating = 1;
  } else if (totalExerciseHours < (periodLength / 1.5) * target) {
    rating = 3;
  } else {
    rating = 2;
  }

  let ratingDescription;
  switch (rating) {
    case 1:
      ratingDescription = "awesome, you reached your goal!";
      break;
    case 2:
      ratingDescription = "not too bad but could be better";
      break;
    case 3:
      ratingDescription = "below par... gotta work harder next time!";
      break;
  }

  return {
    periodLength: periodLength,
    trainingDays: dailyExerciseHours.filter((day) => day > 0).length,
    target: target,
    average: average,
    success: dailyExerciseHours.some((day) => day < target) ? false : true,
    rating: rating,
    ratingDescription: ratingDescription,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
