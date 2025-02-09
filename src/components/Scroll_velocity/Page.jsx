import React from "react";
import { VelocityScroll } from "../../../components/ui/scroll-based-velocity";

function VelocityScrollItem() {
  return (
    <div className="flex w-full justify-center">
      <VelocityScroll className="whitespace-nowrap text-[18vh] font-bold">
        MovieExplorer
      </VelocityScroll>
    </div>
  );
}

const Page = () => {
  return (
    <div className="mt-20 w-full overflow-hidden">
      <VelocityScrollItem />
    </div>
  );
};

export default Page;
