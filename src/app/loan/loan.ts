import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/loan';
import { LoanPage } from './model/LoanPage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/loan';

  getLoans(
    pageable: Pageable,
    gameId?: number,
    clientId?: number,
    date?: Date,
  ): Observable<LoanPage> {
    const body: any = { pageable };
    if (gameId != null) {
      body.gameId = gameId;
    }
    if (clientId != null) {
      body.clientId = clientId;
    }
    if (date) {
      body.date = date;
    }

    return this.http.post<LoanPage>(this.baseUrl, body);
  }

  saveLoan(loan: Loan): Observable<Loan> {
    const { id } = loan;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Loan>(url, loan);
  }

  deleteLoan(idLoan: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
  }
}
