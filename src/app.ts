import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { errorMiddleware } from './modules/middleware/error';
import userRouter from './modules/user/user.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Assignment API',
  });
});

// using error middleware
app.use(errorMiddleware);

export default app;
