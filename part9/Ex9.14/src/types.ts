interface PartBase {
    name: string;
    exerciseCount: number;
    kind: string;
  }
  
  interface PartWithDescription extends PartBase {
    description: string;
  }
  
  interface BasicPart extends PartWithDescription {
    kind: "basic";
  }
  
  interface GroupProjectPart extends PartBase {
    kind: "group";
    groupProjectCount: number;
  }

  interface BackgroundPart extends PartWithDescription {
    kind: "background"
    backgroundMaterial: string,
  }
  
  interface SubmissionPart extends PartWithDescription {
    kind: "submission";
    exerciseSubmissionLink: string;
  }
  
  interface RequirementsPart extends PartWithDescription {
    kind: "special";
    requirements: Array<string>;
  }
  
  export type CoursePart = BasicPart | GroupProjectPart | BackgroundPart | SubmissionPart | RequirementsPart;