import { BadRequestException, Injectable, Param, Patch } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

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
    page: number = 1,
    limit: number = 10,
  ): Promise<{ projects: Project[]; total: number }> {
    const skip = (page - 1) * limit;

    const total = await this.projectModel.countDocuments();

    const projects = await this.projectModel
      .find()
      .populate('users issues')
      .skip(skip)
      .limit(limit)
      .exec();

    return { projects, total };
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projectModel.findOne({ id }).populate('users issues').exec();
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

  async addIssueToProject(projectId: string, issueId: string): Promise<Project | null> {
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

    return project.issues;
  }
}
