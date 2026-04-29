# Codex用プロンプト：リアルな空港X線スーツケース型ポートフォリオ

Next.js + TypeScript + Tailwind CSS + React Three Fiber + drei を使って，リアルな空港の手荷物検査場をモチーフにした3Dポートフォリオのヒーローセクションを作ってください。

## コンセプト

リアルな空港のX線検査場で，スーツケースの中に入った過去のプロジェクトや自分の経歴が，X線スキャンによって透けて見えるポートフォリオサイトにしたいです。

雰囲気は，サイバーすぎるSFではなく，実在する空港のセキュリティゲートに近いリアル寄りにしてください。

## 画面構成

### 1. ファーストビュー

画面全体を空港の手荷物検査エリアにする。

- 中央にベルトコンベア
- ベルト上にスーツケースの3Dモデル
- 奥にX線検査機の入口
- 周囲は少し暗めの空港照明
- 金属，ゴム，プラスチックの質感を出す
- 過度なネオンやサイバーパンク表現は避ける
- 現実の空港っぽい，少し無機質で静かな雰囲気にする

### 2. スーツケース

無料のGLB/GLTFスーツケースモデルを読み込めるようにする。

仮パス：

/models/suitcase.glb

要件：

- スーツケースは画面中央やや右寄り
- ゆっくりベルト上を移動しているように見せる
- マウス移動でカメラが少しだけ動く
- ドラッグで少し回転できる
- X線スキャン中だけ中身が透けて見える
- 通常時はリアルなスーツケース
- スキャンラインが通過した部分だけ半透明になるような演出

### 3. X線表現

スーツケースの中に入っているオブジェクトが，X線画面のように透けて見える表現にする。

表現方針：

- 青緑，薄いシアン，白っぽいX線色
- 内部オブジェクトはワイヤーフレームまたは半透明発光
- スキャンラインが左から右へ流れる
- スキャンラインが通ったところだけ中身が強く見える
- ノイズ，粒子，少しだけブラーを入れる
- ただし派手すぎない
- 現実の空港X線モニターのような見た目を意識する

### 4. スーツケースの中身

スーツケースの中には，過去のプロジェクトや自分の紹介を象徴する小さな3Dオブジェクトを入れる。

最低限以下を入れる：

#### Terraplot

- 小さな地図グリッド
- GPSピン
- 領地セル
- ループ状のルート線

#### AI / GNN研究

- ノードとエッジのグラフ構造
- いくつかのノードが光っている
- グラフ探索・パターン発見を連想できる表現

#### Web / App開発

- 小さなスマホ画面
- コードブロック
- UIカード

#### 自己紹介

- 学生証のようなカード
- “Computer Science”
- “Machine Learning”
- “App Development”
- “Graph Data”

## スクロール演出

ファーストビューだけで完結させず，スクロールでスキャンが進むようにする。

### Section 1: Arrival

空港の検査場にスーツケースが流れてくる。

表示テキスト：

Title:
Portfolio Baggage Check

Subtitle:
Scan through my projects, research, and experiments.

Button:
Start Scan

### Section 2: Scan Terraplot

スキャンラインがTerraplotのオブジェクトを照らす。

表示テキスト：

Terraplot  
A location-based territory game built around GPS routes, loops, and captured areas.

### Section 3: Scan Research

GNNやグラフ構造のオブジェクトを照らす。

表示テキスト：

Graph & AI Research  
Exploring graph algorithms, graph databases, and machine learning systems.

### Section 4: Scan Development

Web/App開発系のオブジェクトを照らす。

表示テキスト：

App & Web Development  
Building iOS apps, landing pages, and interactive product experiences.

### Section 5: Identity Check

最後に自己紹介カードを表示する。

表示テキスト：

Ko Yamasaki  
Computer Science student interested in AI, graph data, and product development.

## UIデザイン

- 背景は暗めの空港
- テキストは白，グレー，薄いシアン
- ボタンは控えめなガラス調
- フォントはモダンで読みやすく
- 3D演出を邪魔しないUI
- 情報量を詰め込みすぎない
- セクションごとにテキストは短くする

## 技術要件

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Three Fiber
- drei
- framer-motion
- Three.js
- GLBモデル読み込み対応
- Suspenseでローディング対応
- モバイルでは軽量化
- 3Dが重い場合はCanvasの解像度を下げる
- prefers-reduced-motion に対応する

## コンポーネント構成

以下のように分割してください。

app/page.tsx

components/xray/XrayPortfolioHero.tsx  
components/xray/AirportScene.tsx  
components/xray/ConveyorBelt.tsx  
components/xray/SuitcaseModel.tsx  
components/xray/XrayScanner.tsx  
components/xray/ProjectObjects.tsx  
components/xray/TerraplotObject.tsx  
components/xray/GraphResearchObject.tsx  
components/xray/AppDevelopmentObject.tsx  
components/xray/ProfileCardObject.tsx  
components/xray/ScanLineEffect.tsx  
components/xray/SectionOverlay.tsx

## 重要な実装方針

- まずは動くプロトタイプを優先する
- スーツケース以外の中身は基本図形で作ってよい
- ただし見た目は雑にしない
- 空港らしい照明，床，ベルトコンベア，検査機の雰囲気を作る
- 最初から完璧な3Dモデルに依存しない
- あとからGLBモデルを差し替えやすい構造にする
- エラーが出ないことを最優先にする

## 追加してほしい細かい演出

- ベルトコンベアのゴム質感
- 金属製の検査機フレーム
- スーツケースが少し振動しているような微小アニメーション
- X線スキャン時に一瞬だけ内部オブジェクトが強く光る
- 画面端に空港検査モニター風の小さなUI
- “SCAN READY”
- “OBJECT DETECTED”
- “PROJECT FOUND”
- “CLEAR”

## 避けたいこと

- 派手すぎるサイバーパンク
- ゲーム画面のような過剰なネオン
- 情報を一画面に詰め込みすぎる
- ただの横スクロール作品集にすること
- スーツケースの中身が最初から全部見えすぎること

## 完成イメージ

リアルな空港の手荷物検査場にスーツケースが流れてきて，X線スキャナーを通るたびに，その中に入っている自分の過去プロジェクト，研究テーマ，開発経験が少しずつ透けて見える。

ユーザーはスクロールしながら，まるで空港の検査官のように，Kouのプロジェクト履歴をスキャンしていく体験ができる。