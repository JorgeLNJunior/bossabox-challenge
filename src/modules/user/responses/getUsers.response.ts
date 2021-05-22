import { ApiProperty } from '@nestjs/swagger';

import { UserDocument } from '../schemas/user.schema';
import { userExample } from './helpers/apiExamples';

export class GetUsersResponse {
  @ApiProperty({
    default: 200,
  })
  status: number;

  @ApiProperty({
    example: [userExample],
  })
  users: UserDocument[];

  constructor(users: UserDocument[], status?: number) {
    this.status = status | 200;
    this.users = users;
  }

  build() {
    return {
      status: this.status,
      users: this.users,
    };
  }
}
