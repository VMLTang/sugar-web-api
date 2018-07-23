import { Controller, Get, Param, Query, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from 'user/user.entity';
import { UserService } from 'user/user.service';
import { CreateUserCommand } from 'user/commands/impl/create-user.command';
import { VerifyCellNumberCommand } from 'user/commands/impl/verify-cell-number.command';

@Controller('/users')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly commandBus: CommandBus
  ) { }

  @Get('/lookup')
  lookupUser(
    @Query() queryParams: Partial<UserEntity>
  ) {
    return this.userService.findUser(queryParams);
  }

  @Get('/:id')
  getUser(
    @Param('id') id: string
  ) {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(
    @Body() body: Partial<UserEntity>
  ) {
    return from(this.commandBus.execute(
      new CreateUserCommand(body)
    )).pipe(
      map(({ error, user }) => {
        if (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

        return user;
      })
    );
  }

  @Post('/verify/:cellNumber')
  verifyCellNumber(
    @Param('cellNumber') cellNumber: string
  ) {
    return from(this.commandBus.execute(
      new VerifyCellNumberCommand({ cellNumber })
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
      new VerifyCellNumberCommand({ cellNumber })
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
