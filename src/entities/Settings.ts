import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("settings")
class Settings {
    @PrimaryColumn({ name:"id" })
    id: string;

    @Column({ name:"username" })
    username: string;

    @Column({ name: "chat" })
    chat: boolean;

    @UpdateDateColumn({ name:"updated_at" })
    updated_at: Date;
    
    @CreateDateColumn({ name:"created_at" })
    create_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Settings }