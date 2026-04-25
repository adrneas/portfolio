import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <p className="eyebrow">404</p>
        <h1>Pagina nao encontrada</h1>
        <Link className="text-link" href="/">
          Voltar para o inicio
        </Link>
      </div>
    </main>
  );
}
