import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [
        UserListComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        UserRoutingModule,
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatIconModule
    ],
    providers: [UserService],
})
export class UserModule { }
