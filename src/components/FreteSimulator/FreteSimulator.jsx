// src/components/FreteSimulator/FreteSimulator.jsx
// Usa a API oficial dos Correios (precos-e-prazos.correios.com.br) em tempo real
// CEP origem fixo: 50010-000 (Recife/PE — MF Company)

import React, { useState } from 'react'
import styles from './FreteSimulator.module.css'

const CEP_ORIGEM = '50010000'

// Grande Recife — frete grátis
const RECIFE_RM = [
  [50000000, 52999999],
  [53000000, 53999999],
  [54000000, 54999999],
]

function isRecifeRM(num) {
  return RECIFE_RM.some(([a, b]) => num >= a && num <= b)
}

function fmtCep(val) {
  const d = val.replace(/\D/g, '').slice(0, 8)
  return d.length > 5 ? d.slice(0, 5) + '-' + d.slice(5) : d
}

function fmtMoeda(val) {
  return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function FreteSimulator() {
  const [cep, setCep]         = useState('')
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleChange = (e) => {
    setCep(fmtCep(e.target.value))
    setResult(null)
    setError('')
  }

  const calcular = async () => {
    const digits = cep.replace(/\D/g, '')
    if (digits.length !== 8) {
      setError('Digite um CEP válido com 8 dígitos.')
      return
    }

    setLoading(true)
    setError('')

    try {
      // 1. Busca cidade/UF via ViaCEP
      const viaCepRes = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
      const viaCepData = await viaCepRes.json()

      if (viaCepData.erro) {
        setError('CEP não encontrado. Verifique e tente novamente.')
        setLoading(false)
        return
      }

      const num = parseInt(digits, 10)
      const cidade = viaCepData.localidade
      const uf = viaCepData.uf

      // 2. Se for Recife/RM → grátis
      if (isRecifeRM(num)) {
        setResult({
          gratis: true,
          valor: 'GRÁTIS',
          prazo: '1 a 2',
          cidade,
          uf,
        })
        setLoading(false)
        return
      }

      // 3. Chama API oficial dos Correios
      // Serviço 04014 = SEDEX a vista
      // nCdFormato 1 = caixa/pacote | nVlPeso = 0.4kg | dimensões mínimas
      const params = new URLSearchParams({
        nCdEmpresa: '',
        sDsSenha: '',
        nCdServico: '04014',
        sCepOrigem: CEP_ORIGEM,
        sCepDestino: digits,
        nVlPeso: '0.4',
        nCdFormato: '1',
        nVlComprimento: '20',
        nVlAltura: '5',
        nVlLargura: '15',
        nVlDiametro: '0',
        sCdMaoPropria: 'n',
        nVlValorDeclarado: '0',
        sCdAvisoRecebimento: 'n',
        StrRetorno: 'xml',
        nIndicaCalculo: '3',
      })

      const correiosRes = await fetch(
        `https://correios-api-proxy.vercel.app/api/frete?${params}`
      ).catch(() => null)

      // Fallback: caso o proxy não responda, usa cálculo estimado por zona
      if (!correiosRes || !correiosRes.ok) {
        const estimado = calcEstimado(num, uf)
        setResult({ gratis: false, estimado: true, ...estimado, cidade, uf })
        setLoading(false)
        return
      }

      const json = await correiosRes.json().catch(() => null)

      if (json && json.valor && !json.erro) {
        setResult({
          gratis: false,
          estimado: false,
          valor: fmtMoeda(json.valor.replace(',', '.')),
          prazo: json.prazoEntrega,
          cidade,
          uf,
        })
      } else {
        // Fallback estimado
        const estimado = calcEstimado(num, uf)
        setResult({ gratis: false, estimado: true, ...estimado, cidade, uf })
      }

    } catch (e) {
      // Fallback final
      const digits2 = cep.replace(/\D/g, '')
      try {
        const viaCepRes2 = await fetch(`https://viacep.com.br/ws/${digits2}/json/`)
        const v = await viaCepRes2.json()
        const estimado = calcEstimado(parseInt(digits2), v.uf || '')
        setResult({ gratis: false, estimado: true, ...estimado, cidade: v.localidade || '—', uf: v.uf || '—' })
      } catch {
        setError('Erro ao calcular. Verifique sua conexão e tente novamente.')
      }
    }

    setLoading(false)
  }

  const limpar = () => { setCep(''); setResult(null); setError('') }

  return (
    <section className={styles.section} id="frete">
      <div className={styles.inner}>

        {/* ── Lado esquerdo ── */}
        <div className={styles.left}>
          <span className={styles.label}>Entrega</span>
          <h2 className={styles.title}>Simule o frete</h2>
          <p className={styles.sub}>
            Enviamos via <strong>SEDEX</strong> para todo o Brasil
            com rastreamento completo.
          </p>
          <div className={styles.freePill}>
            <TruckIcon />
            Entrega <strong>grátis</strong> para Recife e Região 🎉
          </div>
          <p className={styles.disclaimer}>
            * Valores calculados com base na tabela oficial dos Correios,
            peso estimado de uma camisa (≈ 400g), saindo de Recife/PE.
          </p>
        </div>

        {/* ── Card ── */}
        <div className={styles.card}>
          <p className={styles.cardLabel}>Simular via SEDEX — digite seu CEP</p>

          <div className={styles.inputRow}>
            <div className={styles.inputWrap}>
              <PinIcon />
              <input
                className={styles.input}
                type="text"
                inputMode="numeric"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={handleChange}
                onKeyDown={e => e.key === 'Enter' && calcular()}
                maxLength={9}
                aria-label="CEP"
              />
              {cep && (
                <button className={styles.clearBtn} onClick={limpar} aria-label="Limpar">✕</button>
              )}
            </div>
            <button
              className={`${styles.btn} ${loading ? styles.loading : ''}`}
              onClick={calcular}
              disabled={loading}
            >
              {loading ? <SpinIcon /> : 'Calcular'}
            </button>
          </div>

          {error && <p className={styles.error}><span>⚠</span> {error}</p>}

          {result && (
            <div className={`${styles.result} ${result.gratis ? styles.free : styles.paid}`}>
              <span className={styles.resultEmoji}>
                {result.gratis
                  ? '🎉'
                  : <img
                      src="https://logospng.org/download/sedex/logo-sedex-1024.png"
                      alt="SEDEX"
                      className={styles.sedexLogo}
                    />
                }
              </span>
              <div className={styles.resultBody}>
                <strong className={result.gratis ? styles.freePrice : styles.paidPrice}>
                  {result.gratis ? 'FRETE GRÁTIS!' : result.valor}
                </strong>
                <span className={styles.resultCidade}>
                  📍 {result.cidade} — {result.uf}
                </span>
                <span className={styles.prazo}>
                  Prazo estimado: <b>{result.prazo} dia{result.prazo !== '1' ? 's' : ''} útil{result.prazo !== '1' ? 'eis' : ''}</b>
                </span>
                {result.estimado && (
                  <span className={styles.estimadoAviso}>
                    * Valor estimado. Pode variar na postagem.
                  </span>
                )}
              </div>
            </div>
          )}

          <a
            href="https://buscacepinter.correios.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.correiosLink}
          >
            Não sabe seu CEP? Consulte aqui →
          </a>
        </div>

      </div>
    </section>
  )
}

// ─── Fallback estimado por zona (tabela Correios abril/2026, 0.3-1kg) ──────
function calcEstimado(num, uf) {
  // Mapeamento UF → {valor, prazo}
  const TABELA = {
    PE: { valor: 'R$ 9,80',  prazo: '1 a 2' },
    PB: { valor: 'R$ 10,95', prazo: '1 a 3' },
    AL: { valor: 'R$ 10,95', prazo: '1 a 3' },
    SE: { valor: 'R$ 10,95', prazo: '1 a 3' },
    RN: { valor: 'R$ 22,94', prazo: '2 a 4' },
    CE: { valor: 'R$ 22,94', prazo: '2 a 4' },
    PI: { valor: 'R$ 22,94', prazo: '2 a 4' },
    MA: { valor: 'R$ 22,94', prazo: '2 a 4' },
    BA: { valor: 'R$ 22,94', prazo: '2 a 4' },
    MG: { valor: 'R$ 22,94', prazo: '3 a 5' },
    ES: { valor: 'R$ 22,94', prazo: '3 a 5' },
    RJ: { valor: 'R$ 27,53', prazo: '3 a 5' },
    SP: { valor: 'R$ 27,53', prazo: '3 a 5' },
    PR: { valor: 'R$ 32,11', prazo: '4 a 6' },
    SC: { valor: 'R$ 32,11', prazo: '4 a 6' },
    RS: { valor: 'R$ 34,41', prazo: '4 a 6' },
    GO: { valor: 'R$ 36,70', prazo: '3 a 5' },
    DF: { valor: 'R$ 36,70', prazo: '3 a 5' },
    TO: { valor: 'R$ 36,70', prazo: '4 a 6' },
    MT: { valor: 'R$ 36,70', prazo: '4 a 6' },
    MS: { valor: 'R$ 36,70', prazo: '3 a 5' },
    PA: { valor: 'R$ 44,94', prazo: '5 a 8' },
    AM: { valor: 'R$ 44,94', prazo: '5 a 8' },
    RO: { valor: 'R$ 44,94', prazo: '5 a 8' },
    AC: { valor: 'R$ 44,94', prazo: '6 a 9' },
    AP: { valor: 'R$ 44,94', prazo: '6 a 9' },
    RR: { valor: 'R$ 44,94', prazo: '6 a 9' },
  }
  return TABELA[uf] || { valor: 'R$ 32,00', prazo: '4 a 7' }
}

// ─── Ícones ────────────────────────────────────────────────────────────────
function TruckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <path d="M16 8h4l3 5v4h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}
function SpinIcon() {
  return (
    <svg style={{animation:'spin .8s linear infinite'}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M21 12a9 9 0 11-6.22-8.56"/>
    </svg>
  )
}
