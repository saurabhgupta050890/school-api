import { Exam, Result } from "../types";
import data from "../models/exams.json";

const examData: Exam[] = data.map((x) => ({
  ...x,
  result: x.result as Result,
}));

export const getByName = (examName: string): Exam[] =>
  examData.filter(({ name }) => name === examName);

export const getByStudentId = (id: number): Exam[] =>
  examData.filter(({ student }) => id === student);

export const getStudentLastExam = (studentId: number): Exam =>
  getByStudentId(studentId).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

export const getByStudentIds = (ids: number[]): Exam[] =>
  examData.filter(({ student }) => ids.includes(student));


