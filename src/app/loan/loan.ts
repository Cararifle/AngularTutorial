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
    const params = new URLSearchParams();
    if (gameId != null) {
      params.set('idGame', gameId.toString());
    }
    if (clientId != null) {
      params.set('idClient', clientId.toString());
    }
    if (date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const dateStr = `${day}/${month}/${year}`;
      params.set('date', dateStr);
    }

    const url = params.toString() ? `${this.baseUrl}?${params.toString()}` : this.baseUrl;
    return this.http.post<LoanPage>(url, { pageable });
  }

  saveLoan(loan: Loan): Observable<Loan> {
    const hasId = loan.id !== undefined && loan.id !== null;
    const url = hasId ? `${this.baseUrl}/${loan.id}` : this.baseUrl;
    return this.http.put<Loan>(url, loan);
  }

  deleteLoan(idLoan: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
  }
}
