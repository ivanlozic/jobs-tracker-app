import React from 'react'

import styles from './deleteModal.module.css'
interface DeleteConfirmationModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this job?</p>
        <div className={styles.modalActions}>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
