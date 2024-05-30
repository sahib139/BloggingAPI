import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from "@nestjs/config"
import OrmConfig from "./ormConfig";
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(OrmConfig),
    PostModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
