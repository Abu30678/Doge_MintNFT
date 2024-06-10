import React, { useEffect, useState } from 'react';
import nftImage from "../asserts/nft-image.jpg"; //導入圖
import Image from "next/image"; //Nextjs 原生的寫法
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { CONFIG } from '../../config';
import nftABI from "../abis/nftABI.json";

export default function MintCard() {   
    //B2. 為了讓 functionName: 'balanceOf'能正確拿到我的地址。  >args: [address],
    const { address } = useAccount();

    //A2. <p className='text-2xl'>Total Supply: {totalSupply}</p> 為了 Type不一樣而設計。
    const [totalSupply, setTotalSupply] = useState<string>("0");
 
    //B3.
    const [balance, setBalance] = useState<string>("0");

    //ReactHook的 usePrepareContractWrite，可以Mint的操作
    const { config } = usePrepareContractWrite({
        address: CONFIG.NFT_CONTRACT_ADDRESS,
        abi: nftABI,
        functionName: 'mint',
      })
    //const { data, isLoading, isSuccess, write } 
      const { data: txHash, write } = useContractWrite(config);

      //ReactHook的 Usage，可以看我地址 Mint了多少個
      const { data: total } = useContractRead({
        address: CONFIG.NFT_CONTRACT_ADDRESS,
        abi: nftABI,
        functionName: 'totalSupply',
      })

      //B1. 為了每次 Mint之後，識字自己更新，不需要刷網頁。
      const { data: amount} = useContractRead({
        address: CONFIG.NFT_CONTRACT_ADDRESS,
        abi: nftABI,
        functionName: 'balanceOf',
        args: [address],
      })

      //A1. 當有收到 total改變的時候，就把他轉乘string
      useEffect(() => {
        if (total) {
            setTotalSupply(total.toString());
        }
      }, [total]);

      //B4. 當 34行的 amount更新後，就去 set
      useEffect(() => {
        if (amount) {
            setBalance(amount.toString());
        }
      }, [amount]);


    //62行，是 Image而不是 image
    //C2. 64行
  return (
    <div className="flex flex-col w-full justify-center items-center py-20">
      
        <Image src={nftImage.src} width={300} height={300} alt="nft-image"/>

        <p className='text-2xl py-5'>Total Minted: {totalSupply}</p>
        <p className='text-2xl'>Your Balance: {balance}</p>

        <button className="bg-slate-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-slate-700" 
            // write?.
            disabled={!write}
            onClick={() => write?.() }
        >
            Mint
        </button>
        
    </div>
  );
}
