import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("patientor pong");
});

app.use("/api/diagnoses", diagnoseRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
