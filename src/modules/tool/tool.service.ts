import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(createToolDto: CreateToolDto, userId: string): Promise<Tool> {
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

  async remove(id: string) {
    const tool = await this.toolModel.findOne({ _id: id }).exec();
    if (!tool) throw new BadRequestException(undefined, 'tool not found');

    await this.toolModel.deleteOne({ _id: id });
  }
}
