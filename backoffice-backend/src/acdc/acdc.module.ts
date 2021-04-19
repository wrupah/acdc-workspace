import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResourceController } from './appresource.controller';
import { LocaleController } from './locale.controller';
import { AppUserService } from './appuser.service';
import { AcdcUserController } from "./acdcuser.controller";
import { MahController } from "./mah.controller";


@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppResourceController, LocaleController, AcdcUserController, MahController],
  providers: [AppUserService],
  exports: [AppUserService],
})
export class AcdcModule {
}