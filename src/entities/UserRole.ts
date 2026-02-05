import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

import { TimeStamptEntity } from '@/utils/TimeStamptEntity';

@Entity()
export class UserRole extends TimeStamptEntity {
    @PrimaryGeneratedColumn()
    userRoleId: number;

    @Column({ type: 'varchar', nullable: false })
    roleName: string;

    @OneToMany(() => User, (user) => user.userRole)
    user: User[];

    @Column({ type: 'boolean', default: true })
    isActive: boolean;
}
