import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { chain, uniqBy, map } from 'lodash';
import { StandardDivisionService } from '../../service/standard-division.service';
import { DivisionService } from '../../service/division.service';
import { SubDivisionService } from '../../service/sub-division.service';
import { StandardService } from '../../service/standard.service';
import { CnsIssueService } from '../../service/cns-issue.service';
import { AppConstants } from '../../app.constants';
import { OrganizationService } from '../../service/organization.service';
import { UtilService } from '../../service/util.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-data-input-forms',
  templateUrl: './data-input-forms.component.html',
  styleUrls: ['./data-input-forms.component.scss']
})
export class DataInputFormsComponent implements OnInit, OnChanges {
  @Input() activeTab: any;
  @Output() cancelClick = new EventEmitter();
  @Output() sendModalData = new EventEmitter();

  isEditedMode = false;
  isCloneMode = false;
  isOpenOrgCreateModal = false;
  isOpenDivisionCreateModal = false;
  parentStandardId = 0;
  standardId = 0;
  standardDivisionId = 0;
  cnsIssueId = 0;
  maxErrorMessageLen = 100;
  currentForm = null;
  modalProperties: any = {
    title: '',
    body: ''
  };


  // model for create new Cns issue
  newCnSissue: any = {
    createdBy: null,
    description: null,
    actionPlan: null,
    personsResponsible: [],
    estimatedCompletionDate: null,
    engineerReviewDate: null,
    engineerLeader: null,
    financialImpact: null,
    impactSummary: null,
    vpgmName: null,
    criticalRoleLeadership: null,
    successionPlan: null,
    offensiveDefensive: null,
    externalPartners: null,
    vpgmReviewDate: null,
    priority: null,
    region: null,
    roadmapAlignment: null,
    standard: {
      id: null,
      name: null
    },
    division: {
      id: null,
    },
    organization: {
      id: null,
      name: null
    },
    divisionId: null,
    standardId: null
  };

  // model for create division
  newDivisionModel: any = {
    id: null,
    name: null,
    region: null,
    parentDivision: {
      id: null
    }
  };

  // new standard
  newStandard: any = {
    name: null,
    description: null,
    edition: null,
    date: null,
    organization: {
      id: null,
      name: null
    }
  };

  productLine = [];
  productLineContacts = [];
  emails = [];
  nameOfStandardMail = [];
  personsResponsible = [];
  dataInputTab = true;

  newStandardDivision: any = {
    standard: {
      organization: {
        name: null,
        id: null
      },
      name: null,
      edition: null,
      description: null
    },
    division: {
      name: null
    },
    subDivision: {
      name: null
    },
    productLine: null,
    standardDivisionContact: [],
    standardParticipant: [],
    criticalToBusiness: false,
    date: null,
  };

  standardParticipants = [];
  contactEmails = [];
  standardOptions = [];
  divisionOptions = [];
  cachedDivisionOptions = [];
  subDivisionOptions = this.auth.getCurrentUser().role.name === 'Administrator' ? [{id: 'Add', name: '-- Add New --'}] : [];
  regionOptions = [];
  organizations = [];
  isLoaded = false;
  currentUser: any;

  emailValidators = [(control) => {
    const emails = control.value.split(',');
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (_.some(emails, email => !regex.test(email))) {
      return {email: 'invalid email address'};
    }
    return null;
  }];
  errorMessages = {
    'email': 'Enter valid email adress!'
  };

