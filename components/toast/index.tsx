import styles from '../../styles/Toast.module.css'

export default function Toast({ message }) {
  return <div className={styles.toast}>{message}</div>
}
