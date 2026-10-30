import type { Metadata } from "next";
import ProjectFeatureCard from "@/components/ProjectFeatureCard";
import TechCarousel from "@/components/TechCarousel";
import { GlobeIcon, OrbitIcon, WindowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sobre o projeto | Terra em Movimento",
  description: "Conheça o projeto Terra em Movimento.",
};

export default function Projeto() {
  return (
    <div className="overflow-hidden">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary">
            sobre o projeto
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Terra em Movimento
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-foreground">
            Uma demonstração educacional para explorar o planeta em um globo 3D interativo.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <ProjectFeatureCard
            eyebrow="01 / fonte de dados"
            title="REST Countries"
            description="A REST Countries fornece os dados gerais dos países usados pela aplicação."
            icon={<GlobeIcon className="size-10" />}
          />
          <ProjectFeatureCard
            eyebrow="02 / associação geográfica"
            title="GeoJSON local"
            description="O GeoJSON local fornece a geometria dos países e é associado aos dados pelo código ISO."
            icon={<OrbitIcon className="size-10" />}
          />
          <ProjectFeatureCard
            eyebrow="03 / interface"
            title="Exploração visual"
            description="O React Globe.gl desenha o globo e o GSAP anima elementos da interface."
            icon={<WindowIcon className="size-10" />}
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-secondary">
                arquitetura
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
                Da fonte de dados à interface
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-muted">
                O projeto combina dados de países, associação geográfica e uma interface de
                exploração visual em camadas claras.
              </p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Fonte de dados", "REST Countries"],
                ["02", "Associação geográfica", "GeoJSON + ISO"],
                ["03", "Interface", "React Globe.gl"],
              ].map(([number, title, detail], index) => (
                <li
                  key={title}
                  className="relative rounded-xl border border-border bg-surface-elevated p-5"
                >
                  {index < 2 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 z-10 hidden text-primary sm:block"
                    >
                      →
                    </span>
                  )}
                  <span className="font-mono text-xs text-primary">{number}</span>
                  <h3 className="mt-5 text-sm font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary">
            tecnologia
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
            Ferramentas do projeto
          </h2>
          <p className="mt-5 text-sm leading-6 text-foreground">
            Next.js, React, TypeScript, Tailwind CSS, React Globe.gl, GeoJSON local, REST Countries
            e GSAP participam da construção da experiência.
          </p>
        </div>
        <div className="mt-10">
          <TechCarousel
            technologies={[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "React Globe.gl",
              "GeoJSON",
              "REST Countries",
              "GSAP",
            ]}
          />
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-6 text-muted">
          O Copilot apoia o processo de desenvolvimento. Ele não é uma função de inteligência
          artificial oferecida pelo site.
        </p>
      </section>
    </div>
  );
}