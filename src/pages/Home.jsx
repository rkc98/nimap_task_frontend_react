import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Home.module.css'
const Home = () => {
    return (
        <div className={styles.mainContainer}> 
            <NavLink className={styles.cardContainer} to={'/category'}>
                Category
            </NavLink>
            <NavLink className={styles.cardContainer} to={'/product'}>
                Product
            </NavLink>
        </div>
    )
}

export default Home