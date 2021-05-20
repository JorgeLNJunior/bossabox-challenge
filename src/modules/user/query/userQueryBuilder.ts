import { FilterQuery } from 'mongoose';

import { UserDocument } from '../schemas/user.schema';
import { UserQuery } from './userQuery';

export class UserQueryBuilder {
  private filter: FilterQuery<UserDocument>;
  private query: UserQuery;

  constructor(query: UserQuery) {
    this.query = query;
    this.filter = {};
  }

  build() {
    if (this.query._id) this.filter._id = this.query._id;
    if (this.query.name) this.filter.name = this.query.name;

    return this.filter;
  }
}
