import { ApiProperty } from '@nestjs/swagger';

import { userExample } from '../../../shared/responses/helpers/apiExamples';
import { UserDocument } from '../schemas/user.schema';

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
