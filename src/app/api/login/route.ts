import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  const { username, password } = await req.json();
  console.log({ username, password });

  return Response.json({
    message: "User Logged",
    status: 200,
    token: "dsadas",
  });
};
