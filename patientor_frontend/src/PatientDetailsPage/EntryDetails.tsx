import React from "react";
import { useStateValue } from "../state";

import {
  Entry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckEntry,
} from "../types";

import { Header, Icon, Segment } from "semantic-ui-react";

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Segment key={entry.id}>
      <Header as="h4">
        {entry.date}

        <Icon size="big" name={setIconType(entry.type)} />
      </Header>

      <div>
        <i> {entry.description}</i>
      </div>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          return (
            <li key={code}>
              {code} {diagnoses[code]?.name}
            </li>
          );
        })}
      </ul>
      {healthCheckSign(entry.healthCheckRating)}
    </Segment>
  );
};

const healthCheckSign = (check: number) => {
  switch (check) {
    case 0:
      return <Icon name="heart" color="green" />;
    case 1:
      return <Icon name="heart" color="orange" />;
    case 2:
      return <Icon name="heart" color="red" />;
  }
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Segment key={entry.id}>
      <Header as="h4">{entry.date}</Header>
      <Icon size="big" name={setIconType(entry.type)} />
      <div>
        <i> {entry.description}</i>
      </div>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          return (
            <li key={code}>
              {code} {diagnoses[code]?.name}
            </li>
          );
        })}
      </ul>
      <div>discharge date: {entry.discharge.date}</div>
      <div>discharge criteria: {entry.discharge.criteria}</div>
    </Segment>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Segment key={entry.id}>
      <Header as="h4">
        {entry.date} <Icon size="huge" name={setIconType(entry.type)} />
        {entry.employerName}
      </Header>
      <div>
        <i> {entry.description}</i>
      </div>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          return (
            <li key={code}>
              {code} {diagnoses[code]?.name}
            </li>
          );
        })}
      </ul>
      <div>
        {entry.sickLeave ? "start day of sick leave: " : ""}
        {entry.sickLeave?.startDate}
      </div>
      <div>
        {entry.sickLeave ? "end day of sick leave: " : ""}
        {entry.sickLeave?.endDate}
      </div>
    </Segment>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const setIconType = (type: string) => {
  switch (type) {
    case "OccupationalHealthcare":
      return "stethoscope";
    case "HealthCheck":
      return "user doctor";
    case "Hospital":
      return "hospital";
  }
};

export default EntryDetails;
