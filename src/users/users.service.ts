import { Get, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    @Get()
    getAllUsers() {
        return this.prisma.user.count();
    }
}
