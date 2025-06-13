export interface Lesson {
  id: number;
  title: string;
  description?: string;
  image?: string;
  model?: string;
  questions: Question[];
}

export interface Question {
  question: string;
  choices: string[];
  answer: string;
}

export interface Unit {
  unit: string;
  lessons: Lesson[];
}

export interface Subject {
  units: Unit[];
}

export interface Term {
  [subject: string]: Subject;
}

export interface Grade {
  [term: string]: Term;
}

export interface Data {
  [grade: string]: Grade;
}
