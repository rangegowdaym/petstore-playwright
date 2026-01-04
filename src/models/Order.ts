/**
 * Order interface representing a store order in the Petstore API
 */
export interface Order {
  id?: number;
  petId: number;
  quantity: number;
  shipDate?: string;
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;
}
