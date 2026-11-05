# Publish piavpnjs to npm

The published npm package is named **piavpnjs** (not `piajs`). The first release containing TypeScript declarations is **1.0.4**.

## One-time npm trusted publisher setup

Use the npm account that already owns `piavpnjs`:

1. Open https://www.npmjs.com/package/piavpnjs and navigate to **Settings → Trusted publishing**.
2. Add a **GitHub Actions** publisher:
   - GitHub username: `vanovarderesyan`
   - Repository: `piajs`
   - Workflow filename: `publish.yml` (the exact filename, not its full path)
   - Environment: leave blank
   - Allowed action: **Allow npm publish** (required for direct publication).
3. Save. No npm token or GitHub Actions secret is required.

The repository workflow is `.github/workflows/publish.yml`. GitHub runs it when `package.json` changes on `main` or when you manually choose **Actions → Publish to npm → Run workflow**.

If the automated publish ran before trusted publishing was enabled, open the failed run and choose **Re-run failed jobs**, or manually start the workflow on `main`.

The workflow tests the package, verifies its type declarations and contents, and then publishes with GitHub Actions OIDC. npm should automatically attach provenance for this public repository.

## Verification

After a successful run:

```sh
npm view piavpnjs version
npm view piavpnjs@1.0.4 types
npm install piavpnjs@1.0.4
```

Do not publish the same version twice: published npm versions cannot be overwritten.

See the official documentation: https://docs.npmjs.com/trusted-publishers/
