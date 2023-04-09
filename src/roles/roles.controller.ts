import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesService } from './roles.service';

@Controller('user_roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Roles('student')
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.rolesService.getAllRoles();
    }

    @Post()
    async create(@Body() data: Prisma.user_roleCreateInput) {
        return await this.rolesService.createRole(data);
    }
}
