import React from "react";
import axios from "axios";
import { useStateValue, setPatientDetails } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

import { Header, Icon } from "semantic-ui-react";

const PatientDetailsPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [{ diagnoses }] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patientDetailsInState = (id: string): string | undefined => {
    return patients[id]?.ssn;
  };

  React.useEffect(() => {
    if (!patientDetailsInState(id)) {
      const fetchPatientDetails = async () => {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          // dispatch({ type: "SET_PATIENT_DETAILS", payload: patient });
          dispatch(setPatientDetails(patient));
        } catch (e) {
          console.error(e.response?.data || "Unknown Error");
        }
      };
      void fetchPatientDetails();
    }
  }, [dispatch]);

  if (!patientDetailsInState(id)) return <div>Patient not found...</div>;

  return (
    <div>
      <Header as="h2">
        {patients[id].name} <Icon name={setIconGender(patients[id].gender)} />
      </Header>
      <div>ssn: {patients[id].ssn}</div>
      <div>occupation: {patients[id].occupation}</div>
      <Header as="h3">entries</Header>

      {patients[id].entries.length === 0 ? (
        <div>no entries...</div>
      ) : (
        patients[id].entries.map((entry) => {
          return (
            <div key={entry.id}>
              {entry.date}
              <i> {entry.description}</i>
              <ul>
                {entry.diagnosisCodes?.map((code) => {
                  return (
                    <li key={code}>
                      {code} {diagnoses[code]?.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
};

const setIconGender = (gender: string) => {
  switch (gender) {
    case "male":
      return "mars";
    case "female":
      return "venus";
    case "default":
      return "genderless";
  }
};

export default PatientDetailsPage;
