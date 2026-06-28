// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSessionFromHeader } from "@utils/helpers/HelperServer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getSessionFromHeader(req);
  res.status(200).json({ ...data });
}
