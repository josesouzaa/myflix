import Head from 'next/head'
import Link from 'next/link'
import FavoriteButton from '../../components/FavoriteButton'
import { api } from '../../services/api'
import { FaGithub } from 'react-icons/fa'
import { useSession } from 'next-auth/react'

export default function User({ movies, user }) {
  const { data: session } = useSession()

  if (!session)
    return (
      <>
        <h1 className="text-xl text-center">
          Login is required to view this page
        </h1>
      </>
    )

  if (session)
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
                src={user.avatar_url}
                alt={user.name}
              />
              <div className="flex flex-col gap-4 items-center sm:items-start">
                <h2 className="text-4xl font-bold">{user.name}</h2>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:divide-x-2">
                  <small>{user.email}</small>
                  <Link href={user.html_url}>
                    <a className="flex justify-center items-center gap-2 pl-2 hover:text-red-600 transition-all duration-300">
                      <FaGithub /> {user.login}
                    </a>
                  </Link>
                </div>
                <p className="text-center sm:text-left p-2 rounded-sm bg-red-600 bg-opacity-20">
                  {user.bio}
                </p>
              </div>
            </aside>

            <section>
              <h1 className="text-2xl font-bold">Favorite movies</h1>
              <Link href="/search">
                <a className="inline-block hover:text-red-600 transition-all duration-300 py-4">
                  Search to add movies to your favorites!
                </a>
              </Link>

              <ul className="space-y-4">
                {movies.map((movie) => (
                  <li
                    key={movie.id}
                    className="flex flex-col md:flex-row md:justify-start gap-4 bg-black bg-opacity-20 rounded-sm p-4"
                  >
                    <Link href={`/movie/${movie.id}`}>
                      <a className="cursor-pointer hover:brightness-75 transition-all block md:w-60 md:flex-shrink-0">
                        <img
                          className="rounded-sm"
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={movie.title}
                        />
                      </a>
                    </Link>

                    <div className="flex flex-col items-start gap-4">
                      <h2 className="text-3xl font-bold">
                        {movie.title}{' '}
                        <FavoriteButton isFavorite={true} movie={movie} />
                      </h2>

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

export async function getServerSideProps(req) {
  const id = req.params
  const responseUser = await api.get(`/user/${id}`)
  const user = responseUser.data

  const responseMovies = await api.get(`/getfavorites/${id}`)
  const movies = responseMovies.data

  return {
    props: {
      movies,
      user
    }
  }
}
