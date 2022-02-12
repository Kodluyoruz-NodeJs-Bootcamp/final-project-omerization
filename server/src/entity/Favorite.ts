import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Favorite {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    owner: string;

    @Column()
    type: string;
    
    @Column("longtext")
    image: string;
 
 
}