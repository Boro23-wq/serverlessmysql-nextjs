import Link from 'next/link'

export default function Nav({ title = 'Payment Wallet', user }) {

  return (
    <nav className="mb-10">
      <div className="flex justify-between items-center">
        <Link href="/">
          <a className="font-bold text-3xl">{title}</a>
        </Link>

        {user &&
          <div className="flex justify-right items-center">
            <Link href={`/user/${user?.PhoneNo}`}>
              <a className="text-lg ml-8">Home</a>
            </Link>
            <Link href={`/account/${user?.PhoneNo}`}>
              <a className="text-lg ml-8">Account</a>
            </Link>
            <Link href={`/transactions/${user?.PhoneNo}`}>
              <a className="text-lg ml-8">Transactions</a>
            </Link>
            <Link href='/'>
              <a className="text-lg ml-8">Signout</a>
            </Link>
          </div>
        }
      </div>
    </nav>
  )
}
