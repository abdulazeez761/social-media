import { User } from 'modules/users/entities/user.entity';
import { Base } from 'shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Post extends Base {
  @ManyToOne(() => User, (author) => author.posts)
  author!: User;

  @Column({ type: 'varchar', length: 2200, nullable: true })
  text?: string;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  image?: string;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  video?: string;
}
