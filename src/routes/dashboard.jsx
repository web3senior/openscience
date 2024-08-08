import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import styles from './Dashboard.module.scss'

export default function About({ title }) {
  Title(title)
  const [totalForm, setTotalForm] = useState(0)
  const [totalRespond, setTotalRespond] = useState(0)
  const [fee, setFee] = useState(0)

  const getTotalForm = async () => await contract.methods._formCounter().call()
  const getTotalRespond = async () => await contract.methods._respondCounter().call()
  const getFee = async () => await contract.methods.fee().call()

  useEffect(() => {
    getTotalForm().then((res) => {
      setTotalForm(_.toNumber(res))
      setIsLoading(false)
    })

    getTotalRespond().then((res) => {
      setTotalRespond(_.toNumber(res))
      setIsLoading(false)
    })

    getFee().then((res) => {
      setFee(_.fromWei(res, `ether`))
      setIsLoading(false)
    })
  }, [])

  return (
    <section className={styles.section}>
      <h3 id={`pageTitle`} />
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`medium`}>
        <div className="grid grid--fit" style={{ '--data-width': `200px`, columnGap: `1rem` }}>
          <div className={`card`}>
            <div className={`card__body d-flex align-items-center justify-content-between`}>
              <div>
                <span>Total questions</span>
                <h1>400</h1>
              </div>
              <div className={`${styles['card-icon']}`}>
                <Icon name={`loyalty`} />
              </div>
            </div>
          </div>
          <div className={`card`}>
            <div className={`card__body d-flex align-items-center justify-content-between`}>
              <div>
                <span>Total claimed</span>
                <h1>1</h1>
              </div>
              <div className={`${styles['card-icon']}`}>
                <Icon name={`storefront`} />
              </div>
            </div>
          </div>
        </div>

        <div className={`grid grid--fit mt-50`} style={{ '--data-width': '100px', gap: '.5rem' }}>
          <div className={`card`}>
            <div className={`card__body`}>
              <p>Forms</p>
              <h2>{totalForm}</h2>
            </div>
          </div>
          <div className={`card`}>
            <div className={`card__body`}>
              <p>Responds</p>
              <h2>{totalRespond}</h2>
            </div>
          </div>
          <div className={`card`}>
            <div className={`card__body`}>
              <p>Ecosystems</p>
              <h2>{`4`}</h2>
            </div>
          </div>
          <div className={`card`}>
            <div className={`card__body`}>
              <p>Fee</p>
              <h2>0</h2>
            </div>
          </div>
        </div>

        <h3 className={`mt-40`}>Latest form</h3>
        <div className={`card`}>
          <div className={`card__body`}>
            <span>alo</span>
            <span>200</span>
            <span>Buy</span>
            <span>140$</span>
            <span>Amir</span>
            <span>07/07/2024</span>
          </div>
        </div>
      </div>
    </section>
  )
}
