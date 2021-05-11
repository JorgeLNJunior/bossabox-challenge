import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { MainModule } from '../src/main.module';
import { TooBuiler } from './helpers/tool.builder';

describe('ToolController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ forbidUnknownValues: true, whitelist: true }),
    );
    await app.init();
  });

  afterEach(async () => await app.close());

  it('/tools (POST) should create a new tool', async () => {
    const tool = TooBuiler.aTool().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/tools')
      .send(tool);

    expect(status).toBe(201);
    expect(body).toHaveProperty('tool');
  });

  it('/tools (POST) should not create a tool without a title', async () => {
    const tool = TooBuiler.aTool().withoutTitle().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/tools')
      .send(tool);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/tools (POST) should not create a tool without a description', async () => {
    const tool = TooBuiler.aTool().withoutDescription().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/tools')
      .send(tool);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/tools (POST) should not create a tool without a link', async () => {
    const tool = TooBuiler.aTool().withoutLink().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/tools')
      .send(tool);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/tools (POST) should not create a tool without tags', async () => {
    const tool = TooBuiler.aTool().withoutTags().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/tools')
      .send(tool);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });
});
