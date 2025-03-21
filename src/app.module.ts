import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { RolesModule } from './roles/roles.module';


@Module({
  imports: [EmployeesModule, DatabaseModule, AuthModule, RolesModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
