import { Module } from '@nestjs/common';
import { TypesResolver } from './types.resolver';
import { TypesService } from './types.service';

@Module({
    providers: [TypesResolver, TypesService],
    exports: [TypesService],
})
export class TypesModule {}
