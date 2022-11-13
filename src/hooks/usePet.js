import { useQuery } from "@tanstack/react-query";

const fetchPet = async ({ queryKey }) => {
    const [, id] = queryKey;
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
    // const json = await res.json();
    // const currentPet = json.pets[0];
    // console.log(currentPet);
    // setPet(currentPet);
    return res.json();
};

const usePet = (petId) => {
    return useQuery(['pet', petId], fetchPet);
};

export default usePet;