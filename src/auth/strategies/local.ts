import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'identification',
    });
  }

  async validate(identification: string, password: string) {
    const user = await this.userService.findByIdentification(identification);

    if (!user) throw new NotFoundException('User not found');

    const passMatch = bcrypt.compareSync(password, user.password);

    if (!passMatch) throw new UnauthorizedException('Invalid password');

    delete user.password;
    return user;
  }
}
