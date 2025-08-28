import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Region, Municipality, School } from '../models/education-data.models';

@Injectable({
  providedIn: 'root'
})
export class EducationDataService {
  
  // Mock data for Greek regions and municipalities
  private regions: Region[] = [
    { id: 'attica', name: 'Αττική', nameEnglish: 'Attica' },
    { id: 'thessaloniki', name: 'Κεντρική Μακεδονία', nameEnglish: 'Central Macedonia' },
    { id: 'patras', name: 'Δυτική Ελλάδα', nameEnglish: 'Western Greece' },
    { id: 'crete', name: 'Κρήτη', nameEnglish: 'Crete' },
    { id: 'thessaly', name: 'Θεσσαλία', nameEnglish: 'Thessaly' },
    { id: 'epirus', name: 'Ήπειρος', nameEnglish: 'Epirus' }
  ];

  private municipalities: Municipality[] = [
    // Attica municipalities
    { id: 'athens', name: 'Αθήνα', nameEnglish: 'Athens', regionId: 'attica' },
    { id: 'piraeus', name: 'Πειραιάς', nameEnglish: 'Piraeus', regionId: 'attica' },
    { id: 'glyfada', name: 'Γλυφάδα', nameEnglish: 'Glyfada', regionId: 'attica' },
    { id: 'marousi', name: 'Μαρούσι', nameEnglish: 'Marousi', regionId: 'attica' },
    
    // Central Macedonia municipalities
    { id: 'thessaloniki-center', name: 'Θεσσαλονίκη', nameEnglish: 'Thessaloniki Center', regionId: 'thessaloniki' },
    { id: 'kalamaria', name: 'Καλαμαριά', nameEnglish: 'Kalamaria', regionId: 'thessaloniki' },
    { id: 'pylaia', name: 'Πυλαία', nameEnglish: 'Pylaia', regionId: 'thessaloniki' },
    
    // Western Greece municipalities
    { id: 'patras-center', name: 'Πάτρα', nameEnglish: 'Patras', regionId: 'patras' },
    { id: 'aigio', name: 'Αίγιο', nameEnglish: 'Aigio', regionId: 'patras' },
    
    // Crete municipalities
    { id: 'heraklion', name: 'Ηράκλειο', nameEnglish: 'Heraklion', regionId: 'crete' },
    { id: 'chania', name: 'Χανιά', nameEnglish: 'Chania', regionId: 'crete' },
    
    // Thessaly municipalities
    { id: 'larissa', name: 'Λάρισα', nameEnglish: 'Larissa', regionId: 'thessaly' },
    { id: 'volos', name: 'Βόλος', nameEnglish: 'Volos', regionId: 'thessaly' },
    
    // Epirus municipalities
    { id: 'ioannina', name: 'Ιωάννινα', nameEnglish: 'Ioannina', regionId: 'epirus' },
    { id: 'preveza', name: 'Πρέβεζα', nameEnglish: 'Preveza', regionId: 'epirus' }
  ];

  private schools: School[] = [
    // Athens schools
    { 
      id: 'school-1', 
      name: '1ο Δημοτικό Σχολείο Αθηνών', 
      nameEnglish: '1st Primary School of Athens', 
      municipalityId: 'athens', 
      address: 'Ακαδημίας 10, Αθήνα',
      coordinates: { lat: 37.9838, lng: 23.7275 },
      type: 'primary' 
    },
    { 
      id: 'school-2', 
      name: '2ο Δημοτικό Σχολείο Αθηνών', 
      nameEnglish: '2nd Primary School of Athens', 
      municipalityId: 'athens', 
      address: 'Πανεπιστημίου 15, Αθήνα',
      coordinates: { lat: 37.9722, lng: 23.7367 },
      type: 'primary' 
    },
    
    // Thessaloniki schools
    { 
      id: 'school-3', 
      name: '1ο Δημοτικό Σχολείο Θεσσαλονίκης', 
      nameEnglish: '1st Primary School of Thessaloniki', 
      municipalityId: 'thessaloniki-center', 
      address: 'Τσιμισκή 20, Θεσσαλονίκη',
      coordinates: { lat: 40.6401, lng: 22.9444 },
      type: 'primary' 
    },
    
    // Add more schools for other municipalities
    { 
      id: 'school-4', 
      name: '1ο Δημοτικό Σχολείο Πάτρας', 
      nameEnglish: '1st Primary School of Patras', 
      municipalityId: 'patras-center', 
      address: 'Κορίνθου 25, Πάτρα',
      coordinates: { lat: 38.2466, lng: 21.7346 },
      type: 'primary' 
    }
  ];

  getRegions(): Observable<Region[]> {
    return of(this.regions);
  }

  getMunicipalitiesByRegion(regionId: string): Observable<Municipality[]> {
    const municipalities = this.municipalities.filter(m => m.regionId === regionId);
    return of(municipalities);
  }

  getSchoolsByMunicipality(municipalityId: string): Observable<School[]> {
    const schools = this.schools.filter(s => s.municipalityId === municipalityId);
    return of(schools);
  }

  getAllMunicipalities(): Observable<Municipality[]> {
    return of(this.municipalities);
  }

  getAllSchools(): Observable<School[]> {
    return of(this.schools);
  }

  getRegionById(id: string): Observable<Region | undefined> {
    const region = this.regions.find(r => r.id === id);
    return of(region);
  }

  getMunicipalityById(id: string): Observable<Municipality | undefined> {
    const municipality = this.municipalities.find(m => m.id === id);
    return of(municipality);
  }

  getSchoolById(id: string): Observable<School | undefined> {
    const school = this.schools.find(s => s.id === id);
    return of(school);
  }
}
