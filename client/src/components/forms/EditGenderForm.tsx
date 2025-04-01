import { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import GenderService from "../../services/GenderService";

const EditGenderForm = () => {
 
  const { gender_id } = useParams();

  const [state, setState] = useState({
    loadingGet: true,
    gender: "",
  })

  const handleGetGender = (genderId: number) => {
    if(gender_id) {
      const parsedGenderId = parseInt(gender_id)

       setState((prevState) => ({
      ...prevState
  }))
    
  GenderService.getGender(parsedGenderId).then().catch().finally();

  };
  return (
    <>
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            name="gender"
          />
        </div>
        <div className="d-flex justify-content-end">
          <Link to={"/"} className="btn btn-secondary mx-1">
            Back
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </>
  );
};
}

export default EditGenderForm;
