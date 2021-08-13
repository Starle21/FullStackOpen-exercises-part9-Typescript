import React from "react";

interface Part {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: Part[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      <h2>
        <i> Version one:</i>
      </h2>
      {courseParts.map((part) => {
        return (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};

export default Content;
