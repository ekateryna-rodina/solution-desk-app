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
      } catch (result) {
        const errors = (result as { errors: [] }).errors;
        return res.status(400).json({ errors });
      }
    }

    await handler(req, res);
  };
}
