# Codes & Standards

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Lint

Run `ng lint` to check if your project has any linting problems.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# thor-early

# Submission Running
-------------------------------------------------------------------------------------
  1) Node Version - Above 8.9.*
  2) Angular Cli Version - 6.1.2.
  3) *Run* npm install in "early-alert-tool"
  4) *Run* `ng serve --o`, it will open the app in http://localhost:4200

# Backend Server
-------------------------------------------------------------------------------------
  Deploy the backend and configure in `environment.ts`
  Current backend url is -  http://localhost:8081/api/v1

# Used Libraries
-------------------------------------------------------------------------------------
  1) @lodash
  2) @angular-l10n
  3) @ng-pick-datetime
  4) @ngx-masonry
  5) @ngx-quill
  6) @quill
  7) @json-server
  8) @angular-sortablejs
  9) @sortablejs

# Reusable Components
-------------------------------------------------------------------------------------

    1. Form Components
    -------------------------------------------------------------------------------------
      1) Checkbox           - components/checkbox     `<app-checkbox></app-checkbox>`
      2) Textbox            - components/textbox      `<app-textbox></app-textbox>`
      3) Model              - components/model        `<app-model></app-model>`
      4) Textarea           - components/textarea     `<app-textarea></app-textarea>`
      5) Dropdown           - components/dropdown     `<app-dropdown></app-dropdown>`
      6) Date-Picker        - components/date-picker  `<appdate-picker></date-picker>`
      7) Time-picker        - components/time-picker  `<app-time-picker></app-time-picker>`
      8) Pagination         - components/pagination   `<app-pagination></app-pagination>`
      9) Input-Tag          - components/input-tag    `<app-input-tag></app-input-tag>`
      10) Navigation Tab    - components/navigation-tab `<app-navigation-tab></app-navigation-tab>`

    2. Page Shared Components
    -------------------------------------------------------------------------------------
      1) Footer             - shared/footer
      2) Header             - shared/header
      3) Header SEARCH      - shared/header-search
      4) Header Org SEARCH  - shared/header-org-search
      5) Left Navigation    - shared/left-navigation

    3. Page Components
    -------------------------------------------------------------------------------------
      1) Search Results Table       - components/search-results-table
      2) Standard Org Selection     - components/standard-org-selection
      3) Standard Available Detail  - components/standard-available-detail
      4) Recent Standards List      - components/recent-standards-list
      5) Send Mail Form             - components/send-mail-form
      6) Data Input Forms           - components/data-input-forms
      7) C S Issues Table           - components/c-s-issues-table
      8) C S Issues Detail Panel    - components/c-s-issues-detail-panel
      9) User Management Table      - components/user-management-table
      10) Change Requests Table     - components/change-requests-table
      

# User Roles
-------------------------------------------------------------------------------------

  | Username              | Password                  |
  | --------------------- | ------------------------- |
  | admin                 | Password123               |
  | datamanager           | Password123               |
  | approver              | Password123               |

# Page URL's
-------------------------------------------------------------------------------------
  1) login                                    -   Login
  2) keyword-search                           -   Keyword-Search
  3) standards-org-search                     -   Standards-Org-Search
  4) send-email                               -   Send-Email
  5) data-input                               -   Data-Input
  6) keyword-search/edit-standard/:id         -   Edit-Standard
  7) c-s-issues                               -   C-S-Issues
  8) c-s-issues/detail/:id/                   -   C-S-Issue-Detail
  9) change-requests                          -   Change-Requests
  10) user-management                         -   User-Management

# Translation
-------------------------------------------------------------------------------------

  Submission implements 3 language translation support.
    1. English
    2. Spanish
    3. French

# Heroku
-------------------------------------------------------------------------------------

URL:

Assuming that you sign up heroku and create app
under created app, go to deploy tab and follow bottom most guide to login/git push the whole submission to heroku then view the app on browser.

Deploy app to Heroku
1 In early-alert-tool/src/environments/environment.prod.ts,update 'apiBase' to be:
  apiBase: 'https://alert-json-server.herokuapp.com/'
2 Create a app on Heroku(for example,my app name is 'app-alert-tool')
3 $ cd early-alert-tool/
  $ git init
  $ heroku git:remote -a app-alert-tool
4 $ git add .
  $ git commit -am "make it better"
  $ git push heroku master

For more details refer following link - https://medium.com/@babubhai/how-to-deploy-angular-6-app-to-heroku-52b73ac7a3aa

# Language selection is supported on new pages
 