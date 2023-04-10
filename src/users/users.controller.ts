import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserDeleteDto, UserUpdateDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getAll() {
        return await this.usersService.getAllUsers();
    }

    @Post()
    async create(@Body() data: Prisma.userCreateInput) {
        return await this.usersService.createUser(data);
    }

    @Patch()
    async update(@Body() params: UserUpdateDto) {
        return await this.usersService.updateUser(params);
    }

    @Delete()
    async delete(@Body() where: UserDeleteDto) {
        return await this.usersService.deleteUser(where);
    }
}
