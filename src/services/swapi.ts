import {
  ApiCharacterI,
  ApiPlantetI,
  CharacterI,
  PlantetI,
} from "interfaces/interfaces";

import axios from "axios";

import { getIdFromSwapiUrl } from "utils/utils";

const BASE_URL = process.env.REACT_APP_API_URL;

export const swapiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const parseCharacterFromApi = (character: ApiCharacterI): CharacterI => {
  return {
    id: getIdFromSwapiUrl(character.url),
    name: character.name,
    gender: character.gender,
    birthYearSW: character.birth_year,
    height: Number(character.height),
    mass: Number(character.mass),
    hairColor: character.hair_color,
    eyeColor: character.eye_color,
    skinColor: character.skin_color,
    speciesUrls: character.species,
    speciesIds: character.species.map(getIdFromSwapiUrl),
    filmUrls: character.films,
    filmIds: character.films.map(getIdFromSwapiUrl),
    vehicleUrls: character.vehicles,
    vehicleIds: character.vehicles.map(getIdFromSwapiUrl),
    starshipUrls: character.starships,
    starshipIds: character.starships.map(getIdFromSwapiUrl),
    createdAt: new Date(character.created),
    editedAt: new Date(character.edited),
  };
};

const getCharacter = async (id: number) => {
  const res = await swapiClient.get(`/people/${id}`);
  return parseCharacterFromApi(res.data);
};

const getCharacters = async (page: number = 1, searchTerm?: string) => {
  const res = await swapiClient.get("/people", {
    params: { page, search: searchTerm },
  });
  return res.data.results.map(parseCharacterFromApi);
};

const parsePlanetFromApi = (planet: ApiPlantetI): PlantetI => {
  return {
    id: getIdFromSwapiUrl(planet.url),
    name: planet.name,
    population: Number(planet.population),
    diameter: Number(planet.diameter),
    surfaceWater: Number(planet.surface_water),
    orbitalPeriod: Number(planet.orbital_period),
    rotationPeriod: Number(planet.rotation_period),
    terrain: planet.terrain,
    climate: planet.climate,
    gravity: planet.gravity,
    filmUrls: planet.films,
    filmIds: planet.films.map(getIdFromSwapiUrl),
    residentUrls: planet.residents,
    residentIds: planet.residents.map(getIdFromSwapiUrl),
    createdAt: new Date(planet.created),
    editedAt: new Date(planet.edited),
  };
};

const getPlanet = async (id: number) => {
  const res = await swapiClient.get(`/planets/${id}`);
  return parsePlanetFromApi(res.data);
};

const swapi = {
  getCharacter,
  getCharacters,
  getPlanet,
};

export default swapi;
