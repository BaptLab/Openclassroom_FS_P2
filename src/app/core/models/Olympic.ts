// TODO: create here a typescript interface for an olympic country

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
