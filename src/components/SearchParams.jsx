import { useState, useContext } from "react";
import Results from "./Result.jsx";
import Loader from "./Loader.jsx";
import useBreedList from "../hooks/useBreedList";
import usePetsSearch from "../hooks/usePetsSearch.js";
import ErrorBoundary from "./ErrorBoundary.jsx";
import AdoptedPetContext from "../hooks/AdoptedPetContext.js";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [searchParams, setSearchParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  // const [location, setLocation] = useState("");
  // const [animal, setAnimal] = useState("");
  // const [breed, setBreed] = useState("");
  // const [pets, setPets] = useState([]);

  // const breeds = useBreedList(animal);

  // const handleLocationChange = (e) => {
  //   setLocation(e.target.value);
  // };

  // const handleAnimalChange = (e) => {
  //   setAnimal(e.target.value);
  //   setBreed("");
  // };

  // const handleBreedChange = (e) => {
  //   setBreed(e.target.value);
  // };

  const [adoptedPet] = useContext(AdoptedPetContext);
  const petsQuery = usePetsSearch(searchParams);
  const pets = petsQuery?.data?.pets ?? [];

  const breedsQuery = useBreedList(searchParams.animal);
  let breeds = breedsQuery?.data?.breeds ?? [];

  // const fetchPets = async () => {
  //   const res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //   );
  //   const json = await res.json();
  //   setPets(json.pets);
  // };

  // useEffect(() => {
  //   fetchPets();
  // }, []);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const animal = formData.get("animal");
          const location = formData.get("location");
          const breed = formData.get("breed");
          setSearchParams({ location, animal, breed });
        }}
      >
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                animal: e.target.value,
                breed: "",
              });
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {petsQuery.isLoading && (
        <div className="search loader-container">
          <Loader />
        </div>
      )}
      {petsQuery.isError && <span>{petsQuery.error}</span>}
      {petsQuery.data && (
        <ErrorBoundary>
          <Results pets={pets} />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default SearchParams;
