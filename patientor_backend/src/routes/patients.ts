import express from "express";

import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});
// router.get("/", (_req, res) => {
//   res.send(patientService.getPatientEntries());
// });

export default router;