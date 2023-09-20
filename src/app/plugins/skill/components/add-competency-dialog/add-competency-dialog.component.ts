import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import * as _ from 'lodash'
import { CompetencyService } from '../../services/competency.service'
import { map } from 'rxjs/operators'
import moment from 'moment'
@Component({
  selector: 'ws-add-competency-dialog',
  templateUrl: './add-competency-dialog.component.html',
  styleUrls: ['./add-competency-dialog.component.scss'],
})
export class AddCompetencyDialogComponent implements OnInit {

  addCompetencyForm!: FormGroup
  aastrikaFormBuilder: FormBuilder
  selectedLeves: any[] = []

  selectCompetencyList: any = []
  searchComp: any = []
  selectProficiencyList: any = [
    {
      displayName: 'Level 1',
      value: '1',
    },
    {
      displayName: 'Level 2',
      value: '2',
    },
    {
      displayName: 'Level 3',
      value: '3',
    },
    {
      displayName: 'Level 4',
      value: '4',
    },
    {
      displayName: 'Level 5',
      value: '5',
    },
  ]

  userId = ''

  constructor(
    formBuilder: FormBuilder,
    private competencySvc: CompetencyService,
    public dialogRef: MatDialogRef<AddCompetencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.aastrikaFormBuilder = formBuilder
    this.userId = _.get(data, 'userId')
  }

  ngOnInit() {
    this.initializeFormFields()
    this.getAllEntity()
  }

  initializeFormFields() {
    this.addCompetencyForm = this.aastrikaFormBuilder.group({
      selectCompetency: ['', Validators.required],
      selectProficiency: ['', Validators.required],
      selectDate: ['', Validators.required],
      comments: ['', Validators.required],

    })
  }

  getAllEntity() {
    const serchBody = {
      search: {
        type: 'Competency',
      },
    }
    this.competencySvc.getAllEntity(serchBody)
      .pipe(map((data: any) => {
        // tslint:disable-next-line: no-console
        console.log('this.selectCompet', data)
        return this.competencySvc.getFormatedData(data)
      }))
      .subscribe((data: any) => {
        // tslint:disable-next-line: no-console
        console.log('this.selectCompet', data)
        this.selectCompetencyList = data
        this.searchComp = this.selectCompetencyList
      })
  }
  onKey(value: string) {
    this.selectCompetencyList = this.search(value)
  }

  search(value: string) {
    const filter = value.toLowerCase()
    // tslint:disable-next-line: no-console
    console.log('filter: ', filter)
    if (!filter) {
      return this.searchComp
    }
    return this.selectCompetencyList = this.searchComp.filter((option: any) =>
      option.displayName.toLowerCase().includes(filter)
    )
  }

  submit() {
    if (this.addCompetencyForm.valid) {
      this.getFormatedData()
    }

    // this.dialogRef.close(this.addCompetencyForm.value)
  }

  getFormatedData() {
    const competencyFormValue = _.get(this.addCompetencyForm, 'value')
    const selectedCompetency = _.find(this.selectCompetencyList, (competency: any) => {
      return competency.value === _.get(competencyFormValue, 'selectCompetency')
    })
    const formatedData = {
      request: {
        userId: this.userId,
        typeName: 'competency',
        competencyDetails: [
          {
            competencyId: _.toString(_.get(selectedCompetency, 'value')),
            additionalParams: {},
            acquiredDetails: {
              acquiredChannel: 'admin',
              competencyLevelId: _.get(competencyFormValue, 'selectProficiency'),
              effectiveDate: moment(_.get(competencyFormValue, 'selectDate')).format('YYYY-MM-DD h:mm:ss'),
              additionalParams: {
                competencyName: _.get(selectedCompetency, 'displayName'),
                remarks: _.get(competencyFormValue, 'comments', ''),
              },
            },
          },
        ],
      },
    }
    this.addSelectedCompetency(formatedData)
  }

  addSelectedCompetency(formatedData: any) {
    if (formatedData) {
      this.competencySvc.updatePassbook(formatedData).subscribe((data: any) => {
        if (data) {
          this.dialogRef.close({ updated: true })
        }
      })
    }
  }

}
