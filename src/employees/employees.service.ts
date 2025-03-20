import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createEmployee: Prisma.EmployeeCreateInput) {
    return this.dbService.employee.create({ data: { ...createEmployee } });
  }

  async findAll(role?: 'ADMIN' | 'ENGINEER' | 'USER') {
    if (role) return this.dbService.employee.findMany({ where: { role } });
    return this.dbService.employee.findMany()
  }

  async findOne(id: string) {
    return this.dbService.employee.findUnique({ where: { id } });
  }

  async update(id: string, updateEmployee: Prisma.EmployeeCreateInput) {
    return this.dbService.employee.update({
      where: { id },
      data: updateEmployee,
    });
  }

  async remove(id: string) {
    return this.dbService.employee.delete({ where: { id } });
  }
}
