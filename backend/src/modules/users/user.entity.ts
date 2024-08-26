import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../product/products.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  lastname: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 8,
  })
  dni: string;

  @Column({ type: 'varchar', length: 80 })
  address: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({
    type: 'varchar',
    length: 130,
    nullable: true,
  })
  profilePicture?: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
