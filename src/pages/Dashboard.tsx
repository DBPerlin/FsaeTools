import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Package, AlertTriangle, TrendingUp, Archive } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  // Dados mockados para os gráficos
  const categoryData = [
    { name: "Mecânica", value: 45 },
    { name: "Eletrônica", value: 32 },
    { name: "Aerodinâmica", value: 28 },
    { name: "Freios", value: 19 },
    { name: "Suspensão", value: 24 },
  ];

  const stockTrend = [
    { month: "Jan", items: 120 },
    { month: "Fev", items: 132 },
    { month: "Mar", items: 141 },
    { month: "Abr", items: 148 },
    { month: "Mai", items: 145 },
    { month: "Jun", items: 152 },
  ];

  const COLORS = ["hsl(142 76% 36%)", "hsl(142 76% 46%)", "hsl(142 50% 56%)", "hsl(142 40% 66%)", "hsl(142 30% 76%)"];

  const stats = [
    {
      title: "Total de Itens",
      value: "148",
      icon: Package,
      change: "+12% este mês",
      color: "text-success",
    },
    {
      title: "Itens Críticos",
      value: "8",
      icon: AlertTriangle,
      change: "Baixo estoque",
      color: "text-warning",
    },
    {
      title: "Valor Total",
      value: "R$ 47.2K",
      icon: TrendingUp,
      change: "+8.2% este mês",
      color: "text-success",
    },
    {
      title: "Categorias",
      value: "12",
      icon: Archive,
      change: "Ativas",
      color: "text-info",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do inventário da equipe SAE</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border shadow-md hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <p className={`text-xs ${stat.color}`}>{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-foreground">Itens por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-foreground">Distribuição de Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-foreground">Evolução do Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stockTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="items" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
