export const filterDoctors = (doctors, { specialty = '' } = {}) => {
  if (!specialty) return doctors;
  return doctors.filter((d) =>
    d.specialty?.toLowerCase().includes(specialty.toLowerCase())
  );
};
