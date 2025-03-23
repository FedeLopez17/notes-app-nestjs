import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryResponseDTO } from './dto/category-response.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<CategoryResponseDTO[]> {
    return this.prisma.category.findMany();
  }

  create(data: CreateCategoryDTO): Promise<CategoryResponseDTO> {
    return this.prisma.category.create({ data });
  }

  delete(id: number) {
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
