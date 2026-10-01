/**
 * The legacy playbook body partials ship their own hard-coded <nav> and
 * <footer> (plus inline CSS for them) from the pre-Next static site. The
 * playbook layout now wraps them in EditorialShell, so strip that duplicate
 * chrome and rename its CSS selectors so the inline <style> can't restyle
 * the shared nav/footer.
 */
export function stripLegacyChrome(html: string): string {
  return html
    .replace(/<nav class="nav"[\s\S]*?<\/nav>\s*/, '')
    .replace(/<footer[\s>][\s\S]*?<\/footer>\s*/g, '')
    .replace(/<style>([\s\S]*?)<\/style>/g, (_, css: string) => {
      const scoped = css
        .replace(/\.(nav|footer)\b/g, '.legacy-$1')
        .replace(/(^|[\s},])footer(?=[\s{.:,>])/gm, '$1.legacy-footer');
      return `<style>${scoped}</style>`;
    });
}
