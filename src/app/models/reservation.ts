import { User } from './user';
import { Room } from './room';

export class Reservation {
  id: number | undefined;
  user: User | undefined;
  room: Room | undefined;
  checkIn: string | undefined;
  checkOut: string | undefined;
  status: string | undefined;
  totalPrice: number | undefined;
}
