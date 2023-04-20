import { urls } from "constants/constants";

export const getIdFromSwapiUrl = (url: string) => {
  const subPaths = url.split("/");
  return Number(subPaths[subPaths.length - 2]);
};

export const getCharDetailUrl = (id: number) =>
  urls.CHARACTER_DETAIL.replace(":characterId", String(id));

export const parseUnknowableNumber = (unknowableNumber: string) => {
  unknowableNumber = unknowableNumber.replace(",", "");
  return !isNaN(parseFloat(unknowableNumber))
    ? Number(unknowableNumber)
    : "unknown";
};
