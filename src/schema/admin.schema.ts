import { object, string, TypeOf, array, number } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CountProductResponse:
 *      type: object
 *      properties:
 *        totalItemCount:
 *          type: number
 *        individualItemCount:
 *          type: object
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    CountChangeResponse:
 *      type: object
 *      properties:
 *        coinType:
 *          type: object
 *        totalAmount:
 *          type: number
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    AddChangeInput:
 *      type: object
 *      required:
 *        - coin
 *      properties:
 *        coin:
 *          type: array
 *          items:
 *              type: number
 *          default: [0.25, 0.25, 0.5, 1, 2, 2]
 *    AddChangeResponse:
 *          type: array
 *          items:
 *              type: number
 */

/**
 * @openapi
 * components:
 *  schemas:
 *   AdjsutPriceInput:
 *      type: object
 *      required:
 *        - price
 *        - productSlot
 *      properties:
 *        price:
 *          type: number
 *          default: 10
 *        productSlot:
 *          type: string
 *          default: A2
 *   AdjsutPriceResponse:
 *          type: array
 *          items:
 *              type: object
 *          properties:
 *             slot:
 *               type: string
 *             name:
 *               type: string
 *             quantity:
 *               type: number
 *             price:
 *               type: number
 */

/**
 * @openapi
 * components:
 *  schemas:
 *   AdjsutQuantityInput:
 *      type: object
 *      required:
 *        - quantity
 *        - productSlot
 *      properties:
 *        quantity:
 *          type: number
 *          default: 20
 *        productSlot:
 *          type: string
 *          default: A2
 *   AdjsutQuantityResponse:
 *          type: array
 *          items:
 *              type: object
 *          properties:
 *             slot:
 *               type: string
 *             name:
 *               type: string
 *             quantity:
 *               type: number
 *             price:
 *               type: number
 */

const loadProductPayload = {
  body: array(
    object({
      name: string({
        required_error: "product name is required",
      }),
      quantity: number({
        required_error: "product quantity is required",
      }),
      price: number({
        required_error: "product price is required",
      }),
      slot: string({
        required_error: "product slot is required",
      }),
    })
  ),
};

const addCoinsPayload = {
  body: object({
    coin: array(
      number().positive({ message: "coin must be a positive value" })
    ),
  }),
};

const adjustPricePayload = {
  body: object({
    productSlot: string({
      required_error: "product slot is required",
    }),
    price: number({
      required_error: "price is required",
    }),
  }),
};

const adjustQuantityPayload = {
  body: object({
    productSlot: string({
      required_error: "product slot is required",
    }),
    quantity: number({
      required_error: "quantity is required",
    }),
  }),
};

export const LoadProductSchema = object({
  ...loadProductPayload,
});

export const AddCoinsSchema = object({
  ...addCoinsPayload,
});

export const AdjustPriceSchema = object({
  ...adjustPricePayload,
});

export const AdjustQuantitySchema = object({
  ...adjustQuantityPayload,
});

export type LoadProductInput = TypeOf<typeof LoadProductSchema>;
export type AddCoinsInput = TypeOf<typeof AddCoinsSchema>;
export type AdjustPriceInput = TypeOf<typeof AdjustPriceSchema>;
export type AdjustQuantityInput = TypeOf<typeof AdjustQuantitySchema>;
