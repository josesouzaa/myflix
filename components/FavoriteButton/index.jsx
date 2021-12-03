import { BsFillStarFill } from 'react-icons/bs'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { api } from '../../services/api'

export default function FavoriteButton({ isFavorite = false, movie }) {
  const [favorite, setFavorite] = useState(isFavorite)
  const { data: session } = useSession()

  async function handleClick(movie, session) {
    const response = await api.post(
      `/addfavorite/${movie.id}?user=${session.uuid}`,
      { movie }
    )
    setFavorite(!favorite)
  }

  if (!session) return null

  return !favorite ? (
    <button
      onClick={() => handleClick(movie, session)}
      className="inline-flex justify-center items-center gap-1 text-xs p-1 bg-red-600 bg-opacity-20 rounded-sm hover:text-yellow-500 transition-all duration-200 align-middle"
    >
      Favorite
      <BsFillStarFill />
    </button>
  ) : (
    <button
      onClick={() => handleClick(movie, session)}
      className="inline-flex justify-center items-center gap-1 text-xs p-1 bg-black rounded-sm hover:text-red-600 transition-all duration-200 align-middle"
    >
      Remove Favorite
      <BsFillStarFill />
    </button>
  )
}
