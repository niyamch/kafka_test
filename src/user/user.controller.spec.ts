import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ClientsModule } from '@nestjs/microservices';
import { TestTypeOrmModule } from '../common/test-typeorm.module';
import { KAFKA_PRODUCER_SERVICE } from '../common/constants';
import { BadRequestException } from '@nestjs/common';

describe('UserController', () => {
  let module: TestingModule;
  let controller: UserController;
  let service: UserService;
  let kafkaEmitSpy: jest.SpyInstance;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User]),
        TestTypeOrmModule,
        ClientsModule.register([{ name: KAFKA_PRODUCER_SERVICE }]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    kafkaEmitSpy = jest.spyOn(service['clientKafka'], 'emit');
  });

  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('user should contain firstName', async () => {
    const response = controller.create({
      firstName: null,
      lastName: 'mch',
      birthday: new Date('1998-05-02'),
    });

    await expect(response).rejects.toBeInstanceOf(BadRequestException);
  });

  it('user should contain lastName', async () => {
    const response = controller.create({
      firstName: 'niya',
      lastName: null,
      birthday: new Date('1998-05-02'),
    });

    await expect(response).rejects.toBeInstanceOf(BadRequestException);
  });

  it("user's birthday should be in the past", async () => {
    const response = controller.create({
      firstName: 'niya',
      lastName: 'mch',
      birthday: new Date('2024-01-01'),
    });

    await expect(response).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not emit to kafka and return empty string if users are less than 1 in total', async () => {
    const response = await controller.getAll();
    expect(kafkaEmitSpy).not.toHaveBeenCalled();
    expect(response).toBeInstanceOf(Array);
    expect(response.length).toEqual(0);
  });

  it('should create user', async () => {
    const response = controller.create({
      firstName: 'niya',
      lastName: 'mch',
      birthday: new Date('1998-05-02'),
    });

    await expect(response).resolves.toBeInstanceOf(User);
  });

  it('should emit to kafka and return users', async () => {
    const response = await controller.getAll();
    expect(kafkaEmitSpy).toBeCalled();
    expect(response).toBeInstanceOf(Array<User>);
    expect(response.length).toBeGreaterThan(0);
  });
});
