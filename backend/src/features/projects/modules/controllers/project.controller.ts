import { Public } from '@core/decorators/public.decorator';
import {
  CreateProjectDto,
  UpdateProjectDto,
} from '@features/projects/domains/dtos/project.dto';
import { ProjectEntity } from '@features/projects/domains/entities/project.entity';
import { IProjectService } from '@features/projects/interfaces/services/project.iservice';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth('AccessToken')
@Controller('projects')
export class ProjectController {
  constructor(
    @Inject('IProjectService')
    private readonly projectService: IProjectService,
  ) {}

  @Public()
  @ApiOperation({
    summary: 'Liste tous les projets',
    description: 'Retourne la liste de tous les projets',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste de tous les projets',
    type: [ProjectEntity],
  })
  @Get()
  async findAll() {
    return this.projectService.findAll();
  }

  @Public()
  @ApiOperation({
    summary: 'Récupère un projet par slug',
    description: 'Retourne un projet à partir de son slug',
  })
  @ApiParam({
    name: 'slug',
    description: 'Le slug du projet à récupérer',
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Le projet correspondant au slug',
    type: ProjectEntity,
  })
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.projectService.findBySlug(slug);
  }

  @ApiOperation({
    summary: 'Récupère un projet par id',
    description: 'Retourne un projet à partir de son identifiant',
  })
  @ApiParam({
    name: 'id',
    description: "L'id du projet à récupérer",
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "Le projet correspondant à l'id",
    type: ProjectEntity,
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @ApiOperation({
    summary: 'Crée un projet',
    description: 'Crée un nouveau projet',
  })
  @ApiBody({
    type: CreateProjectDto,
    description: 'Données du projet à créer',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Indique si la création a réussi',
    type: Boolean,
  })
  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  @ApiOperation({
    summary: 'Met à jour un projet',
    description: 'Met à jour un projet à partir de son identifiant',
  })
  @ApiParam({
    name: 'id',
    description: "L'id du projet à mettre à jour",
    required: true,
    type: String,
  })
  @ApiBody({
    type: UpdateProjectDto,
    description: 'Données à mettre à jour',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Indique si la mise à jour a réussi',
    type: Boolean,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Supprime un projet',
    description: 'Supprime un projet à partir de son identifiant',
  })
  @ApiParam({
    name: 'id',
    description: "L'id du projet à supprimer",
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Indique si la suppression a réussi',
    type: Boolean,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
