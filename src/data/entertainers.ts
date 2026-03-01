export type SpecLevel = '高' | '中' | '低';

export interface ProcessorSpec {
  input_bandwidth: SpecLevel;
  realtime: SpecLevel;
  parallel: SpecLevel;
  adaptation: SpecLevel;
  stability: SpecLevel;
  peak_load: SpecLevel;
}

export interface MemorySpec {
  capacity: SpecLevel;
  retention: SpecLevel;
  recall_speed: SpecLevel;
  precision: SpecLevel;
  transfer: SpecLevel;
}

export interface Entertainer {
  id: string;
  name: string;
  genre: string;
  unit: 'individual' | 'group';
  region: string;
  processor: ProcessorSpec;
  memory: MemorySpec;
  notes: string;
}

export const entertainers: Entertainer[] = [
  {
    id: 'michael-jackson',
    name: 'Michael Jackson',
    genre: 'ミュージシャン',
    unit: 'individual',
    region: 'USA',
    processor: {
      input_bandwidth: '高',
      realtime: '高',
      parallel: '高',
      adaptation: '高',
      stability: '高',
      peak_load: '高',
    },
    memory: {
      capacity: '高',
      retention: '高',
      recall_speed: '高',
      precision: '高',
      transfer: '中',
    },
    notes: '歌唱・ダンス・演出の統合が特徴',
  },
  {
    id: 'the-beatles',
    name: 'The Beatles',
    genre: 'ミュージシャン',
    unit: 'group',
    region: 'UK',
    processor: {
      input_bandwidth: '高',
      realtime: '高',
      parallel: '高',
      adaptation: '高',
      stability: '中',
      peak_load: '高',
    },
    memory: {
      capacity: '高',
      retention: '高',
      recall_speed: '高',
      precision: '高',
      transfer: '高',
    },
    notes: '集団としての同期・分業が特徴',
  },
  {
    id: 'taylor-swift',
    name: 'Taylor Swift',
    genre: 'ミュージシャン',
    unit: 'individual',
    region: 'USA',
    processor: {
      input_bandwidth: '高',
      realtime: '高',
      parallel: '高',
      adaptation: '高',
      stability: '高',
      peak_load: '高',
    },
    memory: {
      capacity: '高',
      retention: '高',
      recall_speed: '高',
      precision: '高',
      transfer: '高',
    },
    notes: 'ナラティブ・ストーリー性が特徴',
  },
  {
    id: 'blackpink',
    name: 'Blackpink',
    genre: 'ミュージシャン',
    unit: 'group',
    region: '韓国',
    processor: {
      input_bandwidth: '高',
      realtime: '高',
      parallel: '高',
      adaptation: '中',
      stability: '高',
      peak_load: '高',
    },
    memory: {
      capacity: '高',
      retention: '高',
      recall_speed: '高',
      precision: '高',
      transfer: '中',
    },
    notes: '4人同期の精度が特徴',
  },
  {
    id: 'johnny-depp',
    name: 'Johnny Depp',
    genre: '俳優',
    unit: 'individual',
    region: 'USA',
    processor: {
      input_bandwidth: '高',
      realtime: '中',
      parallel: '高',
      adaptation: '高',
      stability: '高',
      peak_load: '中',
    },
    memory: {
      capacity: '高',
      retention: '高',
      recall_speed: '高',
      precision: '高',
      transfer: '高',
    },
    notes: 'キャラクター変容の幅が特徴',
  },
  {
    id: 'kimura-takuya',
    name: '木村拓哉',
    genre: '俳優・タレント',
    unit: 'individual',
    region: '日本',
    processor: {
      input_bandwidth: '高',
      realtime: '高',
      parallel: '高',
      adaptation: '高',
      stability: '高',
      peak_load: '高',
    },
    memory: {
      capacity: '高',
      retention: '高',
      recall_speed: '高',
      precision: '高',
      transfer: '高',
    },
    notes: 'ドラマ・バラエティ・CM のマルチ対応が特徴',
  },
  {
    id: 'antonio-inoki',
    name: 'アントニオ猪木',
    genre: 'プロレスラー',
    unit: 'individual',
    region: '日本',
    processor: {
      input_bandwidth: '高',
      realtime: '高',
      parallel: '高',
      adaptation: '高',
      stability: '中',
      peak_load: '高',
    },
    memory: {
      capacity: '高',
      retention: '高',
      recall_speed: '高',
      precision: '中',
      transfer: '高',
    },
    notes: '相手・観客との相互作用が特徴',
  },
];
