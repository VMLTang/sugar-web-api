import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostingEntity } from 'posting/posting.entity';
import { PostingLocationEntity } from 'posting/posting-location.entity';

@Injectable()
export class PostingService {
  constructor(
    @InjectRepository(PostingEntity)
    private readonly postingRepository: Repository<PostingEntity>
  ) {}

  findPosting(location: Partial<PostingLocationEntity>) {
    return from(this.postingRepository.find());
  }

  getPosting(id: string) {
    return from(this.postingRepository.findByIds([parseInt(id, 10)])).pipe(
      map(postings => {
        if (!postings || postings.length === 0) {
          throw(new HttpException('Posting not found', HttpStatus.NOT_FOUND));
        }

        return postings[0];
      })
    );
  }
}
