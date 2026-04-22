import { ClientService } from './../client';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../model/client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './client-edit.html',
  styleUrl: './client-edit.scss',
})
export class ClientEdit implements OnInit {
  errorNameTaken: boolean = false;

  client: Client;

  constructor(
    public dialogRef: MatDialogRef<ClientEdit>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    private clientService: ClientService,
  ) {}

  ngOnInit(): void {
    this.client = this.data.client ? Object.assign({}, this.data.client) : new Client();
  }

  onSave() {
    this.clientService.saveClient(this.client).subscribe({
      next: () => {
        this.errorNameTaken = false;
        this.dialogRef.close();
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorNameTaken = true;
        }
      },
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
