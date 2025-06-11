import { Request } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Response } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

const prisma = new PrismaClient();

const addCourseController = asyncHandler(async (req: Request, res: Response) => {
  const { title, subtitle, description, imageUrl, ctaUrl } =
    req.body;

  await prisma.course.create({
    data: {
      title,
      subtitle,
      description,
      imageUrl,
      ctaUrl
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "new course added successfully"));
});

const getAllCourseController = asyncHandler(
  async (_: Request, res: Response) => {
    const allCourse = await prisma.course.findMany();

    return res
      .status(200)
      .json(new ApiResponse(200, allCourse, "all course found successfully"));
  }
);

const updateCourseController = asyncHandler(
  async (req: Request, res: Response) => {
    const {  courseId } = req.params;
    if (!courseId) {
      throw new ApiError(400, "CourseId required for updation");
    }
    const updatedFields = req.body;

    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!existingCourse) {
      return res
        .status(404)
        .json(new ApiResponse(404, "no course found with given id"));
    }

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: updatedFields,
    });

    res.status(200).json(
        new ApiResponse(200, updatedCourse, "course updated successfully")
    );
  }
);

const deleteCourseController = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;

    if (!courseId) {
      throw new ApiError(400, "CourseId required for deletion");
    }
    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!existingCourse) {
      throw new ApiError(404, "Course not found");
    }

    //if exist first need to delete the image from cloud

    await prisma.course.delete({
      where: { id: courseId },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, "course and associated image deleted successfully")
      );
  }
);

const getCourseByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const {  courseId } = req.params;
    if (!courseId) {
      throw new ApiError(400, "courseId required for fetching book details");
    }

    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!existingCourse) {
      return res.status(404).json(new ApiResponse(404, "course not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, existingCourse, "course found successfully"));
  }
);

export {
  addCourseController,
  getAllCourseController,
  updateCourseController,
  deleteCourseController,
  getCourseByIdController,
};
