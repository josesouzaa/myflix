import { useSession } from 'next-auth/react'
import { api } from '../../services/api'

export default function SearchForm({
  searchText,
  setSearchText,
  setMoviesList
}) {
  const { data: session } = useSession()

  async function handleSubmit(e) {
    e.preventDefault()
    if (searchText !== '') {
      const response = await api.get(
        `/search?movie=${searchText}&user=${session.uuid}`
      )
      const movies = response.data
      setMoviesList(movies)
    }
  }

  return (
    <form className="flex items-center" action="submit" onSubmit={handleSubmit}>
      <input
        className="text-gray-900 px-2 py-2 rounded-l"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        className="bg-red-600 px-2 py-2 rounded-r hover:brightness-90 transition-all"
        type="submit"
      >
        Buscar
      </button>
    </form>
  )
}
