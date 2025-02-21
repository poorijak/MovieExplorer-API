import axios from "axios";
import MovieDetail from "@/src/components/Detail/ContentDetail/page";

export default async function page({ params }) {
  const { id } = await params;

  return (
    <div>
      <MovieDetail category="movie" id={id} />
    </div>
  );
}
