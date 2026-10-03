import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="page-intro">
      <p className="eyebrow">404 / Not found</p>
      <h1>That page is unavailable.</h1>
      <p>The address may be incorrect, or the project is not published yet.</p>
      <Link className="text-link" href="/en">
        Return home <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
