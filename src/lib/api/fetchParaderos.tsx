import { environments } from "@/config/environments";

export const fetchParaderos = async () => {
  try {
    const response = await fetch(`${environments.API_URL}/api/paraderos`, {
      method: "GET",
      headers: {
        "Content-Type": "appication/json",
      },
    });
    const data = await response.json();
    console.log({ data });
    return data.paraderos;
  } catch (err) {
    return [];
  }
};
