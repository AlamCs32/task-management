import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { Task } from './Task';
import { UserRole } from './UserRole';

import { TimeStamptEntity } from '@/utils/TimeStamptEntity';

@Entity()
export class User extends TimeStamptEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    userName: string;

    @Column({ type: 'varchar', length: 256, unique: true, nullable: false })
    email: string;

    @Column({ type: 'int', nullable: false })
    userRoleId: number;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @ManyToOne(() => UserRole, (ur) => ur.user)
    @JoinColumn({ name: 'userRoleId' })
    userRole: UserRole;

    @OneToMany(() => Task, (task) => task.user)
    task: Task[];
}
