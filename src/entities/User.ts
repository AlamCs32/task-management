import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';

import { Task } from './Task';
import { UserRole } from './UserRole';

import { hashPassword } from '@/utils/bcrypt';
import { TimeStamptEntity } from '@/utils/TimeStamptEntity';

@Entity()
export class User extends TimeStamptEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    username: string;

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

    @Column({ type: 'varchar', nullable: true })
    resetToken: string;

    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpiry: Date;

    @OneToMany(() => Task, (task) => task.user)
    task: Task[];

    @BeforeInsert()
    async hashPassword() {
        if (!this.password) return;
        this.password = await hashPassword(this.password);
    }

    @BeforeUpdate()
    async hashPasswordUpdate() {
        if (!this.password || this.password.startsWith('$2b$')) return;
        this.password = await hashPassword(this.password);
    }
}
