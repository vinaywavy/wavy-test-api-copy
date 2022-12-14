import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class ThryveAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    return (
      headers['authorization'] ===
      this.config.get<string>('THRYVE_EVENT_TRIGGER_AUTHORIZATION')
    );
  }
}
