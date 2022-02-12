import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @Column()
    content: string;
    
    @Column()
    owner: string;

    @Column()
    ownerName: string;

    @Column()
    shortDate: string;

    @Column()
    post: string;

}