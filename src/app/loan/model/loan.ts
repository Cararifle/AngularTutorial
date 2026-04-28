import { Client } from '../../client/model/client';
import { Game } from '../../game/model/Game';

export class Loan {
  id: number;
  game: Game;
  client: Client;
  loanDate: String | Date | null = null;
  returnDate: String | Date | null = null;
}
