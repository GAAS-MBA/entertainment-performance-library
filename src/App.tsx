/** @jsxImportSource solid-js */
import { createSignal, For, Show } from 'solid-js';
import { entertainers } from './data/entertainers';
import type { Entertainer, SpecLevel } from './data/entertainers';

function SpecBadge(props: { level: SpecLevel }) {
  const color =
    props.level === '高'
      ? 'text-spec-high'
      : props.level === '中'
        ? 'text-spec-mid'
        : 'text-spec-low';
  return <span class={`font-medium ${color}`}>{props.level}</span>;
}

function EntertainerCard(props: {
  item: Entertainer;
  onClick: () => void;
}) {
  return (
    <article
      onClick={props.onClick}
      class="bg-white border border-stone-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-stone-200 transition-all cursor-pointer"
    >
      <h3 class="text-lg font-semibold text-stone-800 mb-1">{props.item.name}</h3>
      <p class="text-xs text-stone-500 mb-4">
        {props.item.genre} · {props.item.unit === 'individual' ? '個人' : 'グループ'} ·{' '}
        {props.item.region}
      </p>
      <div class="mb-3 space-y-1.5">
        <For each={Object.entries(props.item.processor).slice(0, 3)}>
          {([k, v]) => (
            <div class="flex items-center justify-between text-sm py-1.5 border-b border-stone-100 last:border-0">
              <span class="text-stone-600">{k.replace('_', ' ')}</span>
              <SpecBadge level={v} />
            </div>
          )}
        </For>
      </div>
      <p class="text-sm text-stone-600 leading-relaxed">{props.item.notes}</p>
    </article>
  );
}

