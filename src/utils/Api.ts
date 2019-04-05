import axios from "axios";

const fetchGebaeude = async () => {
  return await axios.get("/api/Coordinates");
};

const fetchSchaeden = async () => {
  return await axios.get("/api/Schaeden");
};

export default { fetchGebaeude, fetchSchaeden };
