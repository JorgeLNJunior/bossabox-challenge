import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ToolQuery } from './query/toolQuery.interface';
import { ToolQueryBuilder } from './query/toolQueryBuilder';
import { Tool, ToolDocument } from './schemas/tool.schema';

@Injectable()
export class ToolService {
  constructor(@InjectModel(Tool.name) private toolModel: Model<ToolDocument>) {}

  async create(createToolDto: CreateToolDto): Promise<Tool> {
    const tool = new this.toolModel(createToolDto);
    return tool.save();
  }

  findAll(query: ToolQuery): Promise<Tool[]> {
    const filter = new ToolQueryBuilder(query).build();

    return this.toolModel
      .find(filter, null, { limit: Number(query.limit) || 3 })
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} tool`;
  }

  update(id: number, updateToolDto: UpdateToolDto) {
    return `This action updates a #${id} tool`;
  }

  remove(id: number) {
    return `This action removes a #${id} tool`;
  }
}
