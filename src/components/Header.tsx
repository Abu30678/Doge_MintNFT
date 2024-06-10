import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react'
import { useAccount, useBalance } from 'wagmi';
import Decimal from 'decimal.js'

export default function Header() {
    //拿到我的 Account
    const { address } = useAccount()
    // 查看我的 Balance
    //data，可以重新命名 data: Balance。
    const { data: balance, isError, isLoading } = useBalance({
        address: address,
      })

    //為了使用 decimal.js，清理掉小數點
    const [balanceDec, setBalanceDec] = useState<Decimal>(new Decimal(0));

    useEffect(() =>{
        if (balance) {
            setBalanceDec(new Decimal(balance.formatted));
        }
    }, [balance]);
    
    // div className=''，是 TailwindCSS的用法，寫起來比較方便。
    // bg-slate-500 w-full px-4 py-4 text-2xl
    // flex flex-row，row就是 擺橫的意思。
    // justify-between，元素分開
  return <div className="bg-slate-500 w-full px-4 py-4 text-2xl flex flex-row justify-between items-center">
    <p className='text-2xl'>KryptoCamp Doge</p>
    
        <div className="flex flex-row items-center gap-4">
            <p>Balance: {balanceDec.toFixed(3)} ETH</p>
            <ConnectButton/>
        </div>
    </div>;
  
}
