const shortcuts = [
  { src: '/assets/button0.png', alt: 'Site institucional da FIEC' },
  { src: '/assets/button1.png', alt: 'Progressão parcial' },
  { src: '/assets/button2.png', alt: 'Biblioteca virtual' },
]

function irParaLogin() {
  window.location.href = '/login'
}

export default function HomePage() {
  return (
    <main className="portal-home" aria-label="Página inicial do portal FIEC">
      <div className="portal-canvas">
        <img
          className="portal-background"
          src="/assets/bg.png"
          alt="Portal acadêmico FIEC"
        />

        <section className="portal-shortcuts" aria-label="Links rápidos">
          {shortcuts.map((shortcut) => (
            <div className="portal-shortcut" key={shortcut.src}>
              <img src={shortcut.src} alt={shortcut.alt} />
            </div>
          ))}

          <button
            className="portal-shortcut portal-shortcut-taskcall"
            type="button"
            onClick={irParaLogin}
            aria-label="Abrir login do FIEC Taskcall"
          >
            <img src="/assets/button3.png" alt="FIEC Taskcall" />
          </button>
        </section>

        <button
          className="portal-taskcall-mobile"
          type="button"
          onClick={irParaLogin}
        >
          <span className="portal-taskcall-mark">TC</span>
          <span>
            <strong>FIEC Taskcall</strong>
            <small>Abrir sistema de chamados</small>
          </span>
          <span className="portal-taskcall-arrow" aria-hidden="true">›</span>
        </button>
      </div>
    </main>
  )
}
