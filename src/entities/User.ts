
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    Index
} from 'typeorm';
@Entity('users')
@Index(['email'], { unique: true })
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ length: 100 })
    email!: string;

    @Column({ length: 255 })
    password!: string;

    @Column({ default: true })
    isActive!: boolean;

    @Column({ nullable: true })
    age!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}