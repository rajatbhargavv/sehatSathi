import { isEqual } from "./validation";

export const filterDoctors = (doctors, { specialty = "", area = "" } = {}) => {
  if (!specialty && !area) return doctors;

  return doctors.filter((d) => {
    const specialtyMatch = specialty ? isEqual(specialty, d.specialty) : true;
    const areaMatch = area ? isEqual(area, d.area) : true;

    if (specialty && area) {
      return specialtyMatch && areaMatch;
    }

    return specialtyMatch || areaMatch;
  });
};
