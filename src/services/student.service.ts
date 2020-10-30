import { Student } from "../types";
import data from "../models/student.json";

const studentData: Student[] = data;

export const getById = (studentId: number): Student =>
  studentData.filter(({ id }) => id === studentId)[0];

export const getBySchool = (slug: string): Student[] =>
  studentData.filter(({ school }) => slug === school);

export const getByTeacherId = (teacherId: number): Student[] =>
  studentData.filter(({ teacher }) => teacherId === teacher);
