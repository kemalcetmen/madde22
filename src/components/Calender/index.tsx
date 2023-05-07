import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

const DropDawn = () => {

    return (
        <div className={styles.calender}>
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7.63636V18H0V7.63636H20ZM5 0V1.63636H3.88889V4.36364H5V1.63636H9.44444V0H10.5556V1.63636H9.44444V4.36364H10.5556V1.63636H15V0H16.1111V1.63636H15V4.36364H16.1111V1.63636H20V6.54545H0V1.63636H3.88889V0H5Z" fill="black" />
            </svg>
        </div>
    )
}

export default DropDawn