import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Boxes,
  Check,
  Copy,
  Database,
  ExternalLink,
  FileCode2,
  KeyRound,
  Network,
  Play,
  Route,
  Server,
  ShieldCheck,
  Terminal,
  TestTube2,
  Workflow,
  Zap
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const command = 'npm init @tdk-landscape/microservices';

const stack = [
  ['Bun', Zap, 'Fast installs and TypeScript-first service runtime.'],
  ['Node.js', Server, 'Works with the ecosystem teams already know.'],
  ['TypeScript', ShieldCheck, 'Typed contracts between apps, APIs, and workers.'],
  ['Docker', Boxes, 'Every service, queue, database, and tool in containers.'],
  ['Traefik', Route, 'Local domains, routing, health checks, and discovery.'],
  ['Tilt', Workflow, 'Selective startup with hot reload for active services.'],
  ['Prisma', Database, 'Migrations, clients, and predictable data access.'],
  ['PostgreSQL', Database, 'Real relational state from the first boot.'],
  ['NATS JetStream', Network, 'Streams, queues, and evented workflows built in.'],
  ['Infisical', KeyRound, 'Secrets and machine identities without spreadsheet drift.'],
  ['Playwright', TestTube2, 'Browser tests wired against the generated stack.'],
  ['AGENTS.md', FileCode2, 'A repo map for Codex, Cursor, Claude, and humans.']
];

const featureCards = [
  ['Describe the landscape', 'Choose service types, runtimes, databases, eventing, testing, and secrets in one tiny prompt.'],
  ['Generate the topology', 'TDK writes manifests, Dockerfiles, routes, env contracts, diagrams, docs, and runnable service code.'],
  ['Boot only what matters', 'Tilt starts the selected stack, Traefik routes it, and hot reload stays armed for the services you touch.']
];

const terminalLines = [
  '$ npm init @tdk-landscape/microservices',
  'Need to install @tdk-landscape/create-microservices. Ok to proceed? yes',
  'Project name: commerce-lab',
  'Runtime: Bun + Node.js',
  'Infrastructure: Docker, Traefik, Tilt',
  'Data: PostgreSQL, Prisma, NATS JetStream',
  'Safety: Infisical, Playwright, AGENTS.md',
  'Generated 4 services, 68 files, C4 diagrams',
  'ready - stack live in 4.6s'
];

