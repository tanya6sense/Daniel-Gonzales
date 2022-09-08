import React from 'react';
import { Link } from 'react-router';
import '../../styles/core.scss';
import { SixSenseLogo } from 'components';
import styles from './Navbar.module.scss';

export function Navbar() {
  return (
    <div className={styles.navBarContainer}>
      <Link
        to="/"
        id="home_link"
        onlyActiveOnIndex={false}
      >
        <SixSenseLogo className={styles.logo} />
      </Link>

      {/* <Link
        to="/todos"
        id="link_navbarTodos"
        onlyActiveOnIndex
        activeClassName={styles.active}
      >
        <div className={styles.navLink}>
          Todos
        </div>
      </Link> */}
      <Link
        to="/other"
        id="link_navbarOther"
        onlyActiveOnIndex
        activeClassName={styles.active}
      >
        <div className={styles.navLink}>
          Other
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
