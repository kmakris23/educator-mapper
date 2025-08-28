import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportationService } from '../../services/transportation';
import { School, RouteInfo, TransportationOption } from '../../models/education-data.models';

@Component({
  selector: 'app-transportation-info',
  imports: [CommonModule],
  templateUrl: './transportation-info.html',
  styleUrl: './transportation-info.scss'
})
export class TransportationInfoComponent implements OnChanges {
  @Input() selectedSchool: School | null = null;
  @Input() userLocation: string = '';

  routeInfo: RouteInfo | null = null;
  transportationOptions: TransportationOption[] = [];
  isLoading = false;

  constructor(private transportationService: TransportationService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedSchool'] || changes['userLocation']) {
      this.updateTransportationInfo();
    }
  }

  private updateTransportationInfo() {
    if (!this.selectedSchool) {
      this.routeInfo = null;
      this.transportationOptions = [];
      return;
    }

    this.isLoading = true;
    const fromLocation = this.userLocation || 'Κέντρο Αθήνας / Athens Center';
    const toLocation = this.selectedSchool.address;

    // Get route information
    this.transportationService.getRouteInfo(fromLocation, toLocation).subscribe({
      next: (routeInfo) => {
        this.routeInfo = routeInfo;
        this.transportationOptions = routeInfo.transportationOptions;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading transportation info:', error);
        this.isLoading = false;
      }
    });
  }

  getTransportationIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'bus': '🚌',
      'metro': '🚇',
      'train': '🚆',
      'car': '🚗',
      'walking': '🚶'
    };
    return icons[type] || '🚌';
  }

  getTransportationTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'bus': 'Λεωφορείο / Bus',
      'metro': 'Μετρό / Metro',
      'train': 'Τρένο / Train',
      'car': 'Αυτοκίνητο / Car',
      'walking': 'Πεζή / Walking'
    };
    return labels[type] || type;
  }
}
