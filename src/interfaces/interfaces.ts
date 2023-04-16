export interface CharacterI {
  id: number;
  name: string;
  homeworldId: number;
  homeworldUrl: string;
  gender: string;
  birthYearSW: string;
  height: number;
  mass: number | "unknown";
  hairColor: string;
  eyeColor: string;
  skinColor: string;
  speciesUrls: string[];
  speciesIds: number[];
  filmUrls: string[];
  filmIds: number[];
  vehicleUrls: string[];
  vehicleIds: number[];
  starshipUrls: string[];
  starshipIds: number[];
  createdAt: Date;
  editedAt: Date;
}

export interface ApiCharacterI {
  url: string;
  name: string;
  homeworld: string;
  gender: string;
  birth_year: string;
  height: string;
  mass: string;
  hair_color: string;
  eye_color: string;
  skin_color: string;
  species: string[];
  films: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
}

export interface PlanetI {
  id: number;
  name: string;
  population: number;
  diameter: number;
  terrain: string;
  climate: string;
  surfaceWater: number;
  gravity: string;
  orbitalPeriod: number;
  rotationPeriod: number;
  filmUrls: string[];
  filmIds: number[];
  residentUrls: string[];
  residentIds: number[];
  createdAt: Date;
  editedAt: Date;
}

export interface ApiPlanetI {
  url: string;
  name: string;
  population: string;
  diameter: string;
  terrain: string;
  climate: string;
  surface_water: string;
  gravity: string;
  orbital_period: string;
  rotation_period: string;
  films: string[];
  residents: string[];
  created: string;
  edited: string;
}
