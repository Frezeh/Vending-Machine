import { Request, Response } from "express";
import { BuyProductInput } from "../schema/users.schema";
import { machine } from "../index";

export async function buyProduct(
  req: Request<{}, {}, BuyProductInput["body"]>,
  res: Response
) {
  const body = req.body;

  try {
    const result = machine.purchase(body.slot, body.amount);
    if (result === undefined) {
      res.status(404).json({
        status: "Failed",
        message: "Could not complete transaction",
      });
    } else {
      res.send(result);
    }
  } catch (e) {
    throw e;
  }
}
