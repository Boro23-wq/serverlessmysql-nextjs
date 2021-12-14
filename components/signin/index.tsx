import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function Signin() {
  const router = useRouter()
  const [phone, setPhone] = useState('')

  const onClick = () => {
    router.push(`/user/${phone}`)
  }

  return (
    <>
      <div>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                <a href="#" className="font-medium text-gray-500 hover:text-gray-500">
                  Signin to get access to your wallet
                </a>
              </p>
            </div>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only">Phone Number</label>
                <input onChange={e => setPhone(e.target.value)} id="phone-number" name="phone" type="phone" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your phone number" />
              </div>
            </div>

            <div>
              <button onClick={onClick} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Sign in
              </button>
            </div>
          </div>
        </div>

        {/* <form className="w-full max-w-sm">
          <div className="flex items-center border-b border-black-500 py-2">
            <input onChange={e => setPhone(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter Phone" aria-label="Full name" />
            <button onClick={onClick} className="flex-shrink-0 bg-gray-700 hover:bg-gray-800 border-gray-700 hover:border-gray-800 text-sm border-4 text-white py-1 px-2 rounded" type="button">
              Sign In
            </button>
            <button className="flex-shrink-0 border-transparent border-4 text-gray-600 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
              Cancel
            </button>
          </div>
        </form> */}
      </div>
    </>
  )
}
