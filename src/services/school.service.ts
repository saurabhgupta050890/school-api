import { School, TopperObj } from "../types";
import data from "../models/school.json";
import { getById, getBySchool } from "./student.service";
import { getByStudentIds } from "./exam.service";
import { getExamByDate } from "../util";

type SchoolData = {
  [slug: string]: School;
};

const schoolData: SchoolData = data;

export const getBySlug = (slug: string) => schoolData[slug];

export const getSchoolToppers = (
  slug: string,
  year: number,
  month?: number
) => {
  const students = getBySchool(slug).map(({ id }) => id);
  const schoolExams = getByStudentIds(students);
  const filteredExams = getExamByDate(schoolExams, year, month);

  const result: TopperObj = {};

  filteredExams.forEach((exam) => {
    if (result[exam.name]) {
      result[exam.name].push(exam);
    } else {
      result[exam.name] = [exam];
    }
  });

  let response: any = [];

  Object.keys(result).forEach((key) => {
    let exams = result[key].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    exams = [...new Map(exams.map((x) => [x.student, x])).values()];

    let toppers: any = exams
      .map((x) => {
        let { name } = getById(x.student);
        return {
          name,
          marks: x.marks.obtained,
          appeared_on: x.date,
        };
      })
      .sort((x, y) => y.marks - x.marks);

    response.push({
      exam: key,
      toppers,
    });
  });

  return response;
};
