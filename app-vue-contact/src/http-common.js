import axios from "axios";

export default axios.create({
  baseURL: "https://private-21e8de-rafaellucio.apiary-mock.com/users",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});