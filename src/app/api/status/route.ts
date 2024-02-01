import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, res: NextApiResponse) => {
  return Response.json({
    message: "Estado del dispositivo",
    status: 200,
    data: [],
  });
};
