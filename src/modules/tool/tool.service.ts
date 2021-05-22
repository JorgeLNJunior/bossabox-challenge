import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserService } from '../user/user.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { ToolQuery } from './query/toolQuery';
import { ToolQueryBuilder } from './query/toolQueryBuilder';
import { Tool, ToolDocument } from './schemas/tool.schema';

@Injectable()
export class ToolService {
  constructor(
    @InjectModel(Tool.name) private toolModel: Model<ToolDocument>,
    private userService: UserService,
  ) {}

  async create(createToolDto: CreateToolDto, userId: string) {
    const owner = await this.userService.findById(userId);
    if (!owner) throw new BadRequestException(undefined, 'user not found');

    const tool = new this.toolModel({
      ...createToolDto,
      user_id: userId,
    });
    return tool.save();
  }

  findAll(query: ToolQuery, userId: string): Promise<ToolDocument[]> {
    const filter = new ToolQueryBuilder(query, userId).build();

    return this.toolModel
      .find(filter, null, { limit: Number(query.limit) || 20 })
      .exec();
  }

  async remove(toolId: string, userId: string) {
    const tool = await this.toolModel.findOne({ _id: toolId }).exec();

    if (!tool) throw new BadRequestException(undefined, 'tool not found');

    const isToolOwner = tool.user_id === userId;
    if (!isToolOwner)
      throw new ForbiddenException(undefined, 'you are not the tool owner');

    await this.toolModel.deleteOne({ _id: toolId });
  }
}
