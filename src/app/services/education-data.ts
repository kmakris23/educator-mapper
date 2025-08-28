import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Region, Municipality, School } from '../models/education-data.models';
import { atticaMunicipalities, atticaSchools } from '../data/complete_attica_data';

@Injectable({
  providedIn: 'root'
})
export class EducationDataService {
  
  // Official Greek Regional Education Directorates (Περιφερειακές Διευθύνσεις Εκπαίδευσης)
  private regions: Region[] = [
    { id: 'eastern-macedonia-thrace', name: 'Ανατ. Μακεδονίας και Θράκης', nameEnglish: 'Eastern Macedonia and Thrace' },
    { id: 'attica', name: 'Αττικής', nameEnglish: 'Attica' },
    { id: 'northern-aegean', name: 'Βορείου Αιγαίου', nameEnglish: 'Northern Aegean' },
    { id: 'western-greece', name: 'Δυτικής Ελλάδας', nameEnglish: 'Western Greece' },
    { id: 'western-macedonia', name: 'Δυτικής Μακεδονίας', nameEnglish: 'Western Macedonia' },
    { id: 'epirus', name: 'Ηπείρου', nameEnglish: 'Epirus' },
    { id: 'thessaly', name: 'Θεσσαλίας', nameEnglish: 'Thessaly' },
    { id: 'ionian-islands', name: 'Ιονίων Νήσων', nameEnglish: 'Ionian Islands' },
    { id: 'central-macedonia', name: 'Κεντρικής Μακεδονίας', nameEnglish: 'Central Macedonia' },
    { id: 'crete', name: 'Κρήτης', nameEnglish: 'Crete' },
    { id: 'southern-aegean', name: 'Νοτίου Αιγαίου', nameEnglish: 'Southern Aegean' },
    { id: 'peloponnese', name: 'Πελοποννήσου', nameEnglish: 'Peloponnese' },
    { id: 'central-greece', name: 'Στερεάς Ελλάδας', nameEnglish: 'Central Greece' }
  ];

