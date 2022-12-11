import { object, string, TypeOf, array, number } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    BuyProductInput:
 *      type: object
 *      required:
 *        - slot
 *        - amount
 *      properties:
 *        slot:
 *          type: string
 *          default: A2
 *        amount:
 *          type: array
 *          items:
 *              type: number
 *          default: [0.25, 0.25, 0.5, 1, 2, 2]
 *    BuyProductResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        userChange:
 *          type: array
 *          items:
 *              type: number
 */

const payload = {
  body: object({
    slot: string({
      required_error: "product slot is required",
    }),
    amount: array(
      number({
        required_error: "amount is required",
      })
    ),
  }),
};

export const BuyProductSchema = object({
  ...payload,
});

export type BuyProductInput = TypeOf<typeof BuyProductSchema>;
