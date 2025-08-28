import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TransportationOption, RouteInfo } from '../models/education-data.models';

@Injectable({
  providedIn: 'root'
})
export class TransportationService {
  
  // Mock transportation options for different routes
  private mockTransportationOptions: TransportationOption[] = [
    {
      id: 'bus-1',
      type: 'bus',
      name: 'ΟΑΣΑ (Urban Bus)',
      duration: '25-35 λεπτά',
      cost: '€1.40',
      description: 'Λεωφορεία ΟΑΣΑ με συχνά δρομολόγια',
      route: ['Μετρό', 'Λεωφορείο', 'Πεζή πορεία']
    },
    {
      id: 'metro-1',
      type: 'metro',
      name: 'Μετρό Αθηνών',
      duration: '20-30 λεπτά',
      cost: '€1.40',
      description: 'Μετρό με γρήγορες συνδέσεις στο κέντρο',
      route: ['Μετρό γραμμή 2', 'Πεζή πορεία']
    },
    {
      id: 'car-1',
      type: 'car',
      name: 'Ιδιωτικό όχημα',
      duration: '15-25 λεπτά',
      cost: '€3-5 (καύσιμα + parking)',
      description: 'Οδήγηση με ιδιωτικό αυτοκίνητο',
      route: ['Οδήγηση', 'Parking']
    },
    {
      id: 'walking-1',
      type: 'walking',
      name: 'Πεζή μετακίνηση',
      duration: '45-60 λεπτά',
      cost: 'Δωρεάν',
      description: 'Περπάτημα για κοντινές αποστάσεις',
      route: ['Πεζή πορεία']
    }
  ];

  getRouteInfo(from: string, to: string): Observable<RouteInfo> {
    // Mock route calculation based on location names
    const distance = this.calculateMockDistance(from, to);
    const estimatedTime = this.calculateMockTime(from, to);
    
    // Filter relevant transportation options based on distance
    const relevantOptions = this.getRelevantTransportationOptions(distance);
    
    const routeInfo: RouteInfo = {
      from,
      to,
      distance: `${distance} km`,
      estimatedTime,
      transportationOptions: relevantOptions
    };

    return of(routeInfo);
  }

  getTransportationOptionsForLocation(location: string): Observable<TransportationOption[]> {
    // Return all transportation options with location-specific adjustments
    return of(this.mockTransportationOptions);
  }

  private calculateMockDistance(from: string, to: string): number {
    // Simple mock distance calculation
    // In a real app, this would use a mapping service
    const distances: { [key: string]: number } = {
      'local': Math.random() * 5 + 2,  // 2-7 km for local routes
      'regional': Math.random() * 20 + 10,  // 10-30 km for regional routes
      'distant': Math.random() * 50 + 30   // 30-80 km for distant routes
    };
    
    // Determine distance category based on locations
    if (from.toLowerCase().includes('αθήνα') && to.toLowerCase().includes('αθήνα')) {
      return distances['local'];
    } else if (from.toLowerCase().includes('αττική') && to.toLowerCase().includes('αττική')) {
      return distances['regional'];
    } else {
      return distances['distant'];
    }
  }

  private calculateMockTime(from: string, to: string): string {
    const distance = this.calculateMockDistance(from, to);
    
    if (distance < 10) {
      return '20-40 λεπτά';
    } else if (distance < 30) {
      return '45-75 λεπτά';
    } else {
      return '1.5-2.5 ώρες';
    }
  }

  private getRelevantTransportationOptions(distance: number): TransportationOption[] {
    if (distance < 3) {
      // For short distances, include walking
      return this.mockTransportationOptions;
    } else if (distance < 15) {
      // For medium distances, exclude walking
      return this.mockTransportationOptions.filter(option => option.type !== 'walking');
    } else {
      // For long distances, focus on car and train
      return this.mockTransportationOptions.filter(option => 
        option.type === 'car' || option.type === 'train'
      );
    }
  }

  // Additional method for getting transportation suggestions
  getSuggestedTransportation(from: string, to: string, preferences?: { 
    budget?: 'low' | 'medium' | 'high', 
    speed?: 'slow' | 'medium' | 'fast',
    comfort?: 'low' | 'medium' | 'high'
  }): Observable<TransportationOption[]> {
    
    let options = [...this.mockTransportationOptions];
    
    if (preferences?.budget === 'low') {
      options = options.filter(opt => opt.cost === 'Δωρεάν' || (opt.cost && parseFloat(opt.cost.match(/\d+/)?.[0] || '0') < 2));
    }
    
    if (preferences?.speed === 'fast') {
      options = options.filter(opt => opt.type === 'metro' || opt.type === 'car');
    }
    
    return of(options);
  }
}
