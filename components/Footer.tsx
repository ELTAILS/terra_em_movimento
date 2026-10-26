export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <p>&copy; {new Date().getFullYear()} Terra em Movimento. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}