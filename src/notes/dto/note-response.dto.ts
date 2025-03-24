import { Note } from '@prisma/client';
import { CategoryResponseDTO } from 'src/categories/dto/category-response.dto';

export class NoteResponseDTO {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  categories: CategoryResponseDTO[];
  createdAt: string;
  updatedAt: string;

  static fromPrisma(
    note: Note & { categories: CategoryResponseDTO[] },
  ): NoteResponseDTO {
    const response = new NoteResponseDTO();

    response.id = note.id;
    response.title = note.title;
    response.content = note.content;
    response.isArchived = note.isArchived;
    response.createdAt = note.createdAt.toISOString();
    response.updatedAt = (note.updatedAt as Date).toISOString();
    response.categories = note.categories.map((category) => ({
      id: category.id,
      title: category.title,
    }));
    return response;
  }
}
