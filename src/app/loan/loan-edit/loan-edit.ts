import { GameService } from './../../game/game';
import { LoanService } from './../loan';
import { Component, Inject, OnInit } from '@angular/core';
import { Loan } from '../model/loan';
import { Game } from '../../game/model/Game';
import { Client } from '../../client/model/client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../client/client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-loan-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './loan-edit.html',
  styleUrl: './loan-edit.scss',
})
export class LoanEdit implements OnInit {
  loan: Loan;
  games: Game[];
  clients: Client[];

  constructor(
    public dialogRef: MatDialogRef<LoanEdit>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
  ) {}

  ngOnInit(): void {
    this.loan = this.data.loan ? Object.assign({}, this.data.loan) : new Loan();

    this.gameService.getGames().subscribe((games) => {
      this.games = games;

      if (this.loan.game != null) {
        const gameFilter: Game[] = games.filter((game) => game.id == this.data.loan.game.id);

        if (gameFilter != null) {
          this.loan.game = gameFilter[0];
        }
      }
    });

    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;

      if (this.loan.client != null) {
        const clientFilter: Client[] = clients.filter(
          (client) => client.id == this.data.loan.client.id,
        );

        if (clientFilter != null) {
          this.loan.client = clientFilter[0];
        }
      }
    });
  }

  onSave() {
    this.loanService.saveLoan(this.loan).subscribe((result) => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
