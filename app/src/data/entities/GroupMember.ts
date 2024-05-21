import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('group_members')
export class GroupMember {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    groupId: string;

    @Column({ type: 'varchar', length: 255 })
    userId: string;

    @Column({ type: 'varchar', length: 255 })
    username: string;
}