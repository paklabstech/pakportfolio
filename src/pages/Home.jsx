import { TransitionLink } from "../Transition";
import { profile, projects, stack, contacts } from "../data";

  export default function Home() {
    return (
    
    <div className="page">
      <aside className="rail" aria-label="Project notes">
        <a className="rail-brand" href="#top">
          PAK<span>.</span>LABS
        </a>
        <div className="rail-spec">
          <div>
            <div className="spec-label">Location</div>
            <div className="spec-value">{profile.location}</div>
          </div>
          <div>
            <div className="spec-label">Discipline</div>
            <div className="spec-value">{profile.discipline}</div>
          </div>
          <div>
            <div className="spec-label">Working method</div>
            <div className="spec-value">{profile.method}</div>
          </div>
          <div className="rail-status">
            <span className="status-dot"></span> {profile.status.toUpperCase()}
          </div>
        </div>
        <div className="rail-foot">
          FIELD NOTES
          <br />
          ISSUE 001 · 2026
        </div>
      </aside>

      <main className="main">
        <header className="topbar" id="top">
          <div className="breadcrumb">
            FIELD NOTES <b>/</b> PORTFOLIO.001
          </div>
          <nav className="nav" aria-label="Main navigation">
            <a href="#about">ABOUT</a>
            <a href="#projects">WORK</a>
            <a href="#stack">STACK</a>
            <a href="#contact">CONTACT</a>
          </nav>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="eyebrow mono">INDEPENDENT BUILD LOG · ACCRA, GH</div>
          <h1 id="hero-title">
            PAK<span>.</span>
            <br />
            LABS
          </h1>
          <p className="hero-sub">Refined in motion.</p>
          <div className="hero-meta">
            <span>{profile.name.toUpperCase()}</span>
            <span className="slash">/</span>
            <span>{profile.role.toUpperCase()}</span>
            <span className="slash">/</span>
            <span>{profile.tagline.toUpperCase()}</span>
          </div>
          <div className="hero-rule"></div>
        </section>

        <section className="section" id="about">
          <div className="section-head">
            <div className="section-index">01 / NOTE</div>
            <h2 className="section-title">A little better, every build.</h2>
          </div>
          <div className="about-copy">
            <p>
              I'm <strong>{profile.name}</strong>, a software engineer in{" "}
              {profile.location}. I build useful things, pay attention to the
              details, and keep improving what's already working.
            </p>
            <p>
              Kaizen is a working habit here: make a change small enough to
              learn from, ship it, and let the next version be better for it.
            </p>
          </div>
          <div className="about-note">
            <span>↳</span>
            <span>ITERATION-MINDED. THE WORK IS NEVER REALLY "DONE."</span>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-head">
            <div className="section-index">02 / LOG</div>
            <h2 className="section-title">
              Selected builds <small>IN PROGRESS</small>
            </h2>
          </div>
          <div className="project-list">
            {projects.map((p) => (
              <article className="project" key={p.no}>
                <div className="project-no">{p.no}</div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="project-links">
                  {p.live ? (
                    <a className="project-link" href={p.live} target="_blank" rel="noreferrer">
                      LIVE ↗
                    </a>
                  ) : (
                    <span className="project-link disabled">
                      {p.source === null && p.live === null ? "SOON" : "LIVE ↗"}
                    </span>
                  )}
                  {p.source && (
                    <a className="project-link" href={p.source} target="_blank" rel="noreferrer">
                      SOURCE ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="stack">
          <div className="section-head">
            <div className="section-index">03 / TOOLS</div>
            <h2 className="section-title">Current workbench</h2>
          </div>
          <div className="stack">
            {stack.map((item) => (
              <span className="stack-item" key={item}>
                <i></i>
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section-head">
            <div className="section-index">04 / CONNECT</div>
            <h2 className="section-title">Have a good problem?</h2>
          </div>
          <div className="contact-row">
            {contacts.map((c) => (
              <a
                className="contact-link"
                href={c.href}
                key={c.label}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer" : undefined}
              >
                {c.label.toUpperCase()} <span className="arrow">↗</span>
              </a>
            ))}
            <TransitionLink className="contact-link" to="/project/test">
              TEST PAGE <span className="arrow">↗</span>
                </TransitionLink>
          </div>
        </section>

        <footer>
          <span>
            <span className="footer-mark">PAK.LABS</span> · BUILD LOG 001
          </span>
          <span>MADE IN ACCRA · UPDATED CONTINUOUSLY</span>
        </footer>
      </main>
        </div>
  );
}