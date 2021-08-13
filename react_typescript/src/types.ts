export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseBaseDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseBaseDescription {
  type: "normal";
}

interface CourseSubmissionPart extends CourseBaseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSpecialPart extends CourseBaseDescription {
  type: "special";
  requirements: string[];
}

// Section component
export type SectionPart =
  | CourseSectionOne
  | CourseSectionTwo
  | CourseSectionThree;

interface CourseSectionBase {
  name: string;
  exerciseCount: number;
}

interface CourseSectionOne extends CourseSectionBase {
  name: "Fundamentals";
  description: string;
}

interface CourseSectionTwo extends CourseSectionBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CourseSectionThree extends CourseSectionBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}
