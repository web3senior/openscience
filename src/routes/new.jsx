import { Suspense, useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Icon from './helper/MaterialIcon'
import Shimmer from './helper/Shimmer'
import { getTournamentList } from '../util/api'
import toast, { Toaster } from 'react-hot-toast'
import Heading from './helper/Heading'
import { useAuth, web3, _, contract, ABI } from '../contexts/AuthContext'
import Logo from './../../src/assets/logo.svg'
import Coin from './../../src/assets/coin.png'
import party from 'party-js'
import styles from './New.module.scss'

party.resolvableShapes['coin'] = `<img src="${Coin}" style='width:24px'/>`

const WhitelistFactoryAddr = web3.utils.padLeft(`0x2`, 64)

export const loader = async () => {
  return defer({ key: 'val' })
}

function New({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)

  const [fTitle, setFTitle] = useState('')
  const [fPrice, setFPrice] = useState(0)
  const [fAuthors,setFAuthors] = useState([])
  const [freeToRegister, setFreeToRegister] = useState(undefined)
  const [publicMintPrice, setPublicMintPrice] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [toggleCustom, setToggleCustom] = useState(false)
  const [selectedRecordType, setSelectedRecordType] = useState('')
  const [councilMintExpirationDate, setCouncilMintExpirationDate] = useState('')
  const [maxSupply, setMaxSupply] = useState(0)
  const [candySecondaryColor, setCandySecondaryColor] = useState('#0E852E')
  const auth = useAuth()
  const navigate = useNavigate()
  const txtSearchRef = useRef()
  const recordTypeRef = useRef()

  const handleAdd = async () => {
    console.log(       fTitle,
      web3.utils.toWei(fPrice, `ether`),
      '',
      fAuthors.split(`,`),
      '')
      const t = toast.loading(`Waiting for transaction's confirmation`)
    try {
      await contract.methods
        .add(
          fTitle,
          web3.utils.toWei(fPrice, `ether`),
          '',
          fAuthors.split(`,`),
          ''
        )
        .send({from: auth.wallet, value: 0})
        .then((res) => {
          console.log(res)
          toast.dismiss(t)
          toast.success(`The data has been added to the marketplace.`)
          party.confetti(document.querySelector(`.ms-motion-slideDownIn`), {
            count: party.variation.range(20, 40),
          })
        })
    } catch (error) {
      console.error(error)
      toast.dismiss(t)
    }
  }

  const addUserByManager = async () => {
    const t = toast.loading(`Loading`)
    try {
      web3.eth.defaultAccount = auth.wallet

      const whitelistFactoryContract = new web3.eth.Contract(ABI, import.meta.env.VITE_WHITELISTFACTORY_CONTRACT_MAINNET, {
        from: auth.wallet,
      })

      await whitelistFactoryContract.methods
        .addUserByManager(WhitelistFactoryAddr)
        .send()
        .then((res) => {
          console.log(res)
          toast.dismiss(t)
          toast.success(`You hav been added to the list.`)
          party.confetti(document.querySelector(`h4`), {
            count: party.variation.range(20, 40),
          })
        })
    } catch (error) {
      console.error(error)
      toast.dismiss(t)
    }
  }

  const updateWhitelist = async () => {
    web3.eth.defaultAccount = `0x188eeC07287D876a23565c3c568cbE0bb1984b83`

    const whitelistFactoryContract = new web3.eth.Contract('', `0xc407722d150c8a65e890096869f8015D90a89EfD`, {
      from: '0x188eeC07287D876a23565c3c568cbE0bb1984b83', // default from address
      gasPrice: '20000000000',
    })
    console.log(whitelistFactoryContract.defaultChain, Date.now())
    await whitelistFactoryContract.methods
      .updateWhitelist(web3.utils.utf8ToBytes(1), `q1q1q1q1`, false)
      .send()
      .then((res) => {
        console.log(res)
      })
  }

  const createWhitelist = async () => {
    console.log(auth.wallet)
    web3.eth.defaultAccount = auth.wallet

    const whitelistFactoryContract = new web3.eth.Contract(ABI, import.meta.env.VITE_WHITELISTFACTORY_CONTRACT_MAINNET)
    await whitelistFactoryContract.methods
      .addWhitelist(``, Date.now(), 1710102205873, `0x0D5C8B7cC12eD8486E1E0147CC0c3395739F138d`, [])
      .send({ from: auth.wallet })
      .then((res) => {
        console.log(res)
      })
  }

  const handleSearch = async () => {
    if (txtSearchRef.current.value.length < 3) {
      toast.error(`A name must be a minimum of 3 characters long.`)
      return
    }

    const t = toast.loading(`Searching`)

    contract.methods
      .toNodehash(txtSearchRef.current.value, selectedRecordType)
      .call()
      .then(async (res) => {
        console.log(res)
        await contract.methods
          ._freeToRegister(res)
          .call()
          .then((res) => {
            console.log(res)
            setFreeToRegister(!res)
            toast.dismiss(t)
          })
      })
  }

  const fetchIPFS = async (CID) => {
    try {
      const response = await fetch(`https://api.universalprofile.cloud/ipfs/${CID}`)
      if (!response.ok) throw new Response('Failed to get data', { status: 500 })
      const json = await response.json()
      // console.log(json)
      return json
    } catch (error) {
      console.error(error)
    }

    return false
  }

  const getEvent = async () => {
    return contract
      .getPastEvents(
        `dataAdded`,
        {
          //z filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'},
          fromBlock: 0,
          toBlock: 'latest',
        },
        (error, events) => {
          console.log(events)
        }
      )
      .then((events) => events)
  }
  const getData = async () => await contract.methods.getDataList().call()
  const getTotalResolve = async () => await contract.methods._resolveCounter().call()
  const getResolveList = async (wallet) => await contract.methods.getResolveList(wallet).call()
  const getResolver = async () => await contract.methods.resolver(`0x7e058f5786c9fdc2c31ddd04421693cd9d671250e80405da9a2d85a37ffae6a7`).call()
  const getCouncilMintExpiration = async () => await contract.methods.councilMintExpiration().call()
  const getMaxSupply = async () => await contract.methods.MAX_SUPPLY().call()

  const rAsset = async (imageURL) => {
    const assetBuffer = await fetch(imageURL).then(async (response) => {
      return response.arrayBuffer().then((buffer) => new Uint8Array(buffer))
    })

    return assetBuffer
  }

  useEffect(() => {}, [])

  return (
    <>
      <section className={`${styles.section} ms-motion-slideDownIn`}>
        <div className={`__container`} data-width={`medium`}>
          <div className={`card`}>
            <div className={`card__header`}>Add new item</div>
            <div className={`card__body form`}>
              <div className={`mt-20`}>
                <input type={`text`} placeholder={`Title`} defaultValue={fTitle} onChange={(e)=>setFTitle(e.target.value)}/>
              </div>
              <div className={`mt-20`}>
                <input type={`number`} placeholder={`Price`} defaultValue={fPrice} onChange={(e)=>setFPrice(e.target.value)} />
              </div>
              <div className={`mt-20`}>
                <textarea type={`text`} placeholder={`Authors[]`} defaultValue={fAuthors} onChange={(e)=>setFAuthors(e.target.value)} />
              </div>
              <div className={`mt-20`}>
                <button className='btn' onClick={()=>handleAdd()}>Add</button>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default New
