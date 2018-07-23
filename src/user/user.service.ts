import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from 'user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  findUser(partialUser: Partial<UserEntity>) {
    return from(this.userRepository.findOne({
      where: partialUser
    })).pipe(
      map(user => {
        if (!user) {
          throw(new HttpException('User not found', HttpStatus.NOT_FOUND));
        }

        return user;
      })
    );
  }

  getUser(id: string) {
    return from(this.userRepository.findByIds([parseInt(id, 10)])).pipe(
      map(users => {
        if (!users || users.length === 0) {
          throw(new HttpException('User not found', HttpStatus.NOT_FOUND));
        }

        return users[0];
      })
    );
  }
}
