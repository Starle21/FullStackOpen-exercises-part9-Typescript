import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Parts = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <h2>
        <i> Version three:</i>
      </h2>
      {courseParts.map((part) => {
        return (
          <div key={part.name}>
            <div>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </div>
            <Part part={part} />
          </div>
        );
      })}
    </div>
  );
};

export default Parts;
