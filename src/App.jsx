import { useState, useEffect } from "react";

// ─── DADOS ─────────────────────────────────────────────────────────────────────
const VEICULOS = [
  {
    id: 1,
    modelo: "Renault Logan",
    placa: "QWA3D60",
    combustivel: "Gasolina Comum",
  },
  { id: 2, modelo: "L200 Triton", placa: "MWB8E18", combustivel: "Diesel S10" },
];
const COMBUSTIVEIS = [
  { id: 1, nome: "Gasolina Comum", precoMedio: 7.07, limiteTotal: 1440 },
  { id: 2, nome: "Diesel S10", precoMedio: 7.15, limiteTotal: 2880 },
];
const DOTACOES = [
  {
    codigo: "2037.339030",
    descricao: "Recursos Próprio",
    ficha: "214",
    percentual: 40,
    fonte: "1.500.0000.000000",
  },
  {
    codigo: "2040.339030",
    descricao: "Transferência SUAS – Conv. Assistência Social",
    ficha: "228",
    percentual: 15,
    fonte: "1.660.0000.000000",
  },
  {
    codigo: "2032.339030",
    descricao: "Transferência do SUAS",
    ficha: "204",
    percentual: 15,
    fonte: "1.660.0000.000000",
  },
  {
    codigo: "2060.339030",
    descricao: "Transferência do SUAS",
    ficha: "240",
    percentual: 15,
    fonte: "1.660.0000.000000",
  },
  {
    codigo: "Outros",
    descricao: "Outros",
    ficha: "-",
    percentual: 15,
    fonte: "-",
  },
];
const MOTORISTAS = [
  "Mario Pereira da Silva",
  "Emerson Jonhnnatan Araujo da Silva",
];
const VALOR_TOTAL_CONTRATO = 30801.6;
const MODULOS = [
  {
    id: "combustivel",
    icon: "⛽",
    titulo: "Frota de Combustível",
    descricao:
      "Gestão de abastecimentos, controle de litros, dotações orçamentárias e relatórios por veículo.",
    status: "ativo",
    cor: "#1e88e5",
    grad: "linear-gradient(135deg, #0d47a1, #1e88e5)",
    tags: ["Abastecimentos", "Veículos", "Dotações", "Relatórios"],
  },
  {
    id: "gas",
    icon: "🟤",
    titulo: "Frota de Gás",
    descricao:
      "Controle de recargas de gás, consumo por veículo, fornecedores e dotações orçamentárias.",
    status: "breve",
    cor: "#fb8c00",
    grad: "linear-gradient(135deg, #e65100, #fb8c00)",
    tags: ["Recargas", "Consumo", "Fornecedores", "Dotações"],
  },
  {
    id: "lavajato",
    icon: "🚿",
    titulo: "Frota de Lava Jato",
    descricao:
      "Registro de lavagens, tipos de serviço, histórico por veículo e controle de gastos com higienização.",
    status: "breve",
    cor: "#00897b",
    grad: "linear-gradient(135deg, #004d40, #00897b)",
    tags: ["Lavagens", "Higienização", "Histórico", "Gastos"],
  },
  {
    id: "lanche",
    icon: "🍱",
    titulo: "Frota de Lanche",
    descricao:
      "Controle de despesas com alimentação dos motoristas, diárias de lanche e relatórios por período.",
    status: "breve",
    cor: "#8e24aa",
    grad: "linear-gradient(135deg, #4a148c, #8e24aa)",
    tags: ["Alimentação", "Motoristas", "Diárias", "Relatórios"],
  },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────
const fmt = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const fmtN = (v, d = 2) =>
  v.toLocaleString("pt-BR", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
const hoje = () => new Date().toISOString().split("T")[0];

function useLS(key, init) {
  const [v, sv] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : init;
    } catch {
      return init;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {}
  }, [key, v]);
  return [v, sv];
}

const lbl = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#78909c",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: 0.4,
};
const inp = {
  width: "100%",
  background: "#0f1923",
  border: "1px solid #1e3448",
  borderRadius: 8,
  color: "#e8edf3",
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: "'Sora', sans-serif",
  boxSizing: "border-box",
  outline: "none",
};
const errStyle = {
  fontSize: 11,
  color: "#ef9a9a",
  marginTop: 4,
  display: "block",
};

