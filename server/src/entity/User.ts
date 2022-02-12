import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    googleId: string;

    @Column({ nullable: true })
    facebookId: string;
    
    @Column({ unique: true })
    email: string;

    @Column()
    firstName: string;
 
    @Column()
    lastName: string;

    @Column({ nullable: true })
    password: string;

 
}