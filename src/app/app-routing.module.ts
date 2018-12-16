import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { KeywordSearchComponent } from './pages/keyword-search/keyword-search.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { DataInputComponent } from './pages/data-input/data-input.component';
import { StandardsOrgSearchComponent } from './pages/standards-org-search/standards-org-search.component';
import { EditStandardComponent } from './pages/edit-standard/edit-standard.component';
import { CSIssuesComponent } from './pages/c-s-issues/c-s-issues.component';
import { CSIssueDetailComponent } from './pages/c-s-issue-detail/c-s-issue-detail.component';
import { CreateCSIssueComponent } from './pages/create-c-s-issue/create-c-s-issue.component';
import { EditCSIssueComponent } from './pages/edit-c-s-issue/edit-c-s-issue.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ChangeRequestsComponent } from './pages/change-requests/change-requests.component';
import { DivisionOrganizationComponent } from './pages/division-organization/division-organization.component';
import { AuthGuard } from './service/auth.guard';


/* Routing path */
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/keyword-search',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'keyword-search',
    component: KeywordSearchComponent
  },
  {
    path: 'keyword-search/edit-standard/:id',
    component: EditStandardComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'Administrator',
        'AdminApprover',
        'DataManager'
      ]
    }
  },
  {
    path: 'keyword-search/edit-standard/:id/clone',
    component: EditStandardComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'Administrator',
        'AdminApprover',
        'DataManager'
      ]
    }
  },
  {
    path: 'standards-org-search',
    component: StandardsOrgSearchComponent
  },
  {
    path: 'send-email',
    component: SendEmailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'Administrator',
        'AdminApprover',
        'DataManager'
      ]
    }
  },
  {
    path: 'data-input',
    component: DataInputComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'Administrator',
        'AdminApprover',
        'DataManager'
      ]
    }
  },
  {
    path: 'c-s-issues',
    component: CSIssuesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'Administrator',
        'AdminApprover',
        'DataManager'
      ]
    }
  },
  {
    path: 'c-s-issues/detail/:id',
    component: CSIssueDetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'Administrator',
        'AdminApprover',
        'DataManager'
      ]
    }
  },
  {
    path: 'change-requests',
    component: ChangeRequestsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'Administrator',
        'AdminApprover'
      ]
    }
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'Administrator'
      ]
    }
  },
  {
    path: 'create-cns-issue',
    component: CreateCSIssueComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'Administrator',
        'AdminApprover',
        'DataManager'
      ]
    }
  },
  {
    path: 'edit-cns-issue/:id',
    component: EditCSIssueComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'Administrator',
        'AdminApprover',
        'DataManager'
      ]
    }
  },
  {
    path: 'division-organization',
    component: DivisionOrganizationComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'Administrator'
      ]
    }
  },

  { path: '**', redirectTo: '/keyword-search' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
