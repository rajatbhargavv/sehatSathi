import { isEqual } from "./validation";
import { getDistance } from "./validation";
import { geocodePlace } from "../services/geocodeService";
export const filterDoctors = (doctors, { specialty = '',area='' } = {}) => {
  if (!specialty && !area) return doctors;
  if(specialty && area){
    const loc=geocodePlace(area);
  return doctors.filter((d) =>
  {
      return isEqual(d.specialty,specialty);
  }
  ).sort((doc1,doc2)=>{
    return getDistance(doc1.lat,doc1.lng,loc.lat,loc.lng)-getDistance(doc2.lat,doc2.lng,loc.lat,loc.lng);
  })
}
  if(specialty){
    return doctors.filter((d)=> {
      return isEqual(d.specialty,specialty);
    })
  }
  if(area){
    const loc=geocodePlace(area);
    return doctors.sort((doc1,doc2)=>{
      return getDistance(doc1.lat,doc1.lng,loc.lat,loc.lng)-getDistance(doc2.lat,doc2.lng,loc.lat,loc.lng);
    })
  }
};
