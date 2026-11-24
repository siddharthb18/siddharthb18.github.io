/* Hand-drawn SVG diagrams for projects that have no public screenshot. They show structure, not results. */

const T = { fontFamily: "var(--mono)", fontSize: 11 } as const;

/** DIP set dueling: leader sets for each policy vote through one saturating counter. */
export function SetDuelingDiagram({ title = true }: { title?: boolean }) {
  const rows = 16;
  const kind = (r: number) => (r % 8 === 1 ? "lip" : r % 8 === 5 ? "bip" : "f");
  return (
    <svg viewBox="0 0 420 300" role="img" aria-labelledby={title ? "sd-t" : undefined} className="diagram">
      {title && <title id="sd-t">Diagram of DIP set dueling: some cache sets always use LRU insertion, some always use BIP, and a 10-bit counter decides which policy the remaining sets follow.</title>}
      <text x="20" y="22" style={T} className="d-muted">last-level cache sets (sample)</text>
      {Array.from({ length: rows }, (_, r) => {
        const k = kind(r);
        return (
          <g key={r}>
            <rect x="20" y={34 + r * 15} width="150" height="11" rx="2" className={`d-set d-${k}`} />
            {k !== "f" && <text x="178" y={43 + r * 15} style={{ ...T, fontSize: 10.5 }} className={`d-${k}-t`}>{k === "lip" ? "LRU leader" : "BIP leader"}</text>}
          </g>
        );
      })}
      <rect x="262" y="110" width="140" height="64" rx="6" className="d-box" />
      <text x="332" y="132" textAnchor="middle" style={{ ...T, fontSize: 12 }} className="d-ink">PSEL</text>
      <text x="332" y="149" textAnchor="middle" style={T} className="d-muted">10-bit saturating</text>
      <text x="332" y="164" textAnchor="middle" style={T} className="d-muted">counter</text>
      <text x="332" y="88" textAnchor="middle" style={T} className="d-lip-t">miss in an LRU set: +1</text>
      <path d="M332 94 L332 106" className="d-line" markerEnd="url(#a)" />
      <path d="M332 190 L332 178" className="d-line" markerEnd="url(#a)" />
      <text x="332" y="204" textAnchor="middle" style={T} className="d-bip-t">miss in a BIP set: −1</text>
      <text x="332" y="252" textAnchor="middle" style={T} className="d-muted">the other sets follow</text>
      <text x="332" y="267" textAnchor="middle" style={T} className="d-muted">whichever policy is winning</text>
      <defs>
        <marker id="a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" className="d-arrow" />
        </marker>
      </defs>
    </svg>
  );
}

/** Movie review pipeline: eight models plus DistilBERT features, combined by majority vote. */
export function EnsembleDiagram({ title = true }: { title?: boolean }) {
  const box = (x: number, y: number, w: number, h: number, lines: string[], cls = "d-box") => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" className={cls} />
      {lines.map((l, i) => (
        <text key={l} x={x + w / 2} y={y + h / 2 + (i - (lines.length - 1) / 2) * 15 + 4} textAnchor="middle" style={T} className={i === 0 ? "d-ink" : "d-muted"}>{l}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 420 300" role="img" aria-labelledby={title ? "en-t" : undefined} className="diagram">
      {title && <title id="en-t">Pipeline diagram: 50,000 IMDb reviews feed five PySpark MLlib models and three TensorFlow networks, with DistilBERT sentence embeddings; a majority vote combines them.</title>}
      {box(130, 14, 160, 40, ["50,000 IMDb reviews"])}
      {box(14, 92, 120, 70, ["5 MLlib models", "XGBoost, SVM, LR,", "RF, naive Bayes"])}
      {box(150, 92, 120, 70, ["DistilBERT", "sentence", "embeddings"])}
      {box(286, 92, 120, 70, ["3 TF networks", "CNN, LSTM,", "feed-forward"])}
      {box(130, 200, 160, 40, ["Majority vote"], "d-box d-accent")}
      <path d="M210 54 L74 92 M210 54 L210 92 M210 54 L346 92" className="d-line" />
      <path d="M74 162 L210 200 M210 162 L210 200 M346 162 L210 200" className="d-line" />
      <text x="210" y="266" textAnchor="middle" style={T} className="d-ink">ensemble 93.4% · best single (LSTM) 92.4%</text>
      <text x="210" y="284" textAnchor="middle" style={T} className="d-muted">accuracy, from the course report</text>
    </svg>
  );
}
