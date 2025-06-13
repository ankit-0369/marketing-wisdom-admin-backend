import { Request } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Response } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { slugify } from "../utils/slugify";

const prisma = new PrismaClient();

const addBookController = asyncHandler(async (req: Request, res: Response) => {
  const { title, subtitle, description, imageUrl, amazonIndUrl, amazonUsdUrl } =
    req.body;

    const slug= slugify(title);

  await prisma.book.create({
    data: {
      title,
      subtitle,
      description,
      imageUrl,
      amazonIndUrl,
      amazonUsdUrl,
      slug
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "new book added successfully"));
});

const getAllBooksController = asyncHandler(
  async (_: Request, res: Response) => {
    const allBooks = await prisma.book.findMany();

    return res
      .status(200)
      .json(new ApiResponse(200, allBooks, "all books found successfully"));
  }
);

const updateBookController = asyncHandler(
  async (req: Request, res: Response) => {
    const { bookId } = req.params;
    if (!bookId) {
      throw new ApiError(400, "bookId required for updation");
    }
    const updatedFields = req.body;

    const existingBook = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!existingBook) {
      return res
        .status(404)
        .json(new ApiResponse(404, "no book found with given id"));
    }

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: updatedFields,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  }
);

const deleteBookController = asyncHandler(
  async (req: Request, res: Response) => {
    const { bookId } = req.params;

    if (!bookId) {
      throw new ApiError(400, "bookId required for deletion");
    }
    const existingBook = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!existingBook) {
      throw new ApiError(404, "Book not found");
    }

    //if exist first need to delete the image from cloud

    await prisma.book.delete({
      where: { id: bookId },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, "book and associated image deleted successfully")
      );
  }
);

const getBookByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { bookId } = req.params;
    if (!bookId) {
      throw new ApiError(400, "bookId required for fetching book details");
    }

    const existingBook = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!existingBook) {
      return res.status(404).json(new ApiResponse(404, "book not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, existingBook, "book found successfully"));
  }
);

const getBookBySlugController = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) {
        throw new ApiError(400, "slug required for fetching book details");
    }

    const existingBook = await prisma.book.findUnique({
      where: {slug },
    });

    if (!existingBook) {
      return res.status(404).json(new ApiResponse(404, "book not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, existingBook, "book found successfully"));
  }
);

export {
  addBookController,
  getAllBooksController,
  updateBookController,
  deleteBookController,
  getBookByIdController,
  getBookBySlugController
};
