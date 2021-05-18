import { FilterQuery } from 'mongoose';

import { ToolDocument } from '../schemas/tool.schema';
import { ToolQuery } from './toolQuery';

export class ToolQueryBuilder {
  private filter: FilterQuery<ToolDocument> = {};
  private query: ToolQuery;

  constructor(query: ToolQuery) {
    this.query = query;
  }

  build() {
    if (this.query.tag) this.filter.tags = this.query.tag;
    if (this.query.title) this.filter.title = this.query.title;
    if (this.query._id) this.filter._id = this.query._id;
    return this.filter;
  }
}
