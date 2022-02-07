import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
export default function validated(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (["POST", "PUT"].includes(req.method as string)) {
      try {
        // return all existing errors by abort early
        req.body = await schema.validate(req.body, { abortEarly: false });
      } catch (error) {
        return res.status(400).json(error);
      }
    }

    await handler(req, res);
  };
}
