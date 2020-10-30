import { Teacher } from "../types";
import data from "../models/teacher.json";

const teacherData: Teacher[] = data;

export const getById = (teacherId: number): Teacher =>
  teacherData.filter(({ id }) => id === teacherId)[0];

export const getBySchoolSlug = (slug: string): Teacher[] =>
  teacherData.filter(({ school }) => slug === school);
