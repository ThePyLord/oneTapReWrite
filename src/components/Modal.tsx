import React, { useEffect, useState } from "react"
import styles from "../styles/Modal.module.css"

export enum ModalType {
	SUCCESS = "rgba(15, 255, 40, 0.8)",
	ERROR = "rgba(255, 0, 0, 0.8)",
	INFO = "rgba(0, 0, 255, 0.8)",
}

interface CardModalProps {
	message: string
	closeModal: () => void
	type: ModalType
}

function Modal({ message, type, closeModal }: CardModalProps) {
	const [title, setTitle] = useState("")
	// useEffect(() => {
	// 	fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
	// 		.then((response) => response.json())
	// 		.then((res) => {
	// 			const randIdx = Math.floor(Math.random() * res.length)
	// 			setTitle(res[randIdx].name)
	// 		})
	// }, [])
	return (
		<div className={styles.modal}>
			<div className={styles.modalContent} style={{ backgroundColor: type }}>
				<span className={styles.button} onClick={closeModal}>
					&times;
				</span>
				<div className={styles.title}>
					<h3>{title || "Header"}</h3>
				</div>
				<div className={styles.body}>{message}</div>
				<div className={styles.footer}>
					Courtesy of "Drip ⇔ (bi/conditional)#4942"
				</div>
			</div>
		</div>
	)
}

export default Modal
