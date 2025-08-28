// Data models for the educator mapper application

export interface Region {
  id: string;
  name: string;
  nameEnglish: string;
}

export interface Municipality {
  id: string;
  name: string;
  nameEnglish: string;
  regionId: string;
}

export interface School {
  id: string;
  name: string;
  nameEnglish: string;
  municipalityId: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  type: 'primary' | 'kindergarten';
}

export interface TransportationOption {
  id: string;
  type: 'bus' | 'train' | 'metro' | 'car' | 'walking';
  name: string;
  duration: string;
  cost?: string;
  description: string;
  route: string[];
}

export interface RouteInfo {
  from: string;
  to: string;
  distance: string;
  estimatedTime: string;
  transportationOptions: TransportationOption[];
}