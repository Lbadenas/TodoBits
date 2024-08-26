import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Cargar la configuración desde el archivo .env
    ConfigModule.forRoot({
      load: [typeOrmConfig],
      isGlobal: true,
    }),
    // Configuración de TypeORM usando el ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
      inject: [ConfigService],
    }),
    // Otros módulos aquí
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
