import { MessagesRepository } from "../repositories/MessagesRepository";
import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessagesService {
    private messagesRepository: Repository<Message>;

    constructor(){
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    // admin_id = 4149e5ec-ff95-4a53-9e3e-8073a9962af0
    async create({ admin_id, text, user_id }: IMessageCreate){
        
        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        });

        await this.messagesRepository.save(message);

        return message;
    }

    async listByUser(user_id: string){
        const list = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        });

        return list;
    }
}


export { MessagesService }