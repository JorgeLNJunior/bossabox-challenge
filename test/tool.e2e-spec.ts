import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDocument } from 'src/modules/user/schemas/user.schema';
import * as request from 'supertest';

import { MainModule } from '../src/main.module';
import { TokenGenerator } from './helpers/token.generator';
import { TooBuiler } from './helpers/tool.builder';
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

  it('/tools (POST) should create a new tool', async () => {
    const tool = TooBuiler.aTool().build();

    const { status, body } = await request(app.getHttpServer())
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(tool);

    expect(status).toBe(201);
    expect(body).toHaveProperty('tool');
  });

  it('/tools (POST) should not create a tool without a title', async () => {
    const tool = TooBuiler.aTool().withoutTitle().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(tool);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/tools (POST) should not create a tool without a description', async () => {
    const tool = TooBuiler.aTool().withoutDescription().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(tool);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/tools (POST) should not create a tool without a link', async () => {
    const tool = TooBuiler.aTool().withoutLink().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(tool);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/tools (POST) should not create a tool without tags', async () => {
    const tool = TooBuiler.aTool().withoutTags().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send(tool);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/tools (GET) should return a list of tools', async () => {
    const { status, body } = await request(app.getHttpServer())
      .get('/tools')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('tools');
  });

  it('/tools (DELETE) should delete an tool', async () => {
    const { _id } = await TooBuiler.aTool().withUser(user._id).persist();

    const { status, body } = await request(app.getHttpServer())
      .delete(`/tools/${_id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('message');
  });

  it('/tools (DELETE) should return an error if the tool was not found', async () => {
    const id = '609c2b58724a182c5711d9bc';

    const { status, body } = await request(app.getHttpServer())
      .delete(`/tools/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body).toHaveProperty('message');
  });
});
