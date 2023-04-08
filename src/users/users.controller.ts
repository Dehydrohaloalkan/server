import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getAll() {
        return this.usersService.getAllUsers();
    }

    @Post()
    async create(@Body() data: Prisma.userCreateInput) {
        return this.usersService.createUser(data);
    }

    @Patch()
    async update(
        @Body()
        params: {
            where: Prisma.userWhereUniqueInput;
            data: Prisma.userUpdateInput;
        }
    ) {
        return this.usersService.updateUser(params);
    }

    @Delete()
    async delete(@Body() where: Prisma.userWhereUniqueInput) {
        return this.usersService.deleteUser(where);
    }
}
