import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Issue } from './schemas/issue.schema';
import { CreateIssueDto } from './dto/create-issue.dto';

@Injectable()
export class IssuesService {
  constructor(@InjectModel(Issue.name) private issueModel: Model<Issue>) {}

  async create(createIssueDto: CreateIssueDto): Promise<Issue> {
    const issue = new this.issueModel(createIssueDto);
    return issue.save();
  }

  async findAll(): Promise<Issue[]> {
    return this.issueModel
      .find()
      .populate('projectId reporterId userIds')
      .exec();
  }

  async findOne(id: string): Promise<Issue | null> {
    return this.issueModel
      .findOne({ id })
      .populate('projectId reporterId userIds')
      .exec();
  }

  async findByProjectId(projectId: string): Promise<Issue[]> {
    return this.issueModel
      .find({ projectId })
      .populate('reporterId userIds')
      .exec();
  }

  async updateIssues(
    updatedIssues: { _id: string; status?: string; listPosition?: number }[]
  ): Promise<Issue[]> {
    const bulkOperations = updatedIssues.map((issue) => ({
      updateOne: {
        filter: { _id: issue._id },
        update: { $set: { ...issue } },
      },
    }));
  
    await this.issueModel.bulkWrite(bulkOperations);
  
    const updatedIds = updatedIssues.map((issue) => issue._id);
    return this.issueModel.find({ _id: { $in: updatedIds } }).populate('reporterId userIds').exec();
  }
}
