import express from "express";
import { calculateBmi } from "./bmiCalculator";

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
