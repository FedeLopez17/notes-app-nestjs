import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoteResponseDTO } from './dto/note-response.dto';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(
    category?: string,
    isArchived?: boolean,
  ): Promise<NoteResponseDTO[]> {
    const notes = await this.prisma.note.findMany({
      where: {
        categories: category ? { some: { title: category } } : undefined,
        isArchived: isArchived === undefined ? false : isArchived,
      },
      include: { categories: true },
    });

    return notes.map((note) => NoteResponseDTO.fromPrisma(note));
  }

  async getById(id: number): Promise<NoteResponseDTO | null> {
    const note = await this.prisma.note.findUnique({
      where: { id },
      include: { categories: true },
    });

    if (!note) throw new NotFoundException(`Note with ID ${id} not found.`);

    return NoteResponseDTO.fromPrisma(note);
  }

  async create(data: CreateNoteDTO): Promise<NoteResponseDTO> {
    const createdNote = await this.prisma.note.create({
      data,
      include: { categories: true },
    });
    return NoteResponseDTO.fromPrisma(createdNote);
  }

  async update(id: number, data: UpdateNoteDTO): Promise<NoteResponseDTO> {
    try {
      const updatedNote = await this.prisma.note.update({
        where: { id },
        data: {
          ...data,
          categories: data.categories
            ? { set: data.categories.map((id) => ({ id })) }
            : undefined,
        },
        include: { categories: true },
      });
      return NoteResponseDTO.fromPrisma(updatedNote);
    } catch {
      throw new NotFoundException(
        `Cannot update: Note with ID ${id} not found.`,
      );
    }
  }

  async delete(id: number): Promise<NoteResponseDTO> {
    try {
      const deletedNote = await this.prisma.note.delete({
        where: { id },
        include: { categories: true },
      });
      return NoteResponseDTO.fromPrisma(deletedNote);
    } catch {
      throw new NotFoundException(
        `Cannot delete: Note with ID ${id} not found.`,
      );
    }
  }
}
