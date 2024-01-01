import { Post } from 'modules/posts/entities/post.entity';
import { User } from 'modules/users/entities/user.entity';
import { Base } from 'shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Comment extends Base {
  @Column({ type: 'varchar', length: 2200, nullable: true })
  text?: string;

  @ManyToOne(() => User, (author) => author.comments)
  author!: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;
}
