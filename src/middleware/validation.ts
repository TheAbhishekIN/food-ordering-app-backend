import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address line 1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("state").isString().notEmpty().withMessage("State must be a string"),
  body("zip").isNumeric().notEmpty().withMessage("Zip must be a numeric"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];
