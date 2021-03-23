import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {doc} from "prettier";
import {join} from 'path';

require('dotenv').config();

class ConfigService {

    constructor(private env: { [k: string]: string | undefined }) { }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',

            host: '89.223.28.130',//this.getValue('POSTGRES_HOST'),
            port: 5432,//parseInt(this.getValue('POSTGRES_PORT')),
            username: 'test_user',//this.getValue('POSTGRES_USER'),
            password: 'test_user',//this.getValue('POSTGRES_PASSWORD'),
            database: 'test',//this.getValue('POSTGRES_DATABASE'),

            entities: ["dist/model/*.entity.js"],

            logging: true,
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: false
                }
            }
        };
    }

}

const configService = new ConfigService(process.env);

export { configService };