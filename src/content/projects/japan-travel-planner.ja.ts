import type { ProjectInput } from "@/lib/content/schema";

const prose = (...paragraphs: string[]) =>
  paragraphs.map((text) => ({
    type: "paragraph" as const,
    content: [{ type: "text" as const, text }],
  }));

/**
 * Japanese case study for Japan Travel Planner. AI-drafted from the English record
 * (2026-10-14) and awaiting native review. Terms follow the app's own Japanese
 * interface (frontend/src/i18n/locales/ja.json): 旅行, 旅程, 旅行ライブラリ,
 * テンプレート, 保存した項目, 費用の概要, 絞り込み.
 */
export const japanTravelPlannerJapanese = {
  title: "Japan Travel Planner",
  summary:
    "旅行の編集、再利用できるテンプレート、円建ての費用の概要、印刷用の旅程をひとつのレスポンシブなアプリケーションにまとめた、日本旅行の旅程プランナーです。",
  description:
    "WGUのソフトウェアエンジニアリングの卒業制作（キャップストーン）として始まり、再利用できる計画コンテンツ、絞り込み、レスポンシブなテーマ、英語・日本語のインターフェース対応を加えて発展したフルスタックアプリケーションです。",
  overview: {
    distinction:
      "共通の旅程モデルで、アカウントごとの編集、再利用できるテンプレート、費用の概要、絞り込んだ内容の印刷をつないでいます。",
    currentState:
      "Renderにデプロイ済みの完成したフルスタックアプリケーションで、アカウントごとの旅行の編集、再利用できるプラン、印刷用の旅程、英語・日本語のインターフェースに対応しています。",
  },
  type: ["フルスタックWebアプリケーション", "旅行計画"],
  roles: [
    "プロダクトディレクション",
    "アーキテクチャ",
    "実装",
    "コードレビュー",
  ],
  contribution: {
    review:
      "学校のプロジェクトとして作った最初のアプリケーションは、AIを使わずに手作業で完成させました。その後の機能拡張ではAIの支援を受けましたが、修正、判断、アーキテクチャは作業を通して自分で主導し、レビューしています。",
    testing:
      "フロントエンドのLint、72件のフロントエンドテスト、25件のバックエンドの単体テスト、フロントエンドのビルドに合格し、CIも通過しています。認証が必要な本番環境のワークフローは、エンドツーエンドではテストしていません。",
  },
  blocks: [
    {
      id: "problem-planning",
      type: "problem",
      heading: "文脈を失わずに予定を整理する",
      body: prose(
        "旅行には、アクティビティ、宿泊、交通が含まれ、それぞれ必要な情報が異なります。しかし旅行者はそれらをまとめて計画し、日程や費用、移動経路が変わるたびに見直します。",
        "このプランナーは、それらの項目タイプをひとつの旅程にまとめながら、計画をグループ分けしたり、絞り込んだり、複製・再利用したりできるようにしています。",
      ),
    },
    {
      id: "intro-product",
      type: "intro",
      heading: "旅行の細かな情報をひとまとめにする",
      body: prose(
        "旅行は、アクティビティ、宿泊、交通をアカウントごとの旅程にまとめます。日付や場所によるグループ分け、検索、円建ての費用の概要、印刷機能で、同じデータをさまざまな方法で扱えます。さらに、公開テンプレート、非公開で再利用できる旅行、保存した項目により、毎回一から計画を立てる必要がありません。",
        "WGUのソフトウェアエンジニアリングのキャップストーンとしてAIを使わずに作られ、capstone-v1.0タグ（2026年9月1日）として保存されています。その後の改良で、絞り込み、モバイル表示とダークテーマの改善、ローカライズ、再利用できる計画コンテンツ、ログイン試行の制限、デプロイ用のツールを追加しました。",
      ),
    },
    {
      id: "media-itinerary-support",
      type: "media",
      mediaId: "media-itinerary-desktop",
      supportsBlockId: "intro-product",
    },
    {
      id: "media-mobile-support",
      type: "media",
      mediaId: "media-itinerary-mobile-dark",
      supportsBlockId: "intro-product",
    },
    {
      id: "decision-delivery",
      type: "decision",
      title: "クライアントとAPIを同じオリジンにまとめる",
      decision: prose(
        "Dockerのビルドで、ReactのフロントエンドをSpringの静的リソースとしてコンパイルし、アプリケーションをroot権限のないひとつのJVMコンテナにパッケージします。",
      ),
      rationale: prose(
        "インターフェースとAPIを同じオリジンにすることで、ブラウザのセッションCookieとCSRFの連携がシンプルになります。",
      ),
      tradeoffs: prose(
        "フロントエンドとサーバーのリリースが、ひとつのデプロイに結びつきます。",
      ),
    },
    {
      id: "decision-localization",
      type: "decision",
      title: "インターフェースの翻訳と、個人の旅行内容を分ける",
      decision: prose(
        "インターフェースのリソースと厳選された公開テンプレートは、英語と日本語に対応しています。ユーザーが入力した内容は、書かれた言語のまま表示されます。",
      ),
      tradeoffs: prose(
        "翻訳の品質と網羅性は、第三者によるレビューを受けていません。",
      ),
    },
    {
      id: "media-localization-support",
      type: "media",
      mediaId: "media-library-ja",
      supportsBlockId: "decision-localization",
    },
    {
      id: "architecture-system",
      type: "architecture",
      title: "アカウントの境界をサービス層で守る",
      diagramId: "diagram-system-flow",
      explanation: prose(
        "Reactのクライアントは、セッションにもとづくリクエストをSpringのコントローラーに送ります。検証済みの操作は、サービスとアカウント単位のリポジトリアクセスを経てPostgreSQLに届き、データベースの変更はFlywayでバージョン管理しています。",
      ),
    },
    {
      id: "challenge-security",
      type: "challenge",
      title: "リクエストの境界を越えて、アカウントの計画を守る",
      problem: prose(
        "公開テンプレートはアカウントがなくても読めなければならない一方で、旅行、非公開テンプレート、保存した項目は一人のユーザーのものであり、別のアカウントや偽造されたリクエストから到達できてはいけません。",
      ),
      response: prose(
        "Spring Securityは、テンプレートの匿名での閲覧を許可し、それ以外にはすべて認証を必須にしています。サービスはクライアントから送られた所有者の値ではなく認証済みのユーザー名を使い、CSRFトークンでCookie認証による変更操作を保護しています。パスワードにはBCryptを使い、ログイン試行の制限で失敗の繰り返しを抑えています。",
      ),
      result: prose(
        "モックを使ったサービスのテストで、他のユーザーのリソースへのアクセスが拒否されることを確認しています。既知の課題として、ログイン時にセッションIDとCSRFトークンを更新しておらず、CSRFトークンがない場合のフィルターチェーンのテストもまだ書いていません。",
      ),
    },
    {
      id: "engineering-details",
      type: "technical",
      title: "技術的な詳細",
      summary:
        "クライアント側の絞り込み処理、セキュリティモデルの全体像、レスポンシブ表示とテーマの挙動、そしてアプリケーションのテスト方法。",
      codeSnippetIds: ["snippet-filter-pipeline"],
      body: prose(
        "filterItineraryItemsでは、テキスト検索と構造化された条件により、日付、場所、項目タイプ、費用、交通手段で旅程を絞り込みます。費用の概要と印刷結果は表示中の絞り込み結果を使い、これは印刷コンポーネントのテストで確認しています。",
        "ログインすると、認証済みのセキュリティコンテキストをサーバーのセッションに保存します。セッションCookieはHttpOnlyで、APIクライアントがヘッダーを送れるように、CSRF用のCookieはJavaScriptから読み取れるようにしています。項目の操作では、所有する旅行に属しているかを確認します。DTOとサービスの検証で、必須の値、日付の順序、費用のルールを確認し、安定したエラーコードを返します。ログイン試行の制限では、ユーザー名とクライアントのIPごとの失敗回数を、上限と有効期限のあるキャッシュで記録しています（15分間にユーザー名で5回、IPで25回）。この状態はプロセスごとに保持され、再起動するとリセットされます。保護対象のAPIの名前空間は明示的に列挙しているため、新しいAPIの境界を追加する際は意図的な確認が必要です。",
        "クライアントには、レスポンシブなレイアウト、ライトテーマとダークテーマ、フォーカス時のスタイル、動きを減らす設定への対応が含まれています。公開テンプレートは、日付のオフセットをもとに実際の旅行として作成されます。",
        "フロントエンドのLint、72件のVitestのテスト、Viteのビルドに合格しています。バックエンドでは9クラス・25件のテストがJava 21で合格していますが、その多くはSpringのセキュリティやデータベースを含む完全な環境ではなく、モックしたサービスに対するものです。デプロイしたアプリケーションのランディング、ライブラリ、公開テンプレート、ヘルスチェックの各エンドポイントは、確認時に想定どおり応答しました。認証が必要な本番のワークフロー、アクセシビリティの適合、実環境でのパフォーマンスは、エンドツーエンドではテストしていません。",
      ),
    },
    {
      id: "result-current",
      type: "result",
      body: prose(
        "完成したフルスタックアプリケーションです。アカウントごとの旅程をグループ分け、絞り込み、円建ての費用の概要、印刷とともに扱え、公開テンプレートと非公開での再利用にも対応しています。英語と日本語、ライトとダーク、デスクトップとモバイルで利用できます。",
        "手作業で作ったキャップストーンから、デプロイされたアプリケーションへと発展しました。ReactのクライアントとSpringのAPIをRender上のひとつのコンテナで動かし、PostgreSQLとFlywayのマイグレーションで支えています。",
      ),
    },
  ],
} satisfies NonNullable<ProjectInput["locale"]["ja"]>;
