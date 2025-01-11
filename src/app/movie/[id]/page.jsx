import axios from 'axios'
import MovieDetail from './MovieDetail'
import PopularMovie from '../../components/PopularMovie/PopularMovie'


export default async function page({ params }) {
  const { id } = await params

  return (
    <div>
      <MovieDetail id={id}/>
    </div>
  )
}
