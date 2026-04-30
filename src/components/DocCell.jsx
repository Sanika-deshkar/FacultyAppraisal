
function DocCell({ id, docs, setDocs }) {
  const ref = useRef();

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
      type: f.type,
    }));
    setDocs((p) => ({ ...p, [id]: [...(p[id] || []), ...newFiles] }));
  };

  const removeFile = (idx) => {
    setDocs((p) => {
      const updated = [...(p[id] || [])];
      updated.splice(idx, 1);
      return { ...p, [id]: updated };
    });
  };

  const files = docs[id] || [];

  return (
    <div style={S.docCellWrap}>
      {files.map((f, idx) => (
        <div key={idx} style={S.docPill}>
          <span style={{ color: "#10b981", fontWeight: "bold" }}>✔</span>
          <span style={S.docPillName} title={f.name}>{f.name}</span>
          <button onClick={() => removeFile(idx)} style={S.docPillDel}>✕</button>
        </div>
      ))}
      <div style={S.dropArea} onClick={() => ref.current.click()}>
        <span style={{ fontSize: 10, color: "#64748b" }}>📎 Attach</span>
        <input
          ref={ref} type="file" multiple
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}