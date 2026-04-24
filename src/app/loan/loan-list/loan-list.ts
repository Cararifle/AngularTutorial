import { LoanService } from './../loan';
import { GameService } from './../../game/game';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Loan } from '../model/loan';
import { Game } from '../../game/model/Game';
import { Client } from '../../client/model/client';
import { ClientService } from '../../client/client';
import { MatDialog } from '@angular/material/dialog';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation';
import { LoanEdit } from '../loan-edit/loan-edit';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [
    MatPaginator,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './loan-list.html',
  styleUrl: './loan-list.scss',
})
export class LoanList implements OnInit {
  loans: Loan[];
  games: Game[];
  clients: Client[];
  filterGame: Game;
  filterClient: Client;
  filterDate: Date;

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'loanDate', 'returnDate', 'action'];

  constructor(
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => (this.games = games));
    this.clientService.getClients().subscribe((clients) => (this.clients = clients));
    this.loadPage();
  }

  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    const gameId = this.filterGame != null ? this.filterGame.id : null;
    const clientId = this.filterClient != null ? this.filterClient.id : null;
    const dateFilter = this.filterDate;

    this.loanService.getLoans(pageable, gameId, clientId, dateFilter).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  onCleanFilter(): void {
    this.filterGame = null;
    this.filterClient = null;
    this.filterDate = null;
    this.onSearch();
  }

  onSearch(): void {
    this.loadPage();
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit;
    });
  }

  editLoan(loan: Loan) {
    const dialogRef = this.dialog.open(LoanEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit;
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar prestamo',
        description:
          'Atención si borra el prestamo se perderán sus datos.<br> ¿Desea eliminar el prestamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }
}
