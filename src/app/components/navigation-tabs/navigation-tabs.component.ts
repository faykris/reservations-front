import { Component, inject, ViewChild } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { HeaderBarComponent } from '../../components/header/header-bar.component';
import { RoomListComponent } from '../../components/room-list/room-list.component';
import { ReservationListComponent } from '../../components/reservation-list/reservation-list.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';
import { SignUpModalComponent } from '../../components/sign-up-modal/sign-up-modal.component';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatInput, MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import {
  MatButton,
  MatIconButton,
  MatMiniFabButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navigation-tabs',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    HeaderBarComponent,
    RoomListComponent,
    HeaderBarComponent,
    RoomListComponent,
    HeaderBarComponent,
    ReservationListComponent,
    MatLabel,
    MatFormField,
    MatDatepickerInput,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    NgIf,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatButton,
    MatIcon,
    MatMiniFabButton,
    MatIconButton,
  ],
  templateUrl: './navigation-tabs.component.html',
  styleUrl: './navigation-tabs.component.scss',
})
export class NavigationTabsComponent {
  readonly dialog = inject(MatDialog);
  readonly signUpDialog = inject(MatDialog);
  isLoggedIn = false;
  previousTabIndex = 0;
  isReservationsTabActive = false;
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  checkInDate: string | undefined;
  checkOutDate: string | undefined;
  guests: string | undefined;

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  onTabChange(event: number): void {
    if (event === 1 && !this.isLoggedIn) {
      this.tabGroup.selectedIndex = this.previousTabIndex;
      this.openLoginDialog();
    } else if (event === 1 && this.isLoggedIn) {
      this.isReservationsTabActive = true;
    } else {
      this.isReservationsTabActive = false;
      this.previousTabIndex = event;
    }
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.token) {
        this.isLoggedIn = true;
        this.tabGroup.selectedIndex = 1;
      } else {
        this.tabGroup.selectedIndex = 0;
      }
    });
  }

  openSignUpDialog() {
    const dialogRef = this.signUpDialog.open(SignUpModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.openLoginDialog();
      }
    });
  }

  handleSearch = (
    checkInDate: string,
    checkOutDate: string,
    guests: string
  ): void => {
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.guests = guests;
  };

  openReservationsTab(): void {
    this.isLoggedIn = true;
    this.tabGroup.selectedIndex = 1;
    this.isReservationsTabActive = true;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');

    this.isLoggedIn = false;

    this.tabGroup.selectedIndex = 0;
    this.isReservationsTabActive = false;
  }
}
