import { Inter } from 'next/font/google'
import { useAppDispatch } from '@/store'
import { fetchEvents } from '@/features/eventsSlice'
import Cards from '@/components/Cards'
import Header from '@/components/Header'
import useFilter from '@/hooks/useFilter'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchEvents());
}, []);

  const events = useFilter()

  return (
    <>
      <Header/>
      <main>
        <Cards events={events} />
      </main>
    </>
  )
}
