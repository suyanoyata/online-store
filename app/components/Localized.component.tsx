"use client";

import i18n from "@/i18n/i18n.config";

const Localized = ({ children }: { children: string }) => {
  return i18n.t(children);
};

export default Localized;
