import styles from '../../styles/MultiButton.module.css'

export default function MultiButton({ children }) {
  return (
    <div className={styles["multi-button"]}>
      {children}
    </div>
  )
}
