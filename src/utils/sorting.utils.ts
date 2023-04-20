import { CharacterI } from "interfaces/interfaces";

type SortingType = "alphabetic" | "numerical";
type SortingDirection = "ASC" | "DES";
type CharacterField = keyof CharacterI;
export interface SortingCriterion {
  field: CharacterField;
  direction: SortingDirection;
}
export type SortingFields = { [K in CharacterField]?: SortingType };

const sortingDirections: SortingDirection[] = ["ASC", "DES"];

export const getSortingCriteria = (sortingFields: SortingFields) =>
  Object.keys(sortingFields).flatMap((fieldName) =>
    sortingDirections.map((dir) => ({ field: fieldName, direction: dir }))
  ) as SortingCriterion[];

const SORT_LABEL_SEPARATOR = " ";

export const getSortCriterionFromLabel = (label: string): SortingCriterion => {
  const [field, direction] = label.split(SORT_LABEL_SEPARATOR);
  return {
    field: field as CharacterField,
    direction: direction as SortingDirection,
  };
};

export const getLabelFromSortCriterion = (criterion: SortingCriterion) => {
  return `${criterion.field}${SORT_LABEL_SEPARATOR}${criterion.direction}`;
};

export const getSortFunction = (
  sortingFields: SortingFields,
  criterion: SortingCriterion
) => {
  return (charA: CharacterI, charB: CharacterI) => {
    const selectedDirection = criterion.direction;
    if (selectedDirection === "DES") {
      [charA, charB] = [charB, charA];
    }

    const selectedField = criterion.field;
    let toCompareA = charA[selectedField];
    let toCompareB = charB[selectedField];

    if (sortingFields[selectedField] === "numerical") {
      toCompareA = Number(toCompareA) || 0; // "|| 0" because it can be "unknown"
      toCompareB = Number(toCompareB) || 0; // "|| 0" because it can be "unknown"
      return toCompareA - toCompareB;
    }
    if (sortingFields[selectedField] === "alphabetic") {
      return (toCompareA as string).localeCompare(toCompareB as string);
    }
    return 0;
  };
};
