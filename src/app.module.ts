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
import { CoursesModule } from './courses/courses.module';
import { TypesModule } from './types/types.module';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subjects/subjects.module';
import { LessonsModule } from './lessons/lessons.module';

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
        CoursesModule,
        TypesModule,
        StudentsModule,
        SubjectsModule,
        LessonsModule,
    ],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
