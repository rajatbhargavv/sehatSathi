//Family only
import React, { useState } from "react";
import { validateReminder } from "../../utils/validation";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
export default function ReminderForm({handleAddReminder}){
const [formData,setFormData]=useState({
  medicineName:"",
  time:"",
  dosage:""
});
const [errors,setErrors]=useState({});
const handleChange=(e)=>{
  setFormData(
    {...formData,[e.target.name]:e.target.value}
  )
}
const handleSubmit=()=>{
  let check=validateReminder(formData);
  if(!check.isValid){
    setErrors(check.errors);
    return;
  }
  handleAddReminder({...formData});
   setFormData({
      medicineName: "",
      time: "",
      dosage: "",
    });
  setErrors({});
}
return(
  <div className="mb-4 space-y-3">
    <Input name="medicineName" placeholder="Medicine name" onChange={handleChange} value={formData.medicineName}></Input>
    {errors.medicineName && <p>{errors.medicineName}</p>}
     <Input name="time" placeholder="Time" onChange={handleChange} value={formData.time}></Input>
    {errors.time && <p>{errors.time}</p>}
     <Input name="dosage" placeholder="Dosage" onChange={handleChange} value={formData.dosage}></Input>
    {errors.dosage && <p>{errors.dosage}</p>}
    <Button onClick={handleSubmit} fullWidth>Add Reminder</Button>
  </div>
)
}