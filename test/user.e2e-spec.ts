import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { MainModule } from '../src/main.module';
import { UserDocument } from '../src/modules/user/schemas/user.schema';
import { TokenGenerator } from './helpers/token.generator';
import { UserBuilder } from './helpers/user.builder';

describe('ToolController (e2e)', () => {
  let app: INestApplication;
  let user: UserDocument;
  let token: string;

  beforeAll(async () => {
    user = await UserBuilder.aUser().persist();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({ forbidUnknownValues: true, whitelist: true }),
    );

    await app.init();

    token = await new TokenGenerator(user).generate();
  });

  afterEach(async () => await app.close());

  it('/users (POST) should return a list of users', async () => {
    const { status, body } = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('users');
  });

  it('/users (POST) should return a list of users with query', async () => {
    const { status, body } = await request(app.getHttpServer())
      .get('/users?_id=609c2b58724a182c5711d9bc&name=name')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('users');
  });
});
