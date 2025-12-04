import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Package as PackageIcon, Pencil } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  expiryDate: string;
  acquisitionDate: string;
  status: "ok" | "low" | "critical";
}

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Dados mockados
  const mockItems: InventoryItem[] = [
    { id: 1, name: "Pneus Hoosier R25B", category: "Mecânica", quantity: 12, expiryDate: "2025-12-31", acquisitionDate: "2024-01-15", status: "ok" },
    { id: 2, name: "ECU MoTeC M150", category: "Eletrônica", quantity: 2, expiryDate: "2026-06-30", acquisitionDate: "2024-03-20", status: "ok" },
    { id: 3, name: "Freios AP Racing", category: "Freios", quantity: 4, expiryDate: "2025-12-23", acquisitionDate: "2024-02-10", status: "low" },
    { id: 4, name: "Asa Dianteira Carbono", category: "Aerodinâmica", quantity: 1, expiryDate: "2025-12-18", acquisitionDate: "2024-05-05", status: "critical" },
    { id: 5, name: "Amortecedores Öhlins", category: "Suspensão", quantity: 8, expiryDate: "2026-03-30", acquisitionDate: "2024-04-12", status: "ok" },
    { id: 6, name: "Sensores de Temperatura", category: "Eletrônica", quantity: 15, expiryDate: "2025-11-20", acquisitionDate: "2024-01-28", status: "ok" },
    { id: 7, name: "Corrente de Transmissão", category: "Mecânica", quantity: 3, expiryDate: "2025-12-21", acquisitionDate: "2024-03-15", status: "low" },
    { id: 8, name: "Discos de Freio", category: "Freios", quantity: 6, expiryDate: "2025-07-25", acquisitionDate: "2024-02-20", status: "ok" },
  ];

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok": return "bg-success/10 text-success border-success/20";
      case "low": return "bg-warning/10 text-warning border-warning/20";
      case "critical": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ok": return "OK";
      case "low": return "Alerta";
      case "critical": return "Crítico";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Inventário</h1>
          <p className="text-muted-foreground">Gerencie e filtre os itens do estoque</p>
        </div>

        <Card className="border-border shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              Filtros e Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar itens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  <SelectItem value="Mecânica">Mecânica</SelectItem>
                  <SelectItem value="Eletrônica">Eletrônica</SelectItem>
                  <SelectItem value="Aerodinâmica">Aerodinâmica</SelectItem>
                  <SelectItem value="Freios">Freios</SelectItem>
                  <SelectItem value="Suspensão">Suspensão</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome</SelectItem>
                  <SelectItem value="quantity">Quantidade</SelectItem>
                  <SelectItem value="expiryDate">Data de Validade</SelectItem>
                  <SelectItem value="acquisitionDate">Data de Aquisição</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <PackageIcon className="w-5 h-5 text-primary" />
              Lista de Itens ({filteredItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-center">Quantidade</TableHead>
                    <TableHead>Data de Validade</TableHead>
                    <TableHead>Data de Aquisição</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-accent/50 transition-colors">
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-primary/20 text-primary">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-semibold">{item.quantity}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.expiryDate).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.acquisitionDate).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusText(item.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                          onClick={() => console.log("Editar item:", item.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Inventory;