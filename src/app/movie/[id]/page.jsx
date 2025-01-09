import axios from 'axios'
import MovieDetail from './MovieDetail'

export default async function page({ params }) {
  const { id } = await params

  return (
    <div>
      <MovieDetail id={id}/>
    </div>
  )
}
