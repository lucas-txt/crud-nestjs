import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleDestroy, OnModuleInit  {
    constructor() {
        super({
            datasources: {
                db: {
                    url: "postgresql://neondb_owner:npg_xA1jZ9pynkFC@ep-shiny-sun-a8j3fujo-pooler.eastus2.azure.neon.tech/crud-nestjs?sslmode=require"
                }
            }
        })
    }

    async onModuleInit() {
        await this.$connect()
    } 

    async onModuleDestroy() {
        await this.$disconnect()
    }
    
}
