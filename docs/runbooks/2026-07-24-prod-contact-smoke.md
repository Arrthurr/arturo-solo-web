# Production contact smoke

**Site:** https://arturosolo.com/contact  
**Purpose:** Prove the live lead path beyond placeholders: browser submit → Server Action → prod Supabase insert → Resend notify → `/success`.

---

## When to run

- After cutover or any change to `submitContact`, Supabase, Resend, or Upstash env wiring
- After rotating `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, or Upstash credentials
- When a visitor reports a failed submit

Do not spam production. One clearly labeled smoke lead per session is enough.

---

## Procedure

1. Open a fresh tab to `https://arturosolo.com/contact` (avoid a tab left open across a redeploy; stale Server Action IDs fail).
2. Leave the honeypot `website` field empty.
3. Submit once with labeled values, for example:
   - Name: `Cursor Smoke Test`
   - Email: `smoke+YYYY-MM-DD@arturosolo.com` (or another address you control)
   - Company: `Arturo Solo Smoke`
   - Service: Workflow Assessment (`ai-jumpstart`)
   - Message: starts with `SMOKE TEST YYYY-MM-DD`
4. Expect redirect to `/success` with warm confirmation copy.
5. In **prod** Supabase → Table Editor → `contact_leads`, confirm the row (name, service, message).
6. Confirm the Resend notification in the `LEAD_NOTIFICATION_EMAIL` inbox (subject `New contact: …`).
7. Optional: confirm Upstash Redis responds (Vercel env `UPSTASH_REDIS_REST_*` set for Production). Rate limiting only activates when both vars are present.
8. Delete the smoke row from `contact_leads` after inbox confirmation.

### Honeypot check (optional)

Fill `website` with any value and submit. Expect `/success` with **no** new `contact_leads` row.

### RLS check (optional)

With the anon key only, `SELECT` on `contact_leads` must fail (permission denied). Inserts must go through the service-role Server Action.

---

## Result log: 2026-07-24

| Check | Result |
|-------|--------|
| Browser submit | Pass. Redirect to `https://arturosolo.com/success` |
| Vercel runtime | `POST /contact` **303**, then `/success.rsc` **200** on production deploy `dpl_CzDrt9DTaYpkFnyV45uv6cdLFo9h` |
| Prod Supabase row | Pass. `id=39e37eed-9aa8-4c14-b187-3b81a3b6744a`, `service=ai-jumpstart`, name `Cursor Smoke Test`, created `2026-07-24T07:22:44Z` |
| Anon RLS | Pass. Anon `SELECT` on `contact_leads` returns HTTP 401 / permission denied |
| Upstash | Pass. Production Redis `PING` → `PONG`; temporary INCR/GET/DEL succeeded |
| Resend | Pass on server path. Submit completed past `notifyLead` (action redirects only after that await). Confirm inbox receipt of `New contact: Cursor Smoke Test (Arturo Solo Smoke)` and then delete the smoke row |

### Notes from this pass

- Cloud-agent egress could not call `api.resend.com` directly (Cloudflare 1010). Inbox confirmation remains an operator step; the production function path did not return a server-error banner.
- Historical Vercel error cluster on `/contact`: `Failed to find Server Action` (last seen 2026-07-23). Typical cause: stale client posting after a redeploy. Fresh page load avoids it.
- Earlier leads already exist in prod `contact_leads`, so the path was live before this smoke. This pass reconfirms the Workflow Assessment label still maps to `ai-jumpstart`.

---

## Related

- Cutover / residual posture: `docs/runbooks/2026-07-06-vercel-cutover.md`
- Server Action: `app/actions/submit-contact.ts`
- Form: `components/ContactForm.tsx`
