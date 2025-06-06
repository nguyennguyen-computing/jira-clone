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

  async findOne(_id: string): Promise<Issue | null> {
    return this.issueModel
      .findOne({ _id })
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
    updatedIssues: { _id: string; status?: string; listPosition?: number }[],
  ): Promise<Issue[]> {
    const bulkOperations = updatedIssues.map((issue) => ({
      updateOne: {
        filter: { _id: issue._id },
        update: { $set: { ...issue } },
      },
    }));

    await this.issueModel.bulkWrite(bulkOperations);

    const updatedIds = updatedIssues.map((issue) => issue._id);
    return this.issueModel
      .find({ _id: { $in: updatedIds } })
      .populate('reporterId userIds')
      .exec();
  }

  async updateIssue(
    issueId: string,
    updateData: { status?: string; listPosition?: number; [key: string]: any }
  ): Promise<Issue | null> {
    const issue = await this.issueModel.findById(issueId).exec();
  
    if (!issue) {
      throw new Error('Issue not found');
    }
  
    if (updateData.status && updateData.status !== issue.status) {
      const issuesInStatus = await this.issueModel
        .find({ status: updateData.status })
        .sort({ listPosition: 1 }) 
        .exec();
  
      updateData.listPosition = issuesInStatus.length;
    }
  
    return this.issueModel
      .findByIdAndUpdate(issueId, { $set: updateData }, { new: true })
      .populate('reporterId userIds')
      .exec();
  }
}
