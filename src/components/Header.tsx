import React, { useState, useEffect } from "react"
import styles from "../styles/Header.module.css"

function Header() {
	const [save, setSave] = useState<boolean>(() => {
		const saved = localStorage.getItem("save")
		return JSON.parse(saved) || false
	})

	// Load data from localStorage
	useEffect(() => {
		localStorage.setItem("save", JSON.stringify(save))
	}, [save])

	const clickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			localStorage.setItem("save", JSON.stringify(true))
			setSave(true)
		} else {
			localStorage.setItem("save", JSON.stringify(false))
			setSave(false)
		}
	}

	return (
		<header className={styles.header}>
			<nav>
				<label className={styles.switch}>
					<input
						type="checkbox"
						onChange={clickHandler}
						checked={save}
						id="save-checkbox"
					></input>
					<span className={`${styles.slider} ${styles.round}`}></span>
				</label>
				<ul className="navLinks">
					<li className="navLink">
						<a href="#">Settings</a>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
