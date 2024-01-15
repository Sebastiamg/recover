import {
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LoginInterface } from '../dto/login.interface';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const { identification, password } = context
      .switchToHttp()
      .getRequest<Request>().body as LoginInterface;

    if (!identification || !password) {
      throw new NotFoundException('User did not found, invalid credentials');
    }
    return super.canActivate(context);
  }
}
