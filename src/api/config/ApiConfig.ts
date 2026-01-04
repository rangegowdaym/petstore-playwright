/**
 * API Configuration for Petstore API
 */
export class ApiConfig {
  static readonly BASE_URL = process.env.API_BASE_URL || 'https://petstore.swagger.io/v2';
  static readonly TIMEOUT = parseInt(process.env.API_TIMEOUT || '30000');
  
  static readonly ENDPOINTS = {
    // Pet endpoints
    PET: '/pet',
    PET_BY_ID: (id: number) => `/pet/${id}`,
    PET_FIND_BY_STATUS: '/pet/findByStatus',
    
    // Store endpoints
    STORE_INVENTORY: '/store/inventory',
    STORE_ORDER: '/store/order',
    STORE_ORDER_BY_ID: (id: number) => `/store/order/${id}`,
    
    // User endpoints
    USER: '/user',
    USER_BY_USERNAME: (username: string) => `/user/${username}`,
    USER_LOGIN: '/user/login',
    USER_LOGOUT: '/user/logout'
  };

  static readonly HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
}
