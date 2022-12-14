import { applyDecorators, UseGuards } from '@nestjs/common';
import { ThryveAuthGuard } from './thryve-auth.guard';

export function ThryveAuth() {
  return applyDecorators(UseGuards(ThryveAuthGuard));
}
