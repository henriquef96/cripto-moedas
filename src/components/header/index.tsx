import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';

export function Header() {
  return (
    <header className={styles.container}>
      <Link to="/">
        <h1 className={styles.titulo}><span className={styles.subTitulo}>Cripto </span>Moedas</h1>
      </Link>
    </header>
  );
}