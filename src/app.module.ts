import { AbsencesGateway } from './absences/absences.gateway';
import { AbsencesModule } from './absences/absences.module';
import { LessonsModule } from './lessons/lessons.module';
import { SubjectsModule } from './subjects/subjects.module';
import { CoursesModule } from './courses/courses.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { RolesModule } from './roles/roles.module';
import { StudentsModule } from './students/students.module';
import { SubjectTypesModule } from './subjectTypes/subjectTypes.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        AbsencesModule,
        LessonsModule,
        SubjectsModule,
        CoursesModule,
        SubjectTypesModule,
        StudentsModule,
        PrismaModule,
        RolesModule,
        AuthModule,
        GroupsModule,
        UsersModule,
    ],
    controllers: [],
    providers: [AbsencesGateway, PrismaService],
})
export class AppModule {}
