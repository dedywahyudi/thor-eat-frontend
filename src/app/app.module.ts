import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { NgxMasonryModule } from 'ngx-masonry';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { QuillModule } from 'ngx-quill';
import { SortablejsModule } from 'angular-sortablejs';

import {
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    NgxUiLoaderConfig,
    POSITION,
    SPINNER,
    PB_DIRECTION,
    NgxUiLoaderHttpConfig
} from 'ngx-ui-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { KeywordSearchComponent } from './pages/keyword-search/keyword-search.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftNavigationComponent } from './shared/left-navigation/left-navigation.component';
import { SearchResultsTableComponent } from './components/search-results-table/search-results-table.component';
import { CSIssuesTableComponent } from './components/c-s-issues-table/c-s-issues-table.component';
import { UserManagementTableComponent } from './components/user-management-table/user-management-table.component';
import { ChangeRequestsTableComponent } from './components/change-requests-table/change-requests-table.component';
import { CSIssuesDetailPanelComponent } from './components/c-s-issues-detail-panel/c-s-issues-detail-panel.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { DataInputComponent } from './pages/data-input/data-input.component';
import { StandardsOrgSearchComponent } from './pages/standards-org-search/standards-org-search.component';
import { EditStandardComponent } from './pages/edit-standard/edit-standard.component';
import { CSIssuesComponent } from './pages/c-s-issues/c-s-issues.component';
import { CSIssueDetailComponent } from './pages/c-s-issue-detail/c-s-issue-detail.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ChangeRequestsComponent } from './pages/change-requests/change-requests.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { HeaderSearchComponent } from './shared/header-search/header-search.component';
import { HeaderOrgSearchComponent } from './shared/header-org-search/header-org-search.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

import { L10nConfig, L10nLoader, LocalizationModule, StorageStrategy, ProviderType } from 'angular-l10n';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CreateCSIssueComponent } from './pages/create-c-s-issue/create-c-s-issue.component';
import { DataInputFormsComponent } from './components/data-input-forms/data-input-forms.component';
import { NavigationTabComponent } from './components/navigation-tab/navigation-tab.component';
import { ModelComponent } from './components/model/model.component';
import { SendMailFormComponent } from './components/send-mail-form/send-mail-form.component';
import { InputTagComponent } from './components/input-tag/input-tag.component';
import { RecentStandardsListComponent } from './components/recent-standards-list/recent-standards-list.component';
import { StandardOrgSelectionComponent } from './components/standard-org-selection/standard-org-selection.component';
import { StandardAvailableDetailComponent } from './components/standard-available-detail/standard-available-detail.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { TagInputModule } from 'ngx-chips';
import { DatexPipe } from './shared/pipes/datex.pipe';
import { AuthGuard } from './service/auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditCSIssueComponent } from './pages/edit-c-s-issue/edit-c-s-issue.component';
import { DivisionOrganizationComponent } from './pages/division-organization/division-organization.component';
import { DivisionTableComponent } from './components/division-table/division-table.component';
import { OrganizationTableComponent } from './components/organization-table/organization-table.component';

const l10nConfig: L10nConfig = {
    locale: {
        languages: [
            { code: 'en', dir: 'ltr' },
            { code: 'fr', dir: 'ltr' },
            { code: 'es', dir: 'ltr' }
        ],
        defaultLocale: { languageCode: 'en', countryCode: 'US' },
        currency: 'USD',
        storage: StorageStrategy.Cookie,
        cookieExpiration: 30
    },
    translation: {
        providers: [
            { type: ProviderType.Static, prefix: './assets/locale/locale-' }
        ],
        caching: true,
        composedKeySeparator: '.',
        missingValue: 'No key',
        i18nPlural: true
    }
};

// configuration for loader
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: '#0c6ad2',
    fgsColor: '#0c6ad2',
    pbColor: '#0c6ad2',
    bgsPosition: POSITION.bottomCenter,
    bgsSize: 40,
    bgsType: SPINNER.rectangleBounce,
    pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
    pbThickness: 5, // progress bar thickness,
    hasProgressBar: true
};

// configuration for http request loader
const ngxHttpLoaderConfig: NgxUiLoaderHttpConfig = {
    showForeground: true
};

// Advanced initialization.
export function initL10n(l10nLoader: L10nLoader): Function {
    return () => l10nLoader.load();
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        KeywordSearchComponent,
        FooterComponent,
        HeaderComponent,
        LeftNavigationComponent,
        SearchResultsTableComponent,
        CSIssuesTableComponent,
        UserManagementTableComponent,
        ChangeRequestsTableComponent,
        CSIssuesDetailPanelComponent,
        CreateCSIssueComponent,
        SendEmailComponent,
        DataInputComponent,
        StandardsOrgSearchComponent,
        EditStandardComponent,
        CSIssuesComponent,
        CSIssueDetailComponent,
        CreateCSIssueComponent,
        EditCSIssueComponent,
        ChangeRequestsComponent,
        UserManagementComponent,
        TextboxComponent,
        TextareaComponent,
        DropdownComponent,
        HeaderSearchComponent,
        HeaderOrgSearchComponent,
        CheckboxComponent,
        PaginationComponent,
        DataInputFormsComponent,
        NavigationTabComponent,
        ModelComponent,
        SendMailFormComponent,
        InputTagComponent,
        RecentStandardsListComponent,
        StandardOrgSelectionComponent,
        StandardAvailableDetailComponent,
        DatePickerComponent,
        TimePickerComponent,
        DatexPipe,
        DivisionOrganizationComponent,
        DivisionTableComponent,
        OrganizationTableComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TagInputModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderRouterModule,
        NgxUiLoaderHttpModule.forRoot(ngxHttpLoaderConfig),
        AppRoutingModule,
        LocalizationModule.forRoot(l10nConfig),
        NgxMasonryModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        QuillModule,
        SortablejsModule,
        NgxPaginationModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/eat/a'},

        Title,
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        },
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
