import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre os Países | Terra em Movimento",
  description: "Conheça os países incluídos no projeto Terra em Movimento",
};

export default function Paises() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Paises</h1>
      <p>Esta é a página de países.</p>
    </div>
  );
}