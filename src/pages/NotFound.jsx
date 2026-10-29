import { TransitionLink } from "../Transition";

export default function NotFound() {
  return (
    <main className="stub">
      <div className="eyebrow mono">ERROR 404</div>
      <h1>Page not found</h1>
      <p>That address doesn't exist on this site.</p>
      <TransitionLink className="contact-link" to="/">
        BACK TO HOME <span className="arrow">↗</span>
      </TransitionLink>
    </main>
  );
}