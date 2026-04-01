import { isEqual } from "./validation";
import { getDistance } from "./validation";
import { geocodePlace } from "../services/geocodeService";

export const filterDoctors = async (doctors, { specialty = "", area = "" } = {}) => {
  if (!specialty && !area) return doctors;

  let filtered = [...doctors];

  if (specialty) {
    filtered = filtered.filter((d) => isEqual(specialty, d.specialty));
  }

  if (area) {
    const loc = await geocodePlace(area);

    if (loc) {
      filtered = filtered
        .filter((d) => typeof d.lat === "number" && typeof d.lng === "number")
        .sort((doc1, doc2) => getDistance(doc1.lat, doc1.lng, loc.lat, loc.lng) - getDistance(doc2.lat, doc2.lng, loc.lat, loc.lng));
    } else {
      // If geocoding fails, fallback to area name match
      filtered = filtered.filter((d) => isEqual(area, d.area));
    }
  }

  return filtered;
};
