import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getAll(
    @Query('category') category?: string,
    @Query('archived') archived?: string,
  ) {
    const isArchived = archived ? archived === 'true' : undefined;
    return this.notesService.getAll(category, isArchived);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.getById(id);
  }

  @Post()
  async create(@Body() data: CreateNoteDTO) {
    return this.notesService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateNoteDTO,
  ) {
    return this.notesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.delete(id);
  }
}
