import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationDataService } from '../../services/education-data';
import { Municipality } from '../../models/education-data.models';

@Component({
  selector: 'app-municipality-selector',
  imports: [CommonModule],
  templateUrl: './municipality-selector.html',
  styleUrl: './municipality-selector.scss'
})
export class MunicipalitySelectorComponent implements OnInit, OnChanges {
  @Input() regionId: string | null = null;
  @Input() selectedMunicipality: Municipality | null = null;
  @Output() municipalitySelected = new EventEmitter<Municipality>();

  municipalities: Municipality[] = [];
  isLoading = false;

  constructor(private educationDataService: EducationDataService) {}

  ngOnInit() {
    if (this.regionId) {
      this.loadMunicipalities();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['regionId'] && changes['regionId'].currentValue) {
      this.loadMunicipalities();
    } else if (changes['regionId'] && !changes['regionId'].currentValue) {
      this.municipalities = [];
    }
  }

  private loadMunicipalities() {
    if (!this.regionId) return;

    this.isLoading = true;
    this.educationDataService.getMunicipalitiesByRegion(this.regionId).subscribe({
      next: (municipalities) => {
        this.municipalities = municipalities;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading municipalities:', error);
        this.isLoading = false;
      }
    });
  }

  selectMunicipality(municipality: Municipality) {
    this.selectedMunicipality = municipality;
    this.municipalitySelected.emit(municipality);
  }

  isSelected(municipality: Municipality): boolean {
    return this.selectedMunicipality?.id === municipality.id;
  }
}
