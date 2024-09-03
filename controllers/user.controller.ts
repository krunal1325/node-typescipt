import { NextFunction, Request, Response } from "express";
import {
  userCreateService,
  userDeleteService,
  userDetailsService,
  userDetailsUpdateService,
  userListService,
} from "../services/user.service";
import AppError from "../helper/error.helper";
import { ErrorType } from "../helper/enum";

export async function userLists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    const result = await userListService();
    return res.status(200).json({
      code: 200,
      status: true,
      message: "List fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function userDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user_id = req.params.user_id;
    if (!user_id) {
      throw new AppError("user id is required", ErrorType.invalid_request);
    }
    const result = await userDetailsService({ user_id });
    return res.status(200).json({
      code: 200,
      status: true,
      message: "User details fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function userDetailsUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    if (!data.user_id) {
      throw new AppError("user id is required", ErrorType.invalid_request);
    }
    const result = await userDetailsUpdateService({ ...data });
    return res.status(200).json({
      code: 200,
      status: true,
      message: "User details updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function userDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    if (!data.user_id) {
      throw new AppError("user id is required", ErrorType.invalid_request);
    }
    const result = await userDeleteService(data);
    return res.status(200).json({
      code: 200,
      status: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function userCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    const result = await userCreateService({ ...data });
    return res.status(200).json({
      code: 200,
      status: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}