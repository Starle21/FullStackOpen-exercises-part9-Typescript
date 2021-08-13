import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <>
          <i>{part.description}</i>
          <p></p>
        </>
      );
    case "groupProject":
      return (
        <>
          number of group projects: {part.groupProjectCount}
          <p></p>
        </>
      );
    case "submission":
      return (
        <>
          <i>{part.description}</i>
          <br />
          submit to {part.exerciseSubmissionLink}
          <p></p>
        </>
      );
    case "special":
      return (
        <>
          <i>{part.description}</i>
          <br />
          required skills: {part.requirements.join(", ")}
          <p></p>
        </>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
