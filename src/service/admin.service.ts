import { Request, Response } from "express";
import { machine } from "../index";
import { AddCoinsInput, AdjustPriceInput, AdjustQuantityInput } from "../schema/admin.schema";

export async function countProducts(req: Request, res: Response) {
  try {
    const result = machine.countProducts();
    return res.send(result);
  } catch (e) {
    throw e;
  }
}

export async function countchange(req: Request, res: Response) {
  try {
    const result = machine.totalCoins();
    return res.send(result);
  } catch (e) {
    throw e;
  }
}

export async function addcoins(
  req: Request<{}, {}, AddCoinsInput["body"]>,
  res: Response
) {
  const body = req.body;

  try {
    const result = machine.addChange(body.coin);
    if (result === "Invalid coin type") {
      res.status(404).json({
        status: result,
        message: "Coin must be of a valid denomination",
      });
    } else {
      res.send(result);
    }
  } catch (e) {
    throw e;
  }
}

export async function adjustProductPrice(
  req: Request<{}, {}, AdjustPriceInput["body"]>,
  res: Response
) {
  const body = req.body;

  try {
    const result = machine.adjustPrice(body.productSlot, body.price);
    res.send(result);
  } catch (e) {
    throw e;
  }
}

export async function adjustProducQuantity(
  req: Request<{}, {}, AdjustQuantityInput["body"]>,
  res: Response
) {
  const body = req.body;

  try {
    const result = machine.adjustQuantity(body.productSlot, body.quantity);
    res.send(result);
  } catch (e) {
    throw e;
  }
}
