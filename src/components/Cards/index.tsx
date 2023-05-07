import React from 'react'
import styles from './index.module.scss'
import Card from '@/components/Card'
import { Event } from '@/types/event'
import { useAppDispatch } from '@/store'

import { changeLiked } from '@/features/eventsSlice'


interface Props {
    events?: Event[],
}

const index = ({events}: Props) => {
    const dispatch = useAppDispatch()

    const changeLikedEvent = (id: string) => {
      dispatch(changeLiked(id))
    }
    return (
        <ul className={styles.cardsContainer}>
            {events?.map((event: Event,i: number) => (
                <li key={i}>
                    <Card
                        event={event}
                        changeLikedEvent = {changeLikedEvent}
                    />
                </li>
            ))}
        </ul>
    )
}

export default index