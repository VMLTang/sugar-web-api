import { CreatePostingCommandHandler } from './create-posting.handler';
import { GrantPostingCommandHandler } from './grant-posting.handler';

export const postingCommandHandlers = [
  CreatePostingCommandHandler,
  GrantPostingCommandHandler
];
