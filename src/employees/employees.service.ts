import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createEmployee: Prisma.EmployeeCreateInput) {
    try {
      return this.dbService.employee.create({ data: { ...createEmployee } });
    } catch {
      console.log("invalid tring to create a user [ employees/employee.sercice.ts create() ]")
      throw new UnauthorizedException('Invalid datas')
    }
    
  }

  async findAll(role?: 'ADMIN' | 'ENGINEER' | 'USER') {
    try {
      if (role) return this.dbService.employee.findMany({ where: { role } });
      
    } catch {
      console.log("invalid trying to find by this role [ employees/employee.sercice.ts findAll() ]")
      throw new UnauthorizedException('Invalid Role')
    }
    return this.dbService.employee.findMany()
  }

  async findOne(id: string) {
    try {
      return this.dbService.employee.findUnique({ where: { id } });
      
    } catch {
      console.log("invalid id for find user [ employees/employee.sercice.ts findOne() ]")
      throw new UnauthorizedException('Invalid id')
    }
  }

  async update(id: string, updateEmployee: Prisma.EmployeeCreateInput) {
    try {

    return this.dbService.employee.update({
      where: { id },
      data: updateEmployee,
    });
      
    } catch {
      console.log("invalid id os data user [ employees/employee.sercice.ts update() ]")
      throw new UnauthorizedException('Invalid datas')
    }
  }

  async remove(id: string) {
    try {
      return this.dbService.employee.delete({ where: { id } });
      
    } catch {
      throw new UnauthorizedException('Invalid id')
      console.log("invalid id for delete user [ employees/employee.sercice.ts remove() ]")
    }
  }
}
