import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './domains/schemas/project.schema';
import { ProjectController } from './modules/controllers/project.controller';
import { ProjectMapper } from './modules/implementation/mappers/project.mapper';
import { ProjectRepository } from './modules/implementation/repositories/project.repository';
import { ProjectService } from './modules/implementation/services/project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectController],
  providers: [
    ProjectMapper,
    { provide: 'IProjectRepository', useClass: ProjectRepository },
    { provide: 'IProjectService', useClass: ProjectService },
  ],
  exports: ['IProjectService'],
})
export class ProjectsModule {}
