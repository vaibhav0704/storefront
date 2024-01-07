"use client";

import ProductCardList from "../../components/CardsList/ProductCardList";
import { Navbars } from "../../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbars />
      <main>
        <ProductCardList />
      </main>
    </>
  );
}
