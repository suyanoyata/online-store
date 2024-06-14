import { z } from "zod";

export const ProductSchema = z.object({
  product_title: z.string(),
  vendor: z.string(),
  product_original_url: z.string(),
  product_image: z.string().optional().nullable(),
  product_price: z.number(),
  id: z.string().optional(),
});

export const ProductResponse = z
  .object({
    type: z.string(),
  })
  .merge(ProductSchema);

export const schemas = {
  ram: z.object({
    ram_speed: z.number(),
    ram_type: z.enum(["DDR3", "DDR4", "DDDR5"]),
    ram_count: z.number(),
    ram_size: z.number(),
  }),
  cpu: z.object({
    socket: z.string(),
    core_count: z.number(),
    core_clock: z.number(),
    thread_count: z.number(),
    integrated_graphics: z.string().optional().nullable(),
  }),
  motherboard: z.object({
    motherboard_socket: z.enum([
      "AM3",
      "AM4",
      "LGA1150",
      "LGA1151",
      "LGA1200",
      "LGA1366",
      "LGA2011",
      "LGA2011-v3",
      "LGA2066",
    ]),
    motherboard_chipset: z.enum([
      "A320",
      "B350",
      "B450",
      "B550",
      "X370",
      "X470",
      "X570",
      "Z370",
      "Z390",
      "Z490",
      "Z590",
    ]),
    motherboard_ram_type: z.enum(["DDR3", "DDR4", "DDDR5"]),
    motherboard_form_factor: z.enum(["ATX", "Micro ATX", "Mini ITX"]),
  }),
  storage: z.object({
    drive_type: z.enum(["hdd", "ssd"]),
    drive_form_factor: z.enum(["2.5", "3.5"]),
    drive_capacity: z.number(),
    drive_read_speed: z.number(),
    drive_write_speed: z.number(),
    drive_interface: z.string(),
  }),
  gpu: z.object({
    core_clock: z.number(),
    memory_clock: z.number(),
    memory_size: z.number(),
    power_pins: z.enum(["e_6pin", "e_6p2pin", "e_8pin", "e_16pin"]),
    interface: z.string(),
    required_power: z.number(),
  }),
  case: z.object({
    case_type: z.enum(["ATX", "MicroATX", "MiniITX"]),
    case_form_factor: z.enum(["MidTower", "FullTower"]),
    case_color: z.string(),
  }),
  psu: z.object({
    psu_capacity: z.number(),
    psu_gpu_slot: z.enum(["e_6pin", "e_6p2pin", "e_8pin", "e_16pin"]),
  }),
};

const GpuProductResponse = schemas.gpu.extend({
  id: z.string(),
});

export const GetGpuProduct = GpuProductResponse.omit({ id: true });
