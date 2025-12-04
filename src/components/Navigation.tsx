import { NavLink } from "./NavLink";
import { LayoutDashboard, Package, Plus } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">FSAE Tools</h1>
                <p className="text-xs text-muted-foreground">Gestão de Estoque</p>
              </div>
            </div>
            
            <div className="flex gap-1">
              <NavLink
                to="/"
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                activeClassName="bg-secondary text-secondary-foreground"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </div>
              </NavLink>
              
              <NavLink
                to="/inventory"
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                activeClassName="bg-secondary text-secondary-foreground"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Inventário
                </div>
              </NavLink>
              
              <NavLink
                to="/add-item"
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                activeClassName="bg-secondary text-secondary-foreground"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Adicionar Item
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
