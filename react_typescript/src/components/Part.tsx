import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  console.log(part);
  return <div>sth</div>;
  // switch (part.type) {
  //   case "normal":
  //     return <>{part.description}</>;
  // }

  // switch (part.name) {
  //   case "Fundamentals":
  //     console.log(part);
  //     return (
  //       <p key={part.name}>
  //         {part.name} {part.exerciseCount}
  //         <br />
  //         <i> </i>
  //       </p>
  //     );
  //   case "Using props to pass data":
  //     console.log(part);
  //     return (
  //       <p key={part.name}>
  //         {part.name} {part.exerciseCount} <br />
  //         {part.groupProjectCount}
  //       </p>
  //     );
  //   case "Deeper type usage":
  //     console.log(part);
  //     return (
  //       <p key={part.name}>
  //         {part.name} {part.exerciseCount}
  //         <br />
  //         <i>{part.description}</i>
  //         <br />
  //         {part.exerciseSubmissionLink}
  //       </p>
  //     );
  //   default:
  //     return assertNever(part);
  // }
};

export default Part;
