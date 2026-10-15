# Rede Inspira: combined CSS and JS (register + login)

One stylesheet and one script for the register page (`/register`) and the login pages
(`/login`, `/sign-up`, `/login-with-code`). They are the two page themes joined together:
- `../redeinspira-register-theme/` (register page)
- `../redeinspira-login-theme/` (login pages)

Each page's README lists what was fixed and why.

```
redeinspira-combined/
|-- css/redeinspira.css   <- part 1: register page, part 2: login pages
|-- js/redeinspira.js     <- part 1: register page, part 2: login pages
`-- README.md
```

## Install

Put these two tags in the platform's custom code (the tracking header field), in place of
the current `new-code/master.css` and `new-code/custom.js` lines:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Hpshiva/webifairs-custom-code@COMMIT/combined/redeinspira.css">
<script src="https://cdn.jsdelivr.net/gh/Hpshiva/webifairs-custom-code@COMMIT/combined/redeinspira.js" defer></script>
```

Use a commit hash or tag instead of `@main`. jsDelivr can keep serving an old `@main` copy
for up to 12 hours.

**Do not load the old files at the same time** (`master.css`, `custom.js`, `new-code/*`,
`register/*`, `login/*`). Two copies of the scripts fight over the same elements.

## Which part runs where

- **Register script:** runs only on the register page (`/register`, or a page with the
  register header `#headerTop`). On other pages it does nothing.
- **Login script:** runs only when the platform's login layout is on the page.
- **Login styles:** all scoped to the login layout. Some of them used to apply to every
  page, including a rule that resized any Bootstrap `col-lg-4` column.
- **Register styles:** like the original `master.css`, they also style the platform's
  popups. Load this file only on the register and login pages, as the tracking header does.

## Changes in this version

1. **Phones and tablets, the form could not be filled in:** with two popups open (the
   platform's ticket sheet plus the form), the click-outside code only looked at the first
   popup, the ticket sheet. Every tap inside the form counted as "outside": it was blocked
   and a close was triggered, so dropdowns, radio buttons and checkboxes did not work. Now a
   tap inside any open popup counts as inside.
2. **Phones and tablets, two popups:** the ticket sheet is hidden while the form is open, and
   closes together with the form. This works for every Register button, including the
   platform's own.
3. **The register script is limited to the register page,** so it is safe in a combined file.
4. **Login styles are scoped to the login pages** (see above).

## Tested

- **Earlier versions:** tested live (see each page README).
- **Not yet tested live (changes 1 to 4):** the built-in test browser started blocking
  webifairs' own scripts, so the register page would not load, and Claude in Chrome was not
  connected. Checked so far: syntax, plain ASCII, balanced CSS braces, and one `@import`
  at the top.
- **To do once a browser works:** on a phone (375px) and a tablet (768px and 1024px), tap
  Register, fill every field type with test data without submitting, close the form, and
  confirm nothing else stays open. Then check the layout at 1920px and 2560px.
