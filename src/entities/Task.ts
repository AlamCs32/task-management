import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

import { TaskStatus } from '@/utils/enums';
import { TimeStamptEntity } from '@/utils/TimeStamptEntity';

@Entity()
export class Task extends TimeStamptEntity {
    @PrimaryGeneratedColumn()
    taskId: number;

    @Column({ type: 'int', nullable: false })
    userId: number;

    @Column({ type: 'varchar', nullable: false })
    title: string;

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        nullable: false,
        default: TaskStatus.PENDING,
    })
    status: TaskStatus;

    @Column({ type: 'date', nullable: false })
    dueDate: Date;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @ManyToOne(() => User, (user) => user.task)
    @JoinColumn({ name: 'userId' })
    user: User;
}
