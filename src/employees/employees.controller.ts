import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, Role } from '@prisma/client';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployee: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployee);
  }

  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'ENGINEER' | 'USER') {
    return this.employeesService.findAll(role);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployee: Prisma.EmployeeCreateInput,
  ) {
    return this.employeesService.update(id, updateEmployee);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
