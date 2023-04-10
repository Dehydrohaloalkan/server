import { Body, Controller, Get, Post } from '@nestjs/common';
import { roleCreateDto } from './dto';
import { RolesService } from './roles.service';

@Controller('user_roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Get()
    async getAll() {
        return await this.rolesService.getAllRoles();
    }

    @Post()
    async create(@Body() data: roleCreateDto) {
        return await this.rolesService.createRole(data);
    }
}
