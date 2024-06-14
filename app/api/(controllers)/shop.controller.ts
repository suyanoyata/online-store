/* This file must utilize all operations related to global shop functioning such as:
	-- get specific item
	-- filter items
	-- remove items
*/

import { shop_service } from "../(services)/shop.service";
import { constants } from "../(configs)/constants";

const get_product_by_id = async (req: Request, res: Response) => {
  if (!req.params.id || typeof req.params.id !== "string") {
    res.status(400).send({
      message: "Incorrect product id provided.",
    });
    return;
  }
  const product = await shop_service.api.get_product_by_id(req.params.id);

  res.status(200).send(product);
};

type AddProductRequest = {
  user?: {
    id: string;
  };
  body: {
    [key: string]: string;
  };
} & Request;

const add_product = async (req: AddProductRequest, res: Response) => {
  if (!constants.allowed_product_fields.includes(req.params.product_type)) {
    res.status(400).send("Invalid product type");
    return;
  }

  if (!req.user?.id) {
    res.status(400).send("User not found");
    return;
  }

  try {
    const product = await shop_service.api.add_product(
      req.user.id,
      req.params.product_type as any,
      req.body,
    );

    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

const get_products_by_type = async (req: Request, res: Response) => {
  if (!constants.allowed_product_fields.includes(req.params.product_type)) {
    res.status(400).send("Invalid product type");
    return;
  }

  const products = await shop_service.api.get_product_by_type(
    req.params.product_type,
  );

  res.status(200).send(products);
};

const order = async (req: AddProductRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(400).send("User not found");
    return;
  }

  if (!req.body.items || !Array.isArray(req.body.items)) {
    res.status(400).send({
      status: 400,
      message: "Can't order without items.",
    });
    return;
  }

  const order = await shop_service.api.order_product(
    req.body.items,
    req.user.id,
  );

  res.status(order.status).json(order);
};

const getUserOrders = async (req: AddProductRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(400).send("User not found");
    return;
  }

  const orders = await shop_service.api.get_user_orders(req.user.id);

  res.status(200).send(orders);
};

export const shop_controller = {
  api: {
    add_product,
    get_all_products,
    get_products_by_type,
    get_product_by_id,
    order,
    getUserOrders,
  },
};
