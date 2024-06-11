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
