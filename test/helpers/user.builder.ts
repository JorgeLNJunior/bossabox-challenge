import * as bcrypt from 'bcrypt';
import * as faker from 'faker';
import { connect, connection, model } from 'mongoose';

import { mongoConstants } from '../../src/config/constants';
import {
  User,
  UserDocument,
  UserSchema,
} from '../../src/modules/user/schemas/user.schema';

export class UserBuilder {
  private user: FakerUser;

  constructor() {
    this.user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };
  }

  static aUser(): UserBuilder {
    return new UserBuilder();
  }

  withoutName() {
    delete this.user.name;
    return this;
  }

  withoutEmail() {
    delete this.user.email;
    return this;
  }

  withoutPassword() {
    delete this.user.password;
    return this;
  }

  withEmail(email: string) {
    this.user.email = email;
    return this;
  }

  withPassword(password: string) {
    this.user.password = password;
    return this;
  }

  build(): FakerUser {
    return this.user;
  }

  async persist(): Promise<UserDocument> {
    await connect(mongoConstants.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    this.user.password = await bcrypt.hash(this.user.password, 10);

    const Model = model<UserDocument>(User.name, UserSchema);
    const user = await new Model(this.user).save();

    await connection.close();

    return user;
  }
}

export interface FakerUser {
  name?: string;
  email?: string;
  password?: string;
}
