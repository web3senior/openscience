import { useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { useAuth, web3, _, contract } from '../contexts/AuthContext'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import styles from './Fee.module.scss'

export const loader = async () => {
  return defer({ key: 'val' })
}

export default function Fee({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [registerFee, setRegisterFee] = useState(0)
  const [royaltyFee, setRoyaltyFee] = useState(0)
  const [recordTypeList, setRecordTypeList] = useState(0)
  const auth = useAuth()
  const navigate = useNavigate()
  const tableBodyRef = useRef()

  const getFee = async (name) => await contract.methods.fee(name).call()

  useEffect(() => {
    getFee(`register`).then((res) => {
      setRegisterFee(_.toNumber(res))
    })
    getFee(`royalty`).then((res) => {
      setRoyaltyFee(_.toNumber(res))
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={`${styles['container']} __container ms-motion-slideUpIn`} data-width={`large`}>
        <h3 className={`mt-40`}>Fee</h3>
        <div className={`card`}>
          <div className={`card__body`}>
            <div className={`${styles['extension']} table-responsive`}>
              <table className={`data-table`}>
                <caption>FEE</caption>
                <thead>
                  <tr>
                    <th scope="col" className={`text-left`}>
                      Register fee
                    </th>
                    <th scope="col">Royalty fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={`text-center`}>{registerFee} $ARB</td>
                    <td className={`text-center`}>{royaltyFee} %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
