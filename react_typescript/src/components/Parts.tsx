import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Parts = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <p>
        <i> Version three:</i>
      </p>
      {courseParts.map((part) => {
        return (
          <p key={part.name}>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <Part part={part} />
          </p>
        );
      })}
    </div>
  );
};

export default Parts;
