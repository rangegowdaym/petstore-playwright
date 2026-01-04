import { request, APIRequestContext, APIResponse } from '@playwright/test';
import { Pet } from '../models/Pet';
import { config } from '../config/config';

/**
 * Service class for Pet API operations
 */
export class PetService {
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
   * Create a new pet
   */
  async createPet(pet: Pet): Promise<APIResponse> {
    return await this.apiContext.post(config.endpoints.pet.base, {
      data: pet
    });
  }

  /**
   * Update an existing pet
   */
  async updatePet(pet: Pet): Promise<APIResponse> {
    return await this.apiContext.put(config.endpoints.pet.base, {
      data: pet
    });
  }

  /**
   * Get pet by ID
   */
  async getPetById(petId: number): Promise<APIResponse> {
    return await this.apiContext.get(config.endpoints.pet.petById(petId));
  }

  /**
   * Find pets by status
   */
  async getPetsByStatus(status: string): Promise<APIResponse> {
    return await this.apiContext.get(config.endpoints.pet.findByStatus, {
      params: { status }
    });
  }

  /**
   * Delete a pet
   */
  async deletePet(petId: number): Promise<APIResponse> {
    return await this.apiContext.delete(config.endpoints.pet.petById(petId));
  }

  /**
   * Dispose the API context
   */
  async dispose(): Promise<void> {
    await this.apiContext.dispose();
  }
}
