// // error-handling-utils.ts
// import { Request, Response, NextFunction } from 'express';

// export function handleErrors(
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   console.error(err.stack);

//   // Check if the error is a known type, e.g., ZodError
//   if (err.name === 'ZodError') {
//     return res.status(400).json({
//       success: false,
//       errors: err.errors,
//     });
//   }

//   // Handle other types of errors
//   return res.status(500).json({
//     success: false,
//     error: 'Internal Server Error',
//   });
// }
