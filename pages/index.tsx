import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from "../components/Header";
import ImageCarousel from "../components/ImageCarousel";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cully App</title>
        <meta name="description" content="Cully App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className={styles.page}>
            <Header/>
            <ImageCarousel/>
        </div>
    </>
  )
}

export default Home
