import { isEqual } from "./validation";
export const filterDoctors = (doctors, { specialty = '',area='' } = {}) => {
  if (!specialty) return doctors;
  return doctors.filter((d) =>
    d.specialty?.toLowerCase().includes(specialty.toLowerCase())
  );
};
