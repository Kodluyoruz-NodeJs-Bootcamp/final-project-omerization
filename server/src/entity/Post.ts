import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    owner: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @Column()
    shortDate: String;

    @Column()
    ownerName: string;

    @Column()
    favorite: string;

    @Column()
    favoriteId: string;

    @Column({type:"longtext" })
    review: string;

    @Column({default:0})
    likeCount: number;

}