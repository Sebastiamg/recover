import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userSerevice: UserService) {}

  async register({ password, ...userData }: RegisterDto) {
    const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = { password: hashedPass, ...userData };

    await this.userSerevice.create(user);

    return 'User successfully registered';
  }
}
