export interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}

export interface OlympicCountry {
  id: number;
  country: string;
  participations: Participation[];
}

export interface Statistics {
  numberOfEntries: number;
  numberOfMedals: number;
  numberofAthletes: number;
}
