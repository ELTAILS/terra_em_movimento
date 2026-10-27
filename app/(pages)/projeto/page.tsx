import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre o projeto | Terra em Movimento",
  description: "Conheça pro tras do projeto Terra em Movimento",
};

export default function Projeto() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Projeto</h1>
      <p>Esta é a página do projeto.</p>
    </div>
  );
}