import React from 'react'
import { Event } from '@/types/event'
import styles from './index.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import colors from '@/datas/colors.js'

type Props = {
    event: Event,
    changeLikedEvent: (id: string) => void
}
const index = ({ event, changeLikedEvent }: Props) => {
    const thecolor = colors.filter(color => color.name === event.type)[0]?.color

    return (
        <div className={styles.cardContainer}>
            <div className={styles.imageBackground}>
                <div className={styles.date}>
                    {
                        event.date.day + ' ' + event.date.month + ' ' + event.date.dayName + ' ' + event.date.hour
                    }
                </div>
                <div className={styles.image}>
                    <div className={styles.eventType} style={{ backgroundColor: `${thecolor}` }}>
                        {event.type}
                    </div>

                    <Image
                        src={event.image}
                        alt={event.name}
                        fill
                    />
                </div>
            </div>
            <div className={styles.texts}>
                <h4 className={styles.name}>
                    {event.name}
                </h4>
                <p className={styles.location}>
                    <svg fill="#000000" height="800px" width="800px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" x="0px"
                        y="0px" viewBox="0 0 24 24" enable-background="new 0 0 24 24">
                        <g id="Location-Filled">
                            <path d="M12,1C7.58,1,4,4.58,4,9c0,7.08,8,14,8,14s8-6.92,8-14C20,4.58,16.42,1,12,1z M12,12c-1.66,0-3-1.34-3-3s1.34-3,3-3
		                    s3,1.34,3,3S13.66,12,12,12z"/>
                        </g>
                    </svg>
                    {event.location}
                </p>
                <p className={styles.explanation}>
                    {event.explanation}
                </p>
            </div>
            <div className={styles.footer}>
                {/* <Link href="/">
                    <div className={styles.buy}>
                        Bilet Al
                    </div>
                </Link> */}
                <div className={styles.buy}>
                    Bilet Al
                </div>
                <div onClick={() => changeLikedEvent(event.id)} className={styles.calender}>
                    {
                        !event.inCalendar
                            ?
                            <div className={styles.add}>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11" cy="11" r="10" stroke="black" stroke-width="2" />
                                    <path d="M7 11H15" stroke="black" stroke-width="2" />
                                    <path d="M11 7L11 15" stroke="black" stroke-width="2" />
                                </svg>
                                Takvime Ekle
                            </div>
                            :
                            <div className={styles.add}>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="added">
                                        <circle id="Ellipse 74" cx="11" cy="11" r="10" fill="#FF0D87" stroke="#FF0D87" stroke-width="2" />
                                        <path id="Vector 6" d="M5 10.5L9.5 15L17.5 7" stroke="white" stroke-width="2" />
                                    </g>
                                </svg>
                                Takvime Eklendi
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default index