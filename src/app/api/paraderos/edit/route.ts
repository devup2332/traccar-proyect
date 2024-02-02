export const POST = async (req: Request, res: Response) => {
  const { name, description, time_available, id } = await req.json();
  console.log({ name, description, time_available, id });
  return Response.json({
    message: "Operation Successfully",
    status: 200,
  });
};
