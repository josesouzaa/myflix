import Head from 'next/head'
import { useState } from 'react'
import SearchForm from '../components/SearchForm'
import FavoriteButton from '../components/FavoriteButton'

export default function Busca() {
  const [searchText, setSearchText] = useState('')
  const [moviesList, setMoviesList] = useState([])

  return (
    <>
      <Head>
        <title>Busca | MyFlix</title>
      </Head>

      <main className="max-w-screen-lg mx-auto py-5">
        <div className="flex flex-col gap-6 sm:gap-0 sm:flex-row sm:items-center sm:justify-between px-4 lg:p-0">
          <h1 className="text-5xl font-bold">Busca</h1>

          <SearchForm
            searchText={searchText}
            setSearchText={setSearchText}
            setMoviesList={setMoviesList}
          />
        </div>

        <ul className="mt-5 flex flex-col gap-4 px-4 lg:px-0 md:grid md:grid-cols-2">
          {moviesList &&
            moviesList.map((movie) => (
              <li
                key={movie.id}
                className="flex flex-col sm:flex-row md:flex-col rounded bg-black shadow-md"
              >
                <a
                  className="cursor-pointer sm:w-2/5 md:w-auto p-4 sm:flex-shrink-0 md:flex-shrink hover:brightness-75 transition-all"
                  href={`/movie/${movie.id}`}
                >
                  <img
                    className="rounded"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                  />
                </a>
                <div className="py-4 px-4 sm:px-4 sm:pl-0 md:px-4 flex flex-col gap-2">
                  <h2 className="text-left text-3xl font-bold">
                    {movie.title}{' '}
                    <FavoriteButton
                      movie={movie}
                      isFavorite={movie.isFavorite}
                    />
                  </h2>
                  <small className="text-gray-400">{movie.release_date}</small>
                  <span
                    className={`${
                      movie.vote_average >= 5
                        ? 'text-green-600'
                        : 'text-red-600'
                    } font-extrabold text-lg bg-gray-50 w-12 text-center rounded-full`}
                  >
                    {movie.vote_average}
                  </span>
                  <p className="bg-red-900 p-2 rounded-sm text-sm text-justify">
                    {movie.overview}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </main>
    </>
  )
}
