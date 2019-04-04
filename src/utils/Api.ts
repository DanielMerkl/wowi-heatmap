import axios from "axios";

const fetchGebaeude = async () => {
  return await axios.get("/api/Gebaeude"); // TODO: Endpunkt anpassen
};

const fetchSchaeden = async () => {
  return await axios.get("/api/Schaeden"); // TODO: Endpunkt anpassen
};

export default { fetchGebaeude, fetchSchaeden };
