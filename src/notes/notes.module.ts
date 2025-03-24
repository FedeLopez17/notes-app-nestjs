import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [NotesService],
  controllers: [NotesController],
  imports: [PrismaModule],
})
export class NotesModule {}
