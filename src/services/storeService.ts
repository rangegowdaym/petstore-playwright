import { request, APIRequestContext, APIResponse } from '@playwright/test';
import { Order } from '../models/Order';
import { config } from '../config/config';

/**
 * Service class for Store API operations
 */
export class StoreService {
  private apiContext!: APIRequestContext;

  /**
   * Initialize the API context
   */
  async init(): Promise<void> {
    this.apiContext = await request.newContext({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Get store inventory
   */
  async getInventory(): Promise<APIResponse> {
    return await this.apiContext.get(config.endpoints.store.inventory);
  }

  /**
   * Place an order
   */
  async placeOrder(order: Order): Promise<APIResponse> {
    return await this.apiContext.post(config.endpoints.store.order, {
      data: order
    });
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId: number): Promise<APIResponse> {
    return await this.apiContext.get(config.endpoints.store.orderById(orderId));
  }

  /**
   * Delete order
   */
  async deleteOrder(orderId: number): Promise<APIResponse> {
    return await this.apiContext.delete(config.endpoints.store.orderById(orderId));
  }

  /**
   * Dispose the API context
   */
  async dispose(): Promise<void> {
    await this.apiContext.dispose();
  }
}
