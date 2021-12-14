import Button from '@/components/button';
import Container from '@/components/container';
import Nav from '@/components/nav';
import { useUser } from '@/lib/swr-hooks';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const Statement = () => {
    const router = useRouter()
    const phone = router.query.phone?.toString()
    const { user } = useUser(phone)

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [allTransByDate, setAllTransByDate] = useState([])

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/transactions-by-date', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDate,
                    endDate,
                    identifier: user?.Phone
                }),
            })
            const json = await res.json()
            setAllTransByDate(json)
            console.log(allTransByDate)
            if (!res.ok) throw Error(json.message)
        } catch (e) {
            throw Error(e.message)
        }
    }

    return (
        <>
            <Container className="py-4">
                <Nav title="Payment Wallet" user={user} />
                <div className='mb-10'>Transactions - <b><i>{user?.Name}</i></b></div>

                <div className='mb-6'>
                    <form onSubmit={onSubmit} className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Start Date
                                </label>
                                <input onChange={(e) => setStartDate(e.target.value)} value={startDate} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="2021-10-01" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    End Date
                                </label>
                                <input onChange={(e) => setEndDate(e.target.value)} value={endDate} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="2021-10-28" />
                            </div>
                        </div>

                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            Retrieve Data
                        </button>
                    </form>
                </div>

                {allTransByDate.length > 0 && allTransByDate.map((t) => (
                    <div key={t.STid}>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-5">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {t.STid}
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    {new Date(t.TransactionTime).toDateString()}
                                </p>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Identifier
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {t.Identifier}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            UserSSN
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {t.UserSSN}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Amount
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {t.Amount}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Memo
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {t.Memo}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Cancellation Reason
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {t.Cancel_Reason}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                ))
                }

                {
                    allTransByDate.length === 0 &&
                    <div>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-5">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    No recorded transaction.
                                </h3>
                            </div>
                        </div>
                    </div>
                }
            </Container>
        </>

    )
}

export default Statement;