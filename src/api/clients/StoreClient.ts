import { APIRequestContext, APIResponse } from '@playwright/test';
import { Order } from '../models/Order';
import { ApiConfig } from '../config/ApiConfig';

/**
 * StoreClient - API client for Store endpoints
 */
export class StoreClient {
  constructor(private request: APIRequestContext) {}

  /**
   * Get store inventory
   * @returns API response
   */
  async getInventory(): Promise<APIResponse> {
    return await this.request.get(ApiConfig.ENDPOINTS.STORE_INVENTORY, {
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * Place an order for a pet
   * @param order Order object
   * @returns API response
   */
  async placeOrder(order: Order): Promise<APIResponse> {
    return await this.request.post(ApiConfig.ENDPOINTS.STORE_ORDER, {
      data: order,
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * Get order by ID
   * @param orderId Order ID
   * @returns API response
   */
  async getOrderById(orderId: number): Promise<APIResponse> {
    return await this.request.get(ApiConfig.ENDPOINTS.STORE_ORDER_BY_ID(orderId), {
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * Delete an order
   * @param orderId Order ID
   * @returns API response
   */
  async deleteOrder(orderId: number): Promise<APIResponse> {
    return await this.request.delete(ApiConfig.ENDPOINTS.STORE_ORDER_BY_ID(orderId), {
      headers: ApiConfig.HEADERS
    });
  }
}
