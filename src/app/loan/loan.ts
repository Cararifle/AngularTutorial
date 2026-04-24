import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOAN_DATA } from './model/mock-loan';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/loan';
import { LoanPage } from './model/LoanPage';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor() {}

  getLoans(
    pageable: Pageable,
    gameId?: number,
    clientId?: number,
    date?: Date,
  ): Observable<LoanPage> {
    let filtered = LOAN_DATA;
    if (gameId) {
      filtered = filtered.filter((loan) => loan.game.id === gameId);
    }
    if (clientId) {
      filtered = filtered.filter((loan) => loan.client.id === clientId);
    }
    if (date) {
      filtered = filtered.filter((loan) => loan.loanDate >= date && date <= loan.returnDate);
    }
    const totalElements = filtered.length;
    const start = pageable.pageNumber * pageable.pageSize;
    const end = start + pageable.pageSize;
    const content = filtered.slice(start, end);
    const loanPage: LoanPage = {
      content,
      pageable,
      totalElements,
    };
    return of(loanPage);
  }

  saveLoan(loan: Loan): Observable<void> {
    return of(null);
  }

  deleteLoan(loan: Loan): Observable<void> {
    return of(null);
  }
}
