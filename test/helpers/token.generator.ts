import { JwtService } from '@nestjs/jwt';

import { jwtConstants } from '../../src/config/constants';
import { UserDocument } from '../../src/modules/user/schemas/user.schema';

export class TokenGenerator {
  private user: UserDocument;
  private jwtService: JwtService;

  constructor(user: UserDocument) {
    this.user = user;
    this.jwtService = new JwtService({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    });
  }

  async generate() {
    const payload = { _id: this.user._id, name: this.user.name };
    return this.jwtService.sign(payload);
  }
}
