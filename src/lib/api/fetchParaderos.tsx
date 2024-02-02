export const fetchParaderos = async () => {
  try {
    const response = await fetch("/api/paraderos", {
      method: "GET",
      headers: {
        "Content-Type": "appication/json",
      },
    });
    const data = await response.json();
    return data.paraderos;
  } catch (err) {
    return [];
  }
};
