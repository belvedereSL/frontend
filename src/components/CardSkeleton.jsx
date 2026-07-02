import styles from './CardSkeleton.module.css'

export function CardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.imgSkeleton} />
      <div className={styles.body}>
        <div className={styles.lineSm} />
        <div className={styles.lineLg} />
        <div className={styles.lineMd} />
        <div className={styles.lineMd} />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
