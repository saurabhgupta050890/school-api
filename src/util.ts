import { Exam, ExamObj } from "./types";

const getExamObj = ({ name, result, marks, date }: Exam): ExamObj => ({
  name,
  result,
  marks: marks.obtained,
  appeared_on: date,
});

export const getExamByDate = (examData: Exam[], year: number, month?: number) =>
  examData.filter(({ date }) => {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;

    return month && month > 0 ? y === year && m === month : y === year;
  });

export default getExamObj;