function EntertainerDetail(props: { item: Entertainer }) {
  return (
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-stone-800 mb-2">
        {props.item.name}
      </h2>
      <p class="text-stone-600 mb-4">
        {props.item.genre} · {props.item.unit === 'individual' ? '個人' : 'グループ'} ·{' '}
        {props.item.region}
      </p>
      <p class="text-stone-600 mb-8">{props.item.notes}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white border border-stone-200 rounded-lg p-5">
          <h4 class="text-sm font-semibold text-stone-800 mb-4">
            Processor
          </h4>
          <div class="space-y-1.5">
            <For each={Object.entries(props.item.processor)}>
              {([k, v]) => (
                <div class="flex items-center justify-between text-sm py-1.5 border-b border-stone-100 last:border-0">
                  <span class="text-stone-600">{k.replace(/_/g, ' ')}</span>
                  <SpecBadge level={v} />
                </div>
              )}
            </For>
          </div>
        </div>
        <div class="bg-white border border-stone-200 rounded-lg p-5">
          <h4 class="text-sm font-semibold text-stone-800 mb-4">Memory</h4>
          <div class="space-y-1.5">
            <For each={Object.entries(props.item.memory)}>
              {([k, v]) => (
                <div class="flex items-center justify-between text-sm py-1.5 border-b border-stone-100 last:border-0">
                  <span class="text-stone-600">{k.replace(/_/g, ' ')}</span>
                  <SpecBadge level={v} />
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = createSignal<'list' | 'concept'>('list');
  const [selectedId, setSelectedId] = createSignal<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = createSignal(false);

  const selected = () => entertainers.find((e) => e.id === selectedId());

  const navLink = (isActive: boolean) =>
    `block px-6 py-2.5 text-sm transition-colors ${
      isActive
        ? 'bg-accent-light text-accent font-medium border-r-[3px] border-accent'
        : 'text-stone-600 hover:bg-primary-secondary hover:text-stone-800'
    }`;

  return (
    <div class="flex min-h-screen">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen((o) => !o)}
        class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-stone-200 shadow-sm"
        aria-label="メニュー"
      >
        <Show
          when={sidebarOpen()}
          fallback={
            <svg class="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          }
        >
          <svg class="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Show>
      </button>

      {/* Sidebar - drawer on mobile, fixed on desktop */}
      <div
        class={`fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-out ${
          sidebarOpen() ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <aside class="w-64 min-w-64 bg-primary-sidebar border-r border-stone-200 py-6 flex flex-col flex-shrink-0">
          <div class="px-6 pb-5 mb-4 border-b border-stone-200">
            <h1 class="text-sm font-semibold text-stone-800 tracking-wide">
              Entertainment Performance Library
            </h1>
            <p class="text-xs text-stone-500 mt-1">
              エンターテイナー＝コンピューター
            </p>
          </div>
          <nav>
            <ul class="list-none p-0 m-0">
              <li>
                <a
                  href="#"
                  class={navLink(view() === 'list')}
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
                  class={navLink(view() === 'concept')}
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
          <div class="mt-4 pt-4 px-6 border-t border-stone-200">
            <p class="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
              分析候補
            </p>
            <ul class="list-none p-0 m-0">
              <For each={entertainers}>
                {(e) => (
                  <li>
                    <a
                      href="#"
                      class={navLink(selectedId() === e.id)}
                      onClick={(ev) => {
                        ev.preventDefault();
                        setView('list');
                        setSelectedId(e.id);
                        setSidebarOpen(false);
                      }}
                    >
                      {e.name}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>
          <div class="mt-auto pt-5 px-6 border-t border-stone-200 text-[11px] text-stone-500">
            © TANAAKK
          </div>
        </aside>
      </div>

      {/* Overlay for mobile */}
      <Show when={sidebarOpen()}>
        <div
          class="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      </Show>

      <main class="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto pt-16 lg:pt-8">
        <Show when={view() === 'concept'}>
          <>
          <div class="mb-8">
            <h2 class="text-2xl font-semibold text-stone-800 mb-2">
              概念モデル
            </h2>
            <p class="text-stone-600">
              エンターテイナーをブラックボックスとしてのプロセッサーとメモリを持つ計算資源と定義する
            </p>
          </div>
          <div class="max-w-[560px] bg-white border border-stone-200 rounded-lg p-6 font-mono text-[13px] overflow-auto">
            <pre class="m-0">
              {`                    ┌─────────────────────────────────────┐
                    │     エンターテイナー（ブラックボックス）    │
   Input ──────────►│  ┌─────────────┐  ┌─────────────┐   │──────────► Output
                    │  │  Processor  │  │   Memory    │   │
                    │  │  （処理装置）  │  │  （記憶装置）  │   │
                    │  └─────────────┘  └─────────────┘   │
                    └─────────────────────────────────────┘`}
            </pre>
          </div>
          <div class="max-w-[560px] mt-6 bg-white border border-stone-200 rounded-lg p-6">
            <p class="m-0">
              <strong>Processor</strong>:
              入力を受け取り、リアルタイムでパフォーマンスを生成する処理装置
            </p>
            <p class="mt-3 mb-0">
              <strong>Memory</strong>:
              過去の経験・学習・パターンを保持し、Processor
              が参照する記憶装置
            </p>
          </div>
          </>
        </Show>

        <Show when={view() === 'list' && !selected()}>
          <>
          <div class="mb-8">
            <h2 class="text-2xl font-semibold text-stone-800 mb-2">
              エンターテイナー一覧
            </h2>
            <p class="text-stone-600">
              各エンターテイナーの Processor / Memory スペック
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <For each={entertainers}>
              {(e) => (
                <EntertainerCard
                  item={e}
                  onClick={() => setSelectedId(e.id)}
                />
              )}
            </For>
          </div>
          </>
        </Show>

        <Show when={view() === 'list' && selected()}>
          <>
          <button
            onClick={() => setSelectedId(null)}
            class="mb-4 px-3 py-1.5 text-sm bg-primary-secondary border border-stone-200 rounded-md cursor-pointer text-stone-600 hover:bg-stone-200"
          >
            ← 一覧に戻る
          </button>
          <EntertainerDetail item={selected()!} />
          </>
        </Show>
      </main>
    </div>
  );
}
