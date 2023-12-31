import { FindOptionsSelect } from 'typeorm';
import { Comment } from '../entities/comment.entity';

export const selectComment: string[] | FindOptionsSelect<Comment> = [
  'id',
  'text',
  'createdAt',
];
export const relationSelectComment: string[] | FindOptionsSelect<Comment> = {
  id: true,
  createdAt: true,
  text: true,
};
