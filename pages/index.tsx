import Skeleton from 'react-loading-skeleton'

import Nav from '@/components/nav'
import Signin from '@/components/signin'
import Container from '@/components/container'

export default function IndexPage() {

  return (
    <Container className="py-4">
      <Nav />
      <Signin />
    </Container>
  )
}
