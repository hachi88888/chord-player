# 🎹 Chord Player

## 🔗 デモ
https://chord-player-gamma.vercel.app/

## 💻 GitHub
https://github.com/hachi88888/chord-player

## 📖 概要
コード進行を作成し、再生できる音楽アプリです。
Web Audio APIを用いて、コード音とベース音をリアルタイムで再生できます。

## 🎯 制作目的
Web Audio APIを用いたリアルタイム音声処理の理解を深めるために制作しました。
また、ReactとTypeScriptを用いたフロントエンド開発力の向上を目的としています。

## 🚀 主な機能
- コード進行の作成
- コードの追加・削除・並び替え
- 再生・ループ再生
- BPM（テンポ）調整
- コード音 / ベース音のON・OFF切り替え

## 🛠 使用技術
- React
- TypeScript
- Web Audio API
- Vite

## 💡 工夫した点
- AudioContextの`currentTime`を基準にして再生タイミングを制御
- `useRef`を用いてループ再生時の時間ズレを防止
- `state`と`ref`を使い分けて不要な再レンダリングを防止

## 😅 苦労した点
- Web Audio APIを用いた音声再生において、正確な再生タイミングを実現するための非同期処理と時間管理に苦労しました。

## 🔧 今後の改善点
- コード進行の保存機能
- MIDI出力機能の追加
- レスポンシブ対応の強化
- プリセットコード進行の実装

## 👤 制作者
hachi88888
