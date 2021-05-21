import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyInUseConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  async validate(email: any): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    if (user) return false;
    return true;
  }
  defaultMessage?(): string {
    return 'this email is already in use';
  }
}

export function IsEmailAlreadyInUse(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyInUseConstraint,
    });
  };
}
