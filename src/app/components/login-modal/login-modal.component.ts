import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-modal',
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
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoginModalComponent>,
    private http: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogIn(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.http
        .post<
          { accessToken: string; userId: string } | undefined
        >(`${environment.API_URL}/auth/login`, loginData)
        .subscribe({
          next: (response) => {
            if (response?.accessToken) {
              localStorage.setItem('authToken', response.accessToken);
              localStorage.setItem('userId', response.userId);
            }

            this.dialogRef.close({ token: response?.accessToken });
          },
          error: (error) => {
            this.errorMessage = 'Username or password is incorrect.';
            console.error('Login error:', error);
          },
        });
    }
  }

  onCancelLogin(): void {
    this.dialogRef.close();
  }

  get f() {
    return this.loginForm.controls;
  }
}
