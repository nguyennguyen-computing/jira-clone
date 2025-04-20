import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { IssuesModule } from './issues/issue.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/jira-clone'), // Use the environment variable or fallback
    AuthModule,
    ProjectsModule,
    IssuesModule,
    UsersModule,
  ],
})
export class AppModule {}

