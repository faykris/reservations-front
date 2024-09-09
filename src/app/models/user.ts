export class User {
  id: number | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  password: string | undefined;
  roles: { id: string; name: 'ADMIN' | 'CUSTOMER' }[] | undefined;
  username: string | undefined;
}
