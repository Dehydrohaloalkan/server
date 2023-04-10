import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { groupCreateDto, groupDeleteDto, groupUpdateDto } from './dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService) {}

    @Get()
    async getAll() {
        return await this.groupsService.getAllGroups();
    }

    @Get(':id')
    async getGroupInfo(@Param() params) {
        return await this.groupsService.getGroupInfo(params.id);
    }

    @Post()
    async create(@Body() data: groupCreateDto) {
        return await this.groupsService.createGroup(data);
    }

    @Patch()
    async update(@Body() params: groupUpdateDto) {
        return await this.groupsService.updateGroup(params);
    }

    @Delete()
    async delete(@Body() where: groupDeleteDto) {
        return await this.groupsService.deleteGroup(where);
    }
}
