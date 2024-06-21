import { faker } from "@faker-js/faker";
import { PrismaClient, ProductDetails, ProductType } from "@prisma/client";
import { Product } from "../(types)/gpu";
import {
  ProductResponse,
  ProductSchema,
  schemas,
} from "../(types)/zod/product.schema";
import { ProductTypes } from "@/app/(create-product)/dashboard/products/create/components/CreateForm.form";

const prisma = new PrismaClient();

const ProductSelectFields = {
  id: true,
  product_title: true,
  vendor: true,
  type: true,
  product_image: true,
  product_original_url: true,
  product_price: true,
  ProductDetails: {
    select: {
      core_clock: true,
      memory_clock: true,
      memory_size: true,
      power_pins: true,
      interface: true,
      socket: true,
      core_count: true,
      thread_count: true,
      integrated_graphics: true,
      ram_speed: true,
      required_power: true,
      ram_type: true,
      ram_count: true,
      ram_size: true,
      motherboard_socket: true,
      motherboard_chipset: true,
      motherboard_ram_type: true,
      motherboard_form_factor: true,
      drive_type: true,
      drive_form_factor: true,
      drive_capacity: true,
      drive_read_speed: true,
      drive_write_speed: true,
      drive_interface: true,
      case_color: true,
      case_type: true,
      case_form_factor: true,
      psu_capacity: true,
      psu_gpu_slot: true,
    },
  },
};

const get_all_products = async () => {
  const products = await prisma.product.findMany({
    take: 20,
    select: ProductSelectFields,
  });

  let finalProducts: {
    gpu: ProductDetails[];
    cpu: ProductDetails[];
    storage: ProductDetails[];
    ram: ProductDetails[];
    motherboard: ProductDetails[];
    psu: ProductDetails[];
    case: ProductDetails[];
  } = {
    gpu: [],
    cpu: [],
    storage: [],
    ram: [],
    motherboard: [],
    psu: [],
    case: [],
  };

  products.map((product) => {
    let parsedDetails;
    let parsedProduct = ProductSchema.parse(product);
    for (const key in product) {
      if (key == "type") {
        parsedDetails = schemas[product[key]].parse(product.ProductDetails);
      }
    }
    // @ts-ignore
    finalProducts[product.type].push({
      ...parsedProduct,
      ...parsedDetails,
    });
  });

  return finalProducts;
};

const add_product = async (
  sellerId: string,
  product_type: ProductTypes,
  product: Product,
) => {
  const parsedProduct = ProductSchema.parse(product);
  const parsedDetails = schemas[product_type].parse(product);

  const productDetails = await prisma.productDetails.create({
    data: {
      ...parsedDetails,
    },
  });

  return await prisma.product.create({
    data: {
      sellerId,
      type: product_type,
      productDetailsId: productDetails.id,
      ...parsedProduct,
    },
  });
};

const delete_product = async (sellerId: string, productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw {
      message: "No such product.",
    };
  }

  if (product?.sellerId != sellerId) {
    throw {
      message: "You are not owner of this product",
    };
  }

  try {
    await prisma.productDetails.delete({
      where: {
        id: product.productDetailsId,
      },
    });

    await prisma.product.delete({
      where: {
        id: product.id,
      },
    });
  } catch (e) {
    throw {
      message: "Couldn't delete product.",
    };
  }
};

const get_product_by_id = async (id: string) => {
  const product = await prisma.product
    .findUnique({
      where: {
        id,
      },
      select: ProductSelectFields,
    })
    .catch(() => {
      return null;
    });

  if (!product) {
    return null;
  }

  const baseData = ProductResponse.parse(product);
  const details =
    product && schemas[product.type].parse(product.ProductDetails);

  return { ...baseData, ...details };
};

const get_product_by_type = async (product_type: string) => {
  const products = await prisma.product.findMany({
    where: {
      type: product_type as ProductType,
    },
    select: ProductSelectFields,
  });

  let finalProducts: ProductDetails[] = [];

  products.map((product) => {
    let parsedDetails;
    let parsedProduct = ProductSchema.parse(product);
    for (const key in product) {
      if (key == "type") {
        parsedDetails = schemas[product[key]].parse(product.ProductDetails);
      }
    }
    // @ts-ignore
    finalProducts.push({
      ...parsedProduct,
      ...parsedDetails,
    });
  });

  return finalProducts;
};

const order_product = async (productsIds: string[], userId: string) => {
  const products = await prisma.product
    .findMany({
      where: {
        id: {
          in: productsIds,
        },
      },
    })
    .catch(() => {
      return [];
    });

  if (products.length == 0) {
    throw { message: "No products found, can't order." };
  }

  let orderTotal = 0;

  products.map((product) => {
    orderTotal += product.product_price;
  });

  let deliveryPrice = orderTotal * 0.01;

  let prettyOrderId = faker.string.alphanumeric({
    length: 12,
    exclude: ["z", "x", "r", "g", "V", "v", "n", "N", "m", "M", "p", "P"],
  });

  let orderExists = true;

  while (orderExists) {
    const exists = await prisma.orderModel.findFirst({
      where: {
        prettyOrderId,
      },
    });

    prettyOrderId = faker.string.alphanumeric({
      length: 12,
      exclude: ["z", "x", "r", "g", "V", "v", "n", "N", "m", "M", "p", "P"],
    });

    if (!exists) {
      orderExists = false;
    }
  }

  const order = await prisma.orderModel.create({
    data: {
      prettyOrderId,
      orderUserId: userId,
      orderItems: products.map((product) => {
        return product.id;
      }),
      orderStatus: "pending",
      orderTotal: orderTotal + deliveryPrice,
    },
  });

  return {
    status: 200,
    message: "Order placed successfully",
    order,
  };
};

const get_user_orders = async (userId: string) => {
  const orders = await prisma.orderModel.findMany({
    where: {
      orderUserId: userId,
    },
    orderBy: {
      orderDate: "desc",
    },
  });

  const newOrdersObject = await Promise.all(
    orders.map(async (order) => {
      const orderItems = await Promise.all(
        order.orderItems.map(async (orderId) => {
          const product = await get_product_by_id(orderId);
          return product;
        }),
      );

      return {
        ...order,
        orderItems,
      };
    }),
  );

  return newOrdersObject;
};

export const shop_service = {
  api: {
    get_all_products,
    get_product_by_id,
    get_product_by_type,
    add_product,
    order_product,
    get_user_orders,
    delete_product,
  },
};
