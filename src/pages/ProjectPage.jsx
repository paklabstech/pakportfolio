import { useParams } from "react-router-dom";
import { TransitionLink } from "../Transition";

export default function ProjectPage() {
  const { slug } = useParams();
  return (
    <main className="stub">
      <div className="eyebrow mono">PROJECT PAGE</div>
      <h1>{slug}</h1>
      <p>This page will hold the full project write-up.</p>
      <TransitionLink className="contact-link" to="/">
        BACK TO HOME <span className="arrow">↗</span>
      </TransitionLink>
    </main>
  );
}