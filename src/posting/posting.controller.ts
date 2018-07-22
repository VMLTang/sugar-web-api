import { Controller, Get, Param, Query, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostingEntity } from './posting.entity';
import { CreatePostingCommand } from './commands/impl/create-posting.command';
import { PostingLocationEntity } from './posting-location.entity';

@Controller('/postings')
export class PostingController {

  constructor(
    // private readonly userService: UserService,
    private readonly commandBus: CommandBus
  ) { }

  @Post()
  async createPosting(
    @Body() body: Partial<PostingEntity>
  ) {
    return from(this.commandBus.execute(
      new CreatePostingCommand(body)
    )).pipe(
      map(({ error, posting }) => {
        if (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

        return posting;
      })
    );
  }

  @Get('/lookup')
  lookupUser(
    @Query() queryParams: Partial<PostingLocationEntity>
  ) {
    // return this.userService.findUser(queryParams);
  }
}
