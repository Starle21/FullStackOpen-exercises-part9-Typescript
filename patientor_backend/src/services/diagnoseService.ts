import diagnoseData from "../../data/diagnoses.json";
import { Diagnose } from "../types";

const diagnoses: Array<Diagnose> = diagnoseData;

const getDiagnoseEntries = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getDiagnoseEntries,
};
