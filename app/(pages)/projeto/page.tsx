import type { Metadata } from "next";
import ProjectFeatureCard from "@/components/ProjectFeatureCard";
import TechCarousel from "@/components/TechCarousel";
import {
  CodeIcon,
  GlobeIcon,
  OrbitIcon,
  RocketIcon,
  TerminalIcon,
  WindowIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Sobre o projeto | Terra em Movimento",
  description: "Conheça o projeto Terra em Movimento.",
};

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "React Globe.gl",
  "GeoJSON local",
  "REST Countries",
  "GSAP",
  "GitHub Copilot",
];

function OrbitalIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex aspect-square w-full max-w-64 items-center justify-center text-primary lg:max-w-80"
    >
      <div className="absolute inset-2 rounded-full border border-border border-dashed" />
      <div className="absolute inset-8 rounded-full border-2 border-secondary" />
      <div className="absolute inset-14 rounded-full border border-primary" />
      <OrbitIcon className="absolute inset-5 size-[calc(100%-2.5rem)] text-primary" />
      <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-lg shadow-primary/20" />
      <span className="absolute left-1/4 top-1/3 size-2 rounded-full bg-secondary" />
      <span className="absolute right-1/4 top-2/3 size-2 rounded-full bg-primary" />
    </div>
  );
}

export default function Projeto() {
  return (
    <div className="overflow-hidden">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-surface-elevated px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
              por trás da experiência
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Tecnologia para explorar o mundo.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground sm:text-base">
              Um projeto experimental que combina visualização 3D, dados públicos e
              desenvolvimento web para tornar a exploração do planeta mais envolvente e acessível.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {["DADOS PÚBLICOS", "VISUALIZAÇÃO 3D", "DESENVOLVIMENTO WEB"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-md bg-surface-elevated px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <OrbitalIllustration />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
          propósito e escopo
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">Objetivo do projeto</h2>
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <ProjectFeatureCard
            eyebrow="síntese cartográfica fluida"
            title="Síntese Cartográfica Fluida"
            description="O objetivo fundamental do Terra em Movimento é aproximar dados públicos e visualização espacial em uma experiência interativa e tridimensional."
            footer="interação sem fricção"
            icon={<GlobeIcon className="size-full" />}
          />
          <ProjectFeatureCard
            eyebrow="transparência analítica"
            title="Democratização de Indicadores Abertos"
            description="A interface organiza informações geográficas para tornar a exploração de países mais clara, acessível e envolvente."
            footer="transparência analítica"
            icon={<CodeIcon className="size-full" />}
          />
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-surface-elevated px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-secondary">
              <TerminalIcon aria-hidden="true" className="size-3" />
              fluxo arquitetural
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">Como funciona</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Fonte de dados → Associação geográfica → Interface
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ProjectFeatureCard
              eyebrow="01 / origem bruta"
              title="Fontes de dados"
              description="REST Countries fornece os dados dos países e o GeoJSON local fornece seus contornos geográficos."
              footer="JSON / REST / GEOJSON"
              icon={<GlobeIcon className="size-full" />}
            />
            <ProjectFeatureCard
              eyebrow="02 / pipeline técnico"
              title="Processamento"
              description="Os dados são associados à geometria usando códigos ISO antes de serem entregues à interface."
              footer="coordinate mapping"
              icon={<OrbitIcon className="size-full" />}
            />
            <ProjectFeatureCard
              eyebrow="03 / interface"
              title="Experiência visual"
              description="React Globe.gl desenha o globo e GSAP anima elementos da interface, sem substituir os controles do globo."
              footer="webgl rendering"
              icon={<WindowIcon className="size-full" />}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
          stack & componentes
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
          Tecnologias utilizadas
        </h2>
        <div className="mt-7">
          <TechCarousel technologies={technologies} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-10 lg:pb-20">
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-6 pt-7 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-primary" />
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
              <RocketIcon aria-hidden="true" className="size-3" />
              engenharia e fluxo de trabalho
            </p>
            <h2 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
              Aceleração e Aprendizado com Inteligência Artificial
            </h2>
            <p className="mt-3 text-sm leading-6 text-foreground">
              O desenvolvimento deste projeto contou com o apoio de ferramentas de IA generativa e
              GitHub Copilot para ideação, documentação, depuração e aprendizado técnico. As
              decisões de arquitetura, refatoração, testes e validação foram conduzidas pelo
              desenvolvedor.
            </p>
          </div>
          <div className="mt-6 flex shrink-0 flex-wrap gap-3 lg:mt-0 lg:max-w-48 lg:flex-col">
            <span className="rounded-md bg-surface-elevated px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-foreground">
              arquitetura humana
            </span>
            <span className="rounded-md bg-surface-elevated px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-foreground">
              IA assistida
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
