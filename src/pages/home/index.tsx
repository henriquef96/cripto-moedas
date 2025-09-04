import { Link } from 'react-router-dom'
import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'

export function Home() {

    return (
        <main className={styles.container}>
            <form action="" className={styles.form}>
                <input type="text" placeholder='Digite o nome da moeda... Ex Bitcoin' />
                <button type='submit'>
                    <BsSearch size={30} />
                </button>
            </form>

            <table>
                <thead>
                    <th scope='col'>Moeda</th>
                    <th scope='col'>Valor</th>
                    <th scope='col'>Preço</th>
                    <th scope='col'>Volume</th>
                    <th scope='col'>Mudança 24h</th>
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


                        <td className={styles.tdlabel} data-label="Valor">
                            <div className={styles.name}>
                                <Link to="/details/bitcoin">
                                    <span>1T</span>
                                </Link>
                            </div>
                        </td>

                        <td className={styles.tdlabel} data-label="Preço">
                            <div className={styles.name}>
                                <Link to="/details/bitcoin">
                                    <span>8.000</span>
                                </Link>
                            </div>
                        </td>

                        <td className={styles.tdlabel} data-label="Volume">
                            <div className={styles.name}>
                                <Link to="/details/bitcoin">
                                    <span>2B</span>
                                </Link>
                            </div>
                        </td>

                        <td className={styles.tdlabel} data-label="Mudança 24h">
                            <div className={styles.name}>
                                <Link to="/details/bitcoin">
                                    <span>1.20%</span>
                                </Link>
                            </div>
                        </td>

                    </tr>
                </tbody>
            </table>
        </main>
    )
} 
