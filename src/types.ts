export interface School {
  title: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  location?: string;
}

export interface Student {
  id: number;
  name: string;
  school: string;
  teacher: number;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: number;
  name: string;
  qualification?: string;
  school: string;
  createdAt: string;
  updatedAt: string;
  students: number[];
}

export interface Exam {
  date: string;
  name: string;
  student: number;
  marks: Mark;
  result: Result;
}

export type Mark = {
  max: number;
  obtained: number;
};

export enum Result {
  PASS = "PASS",
  FAIL = "FAIL",
  LATE = "LATE",
}

export type ExamObj = {
  name: string;
  result: string;
  marks: number;
  appeared_on: string;
};

export type TopperObj = {
  [name: string]: Exam[]
}