import express, { Request, Response } from "express";
import { getByStudentId, getByStudentIds } from "../services/exam.service";
import { getBySlug, getSchoolToppers } from "../services/school.service";
import { getById, getBySchool } from "../services/student.service";
import { getBySchoolSlug } from "../services/teacher.service";
import { TopperObj } from "../types";
import getExamObj, { getExamByDate } from "../util";
const schoolRouter = express.Router();

schoolRouter.get("/:slug", (req: Request, res: Response) => {
  const { title, description, location } = getBySlug(req.params.slug);
  const teachers = getBySchoolSlug(req.params.slug);
  const students = getBySchool(req.params.slug).map(({ id }) => id);

  const exams = getByStudentIds(students);

  res.status(200).send({
    title,
    description,
    location,
    total_teachers: teachers.length,
    total_students: students.length,
    total_exams: exams.length,
  });
});

schoolRouter.get("/:slug/teachers", (req: Request, res: Response) => {
  const teachers = getBySchoolSlug(req.params.slug);
  const result: any = [];
  teachers.forEach(({ name, students }) => {
    let exams = getByStudentIds(students).map(getExamObj);
    result.push({
      name,
      exams,
    });
  });

  res.status(200).send(result);
});

schoolRouter.get("/:slug/students", (req: Request, res: Response) => {
  const students = getBySchool(req.params.slug);
  const result: any = [];
  students.forEach(({ name, id }) => {
    let exams = getByStudentId(id).map(getExamObj);
    result.push({
      name,
      exams,
    });
  });

  res.status(200).send(result);
});

schoolRouter.get("/:slug/exam-toppers/:year", (req: Request, res: Response) => {
  const year = parseInt(req.params.year, 10);
  const response = getSchoolToppers(req.params.slug, year);

  res.status(200).send(response);
});

schoolRouter.get(
  "/:slug/exam-toppers/:year/:months",
  (req: Request, res: Response) => {
    const year = parseInt(req.params.year, 10);
    const month = parseInt(req.params.months, 10);
    const response = getSchoolToppers(req.params.slug, year, month);

    res.status(200).send(response);
  }
);

export default schoolRouter;
