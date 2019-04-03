import axios from "axios";

const fetchHeatmap = async () => {
  return await axios.get("/api/Coordinates"); // TODO: Endpunkt konkretisieren
};

export default { fetchHeatmap };
