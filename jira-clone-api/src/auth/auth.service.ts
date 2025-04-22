import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Types } from 'mongoose';
import { LoginResponse } from './models';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Extract username from email (string before @)
    const username = email.split('@')[0];
    if (!username) {
      throw new HttpException('Invalid email format', HttpStatus.BAD_REQUEST);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const user = new this.userModel({
      id: new Types.ObjectId().toString(),
      email,
      password: hashedPassword,
      name: username,
    });
    return user.save();
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
  
    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  
    // Generate JWT
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
  
    // Return the response matching AuthResponse
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}
