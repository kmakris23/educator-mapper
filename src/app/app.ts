import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegionSelectorComponent } from './components/region-selector/region-selector';
import { MunicipalitySelectorComponent } from './components/municipality-selector/municipality-selector';
import { SchoolFinderComponent } from './components/school-finder/school-finder';
import { TransportationInfoComponent } from './components/transportation-info/transportation-info';
import { Region, Municipality, School } from './models/education-data.models';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    CommonModule, 
    FormsModule,
    RegionSelectorComponent,
    MunicipalitySelectorComponent,
    SchoolFinderComponent,
    TransportationInfoComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  selectedRegion: Region | null = null;
  selectedMunicipality: Municipality | null = null;
  selectedSchool: School | null = null;
  userLocation: string = '';

  onRegionSelected(region: Region) {
    this.selectedRegion = region;
    this.selectedMunicipality = null; // Reset municipality when region changes
    this.selectedSchool = null; // Reset school when region changes
  }

  onMunicipalitySelected(municipality: Municipality) {
    this.selectedMunicipality = municipality;
    this.selectedSchool = null; // Reset school when municipality changes
  }

  onSchoolSelected(school: School) {
    this.selectedSchool = school;
  }
}
