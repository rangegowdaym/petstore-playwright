/**
 * User interface representing a user entity in the Petstore API
 */
export interface User {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phone?: string;
  userStatus?: number;
}
