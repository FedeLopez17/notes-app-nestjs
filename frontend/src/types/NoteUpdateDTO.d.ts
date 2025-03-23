export interface NoteUpdateDTO {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  categories: number[];
}
