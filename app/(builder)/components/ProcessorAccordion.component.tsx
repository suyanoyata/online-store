import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ScrollArea } from "@/components/ui/scroll-area";
import { IProductGPU } from "@/types/Products";

export const ProcessorAccordion = ({
  products,
}: {
  products: IProductGPU[];
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl font-bold">
          Процессор
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="max-h-[500px]"></ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
