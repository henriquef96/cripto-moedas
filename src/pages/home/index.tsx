import styles from './home.module.css'
import { useState, type FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

export function Home() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);

    useEffect(() => {getData()}, []);

    async function getData() {
        fetch("https://rest.coincap.io/v3/assets?limit=10&offset=0&apiKey=fbf456fe3c49b2e069911557a8059abf15856fcf63e59ad6421cc3a4af1dd16c")
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!input) return;
        navigate(`/detail/${input}`);
    }

    function handleLoadMore() {
        console.log('load more')
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
                    <tr className={styles.row}>
                        <td className={styles.tdlabel} data-label="Moeda">
                            <div className={styles.name}>
                                <Link to="/details/bitcoin">
                                    <span>Bitcoin</span> | BTC
                                </Link>
                            </div>
                        </td>

                        <td className={styles.tdlabel} data-label="Valor">1T</td>

                        <td className={styles.tdlabel} data-label="Preço">8.000</td>

                        <td className={styles.tdlabel} data-label="Volume">2B</td>

                        <td className={styles.tdProfit} data-label="Mudança 24h">1.20%</td>
                    </tr>
                </tbody>
            </table>

            <button className={styles.loadMore} onClick={handleLoadMore}>
                Carregar mais...
            </button>
        </main>
    )
}

