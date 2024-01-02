import {IConfigService} from "./config.interface";
import {config,DotenvParseOutput} from "dotenv";

export class ConfigService implements IConfigService {

private config: DotenvParseOutput;
    constructor() {
        const  {error, parsed} = config();

        if (error) {
            throw new Error("Error loading .env file");
        }

        if (!parsed) {
            throw new Error("Error empty .env file");
        }

        this.config = parsed;

    }

    get(key: string): string {
       const result = this.config[key];
       if (!result) {
           throw new Error(`Config ${key} not found`);
       }
       return result;
    }
}