  private municipalities: Municipality[] = [
    // Eastern Macedonia and Thrace
    { id: 'drama', name: 'Δράμας', nameEnglish: 'Drama', regionId: 'eastern-macedonia-thrace' },
    { id: 'evros-a', name: 'Α\' Έβρου', nameEnglish: 'Evros A', regionId: 'eastern-macedonia-thrace' },
    { id: 'evros-b', name: 'Β\' Έβρου', nameEnglish: 'Evros B', regionId: 'eastern-macedonia-thrace' },
    { id: 'kavala-a', name: 'Α\' Καβάλας', nameEnglish: 'Kavala A', regionId: 'eastern-macedonia-thrace' },
    { id: 'kavala-b', name: 'Β\' Καβάλας', nameEnglish: 'Kavala B', regionId: 'eastern-macedonia-thrace' },
    { id: 'xanthi', name: 'Ξάνθης', nameEnglish: 'Xanthi', regionId: 'eastern-macedonia-thrace' },
    { id: 'rodopi', name: 'Ροδόπης', nameEnglish: 'Rodopi', regionId: 'eastern-macedonia-thrace' },
    
    // Attica - Real municipalities from Ministry of Education data
    ...atticaMunicipalities,
    
    // Northern Aegean
    { id: 'lesbos-a', name: 'Α\' Λέσβου', nameEnglish: 'Lesbos A', regionId: 'northern-aegean' },
    { id: 'lesbos-b', name: 'Β\' Λέσβου', nameEnglish: 'Lesbos B', regionId: 'northern-aegean' },
    { id: 'lesbos-c', name: 'Γ\' Λέσβου', nameEnglish: 'Lesbos C', regionId: 'northern-aegean' },
    { id: 'samos-a', name: 'Α\' Σάμου', nameEnglish: 'Samos A', regionId: 'northern-aegean' },
    { id: 'samos-b', name: 'Β\' Σάμου', nameEnglish: 'Samos B', regionId: 'northern-aegean' },
    { id: 'samos-c', name: 'Γ\' Σάμου', nameEnglish: 'Samos C', regionId: 'northern-aegean' },
    { id: 'chios-a', name: 'Α\' Χίου', nameEnglish: 'Chios A', regionId: 'northern-aegean' },
    { id: 'chios-b', name: 'Β\' Χίου', nameEnglish: 'Chios B', regionId: 'northern-aegean' },
    
    // Western Greece
    { id: 'aitoloacarnania', name: 'Αιτωλοακαρνανίας', nameEnglish: 'Aetolia-Acarnania', regionId: 'western-greece' },
    { id: 'achaea', name: 'Αχαΐας', nameEnglish: 'Achaea', regionId: 'western-greece' },
    { id: 'elis', name: 'Ηλείας', nameEnglish: 'Elis', regionId: 'western-greece' },
    
    // Western Macedonia
    { id: 'grevena', name: 'Γρεβενών', nameEnglish: 'Grevena', regionId: 'western-macedonia' },
    { id: 'kastoria', name: 'Καστοριάς', nameEnglish: 'Kastoria', regionId: 'western-macedonia' },
    { id: 'kozani', name: 'Κοζάνης', nameEnglish: 'Kozani', regionId: 'western-macedonia' },
    { id: 'florina', name: 'Φλώρινας', nameEnglish: 'Florina', regionId: 'western-macedonia' },
    
    // Epirus
    { id: 'arta', name: 'Άρτας', nameEnglish: 'Arta', regionId: 'epirus' },
    { id: 'thesprotia', name: 'Θεσπρωτίας', nameEnglish: 'Thesprotia', regionId: 'epirus' },
    { id: 'ioannina', name: 'Ιωαννίνων', nameEnglish: 'Ioannina', regionId: 'epirus' },
    { id: 'preveza', name: 'Πρέβεζας', nameEnglish: 'Preveza', regionId: 'epirus' },
    
    // Thessaly
    { id: 'karditsa', name: 'Καρδίτσας', nameEnglish: 'Karditsa', regionId: 'thessaly' },
    { id: 'larisa', name: 'Λάρισας', nameEnglish: 'Larisa', regionId: 'thessaly' },
    { id: 'magnisia-a', name: 'Α\' Μαγνησίας', nameEnglish: 'Magnisia A', regionId: 'thessaly' },
    { id: 'magnisia-b', name: 'Β\' Μαγνησίας', nameEnglish: 'Magnisia B', regionId: 'thessaly' },
    { id: 'trikala', name: 'Τρικάλων', nameEnglish: 'Trikala', regionId: 'thessaly' },
    
    // Ionian Islands
    { id: 'zakynthos', name: 'Ζακύνθου', nameEnglish: 'Zakynthos', regionId: 'ionian-islands' },
    { id: 'corfu-a', name: 'Α\' Κέρκυρας', nameEnglish: 'Corfu A', regionId: 'ionian-islands' },
    { id: 'corfu-b', name: 'Β\' Κέρκυρας', nameEnglish: 'Corfu B', regionId: 'ionian-islands' },
    { id: 'kefalonia-a', name: 'Α\' Κεφαλληνίας', nameEnglish: 'Kefalonia A', regionId: 'ionian-islands' },
    { id: 'kefalonia-b', name: 'Β\' Κεφαλληνίας', nameEnglish: 'Kefalonia B', regionId: 'ionian-islands' },
    { id: 'lefkada', name: 'Λευκάδας', nameEnglish: 'Lefkada', regionId: 'ionian-islands' },
    
    // Central Macedonia
    { id: 'imathia', name: 'Ημαθίας', nameEnglish: 'Imathia', regionId: 'central-macedonia' },
    { id: 'eastern-thessaloniki', name: 'Ανατ. Θεσσαλονίκης', nameEnglish: 'Eastern Thessaloniki', regionId: 'central-macedonia' },
    { id: 'western-thessaloniki', name: 'Δυτ. Θεσσαλονίκης', nameEnglish: 'Western Thessaloniki', regionId: 'central-macedonia' },
    { id: 'kilkis', name: 'Κιλκίς', nameEnglish: 'Kilkis', regionId: 'central-macedonia' },
    { id: 'pella', name: 'Πέλλας', nameEnglish: 'Pella', regionId: 'central-macedonia' },
    { id: 'pieria', name: 'Πιερίας', nameEnglish: 'Pieria', regionId: 'central-macedonia' },
    { id: 'serres', name: 'Σερρών', nameEnglish: 'Serres', regionId: 'central-macedonia' },
    { id: 'chalkidiki', name: 'Χαλκιδικής', nameEnglish: 'Chalkidiki', regionId: 'central-macedonia' },
    
    // Crete
    { id: 'heraklion', name: 'Ηρακλείου', nameEnglish: 'Heraklion', regionId: 'crete' },
    { id: 'lasithi', name: 'Λασιθίου', nameEnglish: 'Lasithi', regionId: 'crete' },
    { id: 'rethymno', name: 'Ρεθύμνου', nameEnglish: 'Rethymno', regionId: 'crete' },
    { id: 'chania', name: 'Χανίων', nameEnglish: 'Chania', regionId: 'crete' },
    
    // Southern Aegean
    { id: 'dodecanese-a', name: 'Α\' Δωδεκανήσου', nameEnglish: 'Dodecanese A', regionId: 'southern-aegean' },
    { id: 'dodecanese-b', name: 'Β\' Δωδεκανήσου', nameEnglish: 'Dodecanese B', regionId: 'southern-aegean' },
    { id: 'dodecanese-c', name: 'Γ\' Δωδεκανήσου', nameEnglish: 'Dodecanese C', regionId: 'southern-aegean' },
    { id: 'dodecanese-d', name: 'Δ\' Δωδεκανήσου', nameEnglish: 'Dodecanese D', regionId: 'southern-aegean' },
    { id: 'cyclades-a', name: 'Α\' Κυκλάδων', nameEnglish: 'Cyclades A', regionId: 'southern-aegean' },
    { id: 'cyclades-b', name: 'Β\' Κυκλάδων', nameEnglish: 'Cyclades B', regionId: 'southern-aegean' },
    { id: 'cyclades-c', name: 'Γ\' Κυκλάδων', nameEnglish: 'Cyclades C', regionId: 'southern-aegean' },
    { id: 'cyclades-d', name: 'Δ\' Κυκλάδων', nameEnglish: 'Cyclades D', regionId: 'southern-aegean' },
    
    // Peloponnese
    { id: 'argolida', name: 'Αργολίδας', nameEnglish: 'Argolida', regionId: 'peloponnese' },
    { id: 'arcadia', name: 'Αρκαδίας', nameEnglish: 'Arcadia', regionId: 'peloponnese' },
    { id: 'corinthia', name: 'Κορινθίας', nameEnglish: 'Corinthia', regionId: 'peloponnese' },
    { id: 'laconia', name: 'Λακωνίας', nameEnglish: 'Laconia', regionId: 'peloponnese' },
    { id: 'messinia', name: 'Μεσσηνίας', nameEnglish: 'Messinia', regionId: 'peloponnese' },
    
    // Central Greece
    { id: 'boeotia', name: 'Βοιωτίας', nameEnglish: 'Boeotia', regionId: 'central-greece' },
    { id: 'euboea-a', name: 'Α\' Εύβοιας', nameEnglish: 'Euboea A', regionId: 'central-greece' },
    { id: 'euboea-b', name: 'Β\' Εύβοιας', nameEnglish: 'Euboea B', regionId: 'central-greece' },
    { id: 'eurytania', name: 'Ευρυτανίας', nameEnglish: 'Eurytania', regionId: 'central-greece' },
    { id: 'fthiotida', name: 'Φθιώτιδας', nameEnglish: 'Fthiotida', regionId: 'central-greece' },
    { id: 'fokida', name: 'Φωκίδας', nameEnglish: 'Fokida', regionId: 'central-greece' }
  ];

