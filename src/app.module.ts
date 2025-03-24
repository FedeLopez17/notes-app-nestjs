import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [NotesModule, PrismaModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
