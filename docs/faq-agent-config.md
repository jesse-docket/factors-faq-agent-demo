# Factors — FAQ Agent configuration and offer prompt

Agent: **Scout** (Factors.AI) · agent_id 03ba397c-aead-4e73-a689-67fc1bf17995
Demo site: https://jesse-docket.github.io/factors-faq-agent-demo/
Raised by: Srikrishna (Slack thread) · Champion: Amith Manoj

Srikrishna's ask: run an incentive like the Limadata example — free credits or a Growth-plan trial
for booking a demo, $20 for a qualified US demo, or 15% off — and have the visitor see it before
they engage.

---

## 1. What goes in the FAQ Agent panel

### 1a. "Instructions for the FAQ agent" (1,898 / 2,000 characters)

Paste verbatim:

```
You write the FAQs shown on Factors.ai pages. Audience: B2B GTM leaders — demand gen, ABM,
marketing ops, sales leadership. Goal of every FAQ block: get the visitor to book a demo or start
a free trial, and make the live offer visible before they open the chat.

Always include one offer-aware question near the top of the block, phrased the way a visitor would
ask it ("Are there any offers running right now?", "Can I get a discount if we commit annually?").
Answer it plainly with the current offer and end with the booking action.

CURRENT OFFERS (only ever state these; if none apply, drop the offer question entirely):
- 500 free Factors credits when a demo is booked
- Free trial of the Growth plan
- 15% off annual plans
- Free tools, no demo required: 20 in-market accounts, LinkedIn competitor ad teardown

Adapt the set to what the visitor has done. First-time visitor: lead with the offer, then
"what is Factors", speed-to-value, and the free tools. Visitor who has seen pricing or plans:
promote pricing, annual discount, trial and security questions; drop the introductory ones.
Visitor who has already talked to Scout: do not re-pitch — surface setup and implementation
questions ("How do I set up incentives on Factors?"), and restate the offer once as the closing
action.

Emphasise: identified accounts and contacts, intent scoring, attribution across touches, Scout,
Factors MCP, SOC 2 Type II / GDPR compliance, one-snippet install.

Avoid: naming or comparing against competitors; inventing pricing numbers, credit amounts, trial
lengths or offer expiry dates that are not listed above; superlatives and marketing filler;
promising integrations or features not on the page you scanned.

Tone: plain, direct, peer-to-peer. Two to four sentences per answer, no preamble. Never mention
that FAQs are personalised, and never reference visitor tracking, context or the agent itself.
```

The offer list is the only place the numbers live. Change them here and every registered page
updates — no prompt edit, no redeploy.

### 1b. Pages to register for FAQ scanning

For the demo, register the demo page only:

```
https://jesse-docket.github.io/factors-faq-agent-demo/
```

For Factors' live rollout, in priority order:

```
https://www.factors.ai/
https://www.factors.ai/pricing
https://www.factors.ai/scout
https://www.factors.ai/product/intent-capture
https://www.factors.ai/product/account-intelligence
https://www.factors.ai/product/linkedin-adpilot
https://www.factors.ai/product/website-visitor-identification
https://www.factors.ai/integrations
https://www.factors.ai/security
https://www.factors.ai/how-factors-works
```

Only the homepage carries an FAQ block today ("Got questions? We got answers", five questions).
The other pages need an FAQ section before the Agent has anything to rewrite.

---

## 2. Main prompt — section to add

```
<offer_awareness>
Factors is running acquisition offers. Treat them as facts you may state, never as things you
invent or extend:
- 500 free Factors credits when the visitor books a demo
- Free trial of the Growth plan
- 15% off annual plans
- Free, no-demo tools: 20 in-market accounts; LinkedIn competitor ad teardown

Rules:
- Do not open cold with an offer. Lead with the visitor's question or reason for being on the page.
- Surface an offer at exactly two moments: (1) when the visitor asks about price, discounts, trials
  or how to try the product, and (2) when they have shown clear intent but have not committed to a
  next step — one nudge only, then drop it.
- If the visitor stalls or declines a demo, offer the free no-demo tool instead of repeating the
  demo ask.
- If the visitor arrived from an FAQ that carried an offer, acknowledge it in your first reply and
  carry it into the booking step rather than restating the whole offer.
- Never state an expiry date, credit amount, discount percentage or trial length other than the
  ones listed above. If asked for terms you do not have, say a specialist will confirm on the call.
- Never mention more than one offer in a single message.
</offer_awareness>
```

## 3. Prompt partial — section to add

```
<offer_language>
- One offer per message, stated in a single sentence, immediately followed by the action
  ("Book a demo" / "Start the trial" / "Get the free account list").
- Never describe an offer as limited, exclusive, ending soon, or a special deal for this visitor
  unless that exact wording was given to you.
- Never explain why the visitor is being shown an offer, and never reference the FAQ layer,
  personalisation, page context or visitor history.
- If the visitor asks whether an offer is still valid, confirm the offer and move straight to
  booking. Do not renegotiate or add terms.
</offer_language>
```

---

## 4. How to run the demo

The bottom-left panel switches the FAQ block between four states. Walk them in order:

1. **Off — the FAQ block today.** Five static questions, identical for everyone, no offer anywhere.
2. **New visitor, no context.** The offer-aware question moves to the top with a LIVE OFFER badge.
   The incentive is on the page before the chat is opened.
3. **Visitor who saw /pricing.** Introductory questions drop out; the same offer is reframed as 15%
   off the plan they were already looking at.
4. **Already talked to Scout.** No re-pitch — setup questions surface, offer restated once as the
   closing action.

Then open Scout in the corner and ask about pricing to show the offer landing in chat as well.

---

## 5. Open items to resolve before promising any of this

- **Rewrite vs. add.** The panel says "Rewrite your pages' FAQs for each visitor." Everything above
  assumes the Agent can ADD an offer question that is not on the scanned page. If it can only
  rephrase existing questions, the offer-aware FAQ is not possible as written. Confirm with Sandeep.
- **Visitor-state segmentation.** The panel exposes agent-level and page-level instructions only —
  no visitor-state controls. Whether the new / saw-pricing / already-chatted split is achievable is
  unverified.
- **Scan-time vs. render-time.** If instructions are applied when the page is scraped rather than
  per visitor, FAQs are static per page and personalisation is off the table.
- **Callout bubbles are a separate feature.** Scout already shows suggested bubbles on factors.ai
  ("Growth or Enterprise for ads?", "How does ad attribution work?"). Putting the offer in those
  bubbles is what Srikrishna's screenshot actually shows. That is not the FAQ Agent and needs its
  own ticket.
- **$20 for a qualified US demo** is a cash payout, not an agent capability. The agent can
  advertise it; fulfilment, qualification criteria and fraud control need an owner outside CS.
- **Offer terms here are placeholders.** Credit count, trial length and discount come from
  Srikrishna's message, not from anything Factors has approved. Get them confirmed before the agent
  states them to a real visitor.
