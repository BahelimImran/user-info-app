import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
    { path: 'users', component: UserListComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: '**', redirectTo: '/users' },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
