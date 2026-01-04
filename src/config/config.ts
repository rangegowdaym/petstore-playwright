/**
 * API Configuration
 */
export const config = {
  baseUrl: 'https://petstore.swagger.io/v2',
  timeout: 30000,
  endpoints: {
    pet: {
      base: '/pet',
      findByStatus: '/pet/findByStatus',
      petById: (id: number) => `/pet/${id}`
    },
    store: {
      inventory: '/store/inventory',
      order: '/store/order',
      orderById: (id: number) => `/store/order/${id}`
    },
    user: {
      base: '/user',
      userByUsername: (username: string) => `/user/${username}`,
      login: '/user/login',
      logout: '/user/logout'
    }
  }
};
