import { getCustomRepository, Repository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { Settings } from "../entities/Settings";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepository: Repository<Settings>;
    constructor(){
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }
    async create({ chat, username }: ISettingsCreate){
        const settingsRepository = getCustomRepository(SettingsRepository);

        const userAlreadyExists = await settingsRepository.findOne({
            username
        });
        if(userAlreadyExists){
            throw new Error("User already exists!");
        }
    
        const settings = settingsRepository.create({
            chat,
            username
        });
    
        await settingsRepository.save(settings);
    }
}

export { SettingsService}