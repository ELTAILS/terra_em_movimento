import type { Metadata } from "next";
import Link from "next/link";
import AboutFeatureCard from "@/components/AboutFeatureCard";
import {
  BookIcon,
  CodeIcon,
  GraduationCapIcon,
  MailIcon,
  OrbitIcon,
  PinIcon,
  RocketIcon,
  TerminalIcon,
  WindowIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Sobre Mim | Terra em Movimento",
  description: "Relatando mais sobre mim",
};

export default function Sobre() {
  return (
    <div className="overflow-hidden">
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="grid gap-10 rounded-xl border border-border bg-surface p-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:px-10">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full bg-surface-elevated px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-primary">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
              Quem criou este projeto
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Olá, eu sou <span className="text-primary">Wagner Junior</span>.
            </h1>
            <p className="mt-3 max-w-2xl text-lg font-semibold leading-7 text-secondary">
              Estudante de sistemas para internet e desenvolvedor em formação.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
              Profissional em formação, com foco em desenvolvimento web, arquitetura de software e visualização de dados. Apaixonado por explorar novas tecnologias, criar soluções inovadoras e contribuir para projetos que impactam positivamente a sociedade.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-foreground">
              <span className="inline-flex items-center gap-2 rounded-md bg-surface-elevated px-3 py-2">
                <GraduationCapIcon aria-hidden="true" className="size-4 text-primary" />
                4º Período
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-surface-elevated px-3 py-2">
                <WindowIcon aria-hidden="true" className="size-4 text-secondary" />
                Web developer &amp; AI enthusiast
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-surface-elevated px-3 py-2">
                <PinIcon aria-hidden="true" className="size-4 text-primary" />
                Brasil
              </span>
            </div>
          </div>

          <div className="mx-auto flex size-64 max-w-full items-center justify-center rounded-full border border-primary/40 bg-background p-6 text-primary">
            <div className="flex size-full flex-col items-center justify-center rounded-full border border-dashed border-primary/50 text-center">
              <TerminalIcon aria-hidden="true" className="size-10" />
              <span className="mt-3 text-xs font-bold text-foreground">wagnerjr@fedora:~$</span>
              <span className="mt-1 text-[11px] font-bold text-secondary">sudo dnf update</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-primary">Percurso evolutivo</p>
            <h2 className="mt-1 text-xl font-semibold text-foreground">Minha jornada acadêmica e prática</h2>
          </div>
          <p className="text-xs uppercase tracking-[0.08em] text-foreground">3 estágios principais</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AboutFeatureCard
            number="01"
            title="Início e Fundamentos"
            eyebrow="Lógica • Bases Web"
            description="Primeiros passos com lógica de programação, algoritmos e criação das primeiras páginas web responsivas. Consolidação dos padrões semânticos de HTML, CSS moderno e fundamentos da programação procedural e orientada a objetos."
            footer="Algoritmos, Git, Estruturação"
            icon={<BookIcon className="size-5" />}
          />
          <AboutFeatureCard
            number="02"
            title="Formação em ADS"
            eyebrow="Ciência • Arquitetura"
            description="Aprofundamento acadêmico em Engenharia de Software, estruturas de dados, banco de dados e arquitetura de sistemas. Estudo de modelagem relacional, boas práticas com Clean Architecture e princípios de computação distribuída."
            footer="SQL, POO, Design Patterns"
            icon={<GraduationCapIcon className="size-5" />}
          />
          <AboutFeatureCard
            number="03"
            title="Projetos Práticos"
            eyebrow="Aplicações • Dados Vivos"
            description="Criação de soluções completas integrando APIs, visualizações interativas e metodologias ágeis de desenvolvimento. Foco na resolução de problemas reais de performance, acessibilidade e design de sistemas com rigor técnico."
            footer="REST APIs, SSR, Visualização 3D"
            icon={<RocketIcon className="size-5" />}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="rounded-xl border border-border bg-surface p-8 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-primary">Stack analítico</p>
              <h2 className="mt-1 text-xl font-semibold text-foreground">Tecnologias &amp; Habilidades</h2>
            </div>
            <p className="max-w-md text-xs leading-5 text-foreground">
              Ferramentas e frameworks utilizados em projetos pessoais, acadêmicos e arquiteturas web experimentais.
            </p>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Backend", "PHP", "Lógica server-side & POO"],
              ["Core Web", "JavaScript", "ES6+, DOM & Assíncrono"],
              ["Type Safety", "TypeScript", "Tipagem estática & Interfaces"],
              ["Frontend", "React", "Hooks, State & Componentes"],
              ["Framework", "Next.js", "SSR, SSG & App Router"],
              ["Framework", "Laravel", "MVC, Eloquent & Migrations"],
              ["Integração", "APIs RESTful", "Consumo, JSON & Endpoints"],
              ["DevOps • Controle", "Git", "Versionamento & Gitflow"],
              ["Containers", "Docker", "Ambientes isolados & Compose"],
              ["Estilização", "Tailwind CSS", "Design Tokens & Responsivo"],
              ["Back-end", "Java", "Programação orientada a objetos", "Spring Boot & Hibernate"],
              ["Banco de Dados", "MySQL", "Modelagem relacional & Queries"],
              ["Banco de Dados", "PostgreSQL", "Modelagem relacional & Queries"],
              ["UX/UI", "Figma", "Prototipagem & Design de interfaces"],
              ["Framework", "Spring Boot", "Desenvolvimento de aplicações web com Spring Boot"]
            ].map(([label, title, description]) => (
              <div key={title + label} className="min-w-0 rounded-lg bg-surface-elevated p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-primary">{label}</p>
                <h3 className="mt-1 text-sm font-medium text-foreground">{title}</h3>
                <p className="mt-1 text-xs text-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="grid gap-8 rounded-xl border border-border bg-surface p-8 lg:grid-cols-[260px_1fr] lg:items-center lg:px-10">
          <div className="mx-auto flex size-48 items-center justify-center rounded-full border border-secondary/50 bg-background p-5 text-secondary">
            <OrbitIcon aria-hidden="true" className="size-full" />
          </div>
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-primary">
              <OrbitIcon aria-hidden="true" className="size-4" />
              Projeto principal em destaque
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground">Terra em Movimento</h2>
            <p className="mt-1 text-lg text-secondary">Cartografia Orbital • Monitoramento Planetário Interativo</p>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-foreground">
              Aplicação desenvolvida para demonstrar proficiência em tecnologias modernas, combinando Next.js, arquitetura de componentes modulares e visualização 3D de dados esféricos. O projeto oferece navegação por camadas tectônicas, correntes atmosféricas e telemetria de países em tempo real com estética de console científico.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                <Link href="/">
                  visualizar globo 3d
                </Link>
                <span aria-hidden="true">→</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-md bg-surface-elevated px-4 py-2 text-xs font-semibold text-foreground">
                <BookIcon aria-hidden="true" className="size-4" />
                <a href="https://github.com/ELTAILS/terra_em_movimento" target="_blank" rel="noopener noreferrer">
                  Código-fonte
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-xl border border-border bg-surface p-8 lg:px-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-primary">Canais de comunicação</p>
            <h2 className="mt-1 text-xl font-semibold text-foreground">Vamos construir algo incrível juntos?</h2>
            <p className="mt-2 max-w-2xl text-sm text-foreground">
              Estou aberto a novas oportunidades de estágio, projetos colaborativos, feedback técnico e troca de conhecimentos na área de desenvolvimento de software.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-foreground">
            <span className="inline-flex items-center gap-2 rounded-md bg-surface-elevated px-3 py-2">
              <CodeIcon aria-hidden="true" className="size-4 text-primary" />
              <a href="https://github.com/ELTAILS" target="_blank" rel="noopener noreferrer">
                GitHub /perfil
              </a>
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-surface-elevated px-3 py-2">
              <WindowIcon aria-hidden="true" className="size-4 text-secondary" />
              <a href="https://www.linkedin.com/in/wagnerjr/" target="_blank" rel="noopener noreferrer">
                LinkedIn /in
              </a>
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-surface-elevated px-3 py-2">
              <MailIcon aria-hidden="true" className="size-4 text-primary" />
              <a href="mailto:wagner306jr@gmail.com" target="_blank" rel="noopener noreferrer">
                E-mail de Contato
              </a>
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-surface-elevated px-3 py-2">
              <CodeIcon aria-hidden="true" className="size-4 text-primary" />
              <a href="https://gitlab.com/ELTAILS" target="_blank" rel="noopener noreferrer">
                gitlab /perfil
              </a>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}