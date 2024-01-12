import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  identification: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  phone: number;

  @Column()
  password: string;
}
