import { z } from "zod";

export interface IBaseProduct {
  id: string;
  product_title: string;
  product_image: null | string;
  product_original_url: string;
  product_price: number;
  vendor: string;
  type: AvailableProducts;
}

export interface IGraphicsProduct extends IBaseProduct {
  required_power: number;
  core_clock: number;
  memory_clock: number;
  interface: string;
}

export interface IProcessorProduct extends IBaseProduct {
  core_clock: number;
  core_count: number;
  threads: number;
  socket: string;
  base_clock: number;
  boost_clock: number;
}

export interface IMotherboardProduct extends IBaseProduct {
  motherboard_socket: string;
  motherboard_chipset: string;
  motherboard_form_factor: string;
  motherboard_ram_type: number;
}

export interface IStorageProduct extends IBaseProduct {
  drive_type: "hdd" | "ssd";
  drive_form_factor: string;
  drive_capacity: number;
  drive_read_speed: number;
  drive_write_speed: number;
  drive_interface: string;
}

export interface IMemoryProduct extends IBaseProduct {
  ram_speed: number;
  ram_type: string;
  ram_count: number;
  ram_size: number;
}

export type AvailableProducts =
  | "cpu"
  | "gpu"
  | "motherboard"
  | "ram"
  | "storage"
  | "psu"
  | "case";
type AvailablePowerSlots = "e_6pin" | "e_6p2pin" | "e_8pin" | "e_16pin";

export interface IPowerProduct extends IBaseProduct {
  psu_capacity: number;
  psu_gpu_slot: AvailablePowerSlots;
}

export interface ICaseProduct extends IBaseProduct {
  case_form_factor: string;
  case_type: string;
  case_color: string;
}

export interface IProductsResponse {
  gpu: IGraphicsProduct[];
  cpu: IProcessorProduct[];
  motherboard: IMotherboardProduct[];
  ram: IMemoryProduct[];
  storage: IStorageProduct[];
  psu: IPowerProduct[];
  case: ICaseProduct[];
}

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
