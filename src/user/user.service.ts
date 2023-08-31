import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './create.user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_PRODUCER_SERVICE } from '../common/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(KAFKA_PRODUCER_SERVICE) private clientKafka: ClientKafka,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (users.length <= 0) {
      return [];
    }

    await this.clientKafka.emit('users', users);

    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.validateCreateUserDto(createUserDto);
    let user: User = new User();
    user.first_name = createUserDto.firstName;
    user.last_name = createUserDto.lastName;
    user.birthday = createUserDto.birthday;
    user.created_on = new Date();
    user.updated_on = new Date();

    user = await this.userRepository.save(user);

    return user;
  }

  validateCreateUserDto(createUserDto: CreateUserDto) {
    if (!createUserDto.firstName) {
      throw new BadRequestException('firstName is mandatory');
    }

    if (!createUserDto.lastName) {
      throw new BadRequestException('lastName is mandatory');
    }

    if (
      createUserDto.birthday &&
      new Date(createUserDto.birthday) >= new Date()
    ) {
      throw new BadRequestException('birthday should be in the past');
    }
  }
}
