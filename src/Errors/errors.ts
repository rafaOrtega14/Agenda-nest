import { HttpException, HttpStatus } from '@nestjs/common';

export class NoContactsError extends HttpException {
  constructor() {
    super(`No common contacts were found`, HttpStatus.NOT_FOUND);
  }
}
