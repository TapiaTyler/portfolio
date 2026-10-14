import type { ProjectInput } from "@/lib/content/schema";

const prose = (...paragraphs: string[]) =>
  paragraphs.map((text) => ({
    type: "paragraph" as const,
    content: [{ type: "text" as const, text }],
  }));

/**
 * Japanese case study for Nihonest. AI-drafted from the English record
 * (2026-10-14) and awaiting native review; facts, numbers and references mirror
 * the English source block for block.
 */
export const nihonestJapanese = {
  title: "Nihonest",
  summary:
    "日本への移住と生活のための、出典にもとづくガイド。情報を体系的に探せる仕組み、状況に応じたジャーニー（手続きの流れ）、任意のアカウント連携を備えています。",
  description:
    "ガイド、日本語の用語、よくある質問、在留資格の情報、自治体ごとの補足情報を、検証済みのひとつのコンテンツシステムにまとめたNext.jsの情報アプリケーションです。編集作業は別のローカルCMSで行います。Vercelで公開しており、現在も開発中です。",
  overview: {
    distinction:
      "基準となるひとつのコンテンツシステムで出典、検索、ジャーニー、地域ごとの案内をつなぎ、アカウントを作らなくても利用できるようにしています。",
    currentState:
      "Vercelで公開中で、開発を続けています。専門家による編集・翻訳のレビューと、CMSのスクリーンリーダーでの確認は、まだ行っていません。",
  },
  type: ["情報Webアプリケーション", "編集ツール"],
  roles: [
    "プロダクト企画",
    "コンテンツディレクション",
    "UIディレクション",
    "技術ディレクション",
    "実装レビュー",
  ],
  contribution: {
    review:
      "実装前の企画とドキュメント作成は、ChatGPTとともに進めました。コンテンツの方向性、UIの選択、実装上の判断は一貫して自分で決め、レビューしています。調査、実装、翻訳、リファクタリングにはAIの支援を受けました。記事の調査と英語の文章はCodexが下書きし、実装と記事はCodexとClaudeがレビューしました。",
    testing:
      "677の本番モジュールにわたるアーキテクチャチェック、TypeScriptの型チェック、18件の対象テストに合格しています。ブラウザ操作、データベース、パフォーマンスのテストは、まだ検証に含まれていません。",
  },
  blocks: [
    {
      id: "problem-guidance",
      type: "problem",
      heading: "一般的な説明を、適切な手続きにつなげる",
      body: prose(
        "日本への移住には、本人の経路や在留資格、住む場所によって変わる行政手続きが伴います。個別の記事を集めただけでは、それぞれのトピックは説明できても、手続きの順序や地域による違いは読み手が自分で整理しなければなりません。",
        "Nihonestは、誰でも利用できる、出典にもとづくガイドでこれに応えます。読むのにアカウントは不要で、それぞれの説明は出典、日本語の用語、担当機関に結びついています。",
      ),
    },
    {
      id: "intro-product",
      type: "intro",
      heading: "検証済みのひとつのコンテンツシステムと、複数の入り口",
      body: prose(
        "ガイド、日本の行政用語、よくある質問、在留資格の情報、自治体ごとの補足情報を、ひとつのコンテンツシステムで管理しています。英語のMDX記事と型付きのレジストリは、公開ページに届く前にIDと関係性がチェックされます。",
        "読み手は、グループ、ガイド、よくある質問、用語集をひとつの検索で探したり、自分の経路に合ったガイド付きジャーニー（状況に応じた手続きの流れ）をたどったり、住んでいる自治体の案内を加えたりできます。任意のアカウントで設定と進捗を端末間で引き継げ、編集作業は別のローカルCMSで行います。",
      ),
    },
    {
      id: "media-discovery-support",
      type: "media",
      mediaId: "explore-desktop",
      supportsBlockId: "intro-product",
    },
    {
      id: "decision-journeys",
      type: "decision",
      title: "選んだ経路に合わせて、読む順序を決める",
      context: prose(
        "ジャーニーには、共通のステップ、条件付きのステップ、別の経路の選択肢が含まれます。すべての選択肢を順番にこなすタスクとして並べると、道筋を誤解させてしまいます。",
      ),
      decision: prose(
        "ジャーニーのモデルでは、経路選択のプレースホルダーと通常のステップを区別しています。経路を選ぶと、プレースホルダーはその経路に対応するガイドに置き換わり、その経路に該当するステップだけが含まれます。条件付きのステップには、適用条件のラベルが残ります。",
      ),
      tradeoffs: prose(
        "経路のモデルは道案内のためのもので、対象となるかどうかを判定するものではありません。適用されるかどうかは担当機関に確認する必要があり、内容を変更するときは、経路と記事の参照を有効なまま保つ必要があります。",
      ),
    },
    {
      id: "media-journey-support",
      type: "media",
      mediaId: "journey-mobile",
      supportsBlockId: "decision-journeys",
    },
    {
      id: "media-conditions-support",
      type: "media",
      mediaId: "journey-conditions-mobile",
      supportsBlockId: "decision-journeys",
    },
    {
      id: "decision-localization",
      type: "decision",
      title: "翻訳を基準となる英語原文に結びつけておく",
      decision: prose(
        "基準となる原文は英語です。日本語のオーバーレイは、原文、プロンプト、用語集のリビジョンで管理するキャッシュ済みの派生データで、フォールバックの挙動と保護された用語によって、公開ページに出る内容を制御しています。",
      ),
      tradeoffs: prose(
        "日本語のテキストは機械翻訳の支援によるもので、まだ専門家のレビューを受けていないため、英語の原文を正としています。",
      ),
    },
    {
      id: "architecture-system",
      type: "architecture",
      title: "基準となるコンテンツ、個人の状態、編集ツールを分離する",
      diagramId: "architecture-content-boundaries",
      explanation: prose(
        "英語のMDXと型付きのリポジトリレコードは、Zodによる検証と相互参照の検証を経てから、Next.jsで表示されます。検索はメモリ上のインデックスが担い、日本語のオーバーレイは原文と用語集のリビジョンに結びついたままになります。",
        "個人の状態は、任意のアカウントで所有者単位のSupabaseテーブルに同期しない限り、ブラウザ内にとどまります。ループバック限定のCMSは、公開アプリケーションの外でリポジトリのファイルを編集します。",
      ),
    },
    {
      id: "challenge-local-guidance",
      type: "challenge",
      title: "網羅していると誤解させずに、地域ごとの違いを加える",
      problem: prose(
        "全国共通の案内だけでは、自治体ごとの疑問が残ります。一方で、一部の地域しか載っていないカタログは、実際より網羅的に見えてしまうおそれがあります。",
      ),
      response: prose(
        "自治体ごとの補足情報では、調査した地域ごとの違いを、出典と再確認の情報とともに加えています。調査済みの補足情報がない地域では、地域ガイドがあるように見せず、一般的な案内を表示します。",
      ),
      result: prose(
        "地域ごとの違いを載せる場所ができ、情報のない部分もそのまま見えるようになりました。補足情報を最新に保つのは、引き続き編集側の責任です。",
      ),
    },
    {
      id: "media-local-support",
      type: "media",
      mediaId: "local-guidance-desktop",
      supportsBlockId: "challenge-local-guidance",
    },
    {
      id: "engineering-details",
      type: "technical",
      title: "技術的な詳細",
      summary:
        "ドメインモデルでの経路の解決、保護された編集用CMS、アカウント同期、そしてそれらを確認するチェック。",
      body: prose(
        "経路の解決はドメインモデルの中にあります。resolveJourneyStepsは、型付きのジャーニーモデルとgetJourneyRouteByIdを使い、ジャーニーと選択された経路をひとつの読む順序に変換します。そのため、経路のルールがページのレイアウトに入り込むことはありません。",
        "編集用CMSは公開アプリケーションの外で動作します。書き込みの際には、想定どおりのリビジョンであることと、編集前のファイルに未反映の変更がないことを確認し、サーバー側で内容を検証したうえで、ローカルのオリジンとセッショントークンを必須にしています。承認は正確なリビジョンと変更できない記録に結びつけられ、CMSはアプリケーションを公開せずに変更をプレビューできます。",
        "任意のアカウント同期では、選択された状態を検証してから、Supabaseの関数を通じて所有者単位のテーブルに送ります。匿名の設定と進捗は、ブラウザのストレージに保存されたままです。",
        "677の本番モジュールにわたるアーキテクチャチェック、TypeScriptの型チェック、18件の対象テストに合格しており、コンテンツ、検索、アカウント同期、CMSと本番環境の境界をカバーしています。ブラウザ操作、データベースのテスト、パフォーマンスの計測はまだ検証に含まれておらず、データベースのポリシーとCMSの保護機能はセキュリティ監査を受けていません。",
      ),
      codeSnippetIds: ["journey-step-resolver"],
    },
    {
      id: "result-current",
      type: "result",
      body: prose(
        "Nihonestは、誰でも読めるガイド、コレクションを横断する検索、経路に応じたジャーニー、日本語の用語、地域ごとの補足情報を、アカウント作成を前提とせずにひとつのコンテンツシステムにまとめています。",
        "Vercelで公開しており、現在も開発中です。次のステップは、専門家による編集・翻訳のレビュー、CMSのスクリーンリーダーでの確認、そしてより幅広いテストです。",
      ),
    },
  ],
} satisfies NonNullable<ProjectInput["locale"]["ja"]>;
