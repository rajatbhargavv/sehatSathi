import { isEqual } from "./validation";
export const filterDoctors = (doctors, { specialty = '',area='' } = {}) => {
  if (!specialty && !area) return doctors;
  return doctors.filter((d) =>
  {
    const specialtyMatch=isEqual(specialty,d.specialty);
    const areaMatch=isEqual(area,d.area);
    return specialtyMatch && areaMatch;
  }
  );
};
