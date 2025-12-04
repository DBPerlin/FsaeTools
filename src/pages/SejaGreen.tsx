import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Recycle, Cpu, Wrench, Gift, Trophy, Leaf } from "lucide-react";
import { useState } from "react";

interface CollectionPoint {
  id: string;
  name: string;
  type: "plastic" | "electronic" | "metal";
  location: string;
  coordinates: { x: number; y: number };
}

interface Reward {
  id: string;
  name: string;
  pointsCost: number;
  description: string;
  available: boolean;
}

const collectionPoints: CollectionPoint[] = [
  { id: "1", name: "Ponto Plásticos A", type: "plastic", location: "Pavilhão Principal", coordinates: { x: 25, y: 30 } },
  { id: "2", name: "Ponto Eletrônicos", type: "electronic", location: "Área Técnica", coordinates: { x: 60, y: 45 } },
  { id: "3", name: "Ponto Metais A", type: "metal", location: "Box de Manutenção", coordinates: { x: 40, y: 70 } },
  { id: "4", name: "Ponto Plásticos B", type: "plastic", location: "Entrada Sul", coordinates: { x: 75, y: 25 } },
  { id: "5", name: "Ponto Metais B", type: "metal", location: "Área de Descarte", coordinates: { x: 20, y: 60 } },
  { id: "6", name: "Ponto Eletrônicos B", type: "electronic", location: "Laboratório", coordinates: { x: 85, y: 65 } },
];

const rewards: Reward[] = [
  { id: "1", name: "Snack Box", pointsCost: 10, description: "Uma caixa com diversos snacks", available: true },
  { id: "2", name: "Camiseta SAE", pointsCost: 25, description: "Camiseta oficial do evento", available: true },
  { id: "3", name: "Kit Ferramentas", pointsCost: 50, description: "Kit básico de ferramentas", available: true },
  { id: "4", name: "Ingresso VIP", pointsCost: 100, description: "Acesso VIP às áreas restritas", available: false },
];

const typeConfig = {
  plastic: { icon: Recycle, color: "bg-blue-500", label: "Plástico", bgLight: "bg-blue-500/20" },
  electronic: { icon: Cpu, color: "bg-amber-500", label: "Eletrônico", bgLight: "bg-amber-500/20" },
  metal: { icon: Wrench, color: "bg-slate-500", label: "Metal", bgLight: "bg-slate-500/20" },
};

const SejaGreen = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [teamPoints] = useState(35);
  const nextRewardPoints = 50;

  const filteredPoints = selectedType 
    ? collectionPoints.filter(p => p.type === selectedType)
    : collectionPoints;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Seja Green</h1>
              <p className="text-muted-foreground">Descarte consciente, ganhe recompensas</p>
            </div>
          </div>
        </div>

        {/* Points Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pontos da Equipe</p>
                  <p className="text-4xl font-bold text-primary">{teamPoints}</p>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Próxima recompensa</span>
                  <span className="text-foreground font-medium">{teamPoints}/{nextRewardPoints} pts</span>
                </div>
                <Progress value={(teamPoints / nextRewardPoints) * 100} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Mapa de Pontos de Coleta
                </CardTitle>
                <CardDescription>
                  Clique nos filtros para visualizar pontos específicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button
                    variant={selectedType === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(null)}
                  >
                    Todos
                  </Button>
                  {Object.entries(typeConfig).map(([type, config]) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className="gap-2"
                    >
                      <config.icon className="w-4 h-4" />
                      {config.label}
                    </Button>
                  ))}
                </div>

                {/* Visual Map */}
                <div className="relative w-full h-80 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-border overflow-hidden">
                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(10)].map((_, i) => (
                      <div key={`h-${i}`} className="absolute w-full h-px bg-primary" style={{ top: `${i * 10}%` }} />
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <div key={`v-${i}`} className="absolute h-full w-px bg-primary" style={{ left: `${i * 10}%` }} />
                    ))}
                  </div>

                  {/* Map labels */}
                  <div className="absolute top-4 left-4 text-xs text-muted-foreground font-medium">
                    Arena Fórmula SAE Brasil
                  </div>

                  {/* Collection points */}
                  {filteredPoints.map((point) => {
                    const config = typeConfig[point.type];
                    const Icon = config.icon;
                    return (
                      <div
                        key={point.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                        style={{ left: `${point.coordinates.x}%`, top: `${point.coordinates.y}%` }}
                      >
                        <div className={`w-10 h-10 rounded-full ${config.color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded-lg p-2 shadow-lg whitespace-nowrap z-10">
                          <p className="font-medium text-sm text-foreground">{point.name}</p>
                          <p className="text-xs text-muted-foreground">{point.location}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
                  {Object.entries(typeConfig).map(([type, config]) => (
                    <div key={type} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${config.color}`} />
                      <span className="text-sm text-muted-foreground">{config.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How it works */}
            <Card>
              <CardHeader>
                <CardTitle>Como Funciona?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-xl font-bold text-primary">1</span>
                    </div>
                    <h4 className="font-medium text-foreground mb-1">Separe</h4>
                    <p className="text-sm text-muted-foreground">Separe plásticos, eletrônicos e metais corretamente</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-xl font-bold text-primary">2</span>
                    </div>
                    <h4 className="font-medium text-foreground mb-1">Descarte</h4>
                    <p className="text-sm text-muted-foreground">Leve aos pontos de coleta indicados no mapa</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-xl font-bold text-primary">3</span>
                    </div>
                    <h4 className="font-medium text-foreground mb-1">Ganhe</h4>
                    <p className="text-sm text-muted-foreground">Acumule pontos e troque por recompensas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rewards Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Recompensas
                </CardTitle>
                <CardDescription>
                  Troque seus pontos por prêmios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`p-4 rounded-lg border transition-all ${
                      reward.available && teamPoints >= reward.pointsCost
                        ? "border-primary/30 bg-primary/5 hover:bg-primary/10"
                        : "border-border bg-muted/30"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-foreground">{reward.name}</h4>
                      <Badge variant={teamPoints >= reward.pointsCost ? "default" : "secondary"}>
                        {reward.pointsCost} pts
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                    <Button
                      size="sm"
                      className="w-full"
                      disabled={!reward.available || teamPoints < reward.pointsCost}
                    >
                      {!reward.available
                        ? "Indisponível"
                        : teamPoints < reward.pointsCost
                        ? `Faltam ${reward.pointsCost - teamPoints} pts`
                        : "Resgatar"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Points breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pontos por Material</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(typeConfig).map(([type, config]) => {
                  const Icon = config.icon;
                  const points = type === "electronic" ? 3 : type === "metal" ? 2 : 1;
                  return (
                    <div key={type} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${config.bgLight} flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${config.color.replace('bg-', 'text-')}`} />
                        </div>
                        <span className="text-sm font-medium text-foreground">{config.label}</span>
                      </div>
                      <span className="text-sm font-bold text-primary">+{points} pt{points > 1 ? "s" : ""}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SejaGreen;
