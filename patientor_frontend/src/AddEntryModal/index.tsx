import React, { useState } from "react";
import { Modal, Segment, Button } from "semantic-ui-react";
import AddEntryFormHealthCheck, {
  EntryFormValues,
} from "./AddEntryForm_HealthCheck";
import AddEntryFormOccupational from "./AddEntryForm_Occupational";
import AddEntryFormHospital from "./AddEntryForm_Hospital";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}
type StateProps = ButtonProps[];
interface ButtonProps {
  type: string;
  active: boolean;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [entryType, setEntryType] = useState<StateProps>([
    {
      type: "HealthCheckEntry",
      active: true,
    },
    { type: "HospitalEntry", active: false },
    {
      type: "OccupationalHealthcareEntry",
      active: false,
    },
  ]);

  const selectType = (type: string): void => {
    //reset all to false
    const reset = entryType.map((el) => {
      return { type: el.type, active: false };
    });

    //set the active property of the selected type to true
    const toggleActive = reset.map((el) =>
      el.type === type ? { type: type, active: !el.active } : el
    );
    setEntryType(toggleActive);
  };

  const showFormType = () => {
    if (entryType.some((el) => el.type === "HealthCheckEntry" && el.active)) {
      return <AddEntryFormHealthCheck onSubmit={onSubmit} onCancel={onClose} />;
    }
    if (
      entryType.some(
        (el) => el.type === "OccupationalHealthcareEntry" && el.active
      )
    )
      return (
        <AddEntryFormOccupational onSubmit={onSubmit} onCancel={onClose} />
      );
    if (entryType.some((el) => el.type === "HospitalEntry" && el.active))
      return <AddEntryFormHospital onSubmit={onSubmit} onCancel={onClose} />;
  };

  const active = (type: string): boolean => {
    const toReturn = entryType.filter((el) => {
      if (el.type === type) return el.active;
    })[0]?.active;
    return toReturn;
  };

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}

        <Button
          onClick={() => selectType("HealthCheckEntry")}
          toggle
          active={active("HealthCheckEntry")}
        >
          Health Check
        </Button>
        <Button
          onClick={() => selectType("HospitalEntry")}
          toggle
          active={active("HospitalEntry")}
        >
          Hospital
        </Button>
        <Button
          onClick={() => selectType("OccupationalHealthcareEntry")}
          toggle
          active={active("OccupationalHealthcareEntry")}
        >
          Occupational Healthcare
        </Button>
        {showFormType()}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
