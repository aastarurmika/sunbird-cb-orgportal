import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatDialogModule,
  MatChipsModule,
  MatTableModule,
  MatCardModule,
  MatExpansionModule,
  MatGridListModule,
  MatDividerModule,
  MatPaginatorModule,
  MatSelectModule,
  MatCheckboxModule,
  MatInputModule,
  MatButtonModule,
} from '@angular/material'

import { MatMenuModule } from '@angular/material/menu'
import { SkillTableComponent } from './components'
import { FilterDialogComponent, SearchSelectedFilterComponent, AddCompetencyDialogComponent, ConfirmDialogComponent } from './components'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [SkillTableComponent, FilterDialogComponent, ConfirmDialogComponent, AddCompetencyDialogComponent, SearchSelectedFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  entryComponents: [
    FilterDialogComponent,
    ConfirmDialogComponent,
    AddCompetencyDialogComponent,
  ],
  exports: [SkillTableComponent, SearchSelectedFilterComponent],
})
export class SkillModule { }