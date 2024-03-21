import { Service } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

function previous(start: number, rows: number):object | null {
  console.log(start, rows);
  let previous_field: object | null = null;
  if (start !== 0) {
    previous_field = {
      start: start - rows,
      rows: null,
    };
  }
  else {
    previous_field = null;
  }
  return previous_field;
}
function next(
  start: any,
  rows: any,
  fields: any
):object | null {
  let next_field: object | null;
  if (fields < rows) {
    next_field = null;
  } else {
    next_field = {
      start: start + rows,
      rows: rows,
    };
  }
  return next_field;
}
function generateResponse(): {
  
}
export { previous, next ,generateResponse};
