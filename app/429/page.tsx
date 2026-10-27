import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muitas requisições | Terra em Movimento",
  description: "Você está fazendo muitas requisições. Por favor, tente novamente mais tarde.",
};


export default function Page429() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Página 429</h1>
      <p>Muitas requisições feitas, por favor, tente novamente mais tarde.</p>
    </div>
  );
}