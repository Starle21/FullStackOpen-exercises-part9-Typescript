import React from "react";
import { SectionPart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Section = ({ courseParts }: { courseParts: SectionPart[] }) => {
  return (
    <div>
      <h2>
        <i> Version two:</i>
      </h2>
      {courseParts.map((part) => {
        switch (part.name) {
          case "Fundamentals":
            return (
              <p key={part.name}>
                {part.name} {part.exerciseCount}
                <br />
                <i> {part.description}</i>
              </p>
            );
          case "Using props to pass data":
            return (
              <p key={part.name}>
                {part.name} {part.exerciseCount} <br />
                {part.groupProjectCount}
              </p>
            );
          case "Deeper type usage":
            return (
              <p key={part.name}>
                {part.name} {part.exerciseCount}
                <br />
                <i>{part.description}</i>
                <br />
                {part.exerciseSubmissionLink}
              </p>
            );
          default:
            return assertNever(part);
        }
      })}
    </div>
  );
};

export default Section;
