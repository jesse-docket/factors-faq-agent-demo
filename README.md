# Factors resource demo

Static GitHub Pages demo for reviewing Factors Guide. The site includes 11 written session summaries, two illustrative tools, resource indexes and FAQs. No report-generation, email-submission or video backend exists.

## Content and routes

`data/resources.json` is the shared resource catalog. IDs W01–W11 and LM01–LM02 are stable across page content and the separately delivered routing workbook. Every source URL maps to a local destination under `/factors-faq-agent-demo/`. Source pages were refreshed on 21 September 2026. Event dates and page dates have different meanings; archive entries are labeled.

## Rebuilding pages

Run `python3 scripts/build.py` after editing `data/resources.json`. The generator updates all 16 HTML pages; shared styling and behavior live in `assets/`. The private workbook and prompt exports are generated from the same catalog outside this repository.

## Widget and walkthrough

`assets/widget.js` contains the deployment snippet verified in agent e2c5be3b-40f6-4570-b63a-3ed25af0fe70's Deploy tab. Normal pages load the widget once. Add `?walkthrough=1` to suppress the embedded widget inside Docket's Demo browser. Internal links preserve this mode; ordinary browsing does not inherit it across unrelated sessions.

The Demo sandbox starts at https://jesse-docket.github.io/factors-faq-agent-demo/?walkthrough=1 and requires no login. Prompts and internal routing workbooks are delivered separately and must not be committed here.

## Repeatable demo tests

Normal pages include **Reset agent session** at the bottom left. It disconnects the current widget call, clears injected context and the Docket conversation/visitor keys verified in the public SDK, expires its `_docket_id` cookie, then reloads the current page. It leaves unrelated browser storage and consent cookies intact. Saved dashboard conversations are not deleted. If local storage cannot be reset, the control reports that limitation instead of claiming success.

Use reset between independent test cases, not between turns in one conversation or before checking conversation-aware FAQs. Keep only one demo tab active during testing. The control is absent in `?walkthrough=1`, where the nested widget is also suppressed. This is a local browser reset; it does not erase server-side company context or promise a different inferred account.

Shared styling restores the Factors logo, near-black text, cream panels, yellow highlights and red actions. The local logo asset comes from the public Factors website; page content, URLs, resource IDs, FAQ markup and agent deployment ID are unchanged.

## Deployment

GitHub Pages publishes the main branch using the existing repository configuration. All routes are directories with index.html, so direct links and refreshes work without a routing server. Keep the project base path on all asset and navigation URLs.

## Legacy documentation

`docs/faq-agent-config.md` is a historical record of a prior offer-led experiment. Its credit, discount and trial claims are not approved guidance for this content-first demo. Use the new privately delivered prompt pack.

## Rollback

The pre-change deployment is commit b6cd454c1d6c53c14909d3485086c08b79b1dbd6. Revert the demo implementation commit(s) through a new commit to restore the prior site; do not force-push history. The agent's prompt/configuration rollback is separate from the website.
