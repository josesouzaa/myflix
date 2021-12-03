import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { GoSignOut } from 'react-icons/go'

export default function SignInButton() {
  const { data: session } = useSession()

  return session ? (
    <div className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full hover:brightness-90 transition-all font-semibold">
      <Link href={`/user/${session.uuid}`}>
        <a>Porfile</a>
      </Link>
      <button type="button" onClick={() => signOut()}>
        <GoSignOut />
      </button>
    </div>
  ) : (
    <button
      onClick={() => signIn('github')}
      type="button"
      className="bg-red-600 px-4 py-2 rounded-full hover:brightness-90 transition-all font-semibold"
    >
      Login with GitHub
    </button>
  )
}
