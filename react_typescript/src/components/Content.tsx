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
      <p>
        <i> Version one:</i>
      </p>
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