  private schools: School[] = [
    // Eastern Macedonia and Thrace schools
    { 
      id: 'school-drama-1', 
      name: '1ο Δημοτικό Σχολείο Δράμας', 
      nameEnglish: '1st Primary School of Drama', 
      municipalityId: 'drama', 
      address: 'Κεντρική Πλατεία, Δράμα',
      coordinates: { lat: 41.1533, lng: 24.1472 },
      type: 'primary' 
    },
    { 
      id: 'school-alexandroupoli-1', 
      name: '1ο Δημοτικό Σχολείο Αλεξανδρούπολης', 
      nameEnglish: '1st Primary School of Alexandroupoli', 
      municipalityId: 'evros-a', 
      address: 'Λεωφόρος Δημοκρατίας 15, Αλεξανδρούπολη',
      coordinates: { lat: 40.8500, lng: 25.8742 },
      type: 'primary' 
    },
    { 
      id: 'school-kavala-1', 
      name: '1ο Δημοτικό Σχολείο Καβάλας', 
      nameEnglish: '1st Primary School of Kavala', 
      municipalityId: 'kavala-a', 
      address: 'Ελευθερίου Βενιζέλου 12, Καβάλα',
      coordinates: { lat: 40.9394, lng: 24.4019 },
      type: 'primary' 
    },
    
    
    // Attica schools - Real schools from Ministry of Education data  
    ...atticaSchools,
    
    // Northern Aegean schools
    { 
      id: 'school-mytilene-1', 
      name: '1ο Δημοτικό Σχολείο Μυτιλήνης', 
      nameEnglish: '1st Primary School of Mytilene', 
      municipalityId: 'lesbos-a', 
      address: 'Ερμού 8, Μυτιλήνη',
      coordinates: { lat: 39.1036, lng: 26.5550 },
      type: 'primary' 
    },
    { 
      id: 'school-samos-1', 
      name: '1ο Δημοτικό Σχολείο Σάμου', 
      nameEnglish: '1st Primary School of Samos', 
      municipalityId: 'samos-a', 
      address: 'Κεντρικής Πλατείας 3, Σάμος',
      coordinates: { lat: 37.7567, lng: 26.9733 },
      type: 'primary' 
    },
    { 
      id: 'school-chios-1', 
      name: '1ο Δημοτικό Σχολείο Χίου', 
      nameEnglish: '1st Primary School of Chios', 
      municipalityId: 'chios-a', 
      address: 'Αιγαίου 20, Χίος',
      coordinates: { lat: 38.3675, lng: 26.1364 },
      type: 'primary' 
    },
    
    // Western Greece schools
    { 
      id: 'school-agrinio-1', 
      name: '1ο Δημοτικό Σχολείο Αγρινίου', 
      nameEnglish: '1st Primary School of Agrinio', 
      municipalityId: 'aitoloacarnania', 
      address: 'Παπαστράτου 15, Αγρίνιο',
      coordinates: { lat: 38.6214, lng: 21.4078 },
      type: 'primary' 
    },
    { 
      id: 'school-patras-1', 
      name: '1ο Δημοτικό Σχολείο Πάτρας', 
      nameEnglish: '1st Primary School of Patras', 
      municipalityId: 'achaea', 
      address: 'Κορίνθου 25, Πάτρα',
      coordinates: { lat: 38.2466, lng: 21.7346 },
      type: 'primary' 
    },
    { 
      id: 'school-pyrgos-1', 
      name: '1ο Δημοτικό Σχολείο Πύργου', 
      nameEnglish: '1st Primary School of Pyrgos', 
      municipalityId: 'elis', 
      address: 'Αγίου Ανδρέα 30, Πύργος',
      coordinates: { lat: 37.6764, lng: 21.4411 },
      type: 'primary' 
    },
    
    // Western Macedonia schools
    { 
      id: 'school-kozani-1', 
      name: '1ο Δημοτικό Σχολείο Κοζάνης', 
      nameEnglish: '1st Primary School of Kozani', 
      municipalityId: 'kozani', 
      address: 'Κεντρικής Πλατείας 5, Κοζάνη',
      coordinates: { lat: 40.3014, lng: 21.7889 },
      type: 'primary' 
    },
    { 
      id: 'school-kastoria-1', 
      name: '1ο Δημοτικό Σχολείο Καστοριάς', 
      nameEnglish: '1st Primary School of Kastoria', 
      municipalityId: 'kastoria', 
      address: 'Ωρολογίου 12, Καστοριά',
      coordinates: { lat: 40.5167, lng: 21.2667 },
      type: 'primary' 
    },
    
    // Epirus schools
    { 
      id: 'school-ioannina-1', 
      name: '1ο Δημοτικό Σχολείο Ιωαννίνων', 
      nameEnglish: '1st Primary School of Ioannina', 
      municipalityId: 'ioannina', 
      address: 'Αβέρωφ 18, Ιωάννινα',
      coordinates: { lat: 39.6650, lng: 20.8537 },
      type: 'primary' 
    },
    { 
      id: 'school-preveza-1', 
      name: '1ο Δημοτικό Σχολείο Πρέβεζας', 
      nameEnglish: '1st Primary School of Preveza', 
      municipalityId: 'preveza', 
      address: 'Λεωφόρος Ειρήνης 22, Πρέβεζα',
      coordinates: { lat: 38.9597, lng: 20.7508 },
      type: 'primary' 
    },
    
    // Thessaly schools
    { 
      id: 'school-larisa-1', 
      name: '1ο Δημοτικό Σχολείο Λάρισας', 
      nameEnglish: '1st Primary School of Larisa', 
      municipalityId: 'larisa', 
      address: 'Κύπρου 14, Λάρισα',
      coordinates: { lat: 39.6398, lng: 22.4194 },
      type: 'primary' 
    },
    { 
      id: 'school-volos-1', 
      name: '1ο Δημοτικό Σχολείο Βόλου', 
      nameEnglish: '1st Primary School of Volos', 
      municipalityId: 'magnisia-a', 
      address: 'Ιάσονος 28, Βόλος',
      coordinates: { lat: 39.3667, lng: 22.9444 },
      type: 'primary' 
    },
    
    // Ionian Islands schools
    { 
      id: 'school-corfu-1', 
      name: '1ο Δημοτικό Σχολείο Κέρκυρας', 
      nameEnglish: '1st Primary School of Corfu', 
      municipalityId: 'corfu-a', 
      address: 'Σπιανάδα 10, Κέρκυρα',
      coordinates: { lat: 39.6243, lng: 19.9217 },
      type: 'primary' 
    },
    { 
      id: 'school-zakynthos-1', 
      name: '1ο Δημοτικό Σχολείο Ζακύνθου', 
      nameEnglish: '1st Primary School of Zakynthos', 
      municipalityId: 'zakynthos', 
      address: 'Αλεξάνδρου Ρώμα 15, Ζάκυνθος',
      coordinates: { lat: 37.7900, lng: 20.9011 },
      type: 'primary' 
    },
    
    // Central Macedonia schools
    { 
      id: 'school-thessaloniki-1', 
      name: '1ο Δημοτικό Σχολείο Θεσσαλονίκης', 
      nameEnglish: '1st Primary School of Thessaloniki', 
      municipalityId: 'eastern-thessaloniki', 
      address: 'Τσιμισκή 20, Θεσσαλονίκη',
      coordinates: { lat: 40.6401, lng: 22.9444 },
      type: 'primary' 
    },
    { 
      id: 'school-serres-1', 
      name: '1ο Δημοτικό Σχολείο Σερρών', 
      nameEnglish: '1st Primary School of Serres', 
      municipalityId: 'serres', 
      address: 'Κεντρικής Πλατείας 8, Σέρρες',
      coordinates: { lat: 41.0864, lng: 23.5486 },
      type: 'primary' 
    },
    
    // Crete schools
    { 
      id: 'school-heraklion-1', 
      name: '1ο Δημοτικό Σχολείο Ηρακλείου', 
      nameEnglish: '1st Primary School of Heraklion', 
      municipalityId: 'heraklion', 
      address: '25ης Αυγούστου 41, Ηράκλειο',
      coordinates: { lat: 35.3387, lng: 25.1442 },
      type: 'primary' 
    },
    { 
      id: 'school-chania-1', 
      name: '1ο Δημοτικό Σχολείο Χανίων', 
      nameEnglish: '1st Primary School of Chania', 
      municipalityId: 'chania', 
      address: 'Χαλέπα 18, Χανιά',
      coordinates: { lat: 35.5138, lng: 24.0180 },
      type: 'primary' 
    },
    
    // Southern Aegean schools
    { 
      id: 'school-rhodes-1', 
      name: '1ο Δημοτικό Σχολείο Ρόδου', 
      nameEnglish: '1st Primary School of Rhodes', 
      municipalityId: 'dodecanese-a', 
      address: 'Σωκράτους 28, Ρόδος',
      coordinates: { lat: 36.4341, lng: 28.2176 },
      type: 'primary' 
    },
    { 
      id: 'school-syros-1', 
      name: '1ο Δημοτικό Σχολείο Σύρου', 
      nameEnglish: '1st Primary School of Syros', 
      municipalityId: 'cyclades-a', 
      address: 'Μιαούλη 12, Ερμούπολη',
      coordinates: { lat: 37.4467, lng: 24.9439 },
      type: 'primary' 
    },
    
    // Peloponnese schools
    { 
      id: 'school-tripoli-1', 
      name: '1ο Δημοτικό Σχολείο Τρίπολης', 
      nameEnglish: '1st Primary School of Tripoli', 
      municipalityId: 'arcadia', 
      address: 'Γεωργίου Α\' 25, Τρίπολη',
      coordinates: { lat: 37.5086, lng: 22.3794 },
      type: 'primary' 
    },
    { 
      id: 'school-sparta-1', 
      name: '1ο Δημοτικό Σχολείο Σπάρτης', 
      nameEnglish: '1st Primary School of Sparta', 
      municipalityId: 'laconia', 
      address: 'Λυκούργου 30, Σπάρτη',
      coordinates: { lat: 37.0755, lng: 22.4303 },
      type: 'primary' 
    },
    
    // Central Greece schools
    { 
      id: 'school-livadeia-1', 
      name: '1ο Δημοτικό Σχολείο Λιβαδειάς', 
      nameEnglish: '1st Primary School of Livadeia', 
      municipalityId: 'boeotia', 
      address: 'Κάδμου 15, Λιβαδειά',
      coordinates: { lat: 38.4333, lng: 22.8667 },
      type: 'primary' 
    },
    { 
      id: 'school-chalkida-1', 
      name: '1ο Δημοτικό Σχολείο Χαλκίδας', 
      nameEnglish: '1st Primary School of Chalkida', 
      municipalityId: 'euboea-a', 
      address: 'Βενιζέλου 35, Χαλκίδα',
      coordinates: { lat: 38.4640, lng: 23.6031 },
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
