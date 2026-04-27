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

  backendErrors: Record<string, string | null> = {
    GAME_ALREADY_LOANED: null,
    CLIENT_LOAN_LIMIT_EXCEEDED: null,
    LOAN_PERIOD_EXCEEDS_LIMIT: null,
    RETURN_DATE_BEFORE_LOAN_DATE: null,
  };

  onSave() {
    this.loanService.saveLoan(this.loan).subscribe({
      next: () => {
        this.backendErrors = {};
        this.dialogRef.close();
      },
      error: (err) => {
        this.backendErrors = {};

        if (err.status === 409 && err.error?.errorCode) {
          this.backendErrors[err.error.errorCode] = err.error.message;
        }
      },
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onLoanDateChange(date: Date | null) {
    if (date) {
      this.loan.loanDate = this.toLocalDateString(date);
    }
  }

  onReturnDateChange(date: Date | null) {
    if (date) {
      this.loan.returnDate = this.toLocalDateString(date);
    }
  }

  private toLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
