import axios from "axios";

const fetchBestaende = async () => {
  return await axios.get("/api/bestaende");
};

const fetchSchaeden = async () => {
  return await axios.get("/api/schaeden");
};

export default { fetchBestaende, fetchSchaeden };
