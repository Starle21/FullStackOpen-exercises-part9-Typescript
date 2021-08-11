import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack, here we go!");
});

app.get("/bmi", (_req, res) => {
  const { height, weight } = _req.query;

  // validate query parameters
  // to be numbers
  // wrong type or missing
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // call the function
  const result: string = calculateBmi(Number(height), Number(weight));

  // send the response in json
  return res.json({
    weight,
    height,
    bmi: result,
  });
});

interface ExercisesRequestBody {
  daily_exercises: Array<number>;
  target: number;
}

app.post("/exercises", (_req, res) => {
  // validate input
  try {
    const body = _req.body as ExercisesRequestBody;
    const { daily_exercises, target } = body;
    if (!daily_exercises || !target) {
      throw new Error("one or more parameters missing");
    }

    if (daily_exercises.some((day) => isNaN(day)) || isNaN(Number(target))) {
      throw new Error("malformatted parameters");
    }

    // call calculator
    const result = calculateExercises(daily_exercises, Number(target));
    return res.json(result);
  } catch (e) {
    return res.status(400).send({ error: (e as Error).message });
  }
  // send response in json
});

// try {
//   const { height, weight } = req.query;
//   const bmi = calculateBMI(height, weight);
//   res.status(200).send(bmi);
// } catch (error) {
//   res.status(400).send({ error: error.message });
// }
// });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
