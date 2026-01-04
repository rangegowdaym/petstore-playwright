import { Category } from './Category';
import { Tag } from './Tag';

/**
 * Pet interface representing a pet entity in the Petstore API
 */
export interface Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls?: string[];
  tags?: Tag[];
  status?: 'available' | 'pending' | 'sold';
}
