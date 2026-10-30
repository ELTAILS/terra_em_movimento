'use client'

export default function Error({error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  void error

  return (
    <main>
      <h2>Algo deu errado.</h2>
      <button onClick={() => reset()}>Tentar novamente</button>
    </main>
  )
}