import { Module } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

@Module({
    exports: [RolesGuard],
    providers: [RolesGuard]
})
export class RolesModule {}
