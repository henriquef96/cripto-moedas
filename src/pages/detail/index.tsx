import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './detail.module.css'

type ApiCoinResponse = {
    id: string
    symbol: string
    name: string
    current_price: number
    market_cap: number
    total_volume: number
    price_change_percentage_24h?: number
}

type ApiCoin = {
    brl: string
    brl_24h_change: string
    brl_24h_vol: string
    brl_market_cap: string
    formatedPrice: string
    formatedMarketCap: string
    formatedVolume: string
}

export function Detail() {
    const { cripto } = useParams<{ cripto: string }>()
    const navigate = useNavigate()
    const [coinData, setCoinData] = useState<ApiCoin | null>(null)
    const [loading, setLoading] = useState(true)
    const [symbol, setSymbol] = useState<string | null>(null)
    const [coinName, setCoinName] = useState<string | null>(null)

    useEffect(() => {
        async function getCoin() {
            if (!cripto) {
                navigate('/')
                return
            }

            setLoading(true)

            const price = Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })

            const priceCompact = Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                notation: 'compact',
            })

            try {
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=${cripto}&per_page=1&page=1&sparkline=false&price_change_percentage=24h`
                )

                if (!res.ok) throw new Error('Erro na requisição')

                const data = (await res.json()) as ApiCoinResponse[]

                if (!Array.isArray(data) || data.length === 0) {
                    navigate('/')
                    return
                }

                const coin = data[0]

                setSymbol(coin.symbol ?? cripto ?? null)
                setCoinName(coin.name ?? cripto ?? null)

                const resultData: ApiCoin = {
                    brl: String(coin.current_price ?? 0),
                    brl_24h_change: ((coin.price_change_percentage_24h ?? 0)).toFixed(2),
                    brl_24h_vol: String(coin.total_volume ?? 0),
                    brl_market_cap: String(coin.market_cap ?? 0),
                    formatedPrice: price.format(coin.current_price ?? 0),
                    formatedMarketCap: priceCompact.format(coin.market_cap ?? 0),
                    formatedVolume: priceCompact.format(coin.total_volume ?? 0),
                }

                setCoinData(resultData)
            } catch (err) {
                console.error(err)
                navigate('/')
            } finally {
                setLoading(false)
            }
        }
        getCoin()
    }, [cripto, navigate])

    interface CoinProps {
        symbol: string
    }

    interface DataProp {
        data: CoinProps[]
    }

    useEffect(() => {
        async function imgData() {
            try {
                const res = await fetch(
                    'https://rest.coincap.io/v3/assets?limit=10&offset=0&apiKey=fbf456fe3c49b2e069911557a8059abf15856fcf63e59ad6421cc3a4af1dd16c'
                )
                if (!res.ok) throw new Error('Erro na requisição CoinCap')
                const json = (await res.json()) as DataProp
                const coinsData = json.data ?? []
                const coin = coinsData.find((c) => c.symbol.toLowerCase() === (symbol ?? '').toLowerCase())
                if (coin) {
                    setSymbol(coin.symbol)
                }
            } catch (err) {
                console.error(err)
            }
        }
        imgData()
    }, [])

    if (loading) {
        return (
            <div className={styles.loading}>
                <h2 className={styles.title}>Carregando...</h2>
            </div>
        )
    }

    const changeValue = Number(coinData?.brl_24h_change ?? 0)
    const changeText = `${changeValue > 0 ? '+' : ''}${changeValue.toFixed(2)}%`
    const changeColor = changeValue > 0 ? '#43a047' : '#e53935'

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <img
                        src={`https://assets.coincap.io/assets/icons/${(symbol ?? cripto ?? '').toLowerCase()}@2x.png`}
                        alt="Logo Cripto"
                        className={styles.logo}
                    />
                    <span className={styles.title}>{coinName ?? cripto}</span><br />
                </div>
                <div className={styles.info}>
                    <span className={styles.info}><b>Preço:</b> {coinData?.formatedPrice}</span>
                    <span className={styles.info}><b>Valor:</b> {coinData?.formatedMarketCap}</span>
                    <span className={styles.info}><b>Volume:</b> {coinData?.formatedVolume}</span>
                    <span className={styles.info}>
                        <b>Variação 24h: </b>
                        <span style={{ color: changeColor }}>{changeText}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}