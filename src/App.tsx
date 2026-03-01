import { useState } from 'react';
import { entertainers } from './data/entertainers';
import type { Entertainer, SpecLevel } from './data/entertainers';

function SpecBadge({ level }: { level: SpecLevel }) {
  const color =
    level === '高'
      ? 'text-spec-high'
      : level === '中'
        ? 'text-spec-mid'
        : 'text-spec-low';
  return <span className={`font-medium ${color}`}>{level}</span>;
}

function EntertainerCard({
  item,
  onClick,
}: {
  item: Entertainer;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-stone-200 transition-all cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-stone-800 mb-1">{item.name}</h3>
      <p className="text-xs text-stone-500 mb-4">
        {item.genre} · {item.unit === 'individual' ? '個人' : 'グループ'} ·{' '}
        {item.region}
      </p>
      <div className="mb-3 space-y-1.5">
        {Object.entries(item.processor)
          .slice(0, 3)
          .map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between text-sm py-1.5 border-b border-stone-100 last:border-0"
            >
              <span className="text-stone-600">{k.replace('_', ' ')}</span>
              <SpecBadge level={v} />
            </div>
          ))}
      </div>
      <p className="text-sm text-stone-600 leading-relaxed">{item.notes}</p>
    </article>
  );
}

function EntertainerDetail({ item }: { item: Entertainer }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-stone-800 mb-2">
        {item.name}
      </h2>
      <p className="text-stone-600 mb-4">
        {item.genre} · {item.unit === 'individual' ? '個人' : 'グループ'} ·{' '}
        {item.region}
      </p>
      <p className="text-stone-600 mb-8">{item.notes}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-200 rounded-lg p-5">
          <h4 className="text-sm font-semibold text-stone-800 mb-4">
            Processor
          </h4>
          <div className="space-y-1.5">
            {Object.entries(item.processor).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between text-sm py-1.5 border-b border-stone-100 last:border-0"
              >
                <span className="text-stone-600">{k.replace(/_/g, ' ')}</span>
                <SpecBadge level={v} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-5">
          <h4 className="text-sm font-semibold text-stone-800 mb-4">Memory</h4>
          <div className="space-y-1.5">
            {Object.entries(item.memory).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between text-sm py-1.5 border-b border-stone-100 last:border-0"
              >
                <span className="text-stone-600">{k.replace(/_/g, ' ')}</span>
                <SpecBadge level={v} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'list' | 'concept'>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selected = entertainers.find((e) => e.id === selectedId);

  const navLink = (isActive: boolean) =>
    `block px-6 py-2.5 text-sm transition-colors ${
      isActive
        ? 'bg-accent-light text-accent font-medium border-r-[3px] border-accent'
        : 'text-stone-600 hover:bg-primary-secondary hover:text-stone-800'
    }`;

  const sidebar = (
    <aside className="w-64 min-w-64 bg-primary-sidebar border-r border-stone-200 py-6 flex flex-col flex-shrink-0">
      <div className="px-6 pb-5 mb-4 border-b border-stone-200">
        <h1 className="text-sm font-semibold text-stone-800 tracking-wide">
          Entertainment Performance Library
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          エンターテイナー＝コンピューター
        </p>
      </div>
      <nav>
        <ul className="list-none p-0 m-0">
          <li>
            <a
              href="#"
              className={navLink(view === 'list')}
              onClick={(e) => {
                e.preventDefault();
                setView('list');
                setSidebarOpen(false);
              }}
            >
              エンターテイナー一覧
            </a>
          </li>
          <li>
            <a
              href="#"
              className={navLink(view === 'concept')}
              onClick={(e) => {
                e.preventDefault();
                setView('concept');
                setSidebarOpen(false);
              }}
            >
              概念モデル
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-4 pt-4 px-6 border-t border-stone-200">
        <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
          分析候補
        </p>
        <ul className="list-none p-0 m-0">
          {entertainers.map((e) => (
            <li key={e.id}>
              <a
                href="#"
                className={navLink(selectedId === e.id)}
                onClick={(ev) => {
                  ev.preventDefault();
                  setView('list');
                  setSelectedId(ev.currentTarget.dataset.id || null);
                  setSidebarOpen(false);
                }}
                data-id={e.id}
              >
                {e.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-5 px-6 border-t border-stone-200 text-[11px] text-stone-500">
        © TANAAKK
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-stone-200 shadow-sm"
        aria-label="メニュー"
      >
        <svg
          className="w-6 h-6 text-stone-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {sidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar - drawer on mobile, fixed on desktop */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {sidebar}
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <main className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto pt-16 lg:pt-8">
        {view === 'concept' && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-stone-800 mb-2">
                概念モデル
              </h2>
              <p className="text-stone-600">
                エンターテイナーをブラックボックスとしてのプロセッサーとメモリを持つ計算資源と定義する
              </p>
            </div>
            <div className="max-w-[560px] bg-white border border-stone-200 rounded-lg p-6 font-mono text-[13px] overflow-auto">
              <pre className="m-0">
                {`                    ┌─────────────────────────────────────┐
                    │     エンターテイナー（ブラックボックス）    │
   Input ──────────►│  ┌─────────────┐  ┌─────────────┐   │──────────► Output
                    │  │  Processor  │  │   Memory    │   │
                    │  │  （処理装置）  │  │  （記憶装置）  │   │
                    │  └─────────────┘  └─────────────┘   │
                    └─────────────────────────────────────┘`}
              </pre>
            </div>
            <div className="max-w-[560px] mt-6 bg-white border border-stone-200 rounded-lg p-6">
              <p className="m-0">
                <strong>Processor</strong>:
                入力を受け取り、リアルタイムでパフォーマンスを生成する処理装置
              </p>
              <p className="mt-3 mb-0">
                <strong>Memory</strong>:
                過去の経験・学習・パターンを保持し、Processor
                が参照する記憶装置
              </p>
            </div>
          </>
        )}
        {view === 'list' && !selected && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-stone-800 mb-2">
                エンターテイナー一覧
              </h2>
              <p className="text-stone-600">
                各エンターテイナーの Processor / Memory スペック
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="mb-4 px-3 py-1.5 text-sm bg-primary-secondary border border-stone-200 rounded-md cursor-pointer text-stone-600 hover:bg-stone-200"
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
