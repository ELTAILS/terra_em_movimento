import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Mim | Terra em Movimento",
  description: "Relatando mais sobre mim",
};

export default function Sobre() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Sobre</h1>
      <p>Esta é a página sobre a empresa.</p>
    </div>
  );
}