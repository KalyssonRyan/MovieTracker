import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#141414] text-zinc-200">
      {/* NAVBAR */}
      <div className="flex justify-center sticky top-6 z-50">
        <nav className="backdrop-blur-xl bg-white/5 border border-yellow-400/20 shadow-lg shadow-yellow-500/5 rounded-full px-3 py-2 flex gap-2">
          {[
            { to: "/", label: "Home" },
            { to: "/movies", label: "Filmes" },
            { to: "/create", label: "Adicionar" },
            { to: "/search", label: "Busca" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-yellow-400 text-black shadow-md shadow-yellow-500/30"
                    : "text-zinc-400 hover:text-yellow-300 hover:bg-white/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* CONTEÚDO */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
