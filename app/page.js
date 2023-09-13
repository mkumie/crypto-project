"use client";

import CoinSearch from "@/components/CoinSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import Trending from "@/components/Trending";

export default function Home() {
  const [coins, setCoins] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
      // console.log(response.data);
    });
  }, [url]);
  return (
    <main>
      <CoinSearch coins={coins} />
      <Trending />
    </main>
  );
}
