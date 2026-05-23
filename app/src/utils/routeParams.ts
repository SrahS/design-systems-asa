export type RouteParamValue = string | string[] | undefined;

export const getSingleRouteParam = (value: RouteParamValue): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

export const parsePositiveIntRouteParam = (
  value: RouteParamValue
): number | null => {
  const single = getSingleRouteParam(value);
  if (single == null || single.trim() === "") {
    return null;
  }

  const parsed = Number(single);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};
