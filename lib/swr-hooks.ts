import useSWR from 'swr'

export function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}

export function useEntries() {
  const { data, error } = useSWR(`/api/get-entries`, fetcher)

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useEntry(id: string) {
  return useSWR(`/api/get-entry?id=${id}`, fetcher)
}

export function useUser(phone: string) {
  const {data, error} = useSWR(`/api/get-user?phone=${phone}`, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function sendMoney(phone: string, amount: number) {
  const {data, error} = useSWR(`/api/send-money?phone=${phone}&amount=${amount}`, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}
