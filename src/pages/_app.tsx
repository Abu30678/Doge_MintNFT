import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@rainbow-me/rainbowkit/styles.css';
//Rainbow Kit

//config
const { chains, publicClient } = configureChains(
  [sepolia],
  [
    // Api去 Alchemy拿，寫在.env裡面
    //因為 NEXT.js的命名方式，所以加上 NEXT_PUBLIC_
    //apiKey 的型別一定要是 string，所以我加上去。
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string}),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string, //型別一定要是 string，所以我加上去。
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

//install，import
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi';
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";


export default function App({ Component, pageProps }: AppProps) {
  return (
  //Wrap providers
  //因為 Component被 <RainbowKitProvider>、<WagmiConfig>包住，
  //所以它也可以影響到 pages底下的檔案。
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <Component {...pageProps} />;
    </RainbowKitProvider>
  </WagmiConfig>
  );
}