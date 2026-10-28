import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Início | Terra em Movimento",
  description: "Conheça o projeto Terra em Movimento",
};

export default function Home() {
  return (
    <>
      <h1>Bem-vindo ao Terra em Movimento</h1>
      <p>Explore o planeta em um globo 3D interativo.</p>
    </>
  );
}
