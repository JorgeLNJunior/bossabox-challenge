import { ApiProperty } from '@nestjs/swagger';
import { UserDocument } from 'src/modules/user/schemas/user.schema';
import { userExample } from 'src/shared/responses/helpers/apiExamples';

export class UserRegisterResponse {
  @ApiProperty({
    default: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: userExample,
  })
  user: UserDocument;

  constructor(user: UserDocument, statusCode?: number) {
    this.user = user;
    this.statusCode = statusCode || 201;
  }

  build() {
    return {
      statusCode: this.statusCode,
      user: this.user,
    };
  }
}
