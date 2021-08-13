import express from "express";

import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});
// router.get("/", (_req, res) => {
//   res.send(patientService.getPatientEntries());
// });

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    // validate input data
    const newPatient = toNewPatientEntry(req.body);

    // save the validated data
    const addedPatient = patientService.addPatient(newPatient);

    // send response
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
