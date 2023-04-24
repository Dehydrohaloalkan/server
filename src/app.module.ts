import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            context: ({ req, res }) => ({ req, res }),
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: {
                settings: {
                    'request.credentials': 'include',
                },
            },
        }),
        GroupsModule,
        PrismaModule,
        UsersModule,
        RolesModule,
        AuthModule,
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
