import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useAppDispatch, useAppSelector } from '@/store'
import { typeFilter, dateFilter, locationFilter } from '@/features/filteringSlice'

const DropDawn = () => {
    const ref = useRef<any>()

    const [filterOpen, setFilterOpen] = useState(false)
    const { types, locations, date } = useAppSelector((state) => state.filters)
    const { uniqueLocations, uniqueTypes } = useAppSelector((state) => state.events)

    const dispatch = useAppDispatch()

    useEffect(() => {
        //for close when click outside
        const handleOutsideClick = (e: any) => {
            if (filterOpen === false) return
            if (ref.current && !ref.current.contains(e.target)) {
                setFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });
    return (
        <div ref={ref} className={styles.dropdown}>
            <div className={styles.opener} onClick={() => { setFilterOpen(open => !open) }}>
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="1.5" fill="#FF0D87" stroke="#FF0D87" />
                    <circle cx="8" cy="9" r="1.5" fill="#FF0D87" stroke="#FF0D87" />
                    <circle cx="2" cy="16" r="1.5" fill="#FF0D87" stroke="#FF0D87" />
                </svg>
                Filtreler
            </div>
            {
                filterOpen
                &&
                <div className={styles.filters}>
                    <div className={styles.titles}>
                        Etkinlik Mekanı
                    </div>
                    {
                        <ul>
                            {
                                uniqueLocations.map((uniqueLocation, i) =>
                                    <li key={i} onClick={() => dispatch(locationFilter(uniqueLocation))}>
                                        <input type="checkbox" readOnly className={styles.checkmark} checked={locations.includes(uniqueLocation)} />
                                        {uniqueLocation}
                                    </li>
                                )
                            }
                        </ul>
                    }
                    <div className={styles.titles}>
                        Etkinlik Tarihi
                    </div>
                    {
                        <ul>
                            <li onClick={() => dispatch(dateFilter(1))}>
                                <input type="checkbox" readOnly className={styles.checkmark} checked={date === 1} />
                                Güncel Etkinlikler
                            </li>
                            <li onClick={() => dispatch(dateFilter(-1))}>
                                <input type="checkbox" readOnly className={styles.checkmark} checked={date === -1} />
                                Geçmiş Etkinlikler
                            </li>
                        </ul>
                    }
                </div>
            }
        </div>
    )
}

export default DropDawn