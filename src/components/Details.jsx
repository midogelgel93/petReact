import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import usePet from "../hooks/usePet";
import Carousel from "./Carousel";
import AdoptedPetContext from "../hooks/AdoptedPetContext";
import { lazy, useContext, useState } from "react";

const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  // const [pet, setPet] = useState(null);
  const petQuery = usePet(id);
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  let pet = petQuery?.data?.pets[0];

  const navigate = useNavigate();
  return (
    <div className="details">
      {petQuery.isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {petQuery.isError && <span>{petQuery.error.message}</span>}
      {petQuery.data && (
        <div>
          <Carousel images={pet.images} />
          <h1> Pet Name: {pet.name}</h1>
          <h2> Pet Type: {pet.animal}</h2>
          <h2> Pet Address: {pet.city}</h2>
          <p> Pet Description: {pet.description}</p>
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>

          <Link to={"/"}>
            <button>Back</button>
          </Link>
          {showModal && (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Details;
