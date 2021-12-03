import Head from 'next/head'
import { api } from '../services/api'

export default function Home({ movies }) {
  return (
    <>
      <Head>
        <title>MyFlix | Home</title>
      </Head>

      <main className="max-w-screen-lg mx-auto">
        <h1 className="text-center text-5xl font-bold mb-4">
          Filmes em destaque
        </h1>

        <ul className="mt-5 grid px-4 lg:px-0 grid-cols-none sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="p-5 bg-black rounded shadow-md hover:brightness-75 transition-all"
            >
              <a className="cursor-pointer" href={`/movie/${movie.id}`}>
                <img
                  className="rounded"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2 className="text-center text-xl font-bold mt-4">
                  {movie.title}
                </h2>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const response = await api.get(`/trending`)
  const movies = response.data

  return {
    props: {
      movies
    },
    revalidate: 60
  }
}
