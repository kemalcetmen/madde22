import React from 'react'
import Image from 'next/image'
import styles from './index.module.scss'
import Logo from '../../../public/Logo.svg'
import Calender from '@/components/Calender'
import DropDawn from '@/components/DropDown'
import { useAppDispatch, useAppSelector } from '@/store'
import { typeFilter, searchInput } from '@/features/filteringSlice'

type Props = {}

const Header = (props: Props) => {
    const { types, search } = useAppSelector((state) => state.filters)
    const { uniqueTypes } = useAppSelector((state) => state.events)
    const dispatch = useAppDispatch()

    const handleChange = (e: any) => {
        dispatch(searchInput(e.target.value))
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image
                    src={Logo}
                    alt="Logo"
                />
            </div>
            <h1>
                ETKİNLİKLER
            </h1>
            <div className={styles.searches}>
                <ul className={styles.eventTypes}>
                    <li onClick={() => dispatch(typeFilter(""))} className={types === "" ? styles.active : undefined}>
                        tüm etkinlikler
                    </li>
                    {
                        uniqueTypes.map(event =>
                            <li onClick={() => dispatch(typeFilter(event))} className={types === event ? styles.active : undefined}>
                                {event}
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className={styles.filters}>
                <DropDawn />
                <div className={styles.search}>
                    <input
                        placeholder="Ara"
                        value={search}
                        onChange={handleChange}
                    />
                </div>
                <Calender />
            </div>
        </header>
    )
}
export default Header