import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { IndexRoutes } from './app/routes';

const app: Application = express();

app.use(
  cors({
    origin: [
      // envVars.FRONTEND_URL,
      // envVars.BETTER_AUTH_URL,
      'http://localhost:3000',
      'http://localhost:5000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// CRUD Routes
app.use('/api/v1', IndexRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
});

export default app;
