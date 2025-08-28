import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationDataService } from '../../services/education-data';
import { School } from '../../models/education-data.models';

@Component({
  selector: 'app-school-finder',
  imports: [CommonModule],
  templateUrl: './school-finder.html',
  styleUrl: './school-finder.scss'
})
export class SchoolFinderComponent implements OnInit, OnChanges {
  @Input() municipalityId: string | null = null;
  @Output() schoolSelected = new EventEmitter<School>();

  schools: School[] = [];
  isLoading = false;
  selectedSchool: School | null = null;

  constructor(private educationDataService: EducationDataService) {}

  ngOnInit() {
    if (this.municipalityId) {
      this.loadSchools();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['municipalityId'] && changes['municipalityId'].currentValue) {
      this.selectedSchool = null;
      this.loadSchools();
    } else if (changes['municipalityId'] && !changes['municipalityId'].currentValue) {
      this.schools = [];
      this.selectedSchool = null;
    }
  }

  private loadSchools() {
    if (!this.municipalityId) return;

    this.isLoading = true;
    this.educationDataService.getSchoolsByMunicipality(this.municipalityId).subscribe({
      next: (schools) => {
        this.schools = schools;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading schools:', error);
        this.isLoading = false;
      }
    });
  }

  selectSchool(school: School) {
    this.selectedSchool = school;
    this.schoolSelected.emit(school);
  }

  isSelected(school: School): boolean {
    return this.selectedSchool?.id === school.id;
  }

  getSchoolTypeLabel(type: string): string {
    return type === 'primary' ? 'Δημοτικό / Primary' : 'Νηπιαγωγείο / Kindergarten';
  }
}
