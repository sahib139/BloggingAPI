import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: configService.get<string>('DATABASE_HOST'),
            port: parseInt(configService.get<string>('DATABASE_PORT'), 10),
            username: configService.get<string>('DATABASE_USERNAME'),
            password: configService.get<string>('DATABASE_PASSWORD'),
            database: configService.get<string>('DATABASE_NAME'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
        };
    }
}


export const typeOrmConfigAsync :TypeOrmModuleAsyncOptions = {
    imports:[ConfigModule],
    useFactory :async (configService:ConfigService):
    Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
    inject:[ConfigService],
}