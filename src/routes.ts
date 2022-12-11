import { Express, Request, Response } from "express";
import validateResource from "./validateResource";
import { BuyProductSchema } from "./schema/users.schema";
import { buyProduct } from "./service/users.service";
import { AddCoinsSchema, AdjustPriceSchema, AdjustQuantitySchema } from "./schema/admin.schema";
import {
  addcoins,
  adjustProducQuantity,
  adjustProductPrice,
  countchange,
  countProducts,
} from "./service/admin.service";

function routes(app: Express) {
  /**
   * @openapi
   * '/api/users/buy':
   *  post:
   *     tags:
   *     - User
   *     summary: Purchase an item from the machine
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/BuyProductInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BuyProductResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/users/buy", validateResource(BuyProductSchema), buyProduct);

  /**
   * @openapi
   * '/api/admin/countproducts':
   *  get:
   *     tags:
   *     - Admin
   *     summary: Count the number of products in the machine
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CountProductResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.get("/api/admin/countproducts", countProducts);

  /**
   * @openapi
   * '/api/admin/countchange':
   *  get:
   *     tags:
   *     - Admin
   *     summary: Get the amount of change currently in the machine for each type of coin
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CountChangeResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.get("/api/admin/countchange", countchange);

  /**
   * @openapi
   * '/api/admin/addcoins':
   *  post:
   *     tags:
   *     - Admin
   *     summary: Add aditional coins to the machine
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/AddChangeInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AddChangeResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/admin/addcoins", validateResource(AddCoinsSchema), addcoins);

  /**
   * @openapi
   * '/api/admin/adjsutprice':
   *  post:
   *     tags:
   *     - Admin
   *     summary: Set the price for a product slot
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/AdjsutPriceInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdjsutPriceResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/admin/adjsutprice", validateResource(AdjustPriceSchema), adjustProductPrice);

  /**
   * @openapi
   * '/api/admin/adjustquantity':
   *  post:
   *     tags:
   *     - Admin
   *     summary: Adjust the number of items available for a product slot
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/AdjsutQuantityInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AdjsutQuantityResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/admin/adjustquantity", validateResource(AdjustQuantitySchema), adjustProducQuantity);
}

export default routes;
