import { CreatePostingCommandHandler } from 'posting/commands/handlers/create-posting.handler';
import { GrantPostingCommandHandler } from 'posting/commands/handlers/grant-posting.handler';

export const postingCommandHandlers = [
  CreatePostingCommandHandler,
  GrantPostingCommandHandler
];
