export const saveNewInfoParadero = async (data: any, id: number) => {
  const response = await fetch("/api/paraderos/edit", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      id,
    }),
  });

  const dataResponse = await response.json();
  return dataResponse;
};
