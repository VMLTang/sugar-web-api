import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get(':userId')
  getUser(
    @Param('userId') userId: string
  ): Observable<UserEntity> {
    return this.userService.getUser(userId);
  }

  @Get('/lookup')
  lookupUser(
    @Query() queryParams: Partial<UserEntity>
  ) {
    return this.userService.findUser(queryParams);
  }
}
