import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.chema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findByName(name: string): Promise<User[]> {
    try {
      const filter = {
        name: { $regex: name, $options: 'i' },
      };
      return await this.userModel.find(filter).exec();
    } catch (error) {
      throw new Error('Failed to search users');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel
      .find()
      .select('-password')
      .exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel
      .findOne({ id })
      .select('-password')
      .populate('projectId')
      .exec();
  }
}
