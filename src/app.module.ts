import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatiscuteModule } from './catiscute/catiscute.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatiscuteModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
