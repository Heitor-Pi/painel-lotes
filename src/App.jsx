
import { useState } from 'react';
import './index.css';

function App() {
  const [contador, setContador] = useState(0);
  const [passo, setPasso] = useState('1');
  const [ultimoLoteRegistrado, setUltimoLoteRegistrado] = useState(null);

  const passoValido = Math.min(10, Math.max(1, Number(passo) || 1));

  const diminuirDesabilitado =
    contador === 0 || contador - passoValido < 0;

  const aumentarDesabilitado =
    contador === 50 || contador + passoValido > 50;

  function validarPasso() {
    const valor = Number(passo);

    if (passo.trim() === '' || !Number.isFinite(valor)) {
      setPasso('1');
    } else {
      setPasso(String(Math.min(10, Math.max(1, Math.trunc(valor)))));
    }
  }

  function incrementar() {
    if (!aumentarDesabilitado) {
      setContador((atual) => atual + passoValido);
    }
  }

  function decrementar() {
    if (!diminuirDesabilitado) {
      setContador((atual) => atual - passoValido);
    }
  }

  function finalizarLote() {
    if (contador > 0) {
      setUltimoLoteRegistrado(contador);
    }

    setContador(0);
  }

  const status =
    contador === 50
      ? 'completo'
      : contador >= 40
        ? 'alerta'
        : 'normal';

  return (
    <main className="pagina">
      <header className="cabecalho">
        <p className="subtitulo">AUTOMALOG SOLUÇÕES LOGÍSTICAS</p>
        <h1>Painel de Controle de Lotes</h1>
        <p className="descricao">
          Controle a quantidade de caixas e acompanhe a capacidade do palete.
        </p>
      </header>

      <section className={`painel status-${status}`}>
        <div className="linha-superior">
          <span className="rotulo">QUANTIDADE DE CAIXAS</span>
          <span className="status-badge">
            {status === 'completo'
              ? 'Lote Fechado'
              : status === 'alerta'
                ? 'Capacidade quase atingida'
                : 'Operação normal'}
          </span>
        </div>

        <div className="contador">{contador}</div>
        <p className="capacidade">de 50 caixas por palete</p>

        <div
          className="barra-fundo"
          role="progressbar"
          aria-label="Capacidade do palete"
          aria-valuenow={contador}
          aria-valuemin={0}
          aria-valuemax={50}
        >
          <div
            className="barra-preenchimento"
            style={{ width: `${(contador / 50) * 100}%` }}
          />
        </div>

        <p className="porcentagem">{contador * 2}% da capacidade utilizada</p>

        <div className="controles">
          <button
            className="botao botao-secundario"
            onClick={decrementar}
            disabled={diminuirDesabilitado}
          >
            − Diminuir
          </button>

          <button
            className="botao botao-principal"
            onClick={incrementar}
            disabled={aumentarDesabilitado}
          >
            + Adicionar
          </button>
        </div>

        <div className="campo-passo">
          <label htmlFor="passo">Quantidade por operação (1 a 10)</label>
          <input
            id="passo"
            type="number"
            min="1"
            max="10"
            step="1"
            value={passo}
            onChange={(evento) => setPasso(evento.target.value)}
            onBlur={validarPasso}
            onKeyDown={(evento) => {
              if (evento.key === 'Enter') {
                validarPasso();
                evento.currentTarget.blur();
              }
            }}
          />
          <small>Escolha quantas caixas adicionar ou retirar por clique.</small>
        </div>

        <button className="botao botao-finalizar" onClick={finalizarLote}>
          Finalizar lote e zerar
        </button>
      </section>

      <section className="historico">
        <div>
          <h2>Último lote finalizado</h2>
          {ultimoLoteRegistrado !== null ? (
            <p>
              <strong>{ultimoLoteRegistrado} caixas</strong> registradas no
              último lote concluído.
            </p>
          ) : (
            <p>Nenhum lote finalizado nesta sessão.</p>
          )}
        </div>
      </section>

      <footer>
        Sistema de Controle Industrial · AutomaLog
      </footer>
    </main>
  );
}

export default App;
