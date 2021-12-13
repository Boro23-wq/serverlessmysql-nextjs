import Container from '@/components/container'
import Nav from '@/components/nav'
import { useUser } from '@/lib/swr-hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const TransactionsPage = () => {
    const router = useRouter()
    const phone = router.query.phone?.toString()
    const { user } = useUser(phone)

    const [transactions, setTransactions] = useState([])

    const fetchAllTransactions = async () => {
        try {
            const res = await fetch('/api/all-transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ssn: user?.SSN,
                    identifier: user?.PhoneNo,
                }),
            })
            const json = await res.json()
            setTransactions(json)
            if (!res.ok) throw Error(json.message)
        } catch (e) {
            throw Error(e.message)
        }
    }

    useEffect(() => {
        fetchAllTransactions()
    }, [fetchAllTransactions])

    return (
        <>
            <Container className="py-4">
                <Nav title="Payment Wallet" user={user} />
                <div className='mb-10'>Transactions - <b><i>{user?.Name}</i></b></div>

                {
                    transactions && transactions.map((t) => (
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
                    transactions.length === 0 &&
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

export default TransactionsPage