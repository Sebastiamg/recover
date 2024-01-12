import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IntersectionType } from '@nestjs/swagger';

export class RegisterDto extends IntersectionType(CreateUserDto) {}
