import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { EducationDataService } from '../../services/education-data';
import { Region } from '../../models/education-data.models';

@Component({
  selector: 'app-region-selector',
  imports: [CommonModule, ButtonModule, ProgressSpinnerModule, MessageModule],
  templateUrl: './region-selector.html',
  styleUrl: './region-selector.scss'
})
export class RegionSelectorComponent implements OnInit {
  @Input() selectedRegion: Region | null = null;
  @Output() regionSelected = new EventEmitter<Region>();

  regions: Region[] = [];
  isLoading = false;

  constructor(private educationDataService: EducationDataService) {}

  ngOnInit() {
    this.loadRegions();
  }

  private loadRegions() {
    this.isLoading = true;
    this.educationDataService.getRegions().subscribe({
      next: (regions) => {
        this.regions = regions;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading regions:', error);
        this.isLoading = false;
      }
    });
  }

  selectRegion(region: Region) {
    this.selectedRegion = region;
    this.regionSelected.emit(region);
  }

  isSelected(region: Region): boolean {
    return this.selectedRegion?.id === region.id;
  }
}
