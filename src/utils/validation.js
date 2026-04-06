// export const isValidTime = (time) => /^\d{2}:\d{2}$/.test(time);
// export const isNonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;

export const isEmpty = (value) => {
  return !value || value.toString().trim() === "";
}; //agar value empty hai to true return karega, warna false


export const isValidTime = (time) => {
  if (isEmpty(time)) return false; //agar time empty hai to false return karega
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; //pta nahi kya regex hai, lekin time format check karega
  return regex.test(time.trim());
};


export const isValidPhoneNumber = (phone) => {
  const regex = /^[0-9]{10}$/; // Indian phone format
  return !isEmpty(phone) && regex.test(phone.trim());
};


export const isEqual = (val1, val2) => {
  //2 strings ko compare krke boolean value return karega(used in various external files)
//   if (isEmpty(val1) || isEmpty(val2)) return false;    -> not required
  if (val1.trim().toLowerCase() === val2.trim().toLowerCase()) return true;
  return false;
};


export const isValidDate = (date) => {
  if (isEmpty(date)) return false;
  const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  return regex.test(date.trim());
};


export const validateReminder = (reminder) => {
  const errors = {
    //default error messages empty hai
    medicineName: "",
    time: "",
    dosage: "",
  };
  let isValid = true;
  if (isEmpty(reminder.medicineName)){
    //agar medicine name empty hai to error message set karega
    errors.medicineName = "Medicine name is required";
    isValid=false;
  }
  if (isEmpty(reminder.time)){
    //agar time empty hai to error message set karega
    errors.time = "Time is required";
    isValid = false;
  }
  else if (!isValidTime(reminder.time)){
    errors.time = "Invalid time format. Must be HH:mm in 24 hour format";
    isValid=false;
  }
  if (isEmpty(reminder.dosage)){
    //agar dosage empty hai to error message set karega
    errors.dosage = "Dosage is required";
    isValid=false;
}
  return {isValid, errors}; //error object return karega
};


export const validateDoctor = (doctor) => {
  const errors = {
    name: "",
    specialty: "",
    hospital: "",
    area: "",
  };
  let isValid=true;
  if (isEmpty(doctor.name)){
    isValid=false;
    errors.name = "Doctor's name is required";}

  if (isEmpty(doctor.specialty)){
    isValid=false;
    errors.specialty = "Doctor's specialty is required";}

  if (isEmpty(doctor.hospital)){
    isValid=false;
    errors.hospital = "Doctor's hospital is required";}

  if (isEmpty(doctor.area)){
    isValid=false;
    errors.area = "Doctor's area is required";}

  return {isValid,errors};
};

export const validateHospital = (hospital) => {
  const errors = {
    name: "",
    address: "",
    phone: ""
  };
  let isValid=true;
  if (isEmpty(hospital.name)){ 
    isValid=false;
    errors.name = "Hospital name is required";}
  if (isEmpty(hospital.address)){ 
    isValid=false;
    errors.address = "Hospital address is required";}
  if (!isValidPhoneNumber(hospital.phone)){
    isValid=false;
    errors.phone = "Valid phone number required";}
  return {isValid,errors};
};



export const validateHealthTip = (tip) => {
  const errors = {
    tip: "",
    category: ""
  };
  let isValid=true;
  if (isEmpty(tip.tip)){
    isValid=false;
    errors.tip = "Health tip content is required";}
  if (isEmpty(tip.category)){
    isValid=false;
     errors.category = "Category is required";}
  return {isValid,errors};
};


export const isValidEmail = (email) => {
  if (isEmpty(email)) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const getDistance=(lat1,lng1,lat2,lng2)=>{
  const distance=Math.sqrt(Math.pow(lat2-lat1,2)+Math.pow(lng2-lng1,2));
  return distance;
}