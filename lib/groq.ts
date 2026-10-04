// GROQ sorgu etiketi — editörde sözdizimi vurgusu sağlar, çalışma zamanında düz metin döner.
// (`groq` paketindeki işlevin aynısı; yalnızca bunun için bağımlılık taşımamak adına burada.)
export function groq(strings: TemplateStringsArray, ...keys: unknown[]): string {
  const last = strings.length - 1;
  return strings.slice(0, last).reduce((acc, s, i) => acc + s + keys[i], "") + strings[last];
}
