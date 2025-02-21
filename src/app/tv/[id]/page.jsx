import React from "react";
import TvDetail from "@/src/components/Detail/ContentDetail/page";

export default async function page({ params }) {
  const { id } = await params;

  return (
    <div>
      <TvDetail category="tv" id={id} />
    </div>
  );
}
