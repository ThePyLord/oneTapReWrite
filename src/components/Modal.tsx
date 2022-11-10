import React, { useCallback, useEffect, useState } from 'react'
import styles from '../styles/Modal.module.css'

export enum ModalType {
	SUCCESS = 'rgba(15, 255, 40, 0.8)',
	ERROR = 'rgba(255, 0, 0, 0.8)',
	INFO = 'rgba(51, 62, 181, 0.8)',
}

interface CardModalProps {
	heading: string
	message: string
	show?: boolean
	closeModal: () => void
	type: ModalType
}

function Modal({heading, message, type, closeModal, show }: CardModalProps) {
	const [title, setTitle] = useState('')
	useEffect(() => {
			if(type == ModalType.ERROR) {
				setTitle(heading)
			}
			else if(type == ModalType.INFO) {
				setTitle(heading)
			}
			console.log(`The type is ${type}`)
	}, [])

	const keyPress = useCallback(e => {
			if (e.key === 'Escape' && show) {
				closeModal()
			}
		}, [closeModal, show])

	useEffect(() => {
		document.addEventListener('keydown', keyPress)
		return () => document.removeEventListener('keydown', keyPress)
	}, [keyPress])

	return (
		// Add the noBlur class to the modal if it's not open
		<div className={`${styles.modal} ${styles.noBlur}`} onClick={closeModal}>
			<div className={styles.modalContent} style={{ backgroundColor: type }}>
				<span className={styles.button} onClick={closeModal}>
					&times;
				</span>
				<div className={styles.title}>
					{/* Set the header based on the type */}
					<h3>{title}</h3>
				</div>
				<div className={styles.body}>{message}</div>
			</div>
		</div>
	)
}

export default Modal
