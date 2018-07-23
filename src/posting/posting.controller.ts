import { Controller, Get, Param, Query, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostingEntity } from 'posting/posting.entity';
import { CreatePostingCommand } from 'posting/commands/impl/create-posting.command';
import { PostingLocationEntity } from 'posting/posting-location.entity';
import { PostingService } from 'posting/posting.service';
import { GrantPostingCommand } from 'posting/commands/impl/grant-posting.command';

@Controller('/postings')
export class PostingController {

  constructor(
    private readonly postingService: PostingService,
    private readonly commandBus: CommandBus
  ) { }

  @Get('/lookup')
  lookupPosting(
    @Query() queryParams: Partial<PostingLocationEntity>
  ) {
    return this.postingService.findPosting(queryParams);
  }

  @Post(':id/grant')
  grantRequest(
    @Param('id') id: string,
    @Body() body: Partial<PostingEntity>
  ) {
    return from(this.commandBus.execute(
      new GrantPostingCommand({
        id: parseInt(id, 10),
        ...body
      })
    )).pipe(
      map(({ error, posting }) => {
        if (error) {
          if (error.status) {
            throw error;
          }

          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

        return posting;
      })
    );
  }

  @Get(':id')
  getPosting(
    @Param('id') id: string
  ) {
    return this.postingService.getPosting(id);
  }

  @Post()
  createPosting(
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
}
