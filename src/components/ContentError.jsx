import styles from './ContentError.module.css'

export default function ContentError({ message = 'Could not load content.' }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>!</div>
      <p className={styles.msg}>{message}</p>
      <p className={styles.hint}>
        Check your Contentful credentials in <code>.env</code> and make sure the content type exists.
      </p>
      <button className={styles.btn} onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  )
}
