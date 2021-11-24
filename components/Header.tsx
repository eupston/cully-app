import styles from "../styles/Header.module.css";
import Image from 'next/image'
import cully from "/public/Cully.svg"
import coffee from "/public/Coffee.svg"

const Header = () => {

    return(
        <div className={styles.headerContainer}>
            <Image src={cully}/>
            <Image src={coffee}/>
        </div>
    )
}

export default Header