  priorityOptions = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private standardDivisionService: StandardDivisionService,
    private divisionService: DivisionService,
    private subDivisionService: SubDivisionService,
    private standardService: StandardService,
    private cnsIssueService: CnsIssueService,
    private organizationService: OrganizationService,
    private util: UtilService,
    private auth: AuthService) { }

  /**
   * on init
   */
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.newCnSissue.createdBy = this.auth.getCurrentUser().fullName;
      this.currentUser = this.auth.getCurrentUser();
    }
    this.loadPriorityOptions();
  }

  /**
 * on changes
 * @param changes the changes
 */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeTab.currentValue) {
      this.getResult();
    }
  }

  /**
   * load priority 1 to 25
   */
  loadPriorityOptions() {
    for (let i = 1; i <= 25; i++){
      this.priorityOptions.push({id: i.toString(), name: i.toString()});
    }
  }

  /**
   * gets the result
   */
  getResult() {
    switch (this.activeTab) {
      case 1:
        this.route.params.subscribe(params => {
          // edit mode
          if (params.id) {
            this.standardDivisionService.getById(params.id).subscribe(res => {
              this.newStandardDivision.standard.name = res.standard.name;
              this.newStandardDivision.standard.edition = res.standard.edition;
              this.newStandardDivision.standard.organization.name = res.standard.organization.name;
              this.newStandardDivision.standard.organization.id = res.standard.organization.id;
              this.newStandardDivision.standard.description = res.standard.description;
              this.isCloneMode = this.router.url.endsWith('/clone');
              // edit standard
              if (!this.isCloneMode) {
                this.standardDivisionId = res.id;
                this.newStandardDivision.id = res.id;
                this.newStandardDivision.standard.id = res.standard.id;
                this.standardId = res.standard.id;
                this.newStandardDivision.division.id = res.division.id;
                this.newStandardDivision.subDivision.id = res.subDivision ? res.subDivision.id : '-2';
                this.newStandardDivision.criticalToBusiness = res.criticalToBusiness;
                this.newStandardDivision.comment = res.comment;
                this.newStandardDivision.date = new Date(res.standard.date);
                // handle check box `YES` or `NO` selected
                if (this.newStandardDivision.criticalToBusiness) {
                  this.newStandardDivision['criticalToBusinessShown'] = 'YES';
                } else {
                  this.newStandardDivision['criticalToBusinessShown'] = 'NO';
                }

                this.newStandardDivision.division.name = res.division ? res.division.name : null;
                this.newStandardDivision.subDivision.name = res.subDivision ? res.subDivision.name : '-- None --';

                if (res.productLine) {
                  this.newStandardDivision.productLineId = res.productLine.id;
                  _.forEach(res.productLine.name.split(','), element => {
                    this.productLine.push({ display: element, value: element });
                  });
                  _.forEach(res.productLine.productLineContacts, element => {
                    this.contactEmails.push({ contactEmail: element.contactEmail });
                    this.productLineContacts.push({ display: element.contactEmail, value: element.contactEmail });
                  });
                }

                this.newStandardDivision.standardParticipant = res.standardParticipant;
                this.standardParticipants = res.standardParticipant;
              }

              this.getDivisionOptions(false, false);

              this.subDivisionService.get().subscribe(subDivision => {
                console.log('Get subdiv: ' + subDivision);
                this.subDivisionOptions = [{id: '-2', name: '-- None --'}];
                this.subDivisionOptions.push(...this.auth.getCurrentUser().role.name === 'Administrator' ?
                  [{id: 'Add', name: '-- Add New --'}] : []);
                this.subDivisionOptions.push(...subDivision.items);
              });

              // get standards
              this.standardService.get().subscribe(standards => {
                this.standardOptions = standards.items;
              });

              // get organizations
              this.organizationService.get().subscribe(res0 => {
                this.organizationService.get({ limit: res0.total }).subscribe(res1 => {
                  this.organizations = this.auth.getCurrentUser().role.name === 'Administrator' ? [{id: -1, name: '-- Add New --'}] : [];
                  this.organizations.push(...res1.items);
                }, this.util.logError);
              }, this.util.logError);

              this.isLoaded = true;
              this.isEditedMode = true;
            }, this.util.logError);
          } else {
            // create mode
            this.isLoaded = true;
            this.getDivisionOptions(false, false);

            // get standards
            this.standardService.get().subscribe(res => {
              this.standardOptions = res.items;
            }, this.util.logError);

            // get organizations
            this.organizationService.get().subscribe(res0 => {
              this.organizationService.get({ limit: res0.total }).subscribe(res => {
                this.organizations = this.auth.getCurrentUser().role.name === 'Administrator' ? [{id: -1, name: '-- Add New --'}] : [];
                this.organizations.push(...res.items);
              }, this.util.logError);
            }, this.util.logError);
          }
        });
        break;
      // C&S Issue
      case 2:
        this.route.params.subscribe(params => {
          if (params.id) {
            this.cnsIssueId = params.id;
            this.cnsIssueService.getById(this.cnsIssueId).subscribe(res => {
              console.log(res);
              this.isEditedMode = true;
              this.newCnSissue = {...res};
              this.newCnSissue.personsResponsible = res.personsResponsible.split(';');
              _.forEach(this.newCnSissue.personsResponsible, item => {
                this.personsResponsible.push({display: item, value: item});
              });

              // critical role leadership checkbox
              if (this.newCnSissue.criticalRoleLeadership) {
                this.newCnSissue.criticalRoleLeadership = 'YES';
              } else {
                this.newCnSissue.criticalRoleLeadership = 'NO';
              }

              // offensive or diffensive checkbox
              if (this.newCnSissue.offensiveDefensive === 'Defensive') {
                this.newCnSissue.offensiveDefensive = 'DIFFENSIVE';
              } else {
                this.newCnSissue.offensiveDefensive = 'OFFENSIVE';
              }

              this.standardService.getById(this.newCnSissue.standardId || 1).subscribe(standardData => {
                this.newCnSissue.standardId = standardData.id;
                this.newCnSissue.standard = {};
                this.newCnSissue.standard.id = standardData.id;
                this.newCnSissue.standard.name = standardData.name;
              });

              this.divisionService.getById(this.newCnSissue.divisionId).subscribe(divisionData => {
                this.newCnSissue.division = {};
                this.newCnSissue.division.id = divisionData.id;
                this.newCnSissue.division.name = divisionData.name;
              });

              this.standardService.getById(this.cnsIssueId).subscribe(standardData => {
                this.isLoaded = true;
                this.newCnSissue.organization = {};
                this.newCnSissue.organization.id = standardData.organization.id;
                this.newCnSissue.organization.name = standardData.organization.name;
              }, this.util.logError);
              // check creator name
              console.log(this.newCnSissue);
            }, this.util.logError);
          } else {
            this.isLoaded = true;
          }
        });


        // get standards
        this.standardService.get({ limit: AppConstants.STANDARD_LIMIT }).subscribe(res => {
          this.standardOptions = res.items;
          if (this.isEditedMode) {
            this.standardService.get().subscribe(res => {
              this.standardOptions = res.items;
            });
            this.standardService.getById(this.newCnSissue.standardId || 1).subscribe(standardData => {
              this.newCnSissue.standardId = standardData.id;
              this.newCnSissue.standard = {};
              this.newCnSissue.standard.id = standardData.id;
              this.newCnSissue.standard.name = standardData.name;
            });
          }
        }, this.util.logError);

        // get division
        this.getDivisionOptions(false, false);

        // get regions
        this.regionOptions = AppConstants.REGIONS;

        // get organizations
        this.organizationService.get().subscribe(res0 => {
          this.organizationService.get({ limit: res0.total }).subscribe(res => {
            this.organizations = this.auth.getCurrentUser().role.name === 'Administrator' ? [{id: -1, name: '-- Add New --'}] : [];
            this.organizations.push(...res.items);
          }, this.util.logError);
        }, this.util.logError);
        break;

      // create division or sub division
      case 3:
        this.isEditedMode = false;
        this.regionOptions = AppConstants.REGIONS;
        this.newDivisionModel.parentDivision.name = 'Parent Division Name';
        this.getDivisionOptions(false);
        break;

      // create new standard
      case 4:
        this.organizationService.get().subscribe(res0 => {
          this.organizationService.get({ limit: res0.total }).subscribe(res => {
            this.organizations = res.items;
          }, this.util.logError);
        }, this.util.logError);
    }

    console.dir('ok');
    console.dir(this.newStandardDivision);
  }

  /**
   * get division options
   * @param refresh whether to refresh from db or cache
   */
  getDivisionOptions(refresh, withParent = true) {
    this.divisionOptions = this.auth.getCurrentUser().role.name === 'Administrator' ? [{id: 'Add', name: '-- Add New --'}] : [];
    if (withParent) {
      this.divisionOptions.unshift({id: 'Any', name: 'Parent Division Name'});
    }

    if (this.cachedDivisionOptions.length === 0 || refresh) {
      this.divisionService.getAll().subscribe(division => {
        this.cachedDivisionOptions = division.items;
        this.divisionOptions = this.divisionOptions.concat(division.items);
      }, this.util.logError);
    } else {
      this.divisionOptions = this.divisionOptions.concat(this.cachedDivisionOptions);
    }
  }

  /**
   * handles the tag value add event
   * @param fieldName the field name
   * @param event the event
   */
  onItemAdded(fieldName, event: any) {
    switch (fieldName) {
      case 'productLine':
        this.productLine.pop();
        this.productLine.push(..._.map(event.value.split(','), item => {
          return {value: item};
        }));
        break;
      case 'newStandardDivision.standardParticipant':
        this.newStandardDivision.standardParticipant.pop();
        this.newStandardDivision.standardParticipant.push(...event.value.split(','));
        this.standardParticipants = [...this.newStandardDivision.standardParticipant];
        break;
      case 'newStandardDivision.productLineContact':
        this.contactEmails.push({
          contactEmail: event.value
        });
        break;
      case 'personsResponsible':
        this.newCnSissue[fieldName].pop();
        this.newCnSissue[fieldName].push(...event.value.split(','));
        break;
      default:
        break;
    }
  }

  /**
   * tag value removed in model
   * @param fieldName the field name
   * @param event the event
   */
  onItemRemoved(fieldName, event: any) {
    let i;
    switch (fieldName) {
      case 'productLine':
        break;
      case 'newStandardDivision.standardParticipant':
        for (i = 0; i < this.standardParticipants.length; i++) {
          if (this.standardParticipants[i] === event) {
            this.standardParticipants.splice(i, 1);
            break;
          }
        }
        break;
      case 'nameOfStandardMail':
        _.forEach(this.newStandardDivision.standardParticipant, (item, index) => {
          if (item === event) {
            this.newStandardDivision.standardParticipant.splice(index, 1);
          }
        });
        break;
      case 'newStandardDivision.productLineContact':
        for (i = 0; i < this.contactEmails.length; i++) {
          if (this.contactEmails[i].contactEmail === event.value) {
            this.contactEmails.splice(i, 1);
            break;
          }
        }
        break;
      case 'personsResponsible':
        _.forEach(this.newCnSissue[fieldName], (item, index) => {
          if (item === event.value) {
            this.newCnSissue[fieldName].splice(index, 1);
          }
        });
        break;
      default:
        break;
    }
  }

  /**
   * handles the dropdown selection in `Cns Issue`
   * @param prop the property
   * @param value the selected value
   */
  onSelectCnS(prop: string, value: any, form: any) {
    if (this.activeTab === 2) {
      if (prop === 'division') {
        this.newCnSissue.divisionId = value.id;
        this.newCnSissue.division.id = value.id;
        if (value.id === 'Add') {
          this.modalProperties.title = 'Create New Division or Sub-Division';
          this.isOpenDivisionCreateModal = true;
        }
      }
      if (prop === 'region') {
        this.newCnSissue.region = value.name;
      }
      if (prop === 'standardId') {
        this.newCnSissue.standardId = value.id;
      }
    } else if (this.activeTab === 3) {
      this.currentForm = form;
      if (prop === 'region') {
        this.newDivisionModel.region = value.name;
      } else if (prop === 'parentDivision') {
          if (value.id === 'Any') {
            this.newDivisionModel.parentDivision.id = null;
          } else {
            this.newDivisionModel.parentDivision.id = value.id;
            if (value.id === 'Add') {
              this.modalProperties.title = 'Create New Division or Sub-Division';
              this.isOpenDivisionCreateModal = true;
            } else {
              if (value.region) {
                this.newDivisionModel.region = value.region;
              } else {
                this.newDivisionModel.region = value.name;
              }
            }
          }
      } else {
        this.newDivisionModel[prop] = value.id;
      }
    }
  }

  /**
   * handles the standard selected
   * @param prop the prop
   * @param value the selected value
   */
  onStandardSelect(prop: string, value: any) {
    const key = prop.split('.');
    if (key.length > 1) {
      this.newStandardDivision[key[0]][key[1]] = value.id;
    } else {
      this.newStandardDivision[key[0]] = value;
    }
    if (prop === 'division.id') {
      this.subDivisionOptions = [];
      if (value.id === 'Add') {
        this.modalProperties.title = 'Create New Division or Sub-Division';
        this.isOpenDivisionCreateModal = true;
        this.newStandardDivision.subDivision.name = 'Select';
        this.subDivisionOptions.unshift({id: '-1', name: 'Select'});
        this.subDivisionOptions = [{id: '-2', name: '-- None --'}];
        this.subDivisionOptions.push(...this.auth.getCurrentUser().role.name === 'Administrator' ?
          [{id: 'Add', name: '-- Add New --'}] : []);
     } else {
        this.divisionService.getChildren(value.id).subscribe(res => {
          this.newStandardDivision.subDivision.name = 'Select';
          this.subDivisionOptions.unshift({id: '-1', name: 'Select'});
          this.subDivisionOptions = [{id: '-2', name: '-- None --'}];
          this.subDivisionOptions.push(...this.auth.getCurrentUser().role.name === 'Administrator' ?
            [{id: 'Add', name: '-- Add New --'}] : []);
          this.subDivisionOptions = this.subDivisionOptions.concat(res);
          this.subDivisionOptions = this.subDivisionOptions.concat(res);
        }, this.util.logError);
        this.newStandardDivision.subDivision.name = null;
      }
    } else if (prop === 'subDivision.id') {
      if (value.id === 'Add') {
        this.modalProperties.title = 'Create New Division or Sub-Division';
        this.isOpenDivisionCreateModal = true;
        this.newStandardDivision.subDivision.id = undefined;
      }
    }
  }

  addOrgCreate(model) {
    const newOrgName = model.org;
    if (newOrgName) {
      this.standardService.create({name: newOrgName}).subscribe((res) => {
        let prop = {
          title: 'Successful!',
          body: 'Request for new organization submitted successfully'
        };
        this.sendModalData.emit({type: 'success', prop});
        console.log('res ', res);
      }, (error) => {
        this.showErrorModal(error, 'Oops failed to create organization');
      });
    } else {
      if (this.activeTab === 1) {
        this.newStandardDivision.standard.organization.id = undefined;
        this.newStandardDivision.standard.organization.name = 'Select';
      } else if (this.activeTab === 2) {
        this.newCnSissue.organization.id = undefined;
        this.newCnSissue.organization.name = 'Select';
      }
    }
    this.isOpenOrgCreateModal = false;
  }

  closeOrgCreate() {
    this.isOpenOrgCreateModal = false;
    this.newStandardDivision.standard.organization.id = undefined;
    this.newStandardDivision.standard.organization.name = 'Select';
  }

  /**
   * handles the organization dropdown click
   * @param value the selected value
   */
  changeOrganizationStandard(value) {
    if (value.id === -1) {
      this.isOpenOrgCreateModal = true;
      this.newStandardDivision.standard.organization.id = undefined;
      this.newStandardDivision.standard.organization.name = 'Select';
    } else {
      this.newStandardDivision.standard.organization.id = value.id;
    }
  }

  /**
   * display error dialog
   * @param text
   */
  showErrorModal(error: any, text: string) {
    let msg = error.error.message.length > this.maxErrorMessageLen ?
      error.error.message.substr(0, this.maxErrorMessageLen) + ' ...' : error.error.message;
    let prop = {
      title: 'Failed!',
      shortmessage: text,
      message: msg
    };
    this.sendModalData.emit({type: 'failed', prop});
  }

  /**
   * handles the submit button click
   */
  onSubmit(form) {
    const data = { ...this.newStandardDivision };
    data.criticalToBusiness = data.criticalToBusinessShown === 'YES';
    if (data.subDivision.id === '-2') {
      // None selected
      delete data.subDivision;
    }

    switch (this.activeTab) {
      // standard page
      case 1:
        const standardDivisionData = {
          isApproved: false,
          division: data.division,
          subDivision: data.subDivision,
          productLine: {
            name: this.productLine.map(pl => pl.value).join(','),
            divisionId: data.division.id,
            subDivisionId: data.subDivision ? data.subDivision.id : null,
            productLineContacts: this.contactEmails,
          },
          standardParticipant: this.standardParticipants,
          criticalToBusiness: data.criticalToBusiness,
          comment: data.comment
        };

        // create new standard division pending approved.
        this.standardDivisionService.create(standardDivisionData).subscribe(res => {
          const standardData = {
            name: data.standard.name,
            description: data.standard.description,
            edition: data.standard.edition,
            organization: {
              id: data.standard.organization.id
            },
            newDivisionId: res.id,
            date: data.date
          };
          if (this.isEditedMode && !this.isCloneMode) {
            // update a standard
            this.standardService.update(this.standardDivisionId, standardData).subscribe(() => {
              const prop = {
                title: 'Successful!',
                body: 'Standard Update Request Submitted Successfully'
              };
              this.sendModalData.emit({type: 'success', prop});
              setTimeout(() => {
                this.redirectToUrl('/keyword-search');
              }, 3000);
            }, (error) => {
              this.showErrorModal(error, 'Oops failed to submit update standard request');
            });
          } else {
            // create a standard
            this.standardService.create(standardData).subscribe(() => {
              const prop = {
                title: 'Successful!',
                body: 'New Standard Request Submitted Successfully'
              };
              this.sendModalData.emit({type: 'success', prop});
              setTimeout(() => {
                this.redirectToUrl('/keyword-search');
              }, 3000);
            }, (error) => {
              this.showErrorModal(error, 'Oops failed to create new standard request');
            });
          }
        }, this.util.logError);
        break;

      case 2:
        const issueData = { ...this.newCnSissue };
        issueData.personsResponsible = issueData.personsResponsible.join(';');
        if (issueData.criticalRoleLeadership === 'YES') {
          issueData.criticalRoleLeadership = true;
        } else {
          issueData.criticalRoleLeadership = false;
        }
        issueData.division = issueData.divisonId || "";
        // check if edit or create
        if (this.isEditedMode) {
          console.log(issueData);
          this.cnsIssueService.update(this.cnsIssueId, issueData).subscribe(() => {
            let prop = {
              title: 'Successful!',
              body: 'C&S Issue Updated Successfully'
            };
            this.sendModalData.emit({type: 'success', prop});
            setTimeout(() => {
              this.redirectToUrl('/c-s-issues');
            },3000);
          });
        } else {
          issueData.division = '';
          this.cnsIssueService.create(issueData).subscribe(() => {
            let prop = {
              title: 'Successful!',
              body: 'New C&S Issue Created Successfully'
            };
            this.sendModalData.emit({type: 'success', prop});
            setTimeout(() => {
              this.redirectToUrl('/c-s-issues');
            },3000);
          }, (error) => {
            this.showErrorModal(error,'Oops failed to create new C&S Issue');
          });
        }
        break;

      // create division or sub division
      case 3:
        if (this.newDivisionModel.name && this.newDivisionModel.region) {
            let divisionData: any = {...this.newDivisionModel};
            if (!this.newDivisionModel.parentDivision.id) {
              delete divisionData.parentDivision;
            }
            const model = {
              divisionId: divisionData.id,
              name: divisionData.name,
              description: divisionData.parentDivision ? divisionData.parentDivision.id : undefined,
              edition: divisionData.region
            };
            this.standardService.create(model).subscribe(() => {
              this.cancel(form);
              let prop = {
                title: 'Successful!',
                body: 'Request for New Division Submitted Successfully'
              };
              this.sendModalData.emit({type: 'success', prop});
            }, (error) => {
              let msg = error.error.message.length > this.maxErrorMessageLen ?
                error.error.message.substr(0, this.maxErrorMessageLen) + ' ...' : error.error.message;
              let prop = {
                title: 'Failed!',
                shortmessage: 'Oops failed to submit request to create new division',
                message: msg
              };
              this.sendModalData.emit({type: 'failed', prop});
            });
        }
        break;

      // create standard
      case 4:
        const newStandardData = { ...this.newStandard };
        newStandardData.date = new Date();
        console.log(`send new standard: ${newStandardData}`);
        this.standardService.create(newStandardData).subscribe(() => {
          this.redirectToSendEmail();
        }, this.util.logError);
        break;
    }
  }

  onSearchDivision() {
    this.divisionService.getById(this.newDivisionModel.id).subscribe(divisionData => {
      this.newDivisionModel.parentDivision.name = divisionData.parentDivision ? divisionData.parentDivision.name : 'Parent Division Name';
      this.newDivisionModel.region = divisionData.region;
      this.newDivisionModel.name = divisionData.name;
      this.isEditedMode = true;

      this.regionOptions = AppConstants.REGIONS;
      this.getDivisionOptions(false);
    }, error => {
      // Do nothing
    });
  }

  createDivision(division, form) {
    const model = {
      divisionId: division.divisionId,
      name: division.divisionName,
      description: division.parentDivisionId,
      edition: division.region
    };
    console.log(model);
    this.standardService.create(model).subscribe(() => {
      if (form) {
        this.cancel(form);
      }
      let prop = {
        title: 'Successful!',
        body: 'Request for New Division Submitted Successfully'
      };
      this.sendModalData.emit({type: 'success', prop});
      this.closeDivisionCreate();
    }, (error) => {
      let msg = error.error.message.length > this.maxErrorMessageLen ?
        error.error.message.substr(0, this.maxErrorMessageLen) + ' ...' : error.error.message;
      let prop = {
        title: 'Failed!',
        shortmessage: 'Oops failed to submit request to create new division',
        message: msg
      };
      this.sendModalData.emit({type: 'failed', prop});
    });
  }

  closeDivisionCreate() {
    this.isOpenDivisionCreateModal = false;
    this.newDivisionModel.parentDivision.id = null;
    if (this.currentForm) {
      this.cancel(this.currentForm);
      this.currentForm = null;
    }
  }

  /**
   * handles the datepicker date selection
   * @param key the key
   * @param value the selected value
   */
  getDate(key, value) {
    console.log(value);
    value = moment(value).format('YYYY-MM-DD');
    if (this.activeTab === 2) {
      this.newCnSissue[key] = value;
    } else if (this.activeTab === 1) {
      this.newStandardDivision.date = value;
    }
  }

  /**
   * return the formated date string
   * @param timestamp to parse
   */
  getDateStr(timestamp) {
    return moment(timestamp).format('MM/DD/YYYY');
  }

  /**
   * redirects to send email
   */
  redirectToSendEmail() {
    this.redirectToUrl('/send-email');
  }

  /**
   * redirects to the url
   * @param url the url
   */
  redirectToUrl(url) {
    this.router.navigate([`/${url}`]);
  }

  /**
  * handles the organization selected
  * @param prop the prop
  * handles the organization dropdown click
  * @param value the selected value
  */
  onOrganizationSelect(prop: string, value: any) {
    const key = prop.split('.');
    if (key.length > 1) {
      this.newStandard[key[0]][key[1]] = value.id;
    } else {
      this.newStandard[key[0]] = value;
    }
  }

  /**
   * handles the organization dropdown change
   * and fetch standard accordingly
   * @param value the selected value
   */
  onOrganizationGetStandards(value: any) {
    if (value.id === -1) {
      this.isOpenOrgCreateModal = true;
      this.newCnSissue.organization.id = undefined;
      this.newCnSissue.organization.name = 'Select';
    } else {
      this.newCnSissue.organization.id = value.id;
      this.newCnSissue.organization.name = value.name;
      this.standardDivisionService.get({ limit: 1, organizationId: value.id }).subscribe(res0 => {
       this.standardDivisionService.get({limit: res0.total, organizationId: value.id}).subscribe(res => {
          res.items = uniqBy(res.items, 'standard.name', 'standard.description');
          res.items = map(res.items, i => {
            return {
              ...i.standard
            };
          });
          this.standardOptions = res.items;
        });
      });
    }
  }

  /**
   *
   * @param handles priority number change
   */
  onPriorityChange(value: any) {
    this.newCnSissue.priority = value.id;
  }

  /**
   * handles the validation
   * @param error the error message
   */
  onValidationError(error: any) {
    console.dir(error);
  }

  /**
   * handles the cancel button click
   * @param form the form
   */
  cancel(form: NgForm) {
    form.reset();
    this.newCnSissue.vpgmReviewDate = null;
    this.newCnSissue.estimatedCompletionDate = null;
    this.newCnSissue.engineerReviewDate = null;
    this.newCnSissue.division.id = null;
    this.newCnSissue.divisionId = null;
    this.newCnSissue.priority = null;
    this.newCnSissue.region = null;
    this.newDivisionModel.region = null;
    this.newDivisionModel.parentDivision.id = null;
    this.isEditedMode = false;
    this.cancelClick.emit(this.activeTab);
  }

  /**
   * handles the delete button click
   * @param form the form
   */
  delete(form: NgForm) {
    this.divisionService.deleteById(this.newDivisionModel.id).subscribe(divisionData => {
      this.cancel(form);
      let prop = {
        title: 'Successful!',
        body: 'Division Delete Request Submitted Successfully'
      };
      this.sendModalData.emit({type: 'success', prop});
    }, error => {
      this.showErrorModal(error,'Oops failed to delete division');
    });
  }
}
