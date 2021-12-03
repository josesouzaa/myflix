import Head from 'next/head'

import { api } from '../../services/api'

export default function User({ movies }) {
  return (
    <>
      <Head>
        <title>MyFlix | User</title>
      </Head>

      <main className="max-w-screen-lg mx-auto py-5">
        <div className="flex flex-col px-4 lg:px-0 gap-8">
          <aside className="flex flex-col sm:flex-row gap-4 p-4 items-center bg-black rounded">
            <img
              className="w-48 h-48 rounded-full border-2 border-red-600 border-opacity-30"
              src="https://avatars.githubusercontent.com/u/80637515?v=4"
              alt="José de Souza"
            />
            <div className="flex flex-col gap-4 items-center sm:items-start">
              <h2 className="text-4xl font-bold">José de Souza</h2>
              <p className="text-center sm:text-left p-2 rounded-sm bg-red-600 bg-opacity-20">
                Jornalista de formação se aventurando no mundo da programação.
                Interessado no front-end, atualmente estudando HTML, CSS e
                JavaScript.
              </p>
            </div>
          </aside>

          <section>
            <ul className="space-y-4">
              {movies.map((movie) => (
                <li
                  key={movie.id}
                  className="flex flex-col md:flex-row md:justify-start gap-4 bg-black bg-opacity-20 rounded-sm p-4"
                >
                  <a
                    className="cursor-pointer hover:brightness-75 transition-all block md:w-60 md:flex-shrink-0"
                    href={`/movie/${movie.id}`}
                  >
                    <img
                      className="rounded-sm"
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </a>

                  <div className="flex flex-col items-start gap-4">
                    <h2 className="text-3xl font-bold">{movie.title}</h2>

                    <div className="flex justify-start items-center gap-4">
                      <span
                        className={`${
                          movie.vote_average >= 5
                            ? 'text-green-600'
                            : 'text-red-600'
                        } font-extrabold block text-base bg-gray-50 p-1 text-center rounded-full`}
                      >
                        {movie.vote_average}
                      </span>

                      <small className=" bg-red-600 bg-opacity-25 p-1 rounded-sm">
                        {movie.release_date}
                      </small>
                    </div>

                    <p className="text-justify p-2 bg-red-600 bg-opacity-25 rounded-sm">
                      {movie.overview}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const response = await api.get(`/search?movie=titanic`)
  const movies = response.data

  return {
    props: {
      movies
    }
  }
}
