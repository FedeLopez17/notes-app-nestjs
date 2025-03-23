export interface NoteCreateDTO {
  title: string;
  content: string;
  isArchived?: boolean;
  categories?: number[];
}
