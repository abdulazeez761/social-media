import { FindOptionsSelect } from 'typeorm';
import { User } from '../entities/user.entity';

export const selectUser: string[] | FindOptionsSelect<User> = [
  'id',
  'email',
  'username',
  'gender',
  'createdAt',
];

export const relationSelectUser: FindOptionsSelect<User> = {
  id: true,
  email: true,
  username: true,
  gender: true,
  createdAt: true,
};
