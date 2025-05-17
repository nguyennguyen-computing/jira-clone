import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

// Create an Express instance
const expressApp = express();

// Cache the initialized app
let cachedApp: any;

async function bootstrap() {
  if (cachedApp) {
    return cachedApp;
  }

  // Create NestJS app with Express adapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  // Enable CORS with dynamic origin
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:4200',
        process.env.FRONTEND_URL, // Production frontend URL
      ].filter(Boolean); // Remove undefined/null values

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'], // If your API returns Authorization headers
  });

  // Use global validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // Initialize the app
  await app.init();

  cachedApp = expressApp;
  return cachedApp;
}

// Export the serverless handler for Vercel
export default async (req: any, res: any) => {
  try {
    const app = await bootstrap();
    return app(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};