import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

type ApiCoin = {
    brl: number
    brl_24h_change: number
    brl_24h_vol: number
    brl_market_cap: number
}

export function Detail() {
    const { cripto } = useParams()
    const navigate = useNavigate()
    const [coinData, setCoinData] = useState<ApiCoin | null>(null)
    console.log(coinData)

    useEffect(() => {
        async function getCoin() {
            if (!cripto) {
                navigate('/')
                return
            }

            const price = Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })

            const priceCompact = Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                notation: 'compact',
            })

            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${cripto}&vs_currencies=brl&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
            )
            const data = (await res.json()) as Record<string, ApiCoin>

            const coin = data[cripto]

            if (!coin || Object.keys(coin).length === 0) {
                navigate('/')
                return
            }

            const resultData = {
                ...coin,
                formatedPrice: price.format(Number(coin.brl ?? 0)),
                formatedMarketCap: priceCompact.format(Number(coin.brl_market_cap ?? 0)),
                formatedVolume: priceCompact.format(Number(coin.brl_24h_vol ?? 0)),
            }

            setCoinData(resultData)
        }
        getCoin()
    }, [cripto, navigate])

    return (
        <div>
        </div>
    )
}
