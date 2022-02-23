import * as React from "react"
import styles from '../styles/Header.module.css'

function Header() {
	return (
		<header className={styles.header}>
			<nav>
				<label className={styles.switch}>
					<input type="checkbox"></input>
					<span className={`${styles.slider} ${styles.round}`}></span>
				</label>
				<ul className="navLinks">
					<li className="navLink">
						<a href="#">Settings</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header
