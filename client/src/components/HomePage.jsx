import Hero from "./Hero"
import styles from "../style"

const HomePage = () => {
  return (
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
  )
}

export default HomePage
