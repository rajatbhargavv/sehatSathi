import { geocodePlace } from "../services/geocodeService";

const isPresent = (value) => value !== null && value !== undefined;

const toLower = (value) => String(value ?? "").trim().toLowerCase();

const toRad = (deg) => (deg * Math.PI) / 180;

const haversineDistanceKm = (lat1, lng1, lat2, lng2) => {
  const earthRadiusKm = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

const getDoctorCoordinates = (doctor) => {
  if (typeof doctor?.lat === "number" && typeof doctor?.lng === "number") {
    return { lat: doctor.lat, lng: doctor.lng };
  }

  if (typeof doctor?.location?.lat === "number" && typeof doctor?.location?.lng === "number") {
    return { lat: doctor.location.lat, lng: doctor.location.lng };
  }

  return null;
};

export const FILTER_HANDLERS = {
  specialty: (doctors, filterValue) =>
    doctors.filter((doctor) => toLower(doctor?.specialty) === toLower(filterValue)),

  area: async (doctors, filterValue, extraContext) => {
    const query = String(filterValue ?? "").trim();
    if (!query) return doctors;

    const geocode = extraContext?.geocodePlaceFn ?? geocodePlace;
    const areaLocation = await geocode(query);

    if (!areaLocation) {
      return doctors
        .filter((doctor) => toLower(doctor?.area) === toLower(query))
        .map((doctor) => ({ ...doctor, distance: null, distanceKm: null }));
    }

    const withDistance = doctors
      .map((doctor) => {
        const coords = getDoctorCoordinates(doctor);
        if (!coords) {
          return { ...doctor, distance: null, distanceKm: null };
        }

        const distanceKm = haversineDistanceKm(
          coords.lat,
          coords.lng,
          areaLocation.lat,
          areaLocation.lng
        );

        return {
          ...doctor,
          distance: distanceKm,
          distanceKm,
        };
      })
      .sort((a, b) => {
        const da = typeof a.distanceKm === "number" ? a.distanceKm : Number.POSITIVE_INFINITY;
        const db = typeof b.distanceKm === "number" ? b.distanceKm : Number.POSITIVE_INFINITY;
        return da - db;
      });

    return withDistance;
  },

  available: (doctors, filterValue) => {
    if (!filterValue) return doctors;
    return doctors.filter((doctor) => doctor?.availableNow === true);
  },

  withinKm: (doctors, filterValue) => {
    const limit = Number(filterValue);
    if (!Number.isFinite(limit)) return doctors;

    return doctors.filter((doctor) => {
      const distance = Number(doctor?.distanceKm);
      return Number.isFinite(distance) && distance <= limit;
    });
  },

  minRating: (doctors, filterValue) => {
    const min = Number(filterValue);
    if (!Number.isFinite(min)) return doctors;

    return doctors.filter((doctor) => Number(doctor?.rating) >= min);
  },

  gender: (doctors, filterValue) => {
    const target = toLower(filterValue);
    if (!target) return doctors;

    return doctors.filter((doctor) => toLower(doctor?.gender) === target);
  },

  language: (doctors, filterValue) => {
    const target = toLower(filterValue);
    if (!target) return doctors;

    return doctors.filter((doctor) => {
      if (!Array.isArray(doctor?.languages)) return false;
      return doctor.languages.some((lang) => toLower(lang) === target);
    });
  },
};

export const filterDoctors = async (doctors, filters = {}) => {
  const list = Array.isArray(doctors) ? [...doctors] : [];
  const activeFilters = Object.entries(filters).filter(([, value]) => isPresent(value));

  if (!activeFilters.length) return list;

  let result = list;
  const extraContext = {
    geocodePlaceFn: geocodePlace,
    filters,
  };

  for (const [key, value] of activeFilters) {
    const handler = FILTER_HANDLERS[key];
    if (!handler) continue;
    result = await handler(result, value, extraContext);
  }

  return result;
};
