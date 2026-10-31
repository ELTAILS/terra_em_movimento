import type { Metadata } from "next";

import { getCountries } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Sobre os Países | Terra em Movimento",
  description: "Conheça os países incluídos no projeto Terra em Movimento",
};

export default async function Paises() {
  const result = await getCountries();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Paises</h1>
      <p>Esta é a página de países.</p>
      <section>
        <h2>TEMPORÁRIO: verificação dos dados</h2>
        {result.status === "success" ? (
          <>
            <p>Quantidade de países: {result.countries.length}</p>
            <ul>
              {result.countries.slice(0, 3).map((country) => (
                <li key={country.code}>{country.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>Erro: {result.error.message}</p>
        )}
      </section>
    </div>
  );
}
