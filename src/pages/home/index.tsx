import styles from './home.module.css'
import { useState, type FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

interface CoinProps {
    id: string;
    name: string;
    symbol: string;
    priceUsd: string;
    vwap24Hr: string;
    changePercent24Hr: string;
    rank: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    explorer: string;
    formatedPrice?: string;
    formatedMarketCap?: string;
    formatedVolume?: string;
}

interface DataProp {
    data: CoinProps[];
}

export function Home() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const [coins, setCoins] = useState<CoinProps[]>([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => { getData() }, [offset]);

    async function getData() {
        fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=${offset}&apiKey=fbf456fe3c49b2e069911557a8059abf15856fcf63e59ad6421cc3a4af1dd16c`)
            .then(response => response.json())
            .then((data: DataProp) => {

                console.log(offset);

                const coinsData = data.data;

                const price = Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })

                const priceCompact = Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    notation: 'compact',
                })

                const formatedResult = coinsData.map((item) => {
                    const formated = {
                        ...item,
                        formatedPrice: price.format(Number(item.priceUsd)),
                        formatedMarketCap: priceCompact.format(Number(item.marketCapUsd)),
                        formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
                    }
                    return formated;
                })
                const listCoin = [...coins, ...formatedResult]
                setCoins(listCoin);
            })
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!input) return;
        navigate(`/detail/${input}`);
    }

    function handleLoadMore() {
        if (offset == 0) {
            setOffset(10)
            return;
        }
        setOffset(offset + 10);
    }

    return (
        <main className={styles.container}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <input type="text" placeholder='Digite o nome da moeda... Ex Bitcoin' value={input} onChange={(e) => setInput(e.target.value)} />
                <button type='submit'>
                    <BsSearch size={30} />
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                        <th scope='col'>Mudança 24h</th>
                    </tr>
                </thead>

                <tbody id='tbody'>

                    {coins.length > 0 && coins.map((item) => (
                        <tr className={styles.row} key={item.id}>
                            <td className={styles.tdlabel} data-label="Moeda">
                                <div className={styles.name}>
                                    <img src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`} alt="Logo Cripto" className={styles.logo} />
                                    <Link to="/details/bitcoin">
                                        <span>{item.name}</span>
                                        {/* | {item.symbol} */}
                                    </Link>
                                </div>
                            </td>

                            <td className={styles.tdlabel} data-label="Valor">{item.formatedMarketCap}</td>

                            <td className={styles.tdlabel} data-label="Preço">{item.formatedPrice}</td>

                            <td className={styles.tdlabel} data-label="Volume">{item.formatedVolume}</td>

                            <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h"><span>{item.changePercent24Hr.slice(0, 5)}%</span>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <button className={styles.loadMore} onClick={handleLoadMore}>
                Carregar mais...
            </button>
        </main>
    )
}

