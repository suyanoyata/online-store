import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_HOSTNAME,
  // baseURL: "http://ec2-16-171-169-107.eu-north-1.compute.amazonaws.com:2735",
});
