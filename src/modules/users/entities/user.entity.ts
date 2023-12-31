import { Post } from 'modules/posts/entities/post.entity';
import { Base } from 'shared/entities/base.entity';
import { Gender } from 'shared/enums/gender.enum';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends Base {
  @Column({ type: 'varchar', length: 30, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 320, unique: true })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'enum', enum: Gender })
  gender!: Gender;

  @Column({ type: 'varchar', length: 29 })
  birthday!: string;

  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];
}