function App() {
  const [copied, setCopied] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav, .hero-kicker, .hero h1, .hero-copy, .hero-actions, .command-bar, .console-card', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.065,
        ease: 'power3.out'
      });

      gsap.from('.stack-tile', {
        y: 34,
        opacity: 0,
        scale: 0.94,
        duration: 0.7,
        stagger: 0.035,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stack-grid', start: 'top 78%' }
      });

      gsap.to('.reveal-word', {
        opacity: 1,
        y: 0,
        stagger: 0.028,
        ease: 'none',
        scrollTrigger: { trigger: '.manifesto', start: 'top 82%', end: 'bottom 48%', scrub: 0.7 }
      });

      gsap.utils.toArray('.flow-card').forEach((card, index) => {
        gsap.fromTo(card,
          { y: 90 + index * 22, scale: 0.88, opacity: 0.35 },
          {
            y: index * -18,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 28%',
              scrub: true
            }
          }
        );
      });

      ScrollTrigger.create({
        trigger: '.build-flow',
        start: 'top 12%',
        end: 'bottom 86%',
        pin: '.flow-copy',
        pinSpacing: false
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const node = terminalRef.current;
    if (!node) return;

    node.innerHTML = '';
    let lineIndex = 0;
    let charIndex = 0;
    let row = document.createElement('div');
    row.className = 'terminal-line';
    node.appendChild(row);

    const timer = window.setInterval(() => {
      const line = terminalLines[lineIndex];
      row.textContent = line.slice(0, charIndex + 1);
      charIndex += 1;

      if (charIndex >= line.length) {
        lineIndex += 1;
        charIndex = 0;
        if (lineIndex >= terminalLines.length) {
          window.clearInterval(timer);
          return;
        }
        row = document.createElement('div');
        row.className = 'terminal-line';
        node.appendChild(row);
      }
    }, 22);

    return () => window.clearInterval(timer);
  }, []);

  const copyCommand = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const manifesto = 'A tiny starter with serious defaults. Forge TDK gives you the local microservice skeleton, then gets out of the way so your team can own every generated file.';

  return (
    <main className="site-shell">
      <nav className="nav">
        <a className="brand" href="#top"><Terminal size={18} /> Forge TDK</a>
        <div className="nav-links">
          <a href="#stack">Stack</a>
          <a href="#flow">Flow</a>
          <a href="#community">Community</a>
        </div>
        <a className="icon-link" href="https://github.com/flisk-sh/create-flisk" target="_blank" rel="noreferrer" aria-label="Open GitHub repository">
          <ExternalLink size={19} />
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy-block">
          <p className="hero-kicker">The create-t3-app idea, rebuilt for local-first TDK systems.</p>
          <h1>
            The fastest way to start a real TDK stack
            <span className="inline-image" aria-hidden="true" />
          </h1>
          <p className="hero-copy">
            Scaffold Bun, Node.js, TypeScript, Docker, Traefik, Tilt, Prisma, PostgreSQL, NATS JetStream, Infisical, Playwright, and AGENTS.md without turning your repo into a platform you cannot inspect.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#stack"><Play size={17} /> See the stack</a>
            <a className="button secondary" href="https://github.com/flisk-sh/create-flisk" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <div className="command-bar">
            <code>{command}</code>
            <button onClick={copyCommand} aria-label="Copy install command">{copied ? <Check size={18} /> : <Copy size={18} />}</button>
          </div>
        </div>

        <div className="console-card">
          <div className="console-top"><i /><i /><i /><span>create-tdk-stack</span></div>
          <div className="console-body" ref={terminalRef} />
        </div>
      </section>

      <section className="marquee" aria-label="Included technologies">
        <div className="marquee-track">
          {[...stack, ...stack].map(([name], index) => <span key={`${name}-${index}`}>{name}</span>)}
        </div>
      </section>

      <section className="stack-section" id="stack">
        <div className="section-head">
          <h2>The best parts of a modern app stack, selectable in one CLI.</h2>
          <p>Small like create-t3-app, but aimed at full local landscapes: services, routes, secrets, databases, events, tests, and agent-readable docs.</p>
        </div>
        <div className="stack-grid">
          {stack.slice(0, 7).map(([name, Icon, copy], index) => (
            <article className={`stack-tile tile-${index + 1}`} key={name}>
              <div className="tile-image" />
              <div className="tile-content">
                <Icon size={28} />
                <h3>{name}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="stack-chips">
          {stack.slice(7).map(([name, Icon]) => (
            <span key={name}><Icon size={17} /> {name}</span>
          ))}
        </div>
      </section>

      <section className="accordions">
        {featureCards.map(([title, copy]) => (
          <article className="accordion-card" key={title}>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="manifesto">
        <h2>{manifesto.split(' ').map((word, index) => <span className="reveal-word" key={`${word}-${index}`}>{word} </span>)}</h2>
      </section>

      <section className="build-flow" id="flow">
        <div className="flow-copy">
          <h2>From blank folder to live topology.</h2>
          <p>Forge TDK keeps the demo concrete: manifests, generated files, health checks, hot reload, secrets, diagrams, and tests all land in the repo.</p>
        </div>
        <div className="flow-stack">
          {[
            ['Answer prompts', 'Pick Bun or Node, choose service shapes, add Docker, Traefik, Tilt, data, queues, and tests.'],
            ['Generate files', 'Write service.json, routes, Dockerfiles, Prisma schema, env contracts, C4 diagrams, and AGENTS.md.'],
            ['Boot locally', 'Run tdk up and get selective startup, hot reload, verified secrets, and healthy service URLs.']
          ].map(([title, copy]) => (
            <article className="flow-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="community" id="community">
        <h2>Start small. Keep the whole landscape.</h2>
        <p>Forge TDK is for teams who want quick starts without mystery meat infrastructure.</p>
        <div className="community-actions">
          <a className="button primary" href="https://github.com/flisk-sh/create-flisk" target="_blank" rel="noreferrer">Contribute</a>
          <a className="button secondary" href="https://github.com/flisk-sh" target="_blank" rel="noreferrer">TDK Landscape</a>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