// ══════════════════════════════════════════════════════════════════════════════
// TELA LOGIN
// ══════════════════════════════════════════════════════════════════════════════
function TelaLogin({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  function handleLogin() {
    if (!user || !pass) {
      setErro("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    const USUARIOS = [
      { login: "alexandre", nome: "Alexandre", perfil: "Administrador" },
      { login: "isabela", nome: "Isabela", perfil: "Administrador" },
      { login: "ricardo", nome: "Ricardo", perfil: "Administrador" },
      { login: "joão lucas", nome: "João Lucas", perfil: "Administrador" },
    ];
    setTimeout(() => {
      const found = USUARIOS.find((u) => u.login === user.toLowerCase().trim());
      if (found && pass === "admin123") {
        onLogin({ nome: found.nome, perfil: found.perfil });
      } else {
        setErro("Usuário ou senha incorretos.");
        setLoading(false);
      }
    }, 900);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#0a1520",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Sora', sans-serif",
        margin: 0,
        padding: 0,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <div style={{ width: "100%", maxWidth: 420, padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #1565c0, #1e88e5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              margin: "0 auto 16px",
              boxShadow: "0 8px 32px rgba(30,136,229,.35)",
            }}
          >
            🏛️
          </div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#e3f2fd",
              margin: 0,
            }}
          >
            FMAS
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "#546e7a",
              margin: "6px 0 0",
              fontWeight: 300,
            }}
          >
            Fundo Municipal de Assistência Social
            <br />
            Aliança do Tocantins
          </p>
        </div>
        <div
          style={{
            background: "linear-gradient(160deg, #1a2a3a, #162030)",
            border: "1px solid #1e3448",
            borderRadius: 20,
            padding: "36px 32px",
            boxShadow: "0 24px 64px rgba(0,0,0,.5)",
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#90caf9",
              margin: "0 0 28px",
              textAlign: "center",
            }}
          >
            Acesso ao Sistema
          </h2>
          <div style={{ marginBottom: 18 }}>
            <label style={lbl}>Usuário</label>
            <input
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                setErro("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Digite seu usuário"
              style={inp}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={lbl}>Senha</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setErro("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Digite sua senha"
                style={{ ...inp, paddingRight: 40 }}
              />
              <button
                onClick={() => setShowPass((p) => !p)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                  opacity: 0.5,
                  color: "#e3f2fd",
                }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          {erro && (
            <div
              style={{
                background: "rgba(229,57,53,.12)",
                border: "1px solid rgba(229,57,53,.25)",
                borderRadius: 8,
                padding: "10px 14px",
                color: "#ef9a9a",
                fontSize: 13,
                marginBottom: 18,
                textAlign: "center",
              }}
            >
              ⚠️ {erro}
            </div>
          )}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              background: loading
                ? "#1a3a5c"
                : "linear-gradient(135deg, #1565c0, #1e88e5)",
              border: "none",
              borderRadius: 12,
              color: "#fff",
              padding: "14px",
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {loading ? "🔄 Verificando..." : "🔐 Entrar"}
          </button>
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#37474f",
            marginTop: 20,
          }}
        >
          Sistema de Gestão de Frotas · Termo Nº 003/2026
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TELA MÓDULOS
// ══════════════════════════════════════════════════════════════════════════════
function TelaModulos({ usuario, onSelecionar, onLogout }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#0a1520",
        fontFamily: "'Sora', sans-serif",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <header
        style={{
          background: "linear-gradient(135deg, #0a3d62, #1a5276, #0e2a45)",
          borderBottom: "2px solid #1e88e5",
          padding: "0 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "linear-gradient(135deg, #1e88e5, #0d47a1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              🏛️
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#e3f2fd" }}>
                FMAS – Aliança do Tocantins
              </div>
              <div style={{ fontSize: 11, color: "#64b5f6", fontWeight: 300 }}>
                Sistema de Gestão Municipal
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#90caf9" }}>
                👋 Olá, {usuario.nome}
              </div>
              <div style={{ fontSize: 11, color: "#546e7a" }}>
                {usuario.perfil}
              </div>
            </div>
            <button
              onClick={onLogout}
              style={{
                background: "rgba(229,57,53,.15)",
                border: "1px solid rgba(229,57,53,.25)",
                color: "#ef9a9a",
                borderRadius: 8,
                padding: "8px 14px",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#e3f2fd",
              margin: "0 0 10px",
            }}
          >
            Selecione o Módulo
          </h1>
          <p style={{ fontSize: 14, color: "#546e7a", margin: 0 }}>
            Escolha o sistema que deseja acessar.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {MODULOS.map((m) => (
            <div
              key={m.id}
              onClick={() => m.status === "ativo" && onSelecionar(m.id)}
              style={{
                background: "linear-gradient(160deg, #1a2a3a, #162030)",
                border: `1px solid ${m.cor}${m.status === "ativo" ? "44" : "22"}`,
                borderRadius: 20,
                padding: "32px 28px",
                cursor: m.status === "ativo" ? "pointer" : "default",
                opacity: m.status === "ativo" ? 1 : 0.6,
                position: "relative",
                overflow: "hidden",
                transition: "all .25s",
              }}
              onMouseEnter={(e) => {
                if (m.status === "ativo") {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 16px 48px ${m.cor}22`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {m.status === "breve" && (
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 18,
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.1)",
                    color: "#78909c",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 20,
                    textTransform: "uppercase",
                  }}
                >
                  Em Breve
                </div>
              )}
              {m.status === "ativo" && (
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 18,
                    background: "rgba(67,160,71,.15)",
                    border: "1px solid rgba(67,160,71,.3)",
                    color: "#a5d6a7",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 20,
                    textTransform: "uppercase",
                  }}
                >
                  ● Ativo
                </div>
              )}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: m.grad,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 30,
                  marginBottom: 20,
                  boxShadow: `0 8px 24px ${m.cor}33`,
                }}
              >
                {m.icon}
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#e3f2fd",
                  margin: "0 0 10px",
                }}
              >
                {m.titulo}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "#78909c",
                  margin: "0 0 20px",
                  lineHeight: 1.6,
                }}
              >
                {m.descricao}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {m.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: `${m.cor}18`,
                      border: `1px solid ${m.cor}33`,
                      color: "#90caf9",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: 6,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              {m.status === "ativo" && (
                <div
                  style={{
                    marginTop: 22,
                    color: m.cor,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Acessar módulo →
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO COMBUSTÍVEL
// ══════════════════════════════════════════════════════════════════════════════
function ModuloCombustivel({ usuario, onVoltar }) {
  const [aba, setAba] = useState("dashboard");
  const [abastecimentos, setAbastecimentos] = useLS("fmas_abast", []);
  const formInicial = {
    data: hoje(),
    veiculo: "",
    motorista: "",
    combustivel: "",
    litros: "",
    km: "",
    dotacao: "",
    valorPago: "",
    obs: "",
  };
  const [form, setForm] = useState(formInicial);
  const [erro, setErro] = useState({});
  const [sucesso, setSucesso] = useState(false);
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroVeiculo, setFiltroVeiculo] = useState("");
  const [modalBackup, setModalBackup] = useState(false);
  const [backupJson, setBackupJson] = useState("");
  const [modalExcluir, setModalExcluir] = useState(null); // guarda o id a excluir

  const totalGasto = abastecimentos.reduce((s, a) => s + a.valor, 0);
  const totalLitros = abastecimentos.reduce((s, a) => s + a.litros, 0);
  const saldoRestante = VALOR_TOTAL_CONTRATO - totalGasto;

  const porCombustivel = COMBUSTIVEIS.map((c) => {
    const r = abastecimentos.filter((a) => a.combustivel === c.nome);
    const litrosUsados = r.reduce((s, a) => s + a.litros, 0);
    return {
      ...c,
      litrosUsados,
      valorGasto: r.reduce((s, a) => s + a.valor, 0),
      percentual: (litrosUsados / c.limiteTotal) * 100,
    };
  });

  const porVeiculo = VEICULOS.map((v) => {
    const r = abastecimentos.filter((a) => a.veiculo === v.modelo);
    return {
      ...v,
      registros: r.length,
      valorTotal: r.reduce((s, a) => s + a.valor, 0),
      litrosTotal: r.reduce((s, a) => s + a.litros, 0),
    };
  });

  const abastFiltrados = abastecimentos
    .filter(
      (a) =>
        (filtroMes ? a.data.slice(0, 7) === filtroMes : true) &&
        (filtroVeiculo ? a.veiculo === filtroVeiculo : true),
    )
    .sort((a, b) => b.data.localeCompare(a.data));

  function salvar() {
    const e = {};
    if (!form.data) e.data = "Obrigatório";
    if (!form.veiculo) e.veiculo = "Selecione o veículo";
    if (!form.motorista) e.motorista = "Informe o motorista";
    if (!form.combustivel) e.combustivel = "Selecione o combustível";
    if (!form.litros || isNaN(form.litros) || +form.litros <= 0)
      e.litros = "Quantidade inválida";
    if (!form.km || isNaN(form.km) || +form.km <= 0) e.km = "KM inválido";
    if (!form.dotacao) e.dotacao = "Selecione a dotação";
    if (!form.valorPago || isNaN(form.valorPago) || +form.valorPago <= 0)
      e.valorPago = "Informe o valor pago";
    if (Object.keys(e).length) {
      setErro(e);
      return;
    }
    const c = COMBUSTIVEIS.find((x) => form.combustivel.startsWith(x.nome));
    const novoReg = {
      id: Date.now(),
      data: form.data,
      veiculo: form.veiculo,
      motorista: form.motorista,
      combustivel: form.combustivel,
      litros: +form.litros,
      km: +form.km,
      dotacao: form.dotacao,
      obs: form.obs,
      precoUnitario: c ? c.precoMedio : 0,
      valor: +form.valorPago,
    };
    setAbastecimentos((p) => [novoReg, ...p]);
    setForm(formInicial);
    setErro({});
    setSucesso(true);
    setTimeout(() => setSucesso(false), 3000);
  }

  function excluir(id) {
    setModalExcluir(id);
  }
  const pct = (v, t) => Math.min(100, Math.round((v / t) * 100));

  function abrirBackup() {
    const json = JSON.stringify(
      { versao: "1.0", exportadoEm: new Date().toISOString(), abastecimentos },
      null,
      2,
    );
    setBackupJson(json);
    setModalBackup(true);
  }

  function importar(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const dados = parsed.abastecimentos ?? parsed;
        if (!Array.isArray(dados)) {
          alert("❌ Arquivo inválido.");
          return;
        }
        if (
          confirm(
            `Importar ${dados.length} registro(s)?\n\nIsso irá SUBSTITUIR os dados atuais.`,
          )
        ) {
          setAbastecimentos(dados);
          alert("✅ Dados importados com sucesso!");
        }
      } catch {
        alert("❌ Erro ao ler o arquivo JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div
      style={{
        fontFamily: "'Sora', sans-serif",
        background: "#0f1923",
        minHeight: "100vh",
        width: "100vw",
        color: "#e8edf3",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Modal Excluir */}
      {modalExcluir && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.75)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            style={{
              background: "#1a2a3a",
              border: "1px solid #e5393544",
              borderRadius: 16,
              width: "100%",
              maxWidth: 400,
              padding: "32px 28px",
              fontFamily: "'Sora', sans-serif",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🗑️</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 17,
                color: "#e3f2fd",
                marginBottom: 10,
              }}
            >
              Excluir registro?
            </div>
            <div style={{ fontSize: 13, color: "#78909c", marginBottom: 28 }}>
              Esta ação não pode ser desfeita. O abastecimento será removido
              permanentemente.
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setModalExcluir(null)}
                style={{
                  flex: 1,
                  background: "#263238",
                  border: "1px solid #37474f",
                  borderRadius: 10,
                  color: "#90a4ae",
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setAbastecimentos((p) =>
                    p.filter((a) => a.id !== modalExcluir),
                  );
                  setModalExcluir(null);
                }}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #b71c1c, #e53935)",
                  border: "none",
                  borderRadius: 10,
                  color: "#fff",
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backup */}
      {modalBackup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.75)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            style={{
              background: "#1a2a3a",
              border: "1px solid #1e88e5",
              borderRadius: 16,
              width: "100%",
              maxWidth: 640,
              padding: "28px 28px 24px",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div>
                <div
                  style={{ fontWeight: 700, fontSize: 16, color: "#e3f2fd" }}
                >
                  📋 Backup dos Dados
                </div>
                <div style={{ fontSize: 12, color: "#78909c", marginTop: 4 }}>
                  Copie o texto abaixo e salve num arquivo{" "}
                  <b style={{ color: "#90caf9" }}>.json</b>
                </div>
              </div>
              <button
                onClick={() => setModalBackup(false)}
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid #37474f",
                  color: "#90a4ae",
                  borderRadius: 8,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: 14,
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                ✕
              </button>
            </div>
            <textarea
              readOnly
              value={backupJson}
              onClick={(e) => e.target.select()}
              style={{
                width: "100%",
                height: 260,
                background: "#0f1923",
                border: "1px solid #1e3448",
                borderRadius: 8,
                color: "#a5d6a7",
                fontSize: 11,
                fontFamily: "monospace",
                padding: 12,
                resize: "none",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button
                onClick={() =>
                  navigator.clipboard
                    .writeText(backupJson)
                    .then(() => alert("✅ Copiado!"))
                }
                style={{
                  flex: 1,
                  background: "#1a3a5c",
                  border: "1px solid #1e88e5",
                  borderRadius: 8,
                  color: "#90caf9",
                  padding: "11px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                📋 Copiar
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([backupJson], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `fmas_backup_${new Date().toISOString().slice(0, 10)}.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                }}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #1b5e20, #43a047)",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  padding: "11px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                ⬇️ Baixar .json
              </button>
              <button
                onClick={() => setModalBackup(false)}
                style={{
                  padding: "11px 20px",
                  background: "#263238",
                  border: "1px solid #37474f",
                  borderRadius: 8,
                  color: "#90a4ae",
                  cursor: "pointer",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 13,
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #0a3d62, #1a5276, #0e2a45)",
          borderBottom: "2px solid #1e88e5",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              onClick={onVoltar}
              style={{
                background: "rgba(30,136,229,.15)",
                border: "1px solid rgba(30,136,229,.3)",
                color: "#90caf9",
                borderRadius: 8,
                padding: "7px 14px",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
              }}
            >
              ← Módulos
            </button>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "linear-gradient(135deg, #1e88e5, #0d47a1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              ⛽
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                Frota de Combustível
              </div>
              <div style={{ fontSize: 11, color: "#90caf9", fontWeight: 300 }}>
                FMAS – Aliança do Tocantins · Termo Nº 003/2026
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                fontSize: 12,
                color: "#64b5f6",
                background: "rgba(30,136,229,.15)",
                padding: "6px 14px",
                borderRadius: 20,
                border: "1px solid rgba(30,136,229,.3)",
              }}
            >
              Contrato: {fmt(VALOR_TOTAL_CONTRATO)}
            </div>
            <button
              onClick={abrirBackup}
              style={{
                background: "rgba(67,160,71,.15)",
                border: "1px solid rgba(67,160,71,.3)",
                color: "#a5d6a7",
                borderRadius: 8,
                padding: "7px 14px",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              ⬇️ Backup
            </button>
            <label
              style={{
                background: "rgba(255,179,0,.12)",
                border: "1px solid rgba(255,179,0,.28)",
                color: "#ffe082",
                borderRadius: 8,
                padding: "7px 14px",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              ⬆️ Importar
              <input
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={importar}
              />
            </label>
          </div>
        </div>
        <nav
          style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 4 }}
        >
          {[
            { id: "dashboard", label: "📊 Dashboard" },
            { id: "abastecer", label: "⛽ Registrar" },
            { id: "historico", label: "📋 Histórico" },
            { id: "relatorio", label: "📈 Relatório" },
          ].map((n) => (
            <button
              key={n.id}
              onClick={() => setAba(n.id)}
              style={{
                background:
                  aba === n.id ? "rgba(30,136,229,.25)" : "transparent",
                border: "none",
                borderBottom:
                  aba === n.id ? "3px solid #1e88e5" : "3px solid transparent",
                color: aba === n.id ? "#90caf9" : "#78909c",
                cursor: "pointer",
                padding: "12px 20px",
                fontSize: 13,
                fontWeight: aba === n.id ? 600 : 400,
                fontFamily: "'Sora', sans-serif",
                transition: "all .2s",
              }}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px" }}>
        {/* DASHBOARD */}
        {aba === "dashboard" && (
          <div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                margin: "0 0 24px",
                color: "#e3f2fd",
              }}
            >
              Visão Geral
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
                marginBottom: 28,
              }}
            >
              {[
                {
                  label: "Valor Total Contrato",
                  valor: fmt(VALOR_TOTAL_CONTRATO),
                  icon: "📄",
                  cor: "#1e88e5",
                },
                {
                  label: "Total Gasto",
                  valor: fmt(totalGasto),
                  icon: "💸",
                  cor: "#e53935",
                },
                {
                  label: "Saldo Disponível",
                  valor: fmt(saldoRestante),
                  icon: "💰",
                  cor: saldoRestante > 5000 ? "#43a047" : "#fb8c00",
                },
                {
                  label: "Total de Litros",
                  valor: fmtN(totalLitros) + " L",
                  icon: "🔢",
                  cor: "#8e24aa",
                },
                {
                  label: "Abastecimentos",
                  valor: abastecimentos.length,
                  icon: "📝",
                  cor: "#00897b",
                },
              ].map((c) => (
                <div
                  key={c.label}
                  style={{
                    background: "linear-gradient(135deg, #1a2a3a, #1e3448)",
                    border: `1px solid ${c.cor}33`,
                    borderRadius: 14,
                    padding: "20px 22px",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: c.cor }}>
                    {c.valor}
                  </div>
                  <div style={{ fontSize: 12, color: "#78909c", marginTop: 4 }}>
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "#1a2a3a",
                border: "1px solid #1e3448",
                borderRadius: 14,
                padding: "22px 24px",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span style={{ fontWeight: 600, color: "#90caf9" }}>
                  Consumo do Contrato
                </span>
                <span style={{ fontSize: 13, color: "#78909c" }}>
                  {pct(totalGasto, VALOR_TOTAL_CONTRATO)}% utilizado
                </span>
              </div>
              <div
                style={{
                  background: "#0f1923",
                  borderRadius: 8,
                  height: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${pct(totalGasto, VALOR_TOTAL_CONTRATO)}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #1e88e5, #42a5f5)",
                    borderRadius: 8,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                  fontSize: 12,
                  color: "#546e7a",
                }}
              >
                <span>Gasto: {fmt(totalGasto)}</span>
                <span>Restante: {fmt(saldoRestante)}</span>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {porCombustivel.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: "#1a2a3a",
                    border: "1px solid #1e3448",
                    borderRadius: 14,
                    padding: "22px 24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 14,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>
                        {c.nome}
                      </div>
                      <div style={{ fontSize: 12, color: "#78909c" }}>
                        R$ {c.precoMedio}/L · Limite: {fmtN(c.limiteTotal, 0)} L
                      </div>
                    </div>
                    <div style={{ fontSize: 30 }}>
                      {c.id === 1 ? "🔵" : "🟡"}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    {[
                      ["Consumido", fmtN(c.litrosUsados) + " L", "#e3f2fd"],
                      ["Gasto", fmt(c.valorGasto), "#ef9a9a"],
                      [
                        "Restante",
                        fmtN(c.limiteTotal - c.litrosUsados) + " L",
                        "#a5d6a7",
                      ],
                    ].map(([l, v, cor]) => (
                      <div key={l} style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#546e7a",
                            marginBottom: 2,
                          }}
                        >
                          {l}
                        </div>
                        <div style={{ fontWeight: 700, color: cor }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      background: "#0f1923",
                      borderRadius: 6,
                      height: 8,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(100, c.percentual)}%`,
                        height: "100%",
                        background:
                          c.id === 1
                            ? "linear-gradient(90deg,#1565c0,#42a5f5)"
                            : "linear-gradient(90deg,#f57f17,#ffca28)",
                        borderRadius: 6,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      fontSize: 11,
                      color: "#546e7a",
                      marginTop: 4,
                    }}
                  >
                    {fmtN(c.percentual, 1)}%
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "#1a2a3a",
                border: "1px solid #1e3448",
                borderRadius: 14,
                padding: "22px 24px",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  marginBottom: 16,
                  color: "#90caf9",
                }}
              >
                Frota de Veículos
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {porVeiculo.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      background: "#0f1923",
                      borderRadius: 10,
                      padding: "16px 18px",
                      border: "1px solid #263238",
                    }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 8 }}>🚗</div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>
                      {v.modelo}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#546e7a",
                        marginBottom: 12,
                      }}
                    >
                      Placa: {v.placa} · {v.combustivel}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[
                        ["Abastec.", v.registros, "#e3f2fd"],
                        ["Litros", fmtN(v.litrosTotal), "#e3f2fd"],
                        ["Valor", fmt(v.valorTotal), "#ef9a9a"],
                      ].map(([l, val, cor]) => (
                        <div
                          key={l}
                          style={{
                            flex: 1,
                            background: "#1a2a3a",
                            borderRadius: 8,
                            padding: "10px",
                          }}
                        >
                          <div style={{ fontSize: 10, color: "#78909c" }}>
                            {l}
                          </div>
                          <div
                            style={{
                              fontWeight: 700,
                              color: cor,
                              fontSize: 13,
                            }}
                          >
                            {val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REGISTRAR */}
        {aba === "abastecer" && (
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                margin: "0 0 24px",
                color: "#e3f2fd",
              }}
            >
              ⛽ Registrar Abastecimento
            </h2>
            {sucesso && (
              <div
                style={{
                  background: "#1b5e20",
                  border: "1px solid #43a047",
                  borderRadius: 10,
                  padding: "14px 18px",
                  marginBottom: 20,
                  color: "#a5d6a7",
                  fontWeight: 600,
                }}
              >
                ✅ Abastecimento registrado com sucesso!
              </div>
            )}
            <div
              style={{
                background: "#1a2a3a",
                border: "1px solid #1e3448",
                borderRadius: 16,
                padding: "28px 30px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 18,
                }}
              >
                <div>
                  <label style={lbl}>Data *</label>
                  <input
                    type="date"
                    value={form.data}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, data: e.target.value }))
                    }
                    style={{
                      ...inp,
                      borderColor: erro.data ? "#e53935" : "#1e3448",
                    }}
                  />
                  {erro.data && <span style={errStyle}>{erro.data}</span>}
                </div>
                <div>
                  <label style={lbl}>Veículo *</label>
                  <select
                    value={form.veiculo}
                    onChange={(e) => {
                      const v = VEICULOS.find(
                        (x) => e.target.value === `${x.modelo} (${x.placa})`,
                      );
                      setForm((f) => ({
                        ...f,
                        veiculo: v ? v.modelo : "",
                        combustivel: v ? v.combustivel : "",
                      }));
                    }}
                    style={{
                      ...inp,
                      borderColor: erro.veiculo ? "#e53935" : "#1e3448",
                    }}
                  >
                    <option value="">Selecione...</option>
                    {VEICULOS.map((v) => (
                      <option key={v.id} value={`${v.modelo} (${v.placa})`}>
                        {v.modelo} ({v.placa})
                      </option>
                    ))}
                  </select>
                  {erro.veiculo && <span style={errStyle}>{erro.veiculo}</span>}
                </div>
                <div>
                  <label style={lbl}>Motorista *</label>
                  <select
                    value={form.motorista}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, motorista: e.target.value }))
                    }
                    style={{
                      ...inp,
                      borderColor: erro.motorista ? "#e53935" : "#1e3448",
                    }}
                  >
                    <option value="">Selecione...</option>
                    {MOTORISTAS.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  {erro.motorista && (
                    <span style={errStyle}>{erro.motorista}</span>
                  )}
                </div>
                <div>
                  <label style={lbl}>Combustível *</label>
                  <select
                    value={form.combustivel}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, combustivel: e.target.value }))
                    }
                    style={{
                      ...inp,
                      borderColor: erro.combustivel ? "#e53935" : "#1e3448",
                    }}
                  >
                    <option value="">Selecione...</option>
                    {COMBUSTIVEIS.map((c) => (
                      <option key={c.id} value={c.nome}>
                        {c.nome} – R$ {c.precoMedio}/L
                      </option>
                    ))}
                  </select>
                  {erro.combustivel && (
                    <span style={errStyle}>{erro.combustivel}</span>
                  )}
                </div>
                <div>
                  <label style={lbl}>Quantidade (Litros) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Ex: 45.00"
                    value={form.litros}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, litros: e.target.value }))
                    }
                    style={{
                      ...inp,
                      borderColor: erro.litros ? "#e53935" : "#1e3448",
                    }}
                  />
                  {erro.litros && <span style={errStyle}>{erro.litros}</span>}
                </div>
                <div>
                  <label style={lbl}>Quilometragem (KM) *</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Ex: 12345"
                    value={form.km}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, km: e.target.value }))
                    }
                    style={{
                      ...inp,
                      borderColor: erro.km ? "#e53935" : "#1e3448",
                    }}
                  />
                  {erro.km && <span style={errStyle}>{erro.km}</span>}
                </div>
                <div>
                  <label style={lbl}>Valor Pago (R$) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Ex: 319.50"
                    value={form.valorPago}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, valorPago: e.target.value }))
                    }
                    style={{
                      ...inp,
                      borderColor: erro.valorPago ? "#e53935" : "#1e3448",
                    }}
                  />
                  {erro.valorPago && (
                    <span style={errStyle}>{erro.valorPago}</span>
                  )}
                  {form.valorPago && form.litros && +form.litros > 0 && (
                    <span style={{ fontSize: 11, color: "#64b5f6" }}>
                      Preço/L efetivo: R${" "}
                      {(+form.valorPago / +form.litros).toFixed(3)}
                    </span>
                  )}
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={lbl}>Dotação Orçamentária *</label>
                  <select
                    value={form.dotacao}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, dotacao: e.target.value }))
                    }
                    style={{
                      ...inp,
                      borderColor: erro.dotacao ? "#e53935" : "#1e3448",
                    }}
                  >
                    <option value="">Selecione a dotação...</option>
                    {DOTACOES.map((d) => (
                      <option key={d.codigo} value={d.codigo}>
                        {d.codigo} – {d.descricao} ({d.percentual}%) – Ficha{" "}
                        {d.ficha}
                      </option>
                    ))}
                  </select>
                  {erro.dotacao && <span style={errStyle}>{erro.dotacao}</span>}
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={lbl}>Observações</label>
                  <textarea
                    rows={3}
                    placeholder="Informações adicionais..."
                    value={form.obs}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, obs: e.target.value }))
                    }
                    style={{ ...inp, resize: "vertical", minHeight: 70 }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button
                  onClick={salvar}
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #1565c0, #1e88e5)",
                    border: "none",
                    borderRadius: 10,
                    color: "#fff",
                    padding: 14,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  ✅ Registrar Abastecimento
                </button>
                <button
                  onClick={() => {
                    setForm(formInicial);
                    setErro({});
                  }}
                  style={{
                    padding: "14px 20px",
                    background: "#263238",
                    border: "1px solid #37474f",
                    borderRadius: 10,
                    color: "#90a4ae",
                    cursor: "pointer",
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  🔄 Limpar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HISTÓRICO */}
        {aba === "historico" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  margin: 0,
                  color: "#e3f2fd",
                }}
              >
                📋 Histórico
              </h2>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="month"
                  value={filtroMes}
                  onChange={(e) => setFiltroMes(e.target.value)}
                  style={{ ...inp, width: 160, padding: "8px 12px" }}
                />
                <select
                  value={filtroVeiculo}
                  onChange={(e) => setFiltroVeiculo(e.target.value)}
                  style={{ ...inp, width: 200, padding: "8px 12px" }}
                >
                  <option value="">Todos os veículos</option>
                  {VEICULOS.map((v) => (
                    <option key={v.id} value={v.modelo}>
                      {v.modelo}
                    </option>
                  ))}
                </select>
                {(filtroMes || filtroVeiculo) && (
                  <button
                    onClick={() => {
                      setFiltroMes("");
                      setFiltroVeiculo("");
                    }}
                    style={{
                      background: "#37474f",
                      border: "none",
                      borderRadius: 8,
                      color: "#90a4ae",
                      padding: "8px 14px",
                      cursor: "pointer",
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            {abastFiltrados.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#546e7a",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                <div>Nenhum abastecimento encontrado</div>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr style={{ background: "#0f1923" }}>
                      {[
                        "Data",
                        "Veículo",
                        "Motorista",
                        "Combustível",
                        "Litros",
                        "Valor",
                        "KM",
                        "Dotação",
                        "",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 14px",
                            textAlign: "left",
                            color: "#546e7a",
                            fontWeight: 600,
                            fontSize: 11,
                            textTransform: "uppercase",
                            borderBottom: "1px solid #1e3448",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {abastFiltrados.map((a, i) => (
                      <tr
                        key={a.id}
                        style={{
                          background: i % 2 === 0 ? "#1a2a3a" : "#192637",
                          borderBottom: "1px solid #1e3448",
                        }}
                      >
                        <td style={{ padding: "12px 14px" }}>
                          {a.data.split("-").reverse().join("/")}
                        </td>
                        <td style={{ padding: "12px 14px", fontWeight: 600 }}>
                          {a.veiculo}
                        </td>
                        <td style={{ padding: "12px 14px", color: "#90a4ae" }}>
                          {a.motorista}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <span
                            style={{
                              background:
                                a.combustivel === "Gasolina Comum"
                                  ? "rgba(21,101,192,.3)"
                                  : "rgba(245,127,23,.3)",
                              color:
                                a.combustivel === "Gasolina Comum"
                                  ? "#90caf9"
                                  : "#ffca28",
                              padding: "2px 8px",
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 600,
                            }}
                          >
                            {a.combustivel}
                          </span>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          {fmtN(a.litros)} L
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            fontWeight: 700,
                            color: "#ef9a9a",
                          }}
                        >
                          {fmt(a.valor)}
                        </td>
                        <td style={{ padding: "12px 14px", color: "#78909c" }}>
                          {Number(a.km).toLocaleString()}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            color: "#78909c",
                            fontSize: 11,
                          }}
                        >
                          {a.dotacao}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <button
                            onClick={() => excluir(a.id)}
                            style={{
                              background: "rgba(229,57,53,.15)",
                              border: "1px solid rgba(229,57,53,.3)",
                              color: "#ef9a9a",
                              borderRadius: 6,
                              padding: "4px 10px",
                              cursor: "pointer",
                              fontSize: 11,
                              fontFamily: "'Sora', sans-serif",
                            }}
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: "#0f1923", fontWeight: 700 }}>
                      <td
                        colSpan={4}
                        style={{ padding: "12px 14px", color: "#64b5f6" }}
                      >
                        TOTAL ({abastFiltrados.length} registros)
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        {fmtN(abastFiltrados.reduce((s, a) => s + a.litros, 0))}{" "}
                        L
                      </td>
                      <td style={{ padding: "12px 14px", color: "#ef9a9a" }}>
                        {fmt(abastFiltrados.reduce((s, a) => s + a.valor, 0))}
                      </td>
                      <td colSpan={3}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        )}

        {/* RELATÓRIO */}
        {aba === "relatorio" && (
          <div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                margin: "0 0 24px",
                color: "#e3f2fd",
              }}
            >
              📈 Relatório por Dotação
            </h2>
            <div style={{ display: "grid", gap: 16, marginBottom: 28 }}>
              {DOTACOES.map((d) => {
                const r = abastecimentos.filter((a) => a.dotacao === d.codigo);
                const valorUsado = r.reduce((s, a) => s + a.valor, 0);
                const limite = VALOR_TOTAL_CONTRATO * (d.percentual / 100);
                const p = pct(valorUsado, limite);
                return (
                  <div
                    key={d.codigo}
                    style={{
                      background: "#1a2a3a",
                      border: "1px solid #1e3448",
                      borderRadius: 14,
                      padding: "20px 22px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 12,
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            color: "#90caf9",
                          }}
                        >
                          {d.codigo}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#546e7a",
                            marginTop: 2,
                          }}
                        >
                          {d.descricao} · Ficha {d.ficha} · Fonte: {d.fonte}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 700, color: "#e3f2fd" }}>
                          {d.percentual}% do contrato
                        </div>
                        <div style={{ fontSize: 12, color: "#546e7a" }}>
                          Limite: {fmt(limite)}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                      {[
                        ["Utilizado", fmt(valorUsado), "#ef9a9a"],
                        ["Disponível", fmt(limite - valorUsado), "#a5d6a7"],
                        ["Registros", r.length, "#e3f2fd"],
                      ].map(([l, v, c]) => (
                        <div key={l} style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, color: "#546e7a" }}>
                            {l}
                          </div>
                          <div style={{ fontWeight: 700, color: c }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        background: "#0f1923",
                        borderRadius: 6,
                        height: 8,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${p}%`,
                          height: "100%",
                          background:
                            p > 80
                              ? "linear-gradient(90deg,#b71c1c,#e53935)"
                              : p > 50
                                ? "linear-gradient(90deg,#e65100,#fb8c00)"
                                : "linear-gradient(90deg,#1b5e20,#43a047)",
                          borderRadius: 6,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 6,
                        fontSize: 11,
                        color: "#546e7a",
                      }}
                    >
                      <span>{p}% utilizado</span>
                      <span>{100 - p}% disponível</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #0d2137, #1a2a3a)",
                border: "1px solid #1e88e533",
                borderRadius: 14,
                padding: "22px 24px",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  marginBottom: 16,
                  color: "#64b5f6",
                }}
              >
                📄 Informações do Contrato
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 12,
                  fontSize: 13,
                }}
              >
                {[
                  ["Número", "003/2026/FMAS", "#90caf9"],
                  ["Contratante", "FMAS Aliança do Tocantins", "#e3f2fd"],
                  [
                    "Credenciada",
                    "Posto Alianz Comércio de Combustível LTDA-EPP",
                    "#e3f2fd",
                  ],
                  ["Valor Total", fmt(VALOR_TOTAL_CONTRATO), "#a5d6a7"],
                  ["Vigência", "12 meses", "#e3f2fd"],
                  ["Gestora", "Rosângela Rodrigues Guimarães", "#e3f2fd"],
                ].map(([l, v, c]) => (
                  <div key={l}>
                    <span style={{ color: "#546e7a" }}>{l}:</span>{" "}
                    <span style={{ color: c, fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tela, setTela] = useState("login");
  const [usuario, setUsuario] = useState(null);

  return (
    <>
      {tela === "login" && (
        <TelaLogin
          onLogin={(u) => {
            setUsuario(u);
            setTela("modulos");
          }}
        />
      )}
      {tela === "modulos" && usuario && (
        <TelaModulos
          usuario={usuario}
          onSelecionar={(id) => {
            if (id === "combustivel") setTela("combustivel");
          }}
          onLogout={() => {
            setUsuario(null);
            setTela("login");
          }}
        />
      )}
      {tela === "combustivel" && usuario && (
        <ModuloCombustivel
          usuario={usuario}
          onVoltar={() => setTela("modulos")}
        />
      )}
    </>
  );
}
