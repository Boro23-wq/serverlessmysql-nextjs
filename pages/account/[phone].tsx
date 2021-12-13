import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/lib/swr-hooks'
import Container from '@/components/container'
import Nav from '@/components/nav'
import { mutate } from 'swr'

const AccountPage = () => {
  const router = useRouter()
  const phone = router.query.phone?.toString()
  const { user } = useUser(phone)

  const [newName, setNewName] = useState('')

  const onClick = async () => {
    try {
      const res = await fetch('/api/update-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ssn: user?.SSN,
          name: newName,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      mutate('/api/get-user')
      setNewName('')
    } catch (e) {
      throw Error(e.message)
    }
  }

  if (user) {
    return (
      <>
        <Container className="py-4">
          <Nav title="Payment Wallet" user={user.Name} />
          <Container className="flex flex-col justify-center pl-0">

            {/* Update details inputs */}
            <div className="flex items-center border-b border-gray-300 py-2 w-full max-w-sm mb-8">
              <input onChange={(e) => setNewName(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter Name" aria-label="Full name" value={newName} />
              <button onClick={onClick} className="flex-shrink-0 bg-gray-600 hover:bg-gray-700 border-gray-600 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                Update Name
              </button>
            </div>
            {/* Update details inputs ends here */}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal Details.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.Name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      SSN
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.SSN}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.PhoneNo}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Account Balance
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      ${user.Balance}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Bank ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.BankID}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Bank Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.BANumber}
                    </dd>
                  </div>

                </dl>
              </div>
            </div>

            {/* <p className="text-lg my-1">Verified: <b>{user.PBAVerified.data == 1 ? 'True' : 'False'}</b></p> */}

          </Container >
        </Container >
      </>
    )
  } else {
    return (
      <>
        <div>Loading...</div>
      </>
    )
  }
}

export default AccountPage
