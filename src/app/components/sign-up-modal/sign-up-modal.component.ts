import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-up-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatInput,
    ReactiveFormsModule,
    NgIf,
    MatLabel,
    MatError,
  ],
  templateUrl: './sign-up-modal.component.html',
  styleUrl: './sign-up-modal.component.scss',
})
export class SignUpModalComponent {
  signupForm!: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SignUpModalComponent>,
    private http: HttpClient
  ) {
    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
    });
  }

  onSignUp(): void {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;

      this.http
        .post(`${environment.API_URL}/auth/register`, signupData)
        .subscribe({
          next: () => {
            console.log('User registered successfully NEXT');
            this.dialogRef.close({ success: true });
          },
          error: (error) => {
            console.log('User error ', error);
            this.errorMessage = 'An error occurred. Please try again.';
          },
        });
    }
  }

  onCancelSignUp(): void {
    this.dialogRef.close();
  }

  get f() {
    return this.signupForm.controls;
  }
}
