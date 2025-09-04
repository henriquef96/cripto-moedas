import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';

export function Header() {
  return (
    <header className={styles.container}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="Logo Cripto Moedas" />
      </Link>
    </header>
  );
}