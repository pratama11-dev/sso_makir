import { decrypt, encrypt } from "@utils/helpers/Crypto";
import { rejectNull } from "@utils/helpers/HelperServer";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  result: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { type } = req.body;
  const { raw } = req.body;
  const condition = rejectNull(type, "Type", res);

  if (condition) {
    if (type === "encrypt") {
      const encryptResult = encrypt(raw);
      res.status(200).json({ result: encryptResult });
    }
    if (type === "decrypt") {
      const decryptResult = decrypt(raw);
      res.status(200).json({ result: decryptResult });
    }
  }
  //   res.status(402).json({ result: "-" });
}
