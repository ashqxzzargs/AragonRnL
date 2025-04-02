import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import GenderService from "../../services/GenderService";
import ErrorHandler from '../../handler/ErrorHandler';

const EditGenderForm = () => {
 
  const { gender_id } = useParams();

  const [state, setState] = useState({
    loadingGet: true,
    gender: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGetGender = (genderId: number) => {
       setState((prevState) => ({
      ...prevState, 
      loadingGet: true,
  }));
    
  GenderService.getGender(genderId)
  .then((res) => {
    if(res.status === 200) {
      setState((prevState) => ({
        ...prevState,
        gender: res.data.gender
      }));
    } else {
      console.error('unexpected status error while getting gender:', 
        res.status
      );
    }
  })
  .catch((error) => {
    ErrorHandler(error, null)
  }) 
  .finally(() => {
    setState ((prevState) => ({
      ...prevState,
      loadingGet: false,
    }));
  });
    
  useEffect(() => {
    if(gender_id) {
      const parsedGenderId = parseInt(gender_id)
      handleGetGender(parsedGenderId);
    }
  }, [gender_id]);
  
  return (
    <>
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            value={state.gender}
            onChange={handleInputChange}
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
