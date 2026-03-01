import { useState } from 'react';
import { entertainers } from './data/entertainers';
import type { Entertainer, SpecLevel } from './data/entertainers';
import './App.css';

function SpecBadge({ level }: { level: SpecLevel }) {
  const c = level === '高' ? 'high' : level === '中' ? 'mid' : 'low';
  return <span className={`spec-value ${c}`}>{level}</span>;
}

function EntertainerCard({
  item,
  onClick,
}: {
  item: Entertainer;
  onClick: () => void;
}) {
  return (
    <article className="card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <h3 className="card-title">{item.name}</h3>
      <p className="card-meta">
        {item.genre} · {item.unit === 'individual' ? '個人' : 'グループ'} · {item.region}
      </p>
      <div style={{ marginBottom: 12 }}>
        {Object.entries(item.processor).slice(0, 3).map(([k, v]) => (
          <div key={k} className="spec-row">
            <span className="spec-label">{k.replace('_', ' ')}</span>
            <SpecBadge level={v} />
          </div>
        ))}
      </div>
      <p className="card-notes">{item.notes}</p>
    </article>
  );
}

function EntertainerDetail({ item }: { item: Entertainer }) {
  return (
    <div className="detail-section">
      <h2 className="main-title">{item.name}</h2>
      <p className="main-description">
        {item.genre} · {item.unit === 'individual' ? '個人' : 'グループ'} · {item.region}
      </p>
      <p className="card-notes" style={{ marginTop: 16 }}>{item.notes}</p>

      <div className="spec-grid" style={{ marginTop: 32 }}>
        <div className="spec-card">
          <h4 className="spec-card-title">Processor</h4>
          {Object.entries(item.processor).map(([k, v]) => (
            <div key={k} className="spec-row">
              <span className="spec-label">{k.replace(/_/g, ' ')}</span>
              <SpecBadge level={v} />
            </div>
          ))}
        </div>
        <div className="spec-card">
          <h4 className="spec-card-title">Memory</h4>
          {Object.entries(item.memory).map(([k, v]) => (
            <div key={k} className="spec-row">
              <span className="spec-label">{k.replace(/_/g, ' ')}</span>
              <SpecBadge level={v} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'list' | 'concept'>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = entertainers.find((e) => e.id === selectedId);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Entertainment Performance Library</h1>
          <p className="sidebar-subtitle">エンターテイナー＝コンピューター</p>
        </div>
        <nav>
          <ul className="sidebar-nav">
            <li className="sidebar-nav-item">
              <a
                href="#"
                className={`sidebar-nav-link ${view === 'list' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setView('list');
                }}
              >
                エンターテイナー一覧
              </a>
            </li>
            <li className="sidebar-nav-item">
              <a
                href="#"
                className={`sidebar-nav-link ${view === 'concept' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setView('concept');
                }}
              >
                概念モデル
              </a>
            </li>
          </ul>
        </nav>
        <div className="sidebar-section">
          <p className="sidebar-section-title">分析候補</p>
          <ul className="sidebar-nav">
            {entertainers.map((e) => (
              <li key={e.id} className="sidebar-nav-item">
                <a
                  href="#"
                  className={`sidebar-nav-link ${selectedId === e.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setView('list');
                    setSelectedId(e.currentTarget.dataset.id || null);
                  }}
                  data-id={e.id}
                >
                  {e.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="main">
        {view === 'concept' && (
          <>
            <div className="main-header">
              <h2 className="main-title">概念モデル</h2>
              <p className="main-description">
                エンターテイナーをブラックボックスとしてのプロセッサーとメモリを持つ計算資源と定義する
              </p>
            </div>
            <div className="card" style={{ maxWidth: 560, fontFamily: 'monospace', fontSize: 13 }}>
              <pre style={{ margin: 0, overflow: 'auto' }}>
{`                    ┌─────────────────────────────────────┐
                    │     エンターテイナー（ブラックボックス）    │
   Input ──────────►│  ┌─────────────┐  ┌─────────────┐   │──────────► Output
                    │  │  Processor  │  │   Memory    │   │
                    │  │  （処理装置）  │  │  （記憶装置）  │   │
                    │  └─────────────┘  └─────────────┘   │
                    └─────────────────────────────────────┘`}
              </pre>
            </div>
            <div className="card" style={{ maxWidth: 560, marginTop: 24 }}>
              <p style={{ margin: 0 }}>
                <strong>Processor</strong>: 入力を受け取り、リアルタイムでパフォーマンスを生成する処理装置
              </p>
              <p style={{ margin: '12px 0 0' }}>
                <strong>Memory</strong>: 過去の経験・学習・パターンを保持し、Processor が参照する記憶装置
              </p>
            </div>
          </>
        )}
        {view === 'list' && !selected && (
          <>
            <div className="main-header">
              <h2 className="main-title">エンターテイナー一覧</h2>
              <p className="main-description">
                各エンターテイナーの Processor / Memory スペック
              </p>
            </div>
            <div className="card-grid">
              {entertainers.map((e) => (
                <EntertainerCard
                  key={e.id}
                  item={e}
                  onClick={() => setSelectedId(e.id)}
                />
              ))}
            </div>
          </>
        )}
        {view === 'list' && selected && (
          <>
            <button
              onClick={() => setSelectedId(null)}
              style={{
                marginBottom: 12,
                padding: '6px 12px',
                fontSize: 13,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
            >
              ← 一覧に戻る
            </button>
            <EntertainerDetail item={selected} />
          </>
        )}
      </main>
    </div>
  );
}
