import { BadRequestException, Injectable, Param, Patch } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 10,
    name?: string,
    status?: string[],
  ): Promise<{ projects: Project[]; total: number }> {
    const skip = (page - 1) * limit;

    const filter = {
      $or: [{ owner: userId }, { users: userId }],
    };

    if (name) {
      filter['name'] = { $regex: name, $options: 'i' };
    }

    if (status && status.length > 0) {
      filter['status'] = { $in: status };
    }

    const total = await this.projectModel.countDocuments(filter);

    const projects = await this.projectModel
      .find(filter)
      .populate('users issues')
      .skip(skip)
      .limit(limit)
      .exec();

    return { projects, total };
  }

  async findOne(id: string): Promise<Project | null> {
    const project = await this.projectModel
      .findOne({ _id: id })
      .populate('users issues')
      .exec();
    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project | null> {
    return this.projectModel
      .findByIdAndUpdate(id, { $set: updateProjectDto }, { new: true })
      .populate('users issues')
      .exec();
  }

  async addIssueToProject(
    projectId: string,
    issueId: string,
  ): Promise<Project | null> {
    return this.projectModel
      .findByIdAndUpdate(
        projectId,
        { $push: { issues: issueId } },
        { new: true },
      )
      .populate('users issues')
      .exec();
  }

  async getIssuesInProject(projectId: string): Promise<any[]> {
    const project = await this.projectModel
      .findById(projectId)
      .populate('issues')
      .exec();

    if (!project) {
      throw new BadRequestException('Project not found');
    }

    return project.issues || [];
  }

  async getUsersInProject(projectId: string): Promise<any[]> {
    console.log('getUsersInProject', projectId);
    const project = await this.projectModel
      .findById(projectId)
      .populate({
        path: 'users',
        select: '-password',
      })
      .exec();
    console.log(
      'Project before populate:',
      await this.projectModel.findById(projectId).exec(),
    );
    console.log('Project after populate:', project);
    if (!project) {
      throw new BadRequestException('Project not found');
    }

    return project.users || [];
  }
}
