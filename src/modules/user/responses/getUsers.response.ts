import { ApiProperty } from '@nestjs/swagger';

import { userExample } from '../../../shared/responses/helpers/apiExamples';
import { UserDocument } from '../schemas/user.schema';

export class GetUsersResponse {
  @ApiProperty({
    default: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: [userExample],
  })
  users: UserDocument[];

  constructor(users: UserDocument[], statusCode?: number) {
    this.statusCode = statusCode | 200;
    this.users = users;
  }

  build() {
    return {
      statusCode: this.statusCode,
      users: this.users,
    };
  }
}
