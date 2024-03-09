import SubTitle from "@/components/typography/SubTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Tools() {
  return (
    <>
      <SubTitle text="Tools & Methods" />
      <div className="border rounded-xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="px-4">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="px-4">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="px-4 border-b-0">
            <AccordionTrigger>Last item no border b</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
