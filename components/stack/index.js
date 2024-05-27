import styles from './styles.module.css'

const Stack = ({ gridGap = 0, children }) => {
  let gap = gridGap

  if (gap > 0) {
    gap = 4 * (2 ** (gridGap-1))
  }

  return (
    <div className={styles.stack} style={{ gap: `${gap}px`}}>
      {children}
    </div>
  )
}

export default Stack