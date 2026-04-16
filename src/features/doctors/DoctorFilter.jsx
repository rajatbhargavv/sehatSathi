import Select from "../../components/ui/Select";
const DoctorFilter = ({selectedSpecialty,setSelectedSpecialty,selectedArea,setSelectedArea}) => {
 
  return (
    <div className="space-y-3">
      <Select
        placeholder="Filter by specialty"
        value={selectedSpecialty}
        onChange={(e) => { setSelectedSpecialty(e.target.value); }}
        options={["All","Cardiologist", "Dentist", "General"]}/>
      <Select
        placeholder="Filter by area"
        value={selectedArea}
        onChange={(e) => { setSelectedArea(e.target.value);  }}
        options={["All","Delhi", "Noida", "Gurgaon"]}
      />
    </div>
  );
};

export default DoctorFilter;
