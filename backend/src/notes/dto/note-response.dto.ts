import { Note } from '@prisma/client';

export class NoteResponseDTO {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  categoryIds: number[];
  createdAt: string;

  static fromPrisma(
    note: Note & { categories: { id: number }[] },
  ): NoteResponseDTO {
    const response = new NoteResponseDTO();
    response.id = note.id;
    response.title = note.title;
    response.content = note.content;
    response.isArchived = note.isArchived;
    response.createdAt = note.createdAt.toISOString();
    response.categoryIds = note.categories.map((category) => category.id) || [];
    return response;
  }
}
