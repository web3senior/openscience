import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Heading from './helper/Heading'
import styles from './About.module.scss'

export default function About({ title }) {
  Title(title)

  const [faq, setFaq] = useState([
    {
      q: `What is OpenScience?`,
      a: `OpenScience is a decentralized platform that enables the buying and selling of articles and books, fostering open access to knowledge.`,
    },
    {
      q: `How does OpenScience work?`,
      a: `Users can upload and sell their articles or books as digital assets. Buyers can search, discover, and purchase these digital assets.`,
    },
    {
      q: `Is OpenScience free to use?`,
      a: `There are fees associated with listing and selling items, but browsing and searching are free.`,
    },
    {
      q: `What kind of articles and books can be sold on OpenScience?`,
      a: `A wide range of articles and books across various subjects can be sold on OpenScience.`,
    },
    {
      q: `How do I sell an article or book on OpenScience?`,
      a: `To sell an article or book, you need to create an account, upload your content, set a price, and complete the listing process.`,
    },
  ])
  useEffect(() => {}, [])

  return (
    <section className={styles.section}>
      <div className={`${styles['page-hero']} ms-motion-slideUpIn`}>
        <div className={`__container`} data-width={`large`}>
          <h2> About Us</h2>
          <p>Shaping the Future of Web3 Identities</p>
        </div>
      </div>

      <div className={`__container`} data-width={`large`}>
        <article>
          <p>
            Aratta Labs is a pioneer in decentralized knowledge sharing. Our OpenScience platform democratizes access to information by enabling the direct exchange of articles and books. Through blockchain technology, we ensure data integrity,
            transparency, and fair compensation for content creators.
          </p>
        </article>

        <Heading title={`Roadmap`} subTitle={`Coming soon`}></Heading>
      </div>

      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`xxlarge`}>
        <div className={`__container`} data-width={`large`}>
          <Heading title={`FAQs`} subTitle={`Frequently Asked Questions`}></Heading>
          {faq.map((item, i) => (
            <details className={`transition`} key={i}>
              <summary>{item.q}</summary>
              <div dangerouslySetInnerHTML={{ __html: item.a }} />
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
