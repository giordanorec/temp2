import { MapPin, Users, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight text-lg">RECIFE-NANTES</span>
          </div>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="/mapa" className="hover:text-foreground transition-colors">Mapa</a>
            <a href="/mapa" className="hover:text-foreground transition-colors">Diretorio</a>
            <a href="/mapa" className="hover:text-foreground transition-colors">Agenda</a>
            <a href="/mapa" className="hover:text-foreground transition-colors">Documentos</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-24 sm:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                Cooperacao Internacional
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Conectando Recife e Nantes
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Plataforma de suporte a cooperacao institucional entre as cidades de
              Recife e Nantes. Mapeie atores, descubra conexoes e fortaleca a rede
              de colaboracao.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/mapa"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
              >
                Explorar o Mapa
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/diretorio"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Ver Diretorio
                <Users className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-border/50 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Mapa de Atores</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Visualize todos os atores da cooperacao e suas conexoes em um
                  mapa interativo.
                </p>
              </div>
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Diretorio</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Encontre pessoas, instituicoes e empresas envolvidas na
                  cooperacao entre as duas cidades.
                </p>
              </div>
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Documentos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acesse e compartilhe documentos, agendas e apresentacoes
                  relacionados a cooperacao.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          RECIFE-NANTES &mdash; Cooperacao Internacional
        </div>
      </footer>
    </div>
  )
}
