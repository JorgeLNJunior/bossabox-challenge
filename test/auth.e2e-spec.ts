import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as faker from 'faker';
import * as request from 'supertest';

import { MainModule } from '../src/main.module';
import { UserBuilder } from './helpers/user.builder';

describe('ToolController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    useContainer(app.select(MainModule), { fallbackOnErrors: true });
    app.useGlobalPipes(
      new ValidationPipe({ forbidUnknownValues: true, whitelist: true }),
    );

    await app.init();
  });

  afterEach(async () => await app.close());

  it('/register (POST) should register a new user', async () => {
    const user = UserBuilder.aUser().build();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send(user);

    expect(status).toBe(201);
    expect(body).toHaveProperty('user');
  });

  it('/register (POST) should not register a user with already registered email', async () => {
    const email = faker.internet.email();
    await UserBuilder.aUser().withEmail(email).persist();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send({
        name: 'user',
        email: email,
        password: '123456',
      });

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/register (POST) should register a user without name', async () => {
    const user = UserBuilder.aUser().withoutName().build();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send(user);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/register (POST) should register a user without email', async () => {
    const user = UserBuilder.aUser().withoutEmail().build();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send(user);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/register (POST) should register a user without password', async () => {
    const user = UserBuilder.aUser().withoutPassword().build();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send(user);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/login (POST) should return an access token with valid credentials', async () => {
    const password = '123456';
    const user = await UserBuilder.aUser().withPassword(password).persist();

    const { status, body } = await request(app.getHttpServer())
      .post('/login')
      .send({
        email: user.email,
        password: password,
      });

    expect(status).toBe(200);
    expect(body).toHaveProperty('access_token');
  });

  it('/login (POST) should not return an access token with invalid credentials', async () => {
    const user = await UserBuilder.aUser().persist();

    const { status } = await request(app.getHttpServer()).post('/login').send({
      email: user.email,
      password: 'invalid-password',
    });

    expect(status).toBe(401);
  });

  it('/login (POST) should not return an access token if the user was not found', async () => {
    const { status } = await request(app.getHttpServer()).post('/login').send({
      email: 'user@email.com',
      password: 'password',
    });

    expect(status).toBe(401);
  });
});
