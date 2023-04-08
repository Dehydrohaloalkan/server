import { Prisma } from '.prisma/client';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService) {}

    @Get()
    async getAllGroups() {
        return await this.groupsService.getAllGroups();
    }

    @Post()
    async createGroup(@Body() data: Prisma.groupCreateInput) {
        return await this.groupsService.createGroup(data);
    }

    @Patch()
    async updateGroup(
        @Body()
        params: {
            where: Prisma.groupWhereUniqueInput;
            data: Prisma.groupUpdateInput;
        }
    ) {
        return await this.groupsService.updateGroup(params);
    }

    @Delete()
    async deleteGroup(@Body() where: Prisma.groupWhereUniqueInput) {
        return await this.groupsService.deleteGroup(where);
    }
}
