import { Category } from './Category';
import { Tag } from './Tag';

/**
 * Pet model for Petstore API
 */
export interface Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status: 'available' | 'pending' | 'sold';
}
