import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserId } from 'src/auth/decorators/getCurrentUserId.decorator';
import { groupCreateDto, groupDeleteDto, groupUpdateDto } from './dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService) {}

    @Get()
    async getAll() {
        return await this.groupsService.getAllGroups();
    }

    @Get(':id(\\d+)')
    async getGroupInfo(@Param('id') id: number) {
        return await this.groupsService.getGroupInfo(Number(id));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('info')
    async getGroupInfoByUser(@GetCurrentUserId() userId) {
        return await this.groupsService.getGroupInfoByUser(userId);
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
