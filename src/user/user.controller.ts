import { Controller, Get, Param, Query, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { VerifyCellNumberCommand } from './commands/impl/verify-cell-number.command';

@Controller('/users')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly commandBus: CommandBus
  ) { }

  @Post()
  async createUser(
    @Body() body: Partial<UserEntity>
  ) {
    return from(this.commandBus.execute(
      new CreateUserCommand(body.cellNumber)
    )).pipe(
      map(({ error, user }) => {
        if (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

        return user;
      })
    );
  }

  @Get('/lookup')
  lookupUser(
    @Query() queryParams: Partial<UserEntity>
  ) {
    return this.userService.findUser(queryParams);
  }

  @Post('/verify/:cellNumber')
  verifyCellNumber(
    @Param('cellNumber') cellNumber: string
  ) {
    return from(this.commandBus.execute(
      new VerifyCellNumberCommand(cellNumber)
    )).pipe(
      map(({ error, user }) => {
        if (error) {
          if (!error.status) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
          throw error;
        }

        return user;
      })
    );
  }

  @Post('/verify/resend/:cellNumber')
  verifyResendCellNumber(
    @Param('cellNumber') cellNumber: string
  ) {
    return from(this.commandBus.execute(
      new VerifyCellNumberCommand(cellNumber)
    )).pipe(
      map(({ error, user }) => {
        if (error) {
          if (!error.status) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
          throw error;
        }

        return user;
      })
    );
  }
}
