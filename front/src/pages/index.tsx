import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import { Game } from '../components/Game';
import { WagmiConfig, createClient } from 'wagmi';
import { getDefaultProvider } from 'ethers';
import { Header } from '@/components/Header';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { hardhat } from '@wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import { configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains([hardhat], [publicProvider()]);

const connector = new MetaMaskConnector({
	chains: [hardhat],
});
const inter = Inter({ subsets: ['latin'] });

const client = createClient({
	autoConnect: false,
	provider: provider,
	connectors: [connector],
});

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<WagmiConfig client={client}>
					<Header />
					<Game />
				</WagmiConfig>
			</main>
		</>
	);
}