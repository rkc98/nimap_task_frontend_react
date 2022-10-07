import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
    return (
        <div className={styles.navigationContainer}>
            <NavLink className={styles.navlink} to={"/"}>
                Home
            </NavLink>
            <NavLink className={styles.navlink} to={"/category"}>
                Category
            </NavLink>
            <NavLink className={styles.navlink} to={"/product"}>
                Product
            </NavLink>

        </div>
    )
}

export default Navigation