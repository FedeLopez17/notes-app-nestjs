import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryResponseDTO } from './dto/category-response.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<CategoryResponseDTO[]> {
    return this.prisma.category.findMany();
  }

  async create(data: CreateCategoryDTO): Promise<CategoryResponseDTO> {
    const existingCategory = await this.prisma.category.findUnique({
      where: { title: data.title },
    });

    if (existingCategory) {
      throw new ConflictException('Category title is already in use');
    }

    return this.prisma.category.create({ data });
  }

  async delete(id: number) {
    try {
      return this.prisma.category.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(
        `Cannot delete: Category with ID ${id} not found.`,
      );
    }
  }
}
