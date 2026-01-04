import { APIRequestContext, APIResponse } from '@playwright/test';
import { Pet } from '../models/Pet';
import { ApiConfig } from '../config/ApiConfig';

/**
 * PetClient - API client for Pet endpoints
 */
export class PetClient {
  constructor(private request: APIRequestContext) {}

  /**
   * Create a new pet
   * @param pet Pet object
   * @returns API response
   */
  async createPet(pet: Pet): Promise<APIResponse> {
    return await this.request.post(ApiConfig.ENDPOINTS.PET, {
      data: pet,
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * Update an existing pet
   * @param pet Pet object
   * @returns API response
   */
  async updatePet(pet: Pet): Promise<APIResponse> {
    return await this.request.put(ApiConfig.ENDPOINTS.PET, {
      data: pet,
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * Get pet by ID
   * @param petId Pet ID
   * @returns API response
   */
  async getPetById(petId: number): Promise<APIResponse> {
    return await this.request.get(ApiConfig.ENDPOINTS.PET_BY_ID(petId), {
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * Find pets by status
   * @param status Pet status (available, pending, sold)
   * @returns API response
   */
  async getPetsByStatus(status: string): Promise<APIResponse> {
    return await this.request.get(ApiConfig.ENDPOINTS.PET_FIND_BY_STATUS, {
      params: { status },
      headers: ApiConfig.HEADERS
    });
  }

  /**
   * Delete a pet
   * @param petId Pet ID
   * @returns API response
   */
  async deletePet(petId: number): Promise<APIResponse> {
    return await this.request.delete(ApiConfig.ENDPOINTS.PET_BY_ID(petId), {
      headers: ApiConfig.HEADERS
    });
  }
}
