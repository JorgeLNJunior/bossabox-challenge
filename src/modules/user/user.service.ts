import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UserQuery } from './query/userQuery';
import { UserQueryBuilder } from './query/userQueryBuilder';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(query: UserQuery) {
    const filter = new UserQueryBuilder(query).build();
    return this.userModel
      .find(filter, null, { limit: Number(query.limit) || 20 })
      .exec();
  }
}
