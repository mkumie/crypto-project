"use client";

import { db } from "@/app/firebase";
import { UserAuth } from "@/context/AuthContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const SavedCoin = () => {
  const [coins, setCoins] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setCoins(doc.data()?.watchList);
    });
  }, [user?.email]);

  const coinPath = doc(db, "users", `${user?.email}`);
  const deleteCoin = async (passedId) => {
    try {
      const result = coins.filter((item) => item.id !== passedId);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {coins?.length === 0 ? (
        <p>
          You dont' have any coins saved. Please save a coin to add it to the
          watch list. <Link href="/">Click here to search coins.</Link>
        </p>
      ) : (
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th className="px-4">Rank #</th>
              <th className="text-left">Coin</th>
              <th className="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin) => (
              <tr key={coin.id} className="h-[60px] overflow-hidden">
                <td>{coin?.rank}</td>
                <td>
                  <Link href={`/coin/${coin.id}`}>
                    <div className="flex items-center">
                      <Image
                        src={coin?.image}
                        alt="/"
                        width={5}
                        height={5}
                        className="w-8 mr-4"
                      />
                      <div>
                        <p className="hidden sm:table-cell">{coin?.name}</p>
                        <p className="text-gray-500 text-left text-sm">
                          {coin?.symbol?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="pl-8">
                  <AiOutlineClose
                    onClick={() => deleteCoin(coin.id)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoin;
