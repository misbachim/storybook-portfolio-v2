import React from 'react'
import styles from './LightSwitch.module.css'

interface LightSwitchProps {
  mode: string;
  toggleMode: () => void;
}

export default function LightSwitch({ mode, toggleMode }: LightSwitchProps) {
  return (
    <div className='w-24 md:w-32 h-12 md:h-16 flex justify-center items-center'>
      <input type="checkbox" className="hidden" id="dn" onChange={toggleMode} checked={mode === 'dark'} />
      <label htmlFor="dn" className={`${styles.toggle} text-base md:text-lg`}>
        <span className={styles.toggle__handler}>
          <span className={`${styles.crater} ${styles['crater--1']}`}></span>
          <span className={`${styles.crater} ${styles['crater--2']}`}></span>
          <span className={`${styles.crater} ${styles['crater--3']}`}></span>
        </span>
        <span className={`${styles.star} ${styles['star--1']}`}></span>
        <span className={`${styles.star} ${styles['star--2']}`}></span>
        <span className={`${styles.star} ${styles['star--3']}`}></span>
        <span className={`${styles.star} ${styles['star--4']}`}></span>
        <span className={`${styles.star} ${styles['star--5']}`}></span>
        <span className={`${styles.star} ${styles['star--6']}`}></span>
      </label>
    </div>
  )
} 