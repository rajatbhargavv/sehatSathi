// export const isValidTime = (time) => /^\d{2}:\d{2}$/.test(time);
// export const isNonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;

export const isEmpty=(value)=>{if(value.trim()==="") return true; return false;}//agar value empty hai to true return karega, warna false
export const isValidTime=(time)=>{
    if(isEmpty(time)) return false;//agar time empty hai to false return karega
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;//pta nahi kya regex hai, lekin time format check karega
    return regex.test(time.trim());
}

export const validateReminder=(reminder)=>{
    const errors={//default error messages empty hai
        medicineName:"",
        time:"",
        dosage:""
    };
    if(isEmpty(reminder.medicineName))//agar medicine name empty hai to error message set karega
        errors.medicineName="Medicine name is required";

    if(isEmpty(reminder.time))//agar time empty hai to error message set karega
        errors.time="Time is required";
    else if(!isValidTime(reminder.time))
            errors.time="Invalid time format. Must be HH:MM in 24 hour format";

    if(isEmpty(reminder.dosage))//agar dosage empty hai to error message set karega
        errors.dosage="Dosage is required";

    return errors;//error object return karega
}

export const validateDoctor=(doctor)=>{
    const errors={
        name:"",
        specialty:"",
        hospital:"",
        area:""
    };
    if(isEmpty(doctor.name))
        errors.name="Doctor's name is required";

    if(isEmpty(doctor.specialty))
        errors.specialty="Doctor's specialty is required";

    if(isEmpty(doctor.hospital))
        errors.hospital="Doctor's hospital is required";

    if(isEmpty(doctor.area))
        errors.area="Doctor's area is required";
    
    return errors;
}

export const isEqual=(val1,val2)=>{    //2 strings ko compare krke boolean value return karega(used in various external files)
    if(isEmpty(val1) || isEmpty(val2))
        return false;
    if(val1.trim().toLowerCase()===val2.trim().toLowerCase())
        return true;
    return false;
}