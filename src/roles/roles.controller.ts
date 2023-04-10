import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleCreateDto } from './dto';
import { RolesService } from './roles.service';

@Controller('user_roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Get()
    async getAll() {
        return await this.rolesService.getAllRoles();
    }

    @Post()
    async create(@Body() data: RoleCreateDto) {
        return await this.rolesService.createRole(data);
    }
}
