import { Request, Response } from "express";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { getCustomRepository } from "typeorm";
import { SettingsService } from "../services/SettingsService";

class SettingsController {
    async create(request: Request, response: Response){
        const { chat, username } = request.body;

        try{
            const settingsService = new SettingsService();

            const settings = await settingsService.create({ chat, username });

            return response.json(settings);
        }catch(err){
            return response.status(400).json({
                message: err.message,
            });
        }
    }
}

export { SettingsController }