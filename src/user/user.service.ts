import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  logger = new Logger(this.constructor.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('User cannot be create');
    }
  }

  async findByIdentification(identification: string) {
    try {
      const user = await this.userRepository.findOneBy({ identification });

      if (!user)
        throw new NotFoundException(
          `User with identification ${JSON.stringify(
            identification,
          )} did not dfound`,
        );
      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
