export const experiments = {
  ACCEPT_SELLERS_ACCOUNT_EXPERIMENT_BUCKET: {
    CONTROL_VALUE: 1,
    REASON: "Наразі створення аккаунтів для продавців призупинено.",
  },
  DISABLE_SENTRY: {
    CONTROL_VALUE: 0,
    REASON:
      "Sentry is disabled for performance and middleware performance purpose",
  },
  USE_FUNNY_NOT_FOUND_IMAGE: {
    CONTROL_VALUE: 1,
    REASON: "",
  },
  DISABLE_SEARCH_APPEARANCE: {
    CONTROL_VALUE: 1,
    REASON: "",
  },
};
export const expirationDays = 2;
export const app_title = "Online Store";

export const account_types_strings = {
  customer: "Профіль клієнта",
  seller: "Кабінет продавця",
};

export const localizedPsu = {
  e_6pin: "6 pin",
  e_6p2pin: "6+2 pin",
  e_8pin: "8 pin",
  e_16pin: "16 pin",
};

export const product_types = [
  {
    id: "gpu",
    title: "Відеокарта",
  },
  {
    id: "cpu",
    title: "Процесор",
  },
  {
    id: "motherboard",
    title: "Материнська плата",
  },
  {
    id: "ram",
    title: "Оперативна пам'ять",
  },
  {
    id: "case",
    title: "Корпус",
  },
  {
    id: "storage",
    title: "Накопичувач",
  },
  {
    id: "psu",
    title: "Блок живлення",
  },
];

export const product_properties = {
  cpu: {
    socket: {
      title: "Сокет",
      measure: "",
    },
    core_count: {
      title: "Кількість ядер",
      measure: "",
    },
    thread_count: {
      title: "Кількість потоків",
      measure: "",
    },
    core_clock: {
      title: "Частота ядра",
      measure: " Ghz",
    },
    integrated_graphics: {
      title: "Інтегрована графіка",
      measure: "",
    },
  },
  gpu: {
    core_clock: {
      title: "Частота ядра",
      measure: " Mhz",
    },
    memory_clock: {
      title: "Частота пам'яті",
      measure: " Mhz",
    },
    memory_size: {
      title: "Об'єм пам'яті",
      measure: " Gb",
    },
    power_pins: {
      title: "Роз'єм відеокарти",
      measure: "",
    },
    interface: {
      title: "Інтерфейс",
      measure: "",
    },
    required_power: {
      title: "Мінімальна потужність",
      measure: "W",
    },
  },
  motherboard: {
    motherboard_socket: {
      title: "Сокет",
      measure: "",
    },
    motherboard_chipset: {
      title: "Чіпсет",
      measure: "",
    },
    motherboard_ram_type: {
      title: "Тип пам'яті",
      measure: "",
    },
    motherboard_form_factor: {
      title: "Форм фактор",
      measure: "",
    },
  },
  psu: {
    psu_capacity: {
      title: "Ємність",
      measure: "W",
    },
    psu_gpu_slot: {
      title: "Піни відеокарти",
      measure: "",
    },
  },
  case: {
    case_type: {
      title: "Тип",
      measure: "",
    },
    case_form_factor: {
      title: "Форм фактор",
      measure: "",
    },
    case_color: {
      title: "Колір",
      measure: "",
    },
  },
  storage: {
    drive_type: {
      title: "Тип диску",
      measure: "",
    },
    drive_form_factor: {
      title: "Форм фактор",
      measure: '"',
    },
    drive_capacity: {
      title: "Об'єм",
      measure: "Gb",
    },
    drive_read_speed: {
      title: "Швидкість читання",
      measure: "Mb/s",
    },
    drive_write_speed: {
      title: "Швидкість запису",
      measure: "Mb/s",
    },
    drive_interface: {
      title: "Інтерфейс",
      measure: "",
    },
  },
  ram: {
    ram_speed: {
      title: "Частота",
      measure: "Mhz",
    },
    ram_type: {
      title: "Тип",
      measure: "",
    },
    ram_count: {
      title: "Кількість планок",
      measure: "",
    },
    ram_size: {
      title: "Об'єм",
      measure: "Gb",
    },
  },
};

export const Descriptions = {
  cpu: {
    title: "Процессори",
    fields: [
      {
        title: "Кількість ядер",
        key: "core_count",
        measure: "",
      },
      {
        title: "Частота ядра",
        key: "core_clock",
        measure: " Ghz",
      },
    ],
  },
  gpu: {
    title: "Відеокарти",
    fields: [
      {
        title: "Частота ядра",
        key: "core_clock",
        measure: " Mhz",
      },
      {
        title: "Частота пам'яті",
        key: "memory_clock",
        measure: " Mhz",
      },
    ],
  },
  motherboard: {
    title: "Материнські плати",
    fields: [
      {
        title: "Сокет",
        key: "motherboard_socket",
        measure: "",
      },
      {
        title: "Чіпсет",
        key: "motherboard_chipset",
        measure: "",
      },
    ],
  },
  psu: {
    title: "Блоки живлення",
    fields: [
      {
        title: "Ємність",
        key: "psu_capacity",
        measure: "W",
      },
      {
        title: "Піни відеокарти",
        key: "psu_gpu_slot",
        measure: "",
      },
    ],
  },
  case: {
    title: "Корпуси",
    fields: [
      {
        title: "Форм фактор",
        key: "case_form_factor",
        measure: "",
      },
      {
        title: "Тип",
        key: "case_type",
        measure: "",
      },
    ],
  },
  storage: {
    title: "Накопичувачі",
    fields: [
      {
        title: "Тип",
        key: "drive_type",
        measure: "",
      },
      {
        title: "Форм фактор",
        key: "drive_form_factor",
        measure: '"',
      },
    ],
  },
  ram: {
    title: "Оперативна пам'ять",
    fields: [
      {
        title: "Швидкодія",
        key: "ram_speed",
        measure: "Mhz",
      },
    ],
  },
};

export const localizedTitle = {
  gpu: {
    title: "Відеокарти",
  },
  cpu: {
    title: "Процесори",
  },
  motherboard: {
    title: "Материнські плати",
  },
  storage: {
    title: "Накопичувачі",
  },
  ram: {
    title: "Оперативна пам'ять",
  },
  psu: {
    title: "Блоки живлення",
  },
  case: {
    title: "Корпуси",
  },
};
