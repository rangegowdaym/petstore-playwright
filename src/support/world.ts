import { World, IWorldOptions } from '@cucumber/cucumber';
import { APIResponse } from '@playwright/test';
import { PetService } from '../services/petService';
import { UserService } from '../services/userService';
import { StoreService } from '../services/storeService';
import { Pet } from '../models/Pet';
import { User } from '../models/User';
import { Order } from '../models/Order';

/**
 * Custom World class for Cucumber context
 * Maintains state and services across step definitions
 */
export class CustomWorld extends World {
  // Services
  public petService!: PetService;
  public userService!: UserService;
  public storeService!: StoreService;

  // Response storage
  public response?: APIResponse;
  public responseBody?: any;

  // Pet context
  public currentPet?: Pet;
  public petId?: number;

  // User context
  public currentUser?: User;
  public username?: string;

  // Order context
  public currentOrder?: Order;
  public orderId?: number;

  constructor(options: IWorldOptions) {
    super(options);
  }

  /**
   * Initialize services
   */
  async initServices(): Promise<void> {
    this.petService = new PetService();
    await this.petService.init();

    this.userService = new UserService();
    await this.userService.init();

    this.storeService = new StoreService();
    await this.storeService.init();
  }

  /**
   * Dispose services
   */
  async disposeServices(): Promise<void> {
    if (this.petService) {
      await this.petService.dispose();
    }
    if (this.userService) {
      await this.userService.dispose();
    }
    if (this.storeService) {
      await this.storeService.dispose();
    }
  }
}
