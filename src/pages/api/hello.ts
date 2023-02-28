// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import cheerio from "cheerio";
type Data = {
  name: string;
};

export const getClubList = async (req, res) => {
  // 2
  if (req.method === "POST") {
    // 3
    const username = req.body.TWuser;

    try {
      // 4
    } catch (e) {
      // 5
    }
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
