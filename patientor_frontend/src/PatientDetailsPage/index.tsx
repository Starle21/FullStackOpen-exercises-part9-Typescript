import React from "react";
import axios from "axios";
import { useStateValue, setPatientDetails, addEntry } from "../state";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import AddEntryModal from "../AddEntryModal";

import { Header, Icon, Button } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm_HealthCheck";

const PatientDetailsPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const patientDetailsInState = (id: string): string | undefined => {
    return patients[id]?.ssn;
  };

  const openModal = (): void => {
    setModalOpen(true);
  };
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // add back async
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      // console.log(values);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data || "Unknown error");
    }
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

  // console.log("details patient", patients[id]);
  // console.log("details patient", patients[id].entries);
  // console.log("details patient", patients[id].entries.length);
  // patients[id].entries.map((entry) => {
  //   console.log("works?");
  //   console.log(entry);
  // });

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
              <EntryDetails entry={entry} />
            </div>
          );
        })
      )}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
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
