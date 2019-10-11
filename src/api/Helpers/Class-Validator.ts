import { ErrorResponse, ResponseError, ErrorTitles } from "../Response/error";

import { validate } from 'class-validator';
export class ClassValidatorHelper {
  //@ts-ignore
  public static getAllErrors(errorResponse: ErrorResponse, errors): ErrorResponse  {
    errors.forEach(error=>{
      if (error.constraints) {
        Object.values(error.constraints).forEach(element => {
          //@ts-ignore
          errorResponse.addEntry(new ResponseError(ErrorTitles.INVALID_ATTRIBUTE, element))
        });
      }
      if (error.children.length > 0) {
        return ClassValidatorHelper.getAllErrors(errorResponse, error.children)
      }
    })
    return errorResponse
  }
}