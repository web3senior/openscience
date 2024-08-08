import { Title } from './helper/DocumentTitle'
import styles from './Tip.module.scss'

export default function Tips({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <div className={`${styles['page-hero']} ms-motion-slideUpIn`}>
        <div className={`__container`} data-width={`large`}>
          <h2>{import.meta.env.VITE_NAME} Tips</h2>
          <p>Your gateway to open research.</p>
        </div>
      </div>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`large`}>
        <article className={`text-justify`}>
       <p>By following these tips, you can make informed decisions when purchasing articles and books on SciSwap.</p>

          <h3>Define Your Needs</h3>
          <p>Clearly outline the specific information or knowledge you seek.</p>

          <h3>Check Data Quality</h3>
          <p>Verify the accuracy and reliability of the data.</p>

          <h3>Consider Pricing</h3>
          <p>Compare prices from different sellers.</p>

          <h3>Read Reviews</h3>
          <p>Check seller ratings and feedback.</p>

          <h3>Utilize Search Filters</h3>
          <p>Refine your search by category, keywords, or price range.</p>
        </article>
      </div>
    </section>
  )
}
