import type { BlogCategory, BlogPost, PostSummary } from '@/types/blog';

/**
 * Engineering notes. Newest first is enforced by `sortedPosts`, not by the
 * order of this array.
 *
 * `content` is a trusted, statically authored HTML fragment rendered inside a
 * `.prose-wtd` container. It never contains user input.
 */
export const blogPosts: BlogPost[] = [
  {
    id: '15',
    slug: 'flaky-end-to-end-tests',
    title: 'Flaky End-to-End Tests: Isolation, Determinism and Quarantine',
    excerpt:
      'A test that fails one run in four and passes on re-run is usually a defect with a working alarm. Retries hide the evidence, quarantine files it \u2014 and the classification decides which fix you actually need.',
    content: `<p>There is a checkout test in a suite that fails about one run in four, and has done for months. It fails on CI, passes on the retry, and everyone has learned the ritual: the build goes red, somebody hits re-run, the second attempt is green, the pull request merges. The test has been called flaky so many times that the word has stopped meaning anything. Last week an order was charged twice in production \u2014 a race the test had been reporting, in the only way a failing test can report something, for months.</p>

<p>The test was never flaky in any useful sense. It was intermittently correct, which is the most valuable thing a test can be and the exact category teams are trained to stop reading. This note is about the difference between those two descriptions, and about the two mechanisms that decide which one your team ends up believing: retries, and quarantine.</p>

<h2>A flake is a pass and a fail on the same code</h2>

<p>Start with a definition that removes the ambiguity. A test is flaky when it produces different results against <strong>identical code</strong> \u2014 same commit, same source, both a pass and a fail in the record. That is not an opinion about the test; it is a fact you can measure, and it means the suite is being decided by something other than the thing under test.</p>

<p>There are exactly two places that something can live, and telling them apart is the whole job:</p>

<ul>
  <li><strong>The nondeterminism is in the test or the environment.</strong> A snapshot read where an assertion was needed, data two parallel workers share, an unmocked third-party script, a clock that crosses midnight, a runner under memory pressure. The product is fine; the measurement is not.</li>
  <li><strong>The nondeterminism is in the product.</strong> A genuine race \u2014 a double submit, an optimistic UI that reports success the server never confirmed, a read that can happen before the write it depends on. The test is doing its job, badly, and the defect ships.</li>
</ul>

<p>A green retry cannot distinguish those two. It does not know which one it just suppressed, and it never will, because the evidence it would need was the failing run \u2014 the trace, the network log, the DOM snapshot at the moment of failure \u2014 and the retry overwrites it with a passing one.</p>

<blockquote>A retry answers one question: can this test ever pass? It never answers the question you need: is the thing underneath it broken?</blockquote>

<h2>Retries convert a finding into a green checkmark</h2>

<p>Retries are not useless; they are a tool that got promoted into a policy. Set to absorb genuine infrastructure blips \u2014 a runner that lost its network for two hundred milliseconds \u2014 they are reasonable. Set globally and left there, they become the mechanism by which a suite reports success while measuring something broken.</p>

<p>The arithmetic is unforgiving. Take a test that fails one run in four. With two retries, three attempts, the build goes red only when all three attempts fail, which is about 1.6% of runs. The suite reports green on 98% of runs of a defect that a quarter of your users would hit on their first attempt. Nothing has been stabilised. The failure has been moved to a place the pipeline does not look.</p>

<p>Two habits keep retries honest rather than corrosive. Cap them, and make the cap explicit, because an unbounded retry is a suite that cannot fail. And <strong>keep a retry-passed test as its own outcome rather than folding it into "passed"</strong>. Playwright already draws this line for you: a test that fails and then passes on retry is reported as <code>flaky</code>, which is neither a pass nor a fail, and a report you can filter on. The failure is not in the runner. It is in the pipeline that reads a flaky count of zero and prints a green tick.</p>

<p>So the first change is not a threshold or a tool. It is that a flake becomes a named work item, and the question asked about it is which of the two categories above it belongs to \u2014 not whether re-running it works. It does. That is the problem.</p>

<h2>Classify first, then fix</h2>

<p>Trying to fix a flake without classifying it is how teams add a wait, remove a wait, add it back, and eventually quarantine the test with no more understanding than when they started. There are a small number of root causes, and each leaves a different signature in the record. Read the signature first \u2014 the trace of the failing attempt, not the passing one.</p>

<table>
  <thead>
    <tr><th>Signature</th><th>What it usually is</th><th>Where the fix belongs</th></tr>
  </thead>
  <tbody>
    <tr><td>Intermittent timeout on an action; the element was present in the trace</td><td>The assertion read a snapshot instead of polling, or an async call was never awaited</td><td>Test: web-first assertions, and lint for floating promises</td></tr>
    <tr><td>Passes alone, fails in the full suite or at higher parallelism</td><td>Shared state \u2014 a user, a row, a file, a stub server two workers both own</td><td>Test: per-test data, a real reset boundary, isolated authentication</td></tr>
    <tr><td>Fails only on CI, never locally, worse under load</td><td>Runner contention. The test is not slow; the machine is</td><td>Infrastructure and budget: fewer workers per runner, sane timeouts</td></tr>
    <tr><td>Fails on a schedule: midnight, month end, a timezone boundary</td><td>The test is reading the real clock or the real locale</td><td>Test: freeze time, pin timezone and locale</td></tr>
    <tr><td>Fails when a third party is slow or rate-limits</td><td>An unmocked external dependency donating its uptime to your pipeline</td><td>Stub at the network layer, or quarantine it and label it as external</td></tr>
    <tr><td>Fails on a double submit, a duplicate row, a lost update</td><td>Not a test problem. A product race the test is correctly catching</td><td>Product: this is the one you wanted to find</td></tr>
  </tbody>
</table>

<p>Two rows are the ones teams get wrong for a long time. The last one is a defect and belongs on the bug board, not in the test backlog. The environment row is more insidious, because "passes locally, fails on CI" gets diagnosed as flakiness by default \u2014 and a test failing because the runner ran out of memory is not a test problem at all. Making the suite lighter or the runner bigger is a legitimate fix, and treating it as a test issue spends a week in the wrong repository.</p>

<h3>What auto-waiting covers, and what it does not</h3>

<p>Modern browser runners removed an entire category of flake by waiting before acting. Before a click, Playwright checks that the element is attached to the DOM, visible, stable across frames, enabled, and actually receiving pointer events. None of that needs a sleep, and the old habit of pausing for a fixed two seconds is a guess that is sometimes too short and always too long.</p>

<p>The boundary is sharp, and most remaining timing flake sits just past it. Auto-waiting understands <em>actionability</em>. It has no idea about your application's semantics \u2014 that a dashboard painted skeleton rows before real ones, that a list re-sorts after it renders, that a button enables itself before the request that validates the input has returned. In those cases the element is genuinely ready to be clicked and the application is not ready to be clicked. The fix is to assert the outcome a user would see, and let the assertion poll until reality matches, rather than asserting on whichever intermediate state happens to exist right now.</p>

<p>That distinction explains the flake that is never fixed by adding a wait:</p>

<pre><code>// Reads the DOM once, at this instant, and compares. If the UI has not
// updated yet the assertion fails, even though it would pass 100ms later.
const status = await page.getByTestId('status').textContent();
expect(status).toBe('Paid');

// Polls the same locator until the condition holds or the timeout expires.
await expect(page.getByTestId('status')).toHaveText('Paid');</code></pre>

<p>Assertions that poll are the difference, and the pattern extends past element state. <code>locator.count()</code> and <code>locator.all()</code> return a snapshot rather than a live view, so a loop over a list that is still loading iterates the wrong number of items \u2014 wait for the expected count first, then iterate. Where a value settles over time rather than a single element's state, retry the whole check instead of the individual read.</p>

<h3>Register the listener before the action</h3>

<p>The other timing defect is order, not duration. Waiting for a response after triggering the request is a race you lose whenever the server is fast:</p>

<pre><code>// The response can arrive before anything is listening for it,
// and the wait never resolves.
await page.getByRole('button', { name: 'Place order' }).click();
const response = await page.waitForResponse((r) =&gt; r.url().includes('/api/orders'));

// Listen first, then act. The promise captures the response whatever the timing.
const responsePromise = page.waitForResponse((r) =&gt; r.url().includes('/api/orders'));
await page.getByRole('button', { name: 'Place order' }).click();
const response = await responsePromise;
expect(response.status()).toBe(201);</code></pre>

<p>The same rule covers stubbing: register the route handler before the navigation that triggers the request it is meant to serve. This class of bug is invisible on a slow local backend and appears on fast CI runners \u2014 exactly backwards from the intuition that a faster environment should be more reliable.</p>

<h2>Isolation is a property of the suite, not of the test</h2>

<p>The shared-state flake is the one that survives every timing fix, because it is not a timing problem. The diagnostic is specific and worth memorising: <strong>run the suspect test alone and it passes; run the suite and it fails.</strong> That is not a slow test. That is a test whose inputs were changed by another test \u2014 a user whose data the neighbouring worker just mutated, records from a previous run still sitting in the table, an assertion that assumes "the newest item is mine".</p>

<p>Parallelism makes it worse in a straight line: the more workers you add to keep the suite fast, the more collisions between tests that each assumed they were alone. Three habits remove most of it.</p>

<ul>
  <li><strong>Every test creates what it needs.</strong> Not "a user exists", but this test's user, named after the test, carrying the data the assertions expect. A shared seed fixture is the most common source of order dependence in a browser suite.</li>
  <li><strong>Reset at a real boundary.</strong> Before each test, reset through the API or a transaction, not through the UI. UI setup makes the test's start state depend on the application being healthy, so when the app is broken the failure lands in setup and reads like an infrastructure error.</li>
  <li><strong>Reuse authentication, not state.</strong> Load a pre-authenticated session rather than logging in through the form on every test. The login flow is slow, identical for every test, and not what any of them are testing.</li>
</ul>

<p>There is a temptation to see an order-dependent failure as proof of a concurrency defect in the product, and occasionally that is exactly right \u2014 but only after you have ruled out the suite sharing the database row, the file, or the stub. Isolation first, then ask whether the collision is in your tests or in your transaction handling.</p>

<h2>Remove the inputs you did not choose</h2>

<p>Two more sources of nondeterminism have nothing to do with timing and are cheaper to remove than to investigate, so remove them before they cost you a day of hunting something that will not reproduce.</p>

<p><strong>Time.</strong> Any assertion that depends on the current date, the day of the week, or the local timezone will eventually fail \u2014 once, on a month boundary, at midnight, over a leap day \u2014 which is precisely the shape of a flake that never reproduces. Freeze the clock in the browser and drive it forward deliberately: a five-minute session timeout becomes a test that runs in milliseconds and fails on time rather than on luck. Pin the timezone and locale of the run as well, so a machine in another region cannot change the answer.</p>

<p><strong>Randomness and version drift.</strong> Seed every random source a test depends on. Pin the browser and runner versions, because a suite that runs on whatever image happens to be current this month is a suite whose results cannot be compared across weeks \u2014 and an engine version change produces exactly the "it passed yesterday" signature that gets filed as flake.</p>

<p>One policy does more than any of that: <strong>treat a fixed sleep as a banned pattern, not a discouraged one.</strong> A rule that says "avoid sleeps" leaves room for the case where this one is genuinely needed, and the case is almost never the case. A ban removes the argument outright, and a lint rule that fails on un-awaited async calls removes the other half before it can be committed.</p>

<h2>Quarantine is not a quieter retry</h2>

<p>You now have a test you cannot fix today and cannot let hold the merge queue. The instinct is a bigger retry count. The right mechanism is a quarantine lane, and the difference between the two is the only thing that matters here: <strong>a retry hides the evidence; a quarantine files it.</strong></p>

<p>Take the test out of the blocking suite and put it somewhere it still runs on every commit, still reports, and does not gate the merge. It keeps producing the failing run \u2014 the trace, the classification, the frequency \u2014 which is the data you need to fix it. A retry produces the opposite: a green run that replaces the red one.</p>

<p>Four properties separate a quarantine that works from one that becomes a graveyard, and every failed quarantine process is missing at least one of them.</p>

<ol>
  <li><strong>The quarantined test still runs.</strong> A skipped test is deleted with extra ceremony and a nicer feeling. It must execute on every run and its result must be recorded, or the coverage has been thrown away without anyone admitting it.</li>
  <li><strong>Entry comes from history, never from one red run.</strong> A test that failed once had a bad day. A test with both a pass and a fail recorded against the same commit is flaky by definition, and that is a machine's judgement rather than a tired engineer's.</li>
  <li><strong>Every entry has an owner, a ticket and a date.</strong> Enforce it in CI \u2014 an entry added without a ticket reference should fail a check of its own. A quarantine with no clock is a retry wearing a different name; the date is what turns "we will get to it" into somebody's work item.</li>
  <li><strong>Exit requires evidence.</strong> A test returns to the blocking lane when it has passed a deliberate run of consecutive attempts, not when it happens to be green today.</li>
</ol>

<p>The lane itself is ordinary pipeline configuration \u2014 two projects, one gating and one reporting, with retries disabled in both so a failure in either lane is honest:</p>

<pre><code>// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'blocking',      // Gates the merge. A red run stops the pull request.
      testIgnore: '**/*.quarantine.spec.ts',
      retries: 0,            // A retry here would recreate what we are removing.
    },
    {
      name: 'quarantine',    // Runs and reports on every commit. Does not gate.
      testMatch: '**/*.quarantine.spec.ts',
      retries: 0,
    },
  ],
});</code></pre>

<p>Turning retries to zero inside the quarantine lane is not an oversight. A retry there would smooth over the exact failure the test was moved to study, one level down. Let it be red, and read the pattern.</p>

<p>Two guardrails stop the lane becoming a permanent hole in the suite. Track the number of quarantined tests as a reliability metric in its own right, and treat growth as a signal \u2014 flakiness is outrunning the team's ability to fix it, which is a capacity fact worth acting on rather than a testing detail. And cap the lane, weighted by what the tests protect: five quarantined checkout tests are a bigger blind spot than forty tooltip assertions, and a flat count cannot tell the difference. When the weighted cap is hit, stop admitting entries until the backlog shrinks.</p>

<p>Deletion is a legitimate exit, and saying so out loud is what keeps the process honest. A test that duplicates coverage one level down, or guards something nobody would notice breaking, is worth less than the runtime and the attention it costs. Removing it deliberately is a decision. Leaving it quarantined forever is also a decision \u2014 just one nobody made.</p>

<h2>Defend the gate, or you have not built one</h2>

<p>Every mechanism above rests on the blocking lane being real, and the one configuration error that silently reverses all of it is a branch-protection rule that does not list the blocking lane as required. A gate that is not required is a report.</p>

<p>So verify the separation the way you would verify anything with a consequence: open two deliberately broken pull requests. Break a test in the blocking lane and confirm the merge is refused. Break one in the quarantine lane and confirm the merge is allowed. That pair of runs is the contract, it takes ten minutes, and it is worth repeating whenever branch protection changes \u2014 because a single mislisted check is invisible until the day it matters.</p>

<p>The end state is a suite trusted at zero retries. Not because retries are evil, but because a suite you have to retry is a suite whose red and green both mean less than they should, and once engineers learn that red sometimes means nothing, they stop reading. That is the failure that actually costs you: not the flaky test, but the pipeline nobody believes. We described the same collapse from the other direction in our note on <a href="/blog/llm-eval-gates-in-ci">eval gates that lose their authority</a>, and it is the same mechanism \u2014 a check that reports unreliably is worse than no check, because it charges the upkeep and returns false confidence.</p>

<h2>The suite has to stay fast enough to be run</h2>

<p>One structural point sits under all of the above. A browser suite is the most expensive way to check a behaviour, and its cost is runtime \u2014 so a suite that takes forty minutes gets skipped, or sharded until nobody waits for it, and a skipped gate is not a gate. The end-to-end layer earns its place on the flows where being wrong costs money: checkout, payments, authentication, the one mutation that cannot be taken back. Everything below that belongs in unit and integration tests that run in seconds and fail deterministically.</p>

<p>That is the same rule we apply to coverage in client work \u2014 aim it at risk rather than at a percentage, with a small set of end-to-end tests over the flows that would hurt and the volume of checking pushed down a level where it is cheap and exact. A browser suite budget and a flake programme are the same budget: every test you move out of the browser is a flake you will never have to classify.</p>

<h2>What this means in practice</h2>

<p>Order the work by what the evidence supports, not by what is easiest. Stop folding retry-passed runs into the pass count, and record a flake as its own outcome with a name attached. For each one, read the signature before touching anything: timing, isolation, environment, a clock, or a genuine race in the product. Fix the first four where they live, and move the fifth to the bug board \u2014 the test has already done its job.</p>

<p>Then remove the inputs you did not choose \u2014 freeze time, pin versions, seed randomness, ban the fixed sleep \u2014 and isolate the data so every test owns what it asserts on. Take whatever remains off the merge gate into a lane that still runs, with an owner, a ticket, a deadline, and evidence required to come back. And prove the gate with two deliberately broken pull requests, because the separation between blocking and reporting is what all of it depends on.</p>

<p>None of this is exotic, and none of it is about the model or the framework. It is the ordinary discipline of a measurement you intend to act on: know what varies, control it where you can, and keep the failures you cannot yet explain somewhere a person is still looking at them. If your suite has a test everyone re-runs without reading, <a href="/contact">tell us what it is doing</a> \u2014 cleaning that up is routine work on the delivery pipelines we build, and it starts in the same place as our <a href="/services/software-development">platform and systems engineering</a>. Two related notes: <a href="/blog/ai-qa-automation-test-generation">generated tests and the coverage that catches nothing</a> covers the same trust problem from the unit-test side, and <a href="/blog/ai-code-review-best-practices">reviewing AI-generated code</a> is where the banned-sleep policy and the isolation rules get enforced, because a flake nobody notices at review time is a flake somebody else spends a day on later.</p>`,
    date: '2026-10-08',
    author: 'WeThinkDigital Engineering',
    readTime: '9 min read',
    category: 'Engineering Practice',
    tags: ['end-to-end testing', 'Playwright', 'flaky tests', 'test isolation', 'CI reliability'],
    metaTitle: 'Flaky End-to-End Tests: Why Retries Hide Real Bugs',
    metaDescription:
      'A test that fails one run in four and passes on re-run is a finding, not noise. How to classify end-to-end flake, remove the nondeterminism you control, and quarantine the rest without deleting the signal.',
    keywords: ['flaky tests', 'Playwright flaky tests', 'end-to-end test reliability', 'test quarantine', 'test isolation', 'deterministic browser tests', 'CI test reliability'],
  },
  {
    id: '14',
    slug: 'durable-agent-workflows-retries-compensation',
    title: 'Durable Agent Workflows: Retries, Idempotency and Compensation',
    excerpt:
      'A worker restarts mid-run and the invoice posts twice. Durability is not the model\u2019s problem — it is the gap between doing an effect and recording it, and the three contracts that close it.',
    content: `<p>A run stops at step four of seven. The document was parsed, a record was created in the CRM, an invoice was posted to the accounting system — and then a deploy restarted the worker and the run went quiet. Nothing is corrupt. Nothing is obviously wrong. The only question is what happens next, and the answer was decided months ago, when somebody wrote the first three steps without asking what happens if they run twice.</p>

<p>Restart the run from the beginning and it posts the invoice a second time. Resume it at step four with no memory of the first three and it creates a duplicate CRM record. Leave it failed and a human finishes it by hand, every time, which is fine until it happens forty times a week.</p>

<p>Conversations about reliable agents usually turn into conversations about the model. The model is rarely what broke here. <strong>A multi-step workflow is a distributed system with a non-deterministic component inside it, and it fails the way distributed systems fail</strong> — a process dies in the gap between doing something and recording that it was done. Durability is the set of contracts that close that gap, and none of them are about intelligence.</p>

<h2>At-least-once is the only delivery guarantee you actually get</h2>

<p>Start with the fact no framework can remove. A worker can complete an effect — send the request, charge the card, write the row — and then die before it reports success. The platform cannot know whether the effect happened, so it has exactly one honest option: run the step again. That is at-least-once execution, and it is what you are building against whether or not you have thought about it.</p>

<p>Exactly-once <em>delivery</em> is not on offer. What is achievable is once-or-more-than-once execution with a single observable result: the effect may be attempted twice, and the world must end up as if it happened once. Every technique below exists to move a system from "probably once" to that property.</p>

<blockquote>The durable part of a workflow is not the code surviving a crash. It is the effect surviving being run twice.</blockquote>

<h2>Keep the decisions deterministic and the effects journaled</h2>

<p>Durable execution engines — Temporal, Restate, DBOS, the cloud equivalents — get their durability from a journal: an append-only log of events recording that a step was scheduled, what it returned, that a timer fired, that a signal arrived. When a worker resumes a run, it re-executes the orchestration function from the top and substitutes recorded results for anything that already completed. That is what lets the workflow file read like an ordinary function that somehow survives a crash in the middle of itself.</p>

<p>The price is a determinism contract. Given the same history, the orchestration code must make the same decisions. Anything that could differ between two runs of the same code — reading the clock, generating a random value, calling a model, hitting an API — has to be pushed out into a step whose result is journaled. Reading the time then returns the recorded time on replay, and calling the model returns the recorded completion rather than paying for it again. Engines differ in ergonomics here; the constraint is shared.</p>

<p>For an agent system this split is the whole design. The part that decides <em>which</em> step runs next is control flow and belongs in the deterministic workflow. The model call that produces the decision is non-deterministic, expensive and occasionally side-effecting, so it belongs in a step. Wire that backwards and a routine restart re-invokes the model for every stage the run had already completed — paying twice for work you already own, and getting a different answer the second time, which is a bug that looks like a personality change.</p>

<h2>Idempotency is what makes a retry safe</h2>

<p>Because any step can run more than once, every step that touches the outside world must produce one result whether it executes once or five times. There are two ways to get there and only one of them is dependable.</p>

<ol>
  <li><strong>Make the operation naturally idempotent.</strong> "Set status to cancelled" is safe to repeat; "decrement the counter" is not. Where a side effect can be expressed as a desired end state rather than a delta, express it that way.</li>
  <li><strong>Give the operation a stable key and dedupe on it.</strong> Derive the key from the run and the step — run identifier plus step name — never a fresh identifier per attempt, or a retry looks like new work. The receiving side records the key with its result; a duplicate arrives as the same key and returns the stored result instead of acting again.</li>
</ol>

<p>What decides whether this works is the ordering between writing the key and performing the effect. Write the key first and a crash in between leaves a key claiming work that never happened. Write it last and a crash in between leaves the effect done and unrecorded — the exact duplicate you were trying to prevent. The only ordering that holds is to reserve the key and change the state in one local transaction and let a unique constraint be the arbiter, rather than checking first and inserting second.</p>

<pre><code>async function postInvoice(runId: string, invoice: Invoice) {
  // Stable across every attempt of this step, so a retry carries the
  // same identity as the original call.
  const key = 'invoice:' + runId;

  try {
    // Reserving the key is the guard. A concurrent or repeated attempt
    // hits the unique constraint instead of a read-then-write race.
    await db.idempotency.reserve(key);
  } catch (err) {
    if (isUniqueViolation(err)) return await db.idempotency.get(key);
    throw err;
  }

  // The downstream accepts the same key, so even if this call succeeded
  // and we died before recording it, the second attempt is a no-op there.
  const posted = await accounting.post(invoice, { idempotencyKey: key });
  await db.idempotency.complete(key, posted.id);
  return posted;
}</code></pre>

<p>That code is honest about the hard case rather than hiding it. A crash between reserving the key and completing it leaves an in-flight record, and the retry has to re-drive the effect with the same downstream key — which works only if the downstream honours it — or hand the record to a reconciler that resolves it out of band. Against a third-party API that does not accept idempotency keys, you need your own dedupe table in front of it, because the guarantee has to live somewhere and it will not live on their side.</p>

<p>Where an effect has to leave your database entirely — publishing an event, notifying a service — write the intent in the same transaction as the business change and let a relay deliver it afterwards. This is the outbox pattern, and the failure it exists to prevent is specific: the commit succeeded, the publish failed, and nobody noticed for a week.</p>

<h2>Classify an error before you retry it</h2>

<p>Retries are where a localised failure becomes an outage. A dependency starts timing out, every caller retries three times, and the load on the failing service triples exactly when it needed to shed some. Three decisions contain that.</p>

<h3>Retry transient errors, never permanent ones</h3>

<p>The classification that matters is not how bad the error looks but whether a second attempt could plausibly produce a different outcome — and, separately, whether a second attempt is safe.</p>

<table>
  <thead>
    <tr><th>Failure</th><th>Retry?</th><th>What the retry must be safe against</th></tr>
  </thead>
  <tbody>
    <tr><td>Network error, connection refused — the request never reached the server</td><td>Yes</td><td>Nothing; the effect cannot have happened</td></tr>
    <tr><td>429, 503, 408 — the server answered, under load</td><td>Yes, with backoff</td><td>A duplicate: the request may have been processed before the response failed</td></tr>
    <tr><td>Timeout or 500 — ambiguous</td><td>Only with an idempotency key</td><td>Re-execution of something that already happened</td></tr>
    <tr><td>400, 401, 403, 404, 422 — client errors</td><td>No</td><td>Nothing; a second attempt fails identically and burns the budget</td></tr>
    <tr><td>Model output that violates the schema or the contract</td><td>Not the same way</td><td>Repeating a prompt that failed for a reason the prompt cannot fix</td></tr>
  </tbody>
</table>

<p>That last row is the one agent systems get wrong, because it looks like a retry and is not. A contract violation is a quality problem, not a transport problem. Re-sending an identical prompt to a non-deterministic model is a lottery, and it fails for the same reason often enough to be a waste the rest of the time. Feeding the specific validation error back — this field is missing, this reference does not appear in the supplied passages — is the retry that works. It also deserves a different budget from a rate limit: five attempts at a prompt that cannot satisfy the contract is five model calls spent proving it.</p>

<pre><code>type Decision = 'retry' | 'retry-with-idempotency' | 'no-retry' | 'escalate';

function classify(err: unknown): Decision {
  // The request never left: safe to repeat unconditionally.
  if (isNetworkError(err) || isConnectionRefused(err)) return 'retry';

  const status = httpStatusOf(err);
  if (status === 429 || status === 503 || status === 408) return 'retry-with-idempotency';
  // Ambiguous: the server may have processed it before it died.
  if (status === 500 || isTimeout(err)) return 'retry-with-idempotency';
  // Client errors are stable; volume spent here is volume wasted.
  if (status &amp;&amp; status &gt;= 400 &amp;&amp; status &lt; 500) return 'no-retry';
  // A broken answer is a quality failure: repair the prompt, do not re-roll it.
  if (isContractViolation(err)) return 'escalate';
  return 'no-retry';
}</code></pre>

<h3>Back off with jitter, and cap the total</h3>

<p>Exponential backoff alone is not enough, because every client that failed at the same moment backs off to the same schedule and retries in unison the instant the dependency recovers. Randomising the delay — full jitter across the interval — spreads those attempts out. Then cap the attempt count, and cap total retry volume as well: three attempts per request is a per-request limit, not a system limit, and if the retry rate triples under failure you have converted a partial outage into a complete one. A retry budget expressed as a fraction of normal traffic keeps the amplification bounded even while the dependency stays down.</p>

<p>Exhausted retries need a destination. A permanently failing record should land in a quarantine you can inspect and replay, carrying its input, the error, the attempt count and the run identifier — not vanish, and not block the queue behind it. And a workflow should be able to tell "the thing this step targets is gone" from "this step could not be reached", because the first triggers compensation and the second is simply a wait.</p>

<h2>Compensation is not rollback</h2>

<p>If step five fails after step three has already changed something outside your system, step three cannot be un-run. There is no rollback spanning an email provider, a payment processor and your own database. What exists instead is compensation: a new forward action that produces a state equivalent to having undone the original — a refund rather than a deleted charge, a credit note rather than a recalled invoice, a correction message rather than an unsent email.</p>

<blockquote>A rollback restores the past. A compensation negotiates with it. Any effect visible outside your system can only be compensated, never rolled back, and the design has to start from that.</blockquote>

<p>The mechanics that decide whether it holds:</p>

<ul>
  <li><strong>Register the compensation before the forward step runs.</strong> Register it after and a crash in the gap leaves an effect with no undo path. Registering first means the compensation must cope with being called when its step never completed at all — a deliberate no-op in that case, and tested that way.</li>
  <li><strong>Run compensations in reverse order</strong>, most recent first, because later steps can depend on state earlier ones created.</li>
  <li><strong>Make the compensation idempotent as well.</strong> It is retried like everything else, and a refund issued twice is a further refund.</li>
  <li><strong>Decide per step whether it needs one at all.</strong> A notification is usually better followed by a correction than compensated; a reservation needs releasing; a posted invoice needs a credit. Every forward step should have an explicit answer, and "none, it is a notification" is valid only when it is written down.</li>
  <li><strong>Assume compensation can fail.</strong> That is the state that needs an alert and a human, not a retry loop that conceals it. A run that committed effects it could not undo is the one thing that must never fail quietly.</li>
</ul>

<p>It is worth designing to avoid the need. Where a reservation can be held and confirmed in one reversible commit, or a change staged behind an approval, that beats inventing a compensation for an effect you did not have to take. Compensation is the mechanism for the effects you cannot avoid, not a general licence to act early and tidy up afterwards.</p>

<h2>The deploy is the other way a run dies</h2>

<p>Here is the constraint that surprises teams most, because it is invisible until the first bad deploy. The journal is only meaningful relative to the code that wrote it. Replay compares the calls your code issues now against the history recorded then, and that comparison assumes the code has not changed shape.</p>

<p>Insert, rename or reorder a step that an in-flight run has already passed and the replay diverges — a hard non-determinism error in the best case, and a silently mismatched result in the case you will not notice. Add a step <em>after</em> an in-flight run's checkpoint and nothing breaks: the new step simply becomes a new event when the run arrives. Add an optional field to a payload and nothing breaks. Change the parameters of a call already recorded, or the duration of a timer already set, and it breaks.</p>

<p>Three mechanisms exist and they are not exclusive. Pin a run to the deployment version that started it, and exempt it from the problem for its lifetime. Gate the changed branch on the run's own recorded provenance rather than a value read today — a version marker in the history, not a config lookup. Or run the new logic under a new workflow name and let the old one drain before you retire it. None of them escape the underlying rule: an in-flight run is coupled to the code that produced its history, and the longer it runs, the more deploys it has to survive.</p>

<p>Agent workflows are the awkward case, because the interesting ones wait. A run parked on a human approval for three days has to survive every deploy in those three days, so a change that would be a one-line edit in a request handler becomes a migration for the runs already sitting on it. Plan for the wait to be long and version accordingly.</p>

<h2>Bound the run, or it will bound you</h2>

<p>Durability makes a run survive; it does not make it end. The failure modes on the other side of that are mundane and expensive.</p>

<ul>
  <li><strong>Every step gets a timeout.</strong> A step with no deadline can wait indefinitely, and an indefinitely waiting step holds whatever it holds while paging nobody. A timeout converts "stuck" into "failed", which is a state you can act on.</li>
  <li><strong>Long steps report progress.</strong> A heartbeat distinguishes a slow step from a dead one, so the system retries what is actually gone instead of duplicating work that is still running.</li>
  <li><strong>A wait has an expiry and a default.</strong> An approval that never arrives must resolve to something — escalate, expire, or fail into compensation. A workflow that waits forever for a human is a workflow that will still be waiting at the end of the quarter.</li>
  <li><strong>Agent loops get explicit ceilings</strong>: a maximum step count, a token budget, a wall-clock deadline. This is the same discipline as bounded delegation, and we set out why unbounded supervision is the pattern that never terminates in our note on <a href="/blog/multi-agent-orchestration-patterns">multi-agent orchestration patterns</a>.</li>
</ul>

<h2>You cannot test durability on the happy path</h2>

<p>None of the code paths above run when everything works. They run when a process dies between the effect and the acknowledgement, which is precisely the scenario a normal test suite never produces.</p>

<p>So produce it deliberately. Kill the worker between performing an effect and recording it, in a test, and assert that exactly one effect exists afterwards — then repeat that for every step that touches the outside world. Force a compensation to fire when its forward step never ran, and check it is a genuine no-op rather than a second piece of damage. Fail a step with a permanent error and a transient one and confirm they route to different places. These tests are slow and awkward, which is why they are usually missing, and they are the only ones that exercise the code that actually runs on a bad night.</p>

<p>The same reasoning applies to what you record. A run identifier threaded through every step, with the attempt count, the failure classification and every compensation invocation attached to it, is what turns "the workflow did something strange" into a five-minute question. Without it, the only description of the failure is the one somebody typed from memory. Much of that plumbing is the audit log and replay path from our note on <a href="/blog/ai-workflow-automation-business-processes">finding the processes worth automating</a>, and it is the part that gets cut first when a pilot is rushed.</p>

<h2>What this means in practice</h2>

<p>Order the work by what breaks first. Keep control flow deterministic and push every effect and model call into a journaled step, so a restart does not re-run the expensive or non-deterministic parts. Put a stable idempotency key on every effect before you need it, and let a unique constraint — not a tidy read-then-write — be what enforces it. Classify errors into retry, retry-with-a-key, and never, with jittered backoff and a total retry budget rather than a per-request attempt count. Then compensation for the effects genuinely visible to the outside world: registered before the forward step, idempotent, and reconciled when it fails.</p>

<p>Only after that is it worth arguing about the model. A stronger model makes a workflow's decisions better; it does nothing for a workflow that posts the same invoice twice because a worker restarted. The reliability people notice is almost always in the plumbing — idempotent effects, bounded retries, compensations that run, and runs that survive being interrupted.</p>

<p>If you are building one of these and the retry path has never been exercised on purpose, that is the conversation to start with — <a href="/contact">tell us where the run currently stops</a>. It is the shape of most of our <a href="/services/ai-engineering">AI engineering work</a>, and the same contracts sit under <a href="/products/agents">our agent platform</a>, where long-running delivery work has to survive exactly this kind of interruption. Two related notes: <a href="/blog/multi-agent-orchestration-patterns">multi-agent orchestration patterns</a> covers where to draw the agent boundaries in the first place, and <a href="/blog/llm-cost-optimization-strategies">controlling LLM cost and latency</a> covers the ceilings that keep a retry storm from becoming a bill.</p>`,
    date: '2026-10-05',
    author: 'WeThinkDigital Engineering',
    readTime: '10 min read',
    category: 'AI Engineering',
    tags: ['durable execution', 'agent workflows', 'idempotency', 'compensation', 'retries'],
    metaTitle: 'Durable Agent Workflows: Retries, Idempotency and Compensation',
    metaDescription:
      'How to make multi-step agent runs survive crashes: deterministic control flow with journaled steps, idempotency keys on every effect, error classification with backoff and retry budgets, and compensating actions that undo visible work.',
    keywords: ['durable execution', 'agent workflow reliability', 'idempotency keys', 'saga pattern compensation', 'retry budget', 'at-least-once delivery', 'workflow versioning', 'multi-step agent workflows'],
  },
  {
    id: '13',
    slug: 'llm-eval-gates-in-ci',
    title: 'Eval Gates in CI: Catching LLM Quality Regressions Before They Ship',
    excerpt:
      'A non-deterministic system graded by a non-deterministic judge produces a check that either blocks every merge or is ignored. How we build eval gates that survive: deterministic checks as the gate, a measured noise floor, critical slices that block on a single case, and a judge kept advisory.',
    content: `<p>The first version of an eval gate is a number. The second version is a threshold. The third version is a file nobody looks at, and the route between them is predictable: a change that had nothing to do with the suite went red, someone re-ran the job, it went green, and from that moment the check was advice rather than a gate.</p>

<p>We have built this wrong before. What follows is the version that survived contact with our own team, and the reasoning for each decision — because almost none of these decisions are about models. They are about failure modes.</p>

<h2>Why a test-shaped gate fails on a stochastic system</h2>

<p>A CI check is a promise of determinism. The same commit gives the same result, so a red build means the code is wrong, and that contract is the only reason people act on red. Unit tests can hold that promise because code is deterministic. A model at non-zero temperature is not, and neither is a language model grading another language model's output.</p>

<p>Put a stochastic system behind a deterministic gate and you get one of two failure modes, depending on which way you lean. Set the bar strictly and one flipped case out of thirty fails an unrelated merge; the first fix anyone reaches for is the re-run button, and if the second run is green the check has taught the team that red sometimes means nothing. That lesson does not come back — the check is now ignorable, and rewriting thresholds later will not restore its authority. Set the bar loosely and the gate passes changes it should have caught, which is worse, because a passing gate reads as evidence.</p>

<p>The way out is not to pretend the system is deterministic. It is to separate the part of the work that can be graded exactly from the part that cannot, and to treat the remainder as a measurement with an error bar instead of a verdict.</p>

<h2>Separate the gate from the signal</h2>

<p>More of the safety surface than teams expect can be graded by code, exactly, on every run. That set is the gate. Everything else is a quality score, and a quality score should inform a human decision rather than turn a merge red on its own.</p>

<table>
  <thead>
    <tr><th>Check</th><th>Role</th><th>Cost per case</th><th>What it catches</th></tr>
  </thead>
  <tbody>
    <tr><td>Schema and format validity</td><td>Gate</td><td>None</td><td>Output a downstream service cannot parse</td></tr>
    <tr><td>Required fields, types and ranges</td><td>Gate</td><td>None</td><td>Missing or impossible values that pass a format check</td></tr>
    <tr><td>Refusal and boundary detection</td><td>Gate</td><td>None</td><td>An answer produced where the system should have declined</td></tr>
    <tr><td>Cited identifiers exist in retrieved context</td><td>Gate</td><td>None</td><td>Fabricated sources and claims with no support</td></tr>
    <tr><td>Tool-call arguments match the tool schema</td><td>Gate</td><td>None</td><td>Arity, type and enum errors the runtime would reject</td></tr>
    <tr><td>Token, latency and step ceilings</td><td>Gate</td><td>None</td><td>Cost and latency drift no quality metric shows</td></tr>
    <tr><td>Open-ended quality rubric</td><td>Advisory</td><td>One or more model calls</td><td>Tone, completeness and style — real quality no assertion expresses</td></tr>
  </tbody>
</table>

<p>The distribution is the point. The left column is free, exact and reproducible; the bottom row is a measurement. Write the deterministic checks first and notice how much of your genuine risk surface they already cover. If a downstream service parses the model's output, validity is not a metric, it is a contract: it holds or it does not. If the system is meant to decline when there is nothing to ground an answer on, that is detectable by code in most cases. Tool arguments are schema-shaped by definition, and a citation identifier either exists in the context you sent or it was invented.</p>

<p>What is left for a judge is real but narrower than it looks: the cases where there is no single right answer and quality is a judgement. Keep that number advisory until it has been calibrated against human labels, because an unvalidated judge is a second stochastic system with its own biases, and putting it in the blocking path gives you two unreliable things instead of one.</p>

<h3>Slice the suite, and mark some slices critical</h3>

<p>One pass rate over the whole suite hides where the loss happened and lets a large easy slice dilute a small important one. Slice by capability — extraction, tool selection, refusal, long-context summarisation, whatever the feature actually does — and mark the slices where a regression is not survivable.</p>

<p>Critical slices block on a single case, with no statistics involved. If one case moved from pass to fail in a slice covering output validity, a safety boundary or a permission boundary, you do not need a significance test to know what to do. The asymmetry is the argument: blocking a good change costs a conversation, and shipping a bad one across a permission boundary costs an incident. Where the boundary is a retrieval concern rather than a prompt concern, the failure mode is worse than a bad answer, which is why we treat it as a gate rather than a metric in <a href="/blog/building-production-rag-systems">our RAG note</a>.</p>

<p>Everything outside those slices is a statistical question, and that is the harder engineering.</p>

<h2>Measure the noise floor instead of choosing a tolerance</h2>

<p>Almost every broken eval gate has a hand-picked tolerance inside it: a drop past this number blocks, a drop under it does not. That number is usually chosen by taste and it is wrong in both directions at once — too tight for a suite of twenty cases, where ordinary variance moves the result more than the threshold, and too loose for the behaviour that changed in a handful of cases and matters most.</p>

<p>Measure the spread instead. Take the version you currently trust, run the suite against it repeatedly without changing anything, and record how much the result moves on its own. That movement is the run-to-run variation of an unchanged system — its noise floor — and it is what a candidate result should be compared against. A result inside the floor is not a regression; it is the system being what it is, and a gate that calls it a regression is the gate that gets ignored.</p>

<p>Three details separate a baseline that fires from one that quietly misleads:</p>

<ul>
  <li><strong>Compare against the interval, not the point.</strong> A single baseline number has no error bar, so any fluctuation becomes a drop. Store the spread from the repeated baseline runs and ask whether the candidate falls outside it.</li>
  <li><strong>The baseline carries its identity.</strong> Model identifier and version, decoding parameters, judge model and rubric version, dataset revision, grader revision. Change any one of those and the baseline is stale, and a stale baseline is worse than none because it produces confident verdicts about a system you are no longer running.</li>
  <li><strong>Store per-case results, not just the aggregate.</strong> You cannot run a paired comparison, or read a failure list at three in the morning, from a single float.</li>
</ul>

<h3>Report reliability, not best-of</h3>

<p>A pass rate computed from one sample per case answers a question nobody asked. The one that matters is whether the same case passes every time, because a behaviour that works most of the time is a behaviour that is wrong some of the time — and a suite that samples once per case will report it as working, whichever way the sample fell.</p>

<p>Sample each case more than once and report consistency next to accuracy: how often the same input produces the same pass, and how often it produces the same output at all. Consistency is usually the less comfortable number and the one that predicts what users will experience. It also changes how a result should be read, because the same aggregate score can describe a suite where every case was decided the same way and a suite where every case sat on a knife edge — two systems with nothing in common in production.</p>

<p>Sampling costs money, which is what makes the slicing decision load-bearing again: sample heavily on the small critical slices, once on the broad ones. The aggregate alone will not tell you the difference between a real improvement and a model that got luckier.</p>

<h2>Read the result as transitions, not averages</h2>

<p>The most useful statistic in an eval gate is not the mean. It is the list of cases that changed direction. A run that gained five cases and lost five has a flat average and two findings, one of which is a regression worth fixing before it reaches anyone.</p>

<p>Compare case by case against the baseline and separate pass-to-fail transitions from fail-to-pass ones, then ask whether the change is asymmetric beyond what chance would produce. That paired comparison is the actual question, and it needs far less data than comparing two independent averages, because the cases are the same cases and most of them did not move.</p>

<p>When there are too few transitions for that test to conclude anything, do not round the answer to green. An underpowered suite should say that it is underpowered — that verdict is a work item, not a failure:</p>

<pre><code>type Verdict = 'pass' | 'regression' | 'inconclusive' | 'infra';

interface Slice {
  name: string;
  critical: boolean;
  cases: CaseResult[];
}

function decide(slices: Slice[], baseline: Baseline, alpha = 0.05): Verdict {
  // A provider timeout is not a quality verdict, in either direction.
  if (slices.flatMap((s) =&gt; s.cases).some((c) =&gt; c.error !== null)) return 'infra';

  for (const slice of slices) {
    const flips = slice.cases.filter((c) =&gt; c.baselinePassed &amp;&amp; !c.passed);
    // Critical slices do not get a vote. One break blocks the merge.
    if (slice.critical &amp;&amp; flips.length &gt; 0) return 'regression';
  }

  const paired = pairedTransitionTest(slices); // pass -&gt; fail vs fail -&gt; pass
  if (paired.pValue &lt; alpha) return 'regression';

  // Inside the baseline's own measured variation: not a signal.
  if (paired.delta &lt;= baseline.noiseBand) return 'pass';

  // Looks real, and the sample cannot support the claim either way.
  return 'inconclusive';
}</code></pre>

<table>
  <thead>
    <tr><th>Verdict</th><th>Exit</th><th>What it means</th><th>What to do</th></tr>
  </thead>
  <tbody>
    <tr><td>Critical break</td><td>1</td><td>A gated slice moved from pass to fail</td><td>Block the merge; no statistics required</td></tr>
    <tr><td>Significant drop</td><td>1</td><td>Pass-to-fail transitions outnumber the reverse beyond chance</td><td>Block and read the transition list, not the mean</td></tr>
    <tr><td>Within noise</td><td>0</td><td>The change sits inside the baseline's own variation</td><td>Merge, keep the run recorded</td></tr>
    <tr><td>Inconclusive</td><td>2</td><td>A drop may be real but the sample cannot say</td><td>Merge with a note, then add cases or repeats</td></tr>
    <tr><td>Infrastructure</td><td>3</td><td>Provider errors, timeouts, rate limits</td><td>Re-run; never record it as a pass or a quality verdict</td></tr>
  </tbody>
</table>

<p>Two things about that table are deliberate. The inconclusive verdict exists so that an underpowered result is neither a release blocker nor a silent pass; it is recorded, merged with a note, and paid off by growing the suite. And infrastructure failures carry their own exit code for the same reason in the other direction: counting a provider timeout as a pass hides real regressions, while counting it as a failure makes the gate flaky and destroys whatever authority it had. Separate the two, and re-run.</p>

<h2>The judge is an instrument, not an oracle</h2>

<p>If a model grades the output, it deserves the treatment you would give any measurement device you intend to make decisions with: calibrated, pinned, and understood in its biases.</p>

<ul>
  <li><strong>Calibrate against human labels before trusting it.</strong> Grade a sample by hand and compare. Where the judge disagrees with your reviewers on the cases you care about, its score is a fact about the judge, not about the system.</li>
  <li><strong>Average out position.</strong> Judges prefer whichever option they see first. Grade each pair in both orders and average the two: a constant position preference cancels, and a real difference survives.</li>
  <li><strong>Expect a length bias.</strong> Judges reward longer answers, so a change that pads responses without improving them will often score higher. That is how a quality gate ends up rewarding verbosity — and how a prompt change that helped the metric hurt the product.</li>
  <li><strong>Pin the judge and version the rubric.</strong> A judge model updated behind an endpoint moves your scores for reasons that have nothing to do with your change. The judge is part of the environment the numbers came from, so its version belongs in the baseline identity alongside the model and decoding parameters.</li>
  <li><strong>Never gate on the judge alone.</strong> Where a check can express the requirement exactly, the check should own it. The judge covers what no assertion expresses, and it stays the number a human reads.</li>
</ul>

<h2>The cost and the clock</h2>

<p>An eval run is a batch inference workload competing with production for the same budget. Cases multiplied by samples multiplied by judges is the bill, and the clock matters as much as the money: a suite that takes forty minutes blocks every merge, so it gets skipped, and a skipped gate is not a gate.</p>

<p>Two habits keep this workable. Cache generations keyed on model, prompt version, decoding parameters and case identity, so re-scoring with a new grader does not re-run inference — most eval iteration is grading, not generating, and paying for generation twice is pure waste. And tier the suites by what they must catch: deterministic checks plus a small recorded-replay suite on every pull request, the larger judged suite on the main branch or nightly, and anything that depends on live third-party services outside the merge path entirely.</p>

<p>That last split is a real limitation, not a scheduling convenience. A mocked tool always returns, always on the first attempt, always in the shape it was wired for. So a mocked suite is structurally blind to tool-selection errors, retries, partial failures and rate limits — the failures that dominate the post-incident write-up. The honest arrangement is a ladder: mocked evals for prompt-level assertions, a recorded real trace for the interaction, a scheduled live smoke suite for the integrations. Treating the cheap rung as the test of record for the whole system is how a team ends up with a green gate and an incident board that disagrees with it.</p>

<h2>The dataset is the new specification, and it can be overfitted</h2>

<p>Once the gate exists, the suite becomes the thing being optimised, and that carries its own failure mode: prompt changes tuned case by case against the same set of examples produce a prompt that is excellent at those examples and no longer predictive of anything else.</p>

<p>Three habits hold that off. Keep a held-out slice you never tune against and look at only when promoting. Grow the suite from real failures — one case per incident, with the failing trace recorded as the input — so it tracks the distribution you actually serve rather than the one you imagined on the day you wrote it. And watch the gap between suite results and production outcomes: when the suite stays green and behaviour in production does not follow, the suite is measuring the wrong thing, and adding cases on the current taxonomy will not repair that.</p>

<p>Expect the first version of any suite to grade the wrong things. Criteria are discovered by looking at real failures rather than designed up front, which is the opposite of how unit test suites are usually written and the reason eval work stays iterative in a way that ordinary testing does not.</p>

<h2>What this means in practice</h2>

<p>Order the work by cost and certainty. Deterministic checks first, because they are free, exact, and catch more than most teams expect. Critical slices next, because one broken boundary outweighs a hundred graded opinions. Then the noise floor and the paired comparison, so the statistics describe your system rather than your preferences. The judge last: calibrated against human labels, pinned, and advisory.</p>

<p>None of this is exotic. It is ordinary engineering applied to one unreliable component — contracts where you can have them, measurement where you cannot, and a decision that keeps "not proven" distinct from "proven bad". A gate that collapses all of it into a single number and a single threshold is the version that gets ignored, and an ignored gate is worse than no gate at all, because it costs the upkeep of a suite while providing the comfort of a green check.</p>

<p>If you are building this harness for a system already in production, or working out why an existing gate keeps going red for no reason, that is the shape of our <a href="/services/ai-engineering">AI engineering work</a> — <a href="/contact">tell us what the gate is supposed to catch</a> and we will start there. Two related notes: <a href="/blog/building-production-rag-systems">building RAG systems that work in production</a> covers the retrieval-side measurements a quality gate depends on, and <a href="/blog/llm-cost-optimization-strategies">controlling LLM cost and latency</a> covers the budget levers that make a sampling-heavy eval affordable.</p>`,
    date: '2026-10-01',
    author: 'WeThinkDigital Engineering',
    readTime: '10 min read',
    category: 'AI Engineering',
    tags: ['LLM evaluation', 'CI gates', 'LLM as judge', 'regression testing', 'AI engineering'],
    metaTitle: 'Eval Gates in CI for LLM Features: Noise, Judges and Critical Slices',
    metaDescription:
      'How to build an LLM evaluation gate people trust: deterministic checks as the gate, an advisory judge, a measured noise floor, paired regression statistics and critical slices.',
    keywords: ['LLM evaluation in CI', 'eval gate', 'LLM regression testing', 'LLM as judge validation', 'noise floor baseline', 'agent evaluation harness', 'prompt regression testing', 'non-deterministic CI checks'],
  },
  {
    id: '11',
    slug: 'free-website-and-landing-page-design',
    title: "Free Website and Landing Page Design: What Is Actually Free",
    excerpt: "We design and build your site at no cost and host it free for three months. Here is the honest cost over three years, and where a free build is the wrong choice.",
    content: `
<h2>What "free" means here, and what it actually costs</h2>

<p>Start with the question every buyer should ask: if the build is free, where does the money come from, and what will this cost me a year from now?</p>

<p>Here is the whole arrangement. <strong>We design and build your website or landing page at no charge.</strong> In return — a condition, not a suggestion — you host it with us. Hosting is free for three months, then <strong>AED 50 per month</strong>. The domain you pay for yourself: it is registered in your name, you own it, and it is not part of the offer.</p>

<p>That is the entire deal: no second invoice, no free domain — a domain is not ours to give away. One recurring cost, AED 50 a month, from month four.</p>

<blockquote>Free design and build. Your domain, bought and owned by you. Our hosting, free for three months and AED 50 a month after that.</blockquote>

<h3>The first year in numbers</h3>

<p>Three months free, then nine at AED 50: <strong>AED 450</strong> of hosting in year one. A .com domain costs roughly AED 40 to 60 a year from a registrar, and that price moves, so check it yourself. First-year cash cost is therefore about <strong>AED 490 to 510</strong>; from year two, AED 600 plus renewal.</p>

<p>AED 50 a month is not nothing, but it is a small recurring cost instead of a large one, and it pays for something specific: a site somebody else keeps online. The full terms sit on our <a href="/offers">offers page</a>.</p>

<h2>The three-year comparison, honestly</h2>

<p>The useful comparison is not "free versus a large invoice" but what you spend over the life of the site, your own hours included. Most small businesses choose between three routes: someone builds it, you build it on a subscription platform, or you pay a freelancer.</p>

<p>The figures below are <strong>illustrative</strong> — typical list prices at the time of writing, rounded. They vary by plan and country, and a freelancer's quote could easily be half or double. Check current pricing before you decide, ours included.</p>

<table>
  <thead>
    <tr>
      <th>Route</th>
      <th>Build</th>
      <th>Hosting or subscription, 3 years</th>
      <th>Domain, 3 years</th>
      <th>Indicative 3-year total</th>
      <th>The real risk</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Built by us</td>
      <td>AED 0</td>
      <td>AED 1,650 — free for 3 months, then AED 50 a month</td>
      <td>About AED 120–180, paid by you</td>
      <td>About AED 1,770–1,830</td>
      <td>You host with us, so moving away later means moving the site.</td>
    </tr>
    <tr>
      <td>Single-page builder (Carrd and similar)</td>
      <td>AED 0, plus your time</td>
      <td>Roughly AED 210–540 for a paid single-page plan</td>
      <td>About AED 120–180</td>
      <td>About AED 330–720</td>
      <td>One page, limited structure, and you are the designer.</td>
    </tr>
    <tr>
      <td>Full site builder (Squarespace, Wix and similar)</td>
      <td>AED 0, plus 15–40 hours of your time</td>
      <td>Roughly AED 1,050–2,700 for a paid plan</td>
      <td>About AED 120–180</td>
      <td>About AED 1,170–2,880</td>
      <td>You rent the platform. Stop paying and the site disappears.</td>
    </tr>
    <tr>
      <td>Cheap freelancer</td>
      <td>AED 1,500–6,000</td>
      <td>AED 0–1,800, where hosting is billed separately at all</td>
      <td>About AED 120–180</td>
      <td>About AED 1,620–7,800</td>
      <td>Continuity. When they stop replying, the credentials go with them.</td>
    </tr>
  </tbody>
</table>

<p>Two things worth saying out loud. The cheapest route is the single-page builder, and for one page with a form on it that is a legitimate choice: if your time is free, Carrd will cost less than we will. Ours is not the smallest number here — it is the most predictable, and the only one where somebody else is on the hook when the form breaks on a Friday night.</p>

<h3>The cost the table cannot show</h3>

<p>Subscription builders are priced as though your time were free. Writing the words, fighting a template, resizing images, discovering the mobile view looks nothing like the desktop preview: put a value on those evenings and the gap between DIY and having it built is thinner than the price suggests. Freelancers have the opposite problem: priced properly, then the relationship ends.</p>

<h2>Why we can build it for nothing</h2>

<p>We are not being generous. In an agency the margin sits in the build; with us it sits in the hosting, which is why we give the build away and ask you to host with us. Our team already builds web applications, so a landing page is a day or two of work for people we employ anyway. The cost to us is low; the value is a customer who stays.</p>

<p>There is a second reason, less flattering to us. Nobody buys a website from a company they have never heard of, and quoting a build fee to every stranger would cost more in chasing that first yes than the build is worth. Free removes the risk from your side; hosting puts it back on ours — if the site is slow, broken or ignored, you leave in month four and we have spent the engineering for nothing.</p>

<p>Sometimes a free build grows into something bigger — an internal tool, an automation, a product — which tends to happen when a relationship starts with delivered work rather than a proposal. What the offer does not include, because implying otherwise would be dishonest: the domain, the words, the photographs, logo design, unlimited revisions, or anyone to promote the site after launch. We design and build it; everything else is yours to bring, or separate work, and we will say which.</p>

<blockquote>We are buying the first few months of a working relationship with a couple of days of engineering time. It is a trade, not a favour, and you should know its terms before you say yes.</blockquote>

<h2>What a landing page actually needs to convert</h2>

<p>"Convert" is a cold word for "somebody does the thing you wanted". Most pages fail for boring, fixable reasons.</p>

<h3>One offer, one action</h3>

<p>A landing page exists to make a single action obvious. The common failure is four calls to action — book a call, download the brochure, follow us, read the blog — and no signal about which matters. Choose one. Every section either supports it or answers an objection; anything else is decoration.</p>

<h3>The first screen has one job</h3>

<p>Say what you sell and who it is for, in the first line, without cleverness. "Accounting for contractors who hate paperwork" beats "Empowering your financial future", because the second could belong to anyone and so belongs to no one. Then one sentence on what changes for the customer, then one piece of proof: a real screenshot, a real photograph, a client logo you have permission to use. If you have no proof yet, say what you will do and by when. Never invent any.</p>

<h3>Speed is a design decision, not a later fix</h3>

<p>Every heavy element is paid for by the person on a mid-range phone. A lighter hero image and CSS animation will feel faster than a cleverer page that weighs more — our own home page hero is plain CSS for that reason. Aim for text on screen within a second over 4G, the largest image under roughly 200KB, and 2.5 seconds to the largest visible element as the line not to cross. Those are targets, not promises.</p>

<h3>Mobile is the default, not the fallback</h3>

<p>Design the narrow screen first: tap targets of at least 44 pixels, no interaction that depends on hovering, the right keyboard for email and phone fields, a phone number that dials when tapped, nothing below 16 pixels. Then test on a real phone, not a resized browser window: that is where layout bugs hide.</p>

<h3>A form nobody answers is worse than no form</h3>

<p>Ask for as little as you can: a name, one way to reach them, one open field. Every extra field costs submissions, and demanding a budget on first contact costs more than it is worth. Decide what happens after somebody submits before you launch — if the notification lands in an inbox nobody opens, the page is decoration. One person, one inbox, a reply inside a working day.</p>

<h2>When a free build is the wrong choice</h2>

<p>We turn work down, and this is one we turn down regularly. If you recognise yourself below, a free landing page is not what you need — saying so early saves us both a wasted month.</p>

<h3>Real e-commerce</h3>

<p>A shop is not a page. Product variants, stock, tax, shipping rates, returns and refunds are software with genuine failure modes, each a project in its own right. You want a platform built for it, not a page with a checkout bolted on.</p>

<h3>Heavy integrations</h3>

<p>Booking with live availability, your CRM or finance system, single sign-on, payments, multi-language content: each is defined engineering with its own testing and support burden — reasonable in a paid project, not in a free build with no budget for the week a third-party API changes its mind.</p>

<h3>You already have a site and a design system</h3>

<p>If your current site works and is simply out of date in places, starting again throws away the parts that were fine. You need maintenance and targeted improvement on the existing codebase, which is <a href="/services/web-development">paid web development work</a> we will quote for.</p>

<h3>You need a publishing platform, not a page</h3>

<p>If several people must publish and edit pages every week, you need a content management system with roles and review. A landing page is not that, and pretending otherwise produces a support queue.</p>

<h3>You cannot give feedback on a schedule</h3>

<p>The build is free, so our only cost control is time. When a project takes eight weeks because comments arrive in dribs and drabs and nobody owns the decision, the offer stops working. We would rather decline.</p>

<h2>What you need to bring</h2>

<p>The build is free. These are not, and they are not optional. Every stalled free project came to rest on one.</p>

<ul>
  <li><strong>The domain.</strong> Buy it in your own name and keep the registrar login. Tell us where it lives and we will tell you what to point at us.</li>
  <li><strong>The words.</strong> What you sell, who buys it, what it costs, why somebody picks you over the alternative. We do not write your copy — nobody outside your business can do that well.</li>
  <li><strong>Images you have the right to use.</strong> Photographs of real work, real premises, real people beat stock every time, and phone photographs are fine. If you have nothing, we will use licensed placeholders.</li>
  <li><strong>One decision maker.</strong> Not a committee. Pick the person who can approve a headline without consulting three colleagues, then let them approve it.</li>
  <li><strong>Feedback in one round.</strong> Read the page, collect the comments, send them together. Ten small messages over three weeks is the biggest cause of slow free builds.</li>
  <li><strong>An inbox somebody checks.</strong> Name the address enquiries go to before launch, not after the first submission vanishes.</li>
</ul>

<h2>How to get one</h2>

<p>Email <a href="mailto:info@wethinkdigital.solutions">info@wethinkdigital.solutions</a> with four things: what you sell, who buys it, whether you already have a domain, and one site you like and why. That is enough for us to say whether this is a fit, and what we would build. Prefer a form? Use the <a href="/contact">contact page</a>. Want to see how we think first? Read a few of our <a href="/blog">engineering notes</a>.</p>

<p>If it is a fit, we design and build the site at no charge, you keep the domain you bought, hosting is free for three months, and after that it is AED 50 a month. If it is not, we will tell you what you actually need, even when that is a platform we do not sell. Either answer beats a sales call.</p>
    `,
    date: '2026-09-30',
    author: 'WeThinkDigital Engineering',
    readTime: '9 min read',
    category: 'Web Development',
    tags: ["free website","landing page design","web development","hosting","small business"],
    metaTitle: "Free Website Design & Landing Pages — What Is Actually Free",
    metaDescription: "We design and build your website or landing page at no cost. Hosting is free for 3 months, then AED 50 per month. Here is the honest cost over three years.",
    keywords: ["free website design","free landing page design","free website build","free website with hosting","website design cost","landing page design"],
  },
  {
    id: '12',
    slug: 'free-crm-software-unlimited-users',
    title: "Free CRM Software With Unlimited Users and Contacts",
    excerpt: "Most free CRMs cap seats or records, which is exactly what breaks a CRM. Here is why coverage matters, and what our free-forever tier does and does not include.",
    content: `
<h2>Almost every free CRM caps the thing that makes a CRM work</h2>

<p>A free CRM tier is not a gift. It is the top of a funnel — a reasonable way to sell software, but you should read it as one. The restrictions come in four shapes: a ceiling on users, a ceiling on stored records, features that exist only on the next tier up, and a definition of "free" that quietly ends at a term boundary.</p>

<p>The seat cap is the one teams notice, because somebody has to decide who gets a login. The record cap does the most damage, because it negotiates against the reason you wanted a CRM. Feature gating is the easiest to miss: reporting, permissions, audit history and workflow automation commonly sit above the free line. A time limit is straightforward: free for a while, then read-only, or converted to a smaller plan without announcement.</p>

<p>We are not going to quote specific limits. Vendors re-cut their free tiers regularly, sometimes without much fanfare, and a number that was accurate last year is worse than none at all: it looks like evidence and it is out of date. Check the current terms on the vendor's own pricing page, and read the limits rather than the headline. "Free" tells you about price, not fit — and the only question that matters is whether the limit lands on something your team depends on.</p>

<h2>Why a per-seat cap quietly kills a CRM</h2>

<p>A CRM is not a personal productivity tool. It is a shared record, and its value comes from being the one place a customer exists completely.</p>

<p>Now put a seat cap on it. Eleven people touch customers — sales, support, accounts, the founder — and you have three logins. What happens next takes about a fortnight.</p>

<ul>
  <li><strong>The eight without a login keep working as before.</strong> Spreadsheets, shared inboxes, private notes, memory — nothing about their behaviour changed, because nothing about their tools did.</li>
  <li><strong>The three with a login stop trusting what they see.</strong> Their view is partial by construction, so they keep a private record alongside the official one; the CRM becomes a summary rather than the source.</li>
  <li><strong>Someone shares a login.</strong> The obvious workaround is worse than it looks: activity history credits one person's work to another, and a wrong audit trail is more dangerous than none, because people rely on it.</li>
  <li><strong>Seat allocation becomes political.</strong> Logins go to seniority rather than to the people who speak to customers.</li>
</ul>

<p>You end up with the cost and ceremony of a CRM and the fragmentation of not having one: ask what was promised to a customer last month and nobody can answer without opening three other applications.</p>

<p>The point is structural, not moral. A CRM holding a fraction of the customer conversation is one nobody trusts, and an untrusted CRM gets abandoned — usually without a decision, just a drift back to the spreadsheet. Coverage is the feature; dashboards, forecasting and automated summaries are downstream of the record being complete.</p>

<h3>Why a record cap is worse than it looks</h3>

<p>A ceiling on contacts prices your growth. The deeper damage is what it teaches people to do: when records are scarce, teams delete old ones to make room, keep the overflow in a spreadsheet, and skip the contacts that feel marginal — the supplier, the referral partner, the prospect who went cold eighteen months ago. The CRM becomes an archive of customers who already mattered, which is a list you could have written from memory. The records you need a system for are the ones nobody knows are important yet.</p>

<blockquote>Free tiers rarely fail on capability. They fail on coverage — a record is only as trustworthy as the number of people allowed to write to it.</blockquote>

<h2>What a CRM actually has to do</h2>

<p>Strip away the feature matrix and four things decide whether a CRM works. Everything else is a refinement of them.</p>

<ol>
  <li><strong>One record per customer.</strong> One organisation, one owner, one place the relationship lives. The test: two colleagues search for the same customer and land on the same record, not two near-identical ones.</li>
  <li><strong>A pipeline whose stages mean something.</strong> A stage is a claim about what has already happened, not a hope about what might. Each needs a definition you could argue about and win — what must be true before a record moves — and few enough stages to hold in your head. Five to seven, not twenty.</li>
  <li><strong>Activity history in one place.</strong> Calls, emails, meetings, notes, proposals, the decision to discount. The test: if the account owner goes on holiday, can a colleague pick the relationship up without asking them a single question?</li>
  <li><strong>A follow-up that does not depend on memory.</strong> Every open record carries a next action and a date — not a status, not a colour. The test: on Monday morning there is a list of what is due, and it is short enough to read in one sitting.</li>
</ol>

<p>Notice what is not on that list: reporting, forecasting, lead scoring, dashboards. Those are useful once the foundations are true and decorative before. Most CRM failures are not feature failures at all — they are coverage and discipline failures wearing a feature costume.</p>

<p>There is a layer above this where the manual work hides: reminders someone has to type, tasks someone has to reassign, updates copied between systems. That layer is automatable once the record underneath it is sound, and it is the part we work on in <a href="/services/ai-automation">AI automation</a>.</p>

<h2>Our CRM, honestly described</h2>

<p>We built a CRM and we run it ourselves. It is free, permanently, with no cap on contacts and no cap on users. Not a trial with a clock on it, not a free plan that expires, not a tier that stops making sense at eleven people.</p>

<p>Access is by request rather than instant signup. There is no self-serve URL to click: we set each account up with the team that asked for it. That is a deliberate trade, and the honest part of this offer.</p>

<h3>What you get, and what not to expect</h3>

<p>You get the product described above, with unlimited users and unlimited contacts, at no cost, without a card and without a licence review. You also get us: we built it, we run it, and the people who answer your email are the people who can change it — there is no support portal in between.</p>

<p>What you should not expect is a commercial agreement dressed up as a free product. Specifically:</p>

<ul>
  <li><strong>No enterprise service-level agreement.</strong> We will not publish a response time we cannot guarantee, and there is no contractual uptime commitment behind this. If you need a signed guarantee, this is not the tool for that requirement.</li>
  <li><strong>No bespoke development inside the free tier.</strong> If you need custom objects, a specific integration or a workflow that does not exist yet, that is a project rather than a support request — exactly the kind our <a href="/services/software-development">software development practice</a> takes on, quoted separately.</li>
  <li><strong>Not every feature of a large commercial suite on day one.</strong> This is a CRM built by an engineering team that uses it, and it does the four things above properly. If something you need is missing, tell us.</li>
</ul>

<p>"Forever" here means the terms do not move underneath you: no clock, no cap, no upgrade path you are being nudged along. It does not mean we have solved every CRM problem, or that the product will never change. It means the price is not a lever.</p>

<h2>Moving off spreadsheets without stalling the week</h2>

<p>Most spreadsheet migrations do not fail; they half-finish, and the team runs both systems forever. The sequence that avoids that takes about a fortnight of part-time work.</p>

<pre><code>What the spreadsheet column usually is    What it should become
--------------------------------------    ----------------------------------------
"Company" - free text, many variants      One organisation record, one owner
"Contact" - a name and an email           A contact linked to that organisation
"Status" - whatever each person typed     A pipeline stage with a written rule
"Notes" - a year of prose                 Dated activity records, oldest first
"Next step" - frequently empty            A next action and a due date, always set
Any row with no owner                     Decide the owner before anything moves</code></pre>

<ol>
  <li><strong>Start with one team and one pipeline.</strong> Not the whole company, not every process — one group of people who already talk to each other, one journey from first contact to paid.</li>
  <li><strong>Write the stage definitions before you touch the data.</strong> One sentence each, agreed out loud, including what disqualifies a record. Teams skip this, and it decides whether the pipeline is ever believed.</li>
  <li><strong>Decide what identifies a customer.</strong> Company name plus domain, or company name plus billing entity. Pick one rule and apply it everywhere; retrofitting identity rules onto a full database is miserable.</li>
  <li><strong>Move the sheet in, then deduplicate on purpose.</strong> Expect duplicates and settle the merge rule in advance — oldest record wins, or the one with activity attached.</li>
  <li><strong>Put a next action on every open record.</strong> All of them, in one sitting. A pipeline without next actions is a report; a pipeline with them runs the business.</li>
  <li><strong>Run in parallel for one week with the sheet read-only.</strong> Read-only is the important word: a sheet that is still editable is still the real system, and everyone knows it.</li>
  <li><strong>Retire the sheet, then watch for workarounds.</strong> The moment of truth is not the migration; it is the first person who cannot find what they need and reaches for a new spreadsheet. Fix that cause, not the symptom.</li>
  <li><strong>Review at thirty days and delete fields.</strong> Whatever nobody fills in or filters on is noise; a CRM that asks for eighteen fields gets four filled in badly.</li>
</ol>

<h2>Who should not use it</h2>

<p>It is cheaper for both of us if this part is clear before you move any data.</p>

<ul>
  <li><strong>Teams whose CRM is really a custom application.</strong> If you need deeply custom objects, elaborate permission models, or a data model that does not resemble customers, organisations, deals and activities, you are describing a software project — and bending a general CRM into that shape costs more than building the right thing.</li>
  <li><strong>Regulated workflows that require specific certifications.</strong> If your compliance team needs particular certifications or a written data-residency arrangement, raise it in the first email. We would rather tell you we do not fit than have you find out mid-migration.</li>
  <li><strong>Teams that need procurement paperwork.</strong> A free product is not automatically an easy one to buy. If your process expects a signed agreement, a purchase order and a security review, say so early and check whether it is workable.</li>
  <li><strong>Teams that need a large integration marketplace.</strong> If the CRM has to be the hub for twenty other systems using off-the-shelf connectors, verify your integrations first. Coverage of the customer record is the strength here; catalogue breadth is not.</li>
</ul>

<p>The pattern is the one this article opened with: unlimited users and unlimited contacts, not unlimited everything.</p>

<h2>How to get access</h2>

<p>Email <a href="mailto:info@wethinkdigital.solutions">info@wethinkdigital.solutions</a> with two or three lines: roughly how many people touch customers, what you use today, and the first thing you would want to move. We will set the account up and help you get the first pipeline into it — usually the difference between a CRM that sticks and one that becomes another abandoned tab.</p>

<p>If you would like the wider picture first, our <a href="/offers">current offers</a> are the shortest route to what we do and how we work, and the <a href="/contact">contact page</a> covers everything else.</p>
    `,
    date: '2026-09-29',
    author: 'WeThinkDigital Engineering',
    readTime: '8 min read',
    category: 'Software Development',
    tags: ["free crm","crm software","unlimited users","sales pipeline","small business"],
    metaTitle: "Free CRM Software With Unlimited Users and Contacts",
    metaDescription: "A free CRM with unlimited users, unlimited contacts and no expiry. Not a trial. Here is what it does, what it does not, and how to get access.",
    keywords: ["free crm software","free crm with unlimited users","free crm unlimited contacts","free crm forever","crm software free","free crm for small business"],
  },
  {
    id: '1',
    slug: 'ai-code-review-best-practices',
    title: 'Code Review in the Age of AI-Generated Code',
    excerpt:
      'Review used to be a conversation between two people who had both thought about the problem. That contract is broken, and most teams have not replaced it with anything.',
    date: '2026-01-20',
    author: 'WeThinkDigital Engineering',
    readTime: '9 min read',
    category: 'Engineering Practice',
    tags: ['code review', 'engineering practice', 'AI-generated code', 'team process'],
    metaTitle: 'Code Review in the Age of AI-Generated Code',
    metaDescription:
      'How code review changes when most code is AI-generated: authorship norms, diff-size limits, risk-tiered review, and the questions a machine cannot answer.',
    keywords: ['AI code review', 'code review best practices', 'AI-generated code', 'pull request review process', 'engineering team practices', 'review risk tiers', 'reviewer fatigue'],
    content: `<p>An engineer opens a pull request at 4pm. It is 900 lines, it touches eleven files, the tests pass, and the description says "implement subscription pausing as specified in TICKET-4412". The reviewer knows, without being told, that the author did not write most of it. And the reviewer has a decision to make that their team has never discussed: what is their job here?</p>

<p>Under the old implicit contract, review was a conversation between two people who had both thought about the problem. One had thought hard enough to write it; the other checked their reasoning. That contract is broken now, and most teams have not replaced it with anything. They have the same checklist, the same approval button, and quietly more code arriving than before.</p>

<p>The process needs rewriting, not the tooling. Here is what actually changes.</p>

<h2>The author's signal is gone</h2>

<p>Human-authored code carries information beyond its content. Every line cost the author effort, so lines were scarce and roughly deliberate. If a function was 200 lines, someone had decided it needed to be. If an abstraction existed, someone had wanted it enough to build it. Reviewers read that signal without noticing they were reading it.</p>

<p>Generated code carries none of it. Lines are free, so there are more of them. Abstractions appear because they are conventional rather than because anyone needed them. Error handling is thorough in places that cannot fail and absent where it matters. Nothing in the diff distinguishes a considered decision from a default.</p>

<p>Worse, the code is <em>fluent</em>. It reads as though written by someone competent and confident, with consistent naming and tidy structure. Fluency suppresses scrutiny — it is much easier to be sceptical of awkward code than of code that looks like it knows what it is doing. Reviewers are being asked to apply more scepticism to material that invites less.</p>

<blockquote>The reviewer's question has changed from "did you think about this correctly?" to "did anyone think about this at all?" Those require different reading, and most review checklists still assume the first.</blockquote>

<h2>Authorship is not optional</h2>

<p>The most important norm to establish is also the simplest: <strong>the person who opens the pull request owns the code, regardless of what produced it.</strong>

</p>

<p>That means being able to explain any line in it, having read all of it, and accepting the consequences when it breaks. "The agent wrote that part" is not an acceptable answer in a review thread or in an incident review. If you would not be comfortable defending a line you typed yourself, do not submit it.</p>

<p>This sounds obvious written down. It is not the default behaviour, and it erodes silently — an engineer under deadline pressure skims a generated diff, sees nothing alarming, and submits. Making the expectation explicit and repeating it is genuinely most of the work here. Teams that state it clearly behave differently from teams that assume it.</p>

<p>The practical corollary is that <strong>submission implies self-review first</strong>. Read your own diff before anyone else does. This one habit catches a large share of the leftover debris — the speculative abstraction, the unused parameter, the defensive check for a condition that cannot occur — and it is exactly what reviewers most resent spending their time on.</p>

<h2>Diff size is now a process control, not a preference</h2>

<p>Review quality falls off sharply with diff size. This was known long before agents; it is why "keep pull requests small" appears in every engineering handbook and why it was routinely ignored. What has changed is that the cost of producing a large diff has collapsed, so the natural size of a pull request has drifted upward with nothing pushing back.</p>

<p>A reviewer can genuinely assess maybe 200–400 lines with full attention. Beyond that, behaviour changes in a predictable way: they read the first files carefully, skim the middle, and check that the tests pass. That is not review. It is a ceremony with an approval attached.</p>

<p>So a size ceiling stops being a style guideline and becomes a control you enforce. Not as a lint rule that people learn to bypass, but as a norm with a stated reason: above this size we cannot review it properly, so we will not pretend to. The pushback is that decomposition costs the author time. It does. That is the trade — author time is now the cheap resource and reviewer attention is the scarce one, so spending the former to protect the latter is correct.</p>

<p>Two adjustments help. Separate mechanical changes from behavioural ones into different pull requests, because a rename across sixty files reviewed alongside a logic change means the logic change gets lost. And have generated work declare its intended surface up front, so a diff that wandered outside it is visible immediately — something we build into the work-item shape described in our note on <a href="/blog/ai-agents-software-development-lifecycle">how agents change the development lifecycle</a>.</p>

<h2>Review what the machine structurally cannot</h2>

<p>Automated review handles the mechanical layer well — missing <code>await</code>, unhandled rejections, resource leaks, convention drift. There is no reason for a human to spend their first ten minutes there. But the boundary is sharp, and human review should be deliberately aimed at the far side of it, as we set out in more detail in our note on <a href="/blog/automated-pr-review-with-ai">what automated pull request review catches and misses</a>.</p>

<p>The questions worth a human's attention, in rough order of value:</p>

<ol>
  <li><strong>Is this the right change?</strong> The code may be correct and solve a problem nobody had. Generated code is never wrong about syntax and frequently wrong about intent, because it optimises for satisfying the stated requirement rather than for the requirement being right.</li>
  <li><strong>Does it hold the invariants the system depends on?</strong> The rules enforced three modules away, in a reconciliation job, or only in someone's head. This is where the genuinely expensive bugs live, and evidence for them is never inside the diff.</li>
  <li><strong>Is it safe to deploy, in this order?</strong> Migration sequencing, backwards compatibility with clients already running, whether old code will encounter the new schema during rollout.</li>
  <li><strong>Is the complexity necessary?</strong> The most reliable smell in generated code is unearned abstraction — an interface with one implementation, a configuration option nobody asked for, three layers where one would do. Every one of those is permanent maintenance cost incurred for nothing.</li>
  <li><strong>Would the tests have caught the bug?</strong> Not "are there tests". Generated suites reliably assert what the implementation already does. Pick the most important new branch and ask whether any test would fail if it were wrong.</li>
  <li><strong>Can the team maintain this?</strong> If it uses a pattern nobody else on the team uses, it is a liability at 3am regardless of its elegance.</li>
</ol>

<p>Question four is the one reviewers most often let through, because rejecting working code for being more complicated than necessary feels pedantic. It is the correct call. Complexity that nobody chose deliberately is the easiest kind to remove and the most expensive kind to keep.</p>

<h2>Tier by blast radius, not by size</h2>

<p>The volume problem does not get solved by asking reviewers to read faster. It gets solved by spending attention unevenly and on purpose.</p>

<p>Not all changes carry equal risk, and treating them identically means either over-reviewing trivia or under-reviewing the dangerous parts. Usually both. A copy change in a presentational component and a change to token validation should not pass through the same process.</p>

<table>
  <thead>
    <tr><th>Tier</th><th>Examples</th><th>Process</th></tr>
  </thead>
  <tbody>
    <tr><td>Critical</td><td>Authentication, authorisation, payments, data deletion, migrations</td><td>Two human approvals, one senior; size ceiling enforced hard; no exceptions for urgency</td></tr>
    <tr><td>Standard</td><td>Business logic, APIs, data access</td><td>One human approval focused on intent and invariants; automated pass first</td></tr>
    <tr><td>Low risk</td><td>Presentational components, copy, configuration with tests</td><td>Automated checks plus lightweight human sign-off</td></tr>
    <tr><td>Mechanical</td><td>Formatting, renames, dependency bumps with green CI</td><td>Automated verification; separated from behavioural changes</td></tr>
  </tbody>
</table>

<p>Building this taxonomy for your own codebase is a half-day exercise and it is the highest-leverage process change available. It is also the one that makes the volume increase survivable — you are not reviewing less, you are reviewing the right things more.</p>

<p>Route it mechanically where you can. A change touching your authentication paths should require the critical process automatically rather than depending on someone noticing. Encoding the taxonomy as configuration rather than as a wiki page is what makes it hold:</p>

<pre><code># review-policy.yml — tier is derived from what the diff touches,
# never from who opened it or how urgent they say it is.

tiers:
  critical:
    paths:
      - 'src/auth/**'
      - 'src/billing/**'
      - 'db/migrations/**'
      - 'src/**/permissions.ts'
    approvals: 2
    require_codeowner: true
    max_diff_lines: 400        # hard stop, no urgency override
    checklist: [intent, invariants, deploy-order, rollback]

  standard:
    paths: ['src/**']
    approvals: 1
    max_diff_lines: 600
    checklist: [intent, invariants, test-discriminates]

  low_risk:
    paths: ['src/components/**', 'content/**']
    approvals: 1
    checklist: [intent]

  mechanical:
    # Must not be mixed with behavioural change in the same pull request.
    labels: ['formatting', 'rename', 'dependency-bump']
    approvals: 0
    requires: [ci_green, no_behavioural_diff]

# Applies to every tier: authorship is not delegable.
assertions:
  - author_confirms_self_reviewed
  - generated_code_declared_scope_respected</code></pre>

<p>The <code>max_diff_lines</code> entry on the critical tier with no override is the line that matters, and it is the one teams are tempted to soften. The whole point is that urgency is precisely when review discipline is most valuable and least likely to be applied voluntarily.</p>

<p>This is also how the PR Review agent in <a href="/products/agents">our agent platform</a> is configured: it clears the mechanical layer and flags which tier a change falls into, so human attention arrives already pointed at the right questions.</p>

<h2>The team-level risks nobody puts on the roadmap</h2>

<p>Two slower problems deserve naming, because neither shows up in a metric until it is well advanced.</p>

<p><strong>Reviewer fatigue.</strong> Review is cognitively expensive and it has no visible output. When volume rises, review quality degrades before anyone reports a problem, because the approvals keep arriving on time. Watch for the signs: approvals within two minutes of opening, comment counts falling while diff sizes rise, the same one or two people reviewing everything. Review load needs to be a planned, distributed cost, not something absorbed between other work.</p>

<p><strong>Learning loss.</strong> Struggling through an implementation is how engineers build models of a system. Accepting a generated one and reading it does not produce the same understanding, and the gap shows up eighteen months later in people who can ship features but cannot debug the system or reason about a design trade-off. This is a real cost and it lands on the most junior half of your team hardest. Some work should be done the slow way on purpose — and reviewing thoughtfully is itself one of the best remaining ways to learn a codebase, which is another reason not to let review become a rubber stamp.</p>

<h2>What this means in practice</h2>

<p>Write down the authorship norm and say it out loud in a team meeting: you own what you submit, you have read all of it, you can explain any line. Then make self-review before submission an expectation. Those two things cost nothing and change behaviour more than any tool you could install.</p>

<p>Build the risk taxonomy and tier your review process against it, so senior attention concentrates on authentication, money, migrations and data rather than being spread evenly across everything. Enforce a diff-size ceiling on the critical tier with a stated reason rather than as a style rule. Let automation own the mechanical layer entirely, and rewrite your human checklist to cover only what it cannot see — intent, invariants, deploy safety, unnecessary complexity, whether the tests discriminate, and whether the team can maintain it.

</p>

<p>Review has become the most important stage in the pipeline rather than the last chore before merge, and it is worth staffing and scheduling accordingly. If you are working out how to restructure yours around a much higher volume of code, <a href="/contact">we are happy to compare approaches</a> — it is the question we get asked most often once teams start shipping agent-written work.</p>`,
  },
  {
    id: '2',
    slug: 'llm-cost-optimization-strategies',
    title: 'Controlling LLM Cost and Latency in Production Systems',
    excerpt:
      'LLM cost is rarely one expensive thing. It is a small per-call cost multiplied by a call volume nobody modelled, with context that grows quadratically.',
    date: '2026-01-08',
    author: 'WeThinkDigital Engineering',
    readTime: '9 min read',
    category: 'AI Engineering',
    tags: ['LLM', 'cost optimisation', 'latency', 'prompt caching', 'production'],
    metaTitle: 'Controlling LLM Cost and Latency in Production Systems',
    metaDescription:
      'Practical LLM cost optimization: prompt caching, model routing, context reduction and output limits — plus the token arithmetic to do before you build.',
    keywords: ['LLM cost optimization', 'prompt caching', 'LLM latency', 'token cost', 'model routing', 'AI infrastructure cost', 'production LLM systems'],
    content: `<p>A feature ships. It works. Two months later someone opens the provider dashboard and the monthly bill has four digits more than anyone budgeted, and nobody can say which endpoint is responsible. The investigation usually ends in the same place: one code path sends the full document on every turn of a conversation, so a ten-turn session re-sends the same 30,000 tokens ten times. Nobody noticed because each individual call looked reasonable.</p>

<p>This is the defining property of LLM cost. It is not one expensive thing. It is a small per-call cost multiplied by a call volume nobody modelled, made worse by context that grows quadratically with conversation length. And the same structural facts that drive cost drive latency, which is why they are worth fixing together.</p>

<h2>Do the arithmetic before you build</h2>

<p>Most cost surprises are arithmetic that was never done. The calculation takes five minutes and it should be part of the design, not the retrospective.</p>

<p>Take a support assistant. Each request sends a 1,200-token system prompt, 6,000 tokens of retrieved context, a 300-token question, and generates 500 tokens. That is 7,500 input and 500 output per call. At 2,000 calls a day you are moving 15 million input tokens and 1 million output tokens daily — around 450 million input tokens a month.</p>

<p>The exact rate depends on your provider and model, but the ratios are stable and they are what matters. Output tokens typically cost several times more than input tokens. Frontier models cost roughly an order of magnitude more than small ones. Cached input, where supported, costs a fraction of uncached input. Those three ratios determine almost every optimisation decision you will make.</p>

<p>Run the same calculation at ten times the volume. If the answer is unacceptable, the architecture is wrong now, not later — you will not optimise a 10x cost problem away with prompt tweaks.</p>

<h2>Context is the cost driver, not call count</h2>

<p>Teams instinctively try to reduce the number of calls. Usually the bigger win is reducing what each call carries.</p>

<p>In the example above, retrieved context is 80% of input tokens. Sending twelve chunks instead of six halves nothing and doubles the dominant term. And as covered in our note on <a href="/blog/building-production-rag-systems">building RAG systems that work in production</a>, more chunks frequently makes answers <em>worse</em> as well as more expensive — material in the middle of a long context is used less reliably than material at the edges. Retrieving fifty candidates and reranking down to six is cheaper and better than sending twenty unranked.</p>

<p>Conversation history is the other offender, and it is worse because it compounds. Naively appending every turn means turn ten re-sends turns one through nine. Total tokens across a session grow with the square of turn count. Fixes in ascending order of effort: cap history to the last few turns, summarise older turns into a compact running state, or — best — maintain structured state rather than a transcript, so turn ten sends a state object of a few hundred tokens instead of nine turns of prose.</p>

<h2>Prompt caching is the highest-leverage change available</h2>

<p>If your provider supports prompt caching and you are not using it, this is the first thing to fix. It typically requires no change to model, prompt content or output quality — only to the order in which you assemble the context.</p>

<p>Caching works on a shared prefix. The provider recognises that the beginning of your request is identical to a recent one and skips recomputing it, charging a reduced rate for the cached portion. The requirement is an exact-match prefix, which means everything stable must come first and everything variable must come last.</p>

<p>Most naive prompt assembly breaks this by putting a timestamp or a user identifier near the top. One variable token at position 40 invalidates the entire cacheable prefix behind it.</p>

<pre><code>// Cache-hostile: the timestamp at the top invalidates everything after it.
const bad = [
  'Request at ' + now + ' for user ' + userId,  // variable, position 0
  SYSTEM_PROMPT,                                // 1,200 tokens, stable
  TOOL_DEFINITIONS,                             // 900 tokens, stable
  retrievedContext,
  question,
].join('\\n\\n');

// Cache-friendly: stable prefix first, longest-lived first,
// variable material strictly at the tail.
function assemble(retrievedContext: string, question: string, meta: RequestMeta) {
  return [
    SYSTEM_PROMPT,        // stable across every request
    TOOL_DEFINITIONS,     // stable across every request
    FEW_SHOT_EXAMPLES,    // stable; changes only on deploy
    retrievedContext,     // varies per query
    formatMeta(meta),     // varies per request
    question,             // varies per request
  ].join('\\n\\n');
}</code></pre>

<p>Order the stable material by how long it lives: things that change on deploy before things that change per user before things that change per request. In the worked example, the system prompt, tool definitions and examples might be 2,500 tokens of a 7,500-token request. Making that third of every call cacheable is a large recurring saving for an afternoon of work.</p>

<h2>Stop using one model for everything</h2>

<p>The single most common source of waste is routing every request to the most capable model because that was what the prototype used.</p>

<p>Real workloads are a mix. Classification, extraction from structured input, routing decisions, short rewrites and yes/no judgements are handled well by small models. Multi-step reasoning, ambiguous synthesis and difficult code generation need a large one. If 70% of your traffic is the first category and you serve all of it with a frontier model, you are paying roughly ten times more than necessary for the majority of your volume.</p>

<p>Two structures work in production:</p>

<ul>
  <li><strong>Static routing by task type.</strong> You know at the call site which kind of work this is. Configure the model per task rather than globally. This is unglamorous and captures most of the available saving.</li>
  <li><strong>Escalation.</strong> Attempt with the small model, validate the output deterministically, escalate to the large model only on failure. Economical when the small model succeeds most of the time — if it succeeds 80% of the time, you pay 1.0 small calls plus 0.2 large calls instead of 1.0 large calls. If it succeeds 40% of the time, you are paying for both and you should just use the large model.</li>
</ul>

<p>The trap in escalation is validation. It only works if you can check the cheap output with code — schema conformance, a test run, a parse, a constraint check. If the only way to tell whether the small model got it right is to ask the large model, you have built a more expensive system, not a cheaper one.</p>

<h2>Latency is a different problem with overlapping fixes</h2>

<p>Cost and latency share causes but not remedies, and they occasionally conflict. Worth separating.</p>

<p>Input tokens are processed in parallel; output tokens are generated one at a time. This asymmetry is the most useful thing to know about LLM latency. A request with 8,000 input tokens and 200 output tokens is usually faster than one with 1,000 input and 1,500 output. If a response feels slow, look at output length before you look at input size.</p>

<p>Which gives a concrete lever: constrain output. Ask for structured output rather than prose with explanation. Request the fields you need and nothing else. A prompt that says "respond with JSON matching this schema, no commentary" can cut output tokens by more than half, which reduces both latency and the more expensive half of your bill.</p>

<table>
  <thead>
    <tr><th>Lever</th><th>Cost effect</th><th>Latency effect</th><th>Risk</th></tr>
  </thead>
  <tbody>
    <tr><td>Prompt caching</td><td>Large reduction on stable prefix</td><td>Improves time to first token</td><td>None if ordering is correct</td></tr>
    <tr><td>Smaller model for simple tasks</td><td>Large</td><td>Large</td><td>Quality regression if misrouted</td></tr>
    <tr><td>Fewer, reranked context chunks</td><td>Large</td><td>Moderate</td><td>Needs a reranker; usually improves quality</td></tr>
    <tr><td>Structured, bounded output</td><td>Large — output is the costly side</td><td>Large</td><td>Minimal</td></tr>
    <tr><td>Streaming</td><td>None</td><td>Perceived latency only</td><td>Complicates validation of the whole response</td></tr>
    <tr><td>Semantic caching</td><td>Large where queries repeat</td><td>Large on hit</td><td>Serving a near-miss as an exact answer</td></tr>
    <tr><td>Summarised history</td><td>Removes quadratic growth</td><td>Moderate</td><td>Loses detail; summarisation costs a call</td></tr>
  </tbody>
</table>

<p>Streaming deserves its caveat. It changes nothing about cost or total completion time, but time to first token is what users experience as speed, and the difference between four seconds of blank screen and text appearing in 400ms is enormous perceptually. It conflicts with validating the complete response before display, so for anything where a malformed or unsafe answer matters, either validate incrementally or do not stream.</p>

<p>Semantic caching — reusing a previous answer for a sufficiently similar question — is powerful where query distribution is concentrated, which in support-style workloads it usually is. The danger is the similarity threshold. "How do I cancel my subscription" and "how do I cancel my order" are close in embedding space and have different answers. Set the threshold conservatively, scope cache keys by anything that changes the correct answer (tenant, locale, entitlement), and expire on content updates.</p>

<h2>Measure per unit of work, not per month</h2>

<p>A monthly total tells you that you have a problem. It never tells you where. The metric that drives decisions is <strong>cost per completed unit of work</strong> — per resolved ticket, per processed document, per answered question — attributed to the feature that caused it.</p>

<p>That means tagging every model call with the feature, the task type, the model and the prompt version, and recording input tokens, cached tokens, output tokens and latency. With that in place you can answer the questions that matter: which feature is 60% of spend, did last week's prompt change increase output length, what is our cache hit rate, what is the p95 latency of the escalation path.</p>

<p>Two guardrails belong in the same layer. A per-request token ceiling, because a pathological input should fail fast rather than send 300,000 tokens. And a per-tenant or per-user rate limit, because unbounded automated traffic against a metered API is a financial incident waiting to happen. Both are trivial to add on day one and awkward to retrofit after a bill arrives. A cost regression check in CI — flagging when a prompt change materially increases tokens per unit of work — catches the slow drift that nobody attributes to anything.</p>

<h2>What to skip</h2>

<p>Two things absorb effort and rarely pay in the way teams expect.</p>

<p>Self-hosting an open-weight model to avoid API costs looks compelling in a spreadsheet and often is not. You take on GPU capacity planning, batching, autoscaling for spiky traffic, evaluation, and version management — all of it engineering time. It becomes genuinely economical at sustained high volume, with steady load, and a task where a smaller open model is sufficient. At moderate or bursty volume, idle GPU capacity costs more than the API you replaced.</p>

<p>Aggressive prompt compression — stripping words to save input tokens — is usually poor value. Input is the cheap side, and prompts degrade in ways that are hard to detect without a solid evaluation set. Removing a genuinely redundant thousand-token section is fine. Rewriting instructions telegraphically to save fifty tokens risks quality for a rounding error.</p>

<h2>What this means in practice</h2>

<p>Instrument first. Until every call is tagged by feature and task type with token counts attached, every optimisation is a guess, and the distribution is almost never what the team predicts. A week of instrumentation routinely reveals that one endpoint nobody was worried about is most of the bill.</p>

<p>Then work in order of leverage: enable prompt caching and reorder your context to make it effective; route simple tasks to small models; constrain output with structured schemas; reduce context through reranking rather than through sending more. Add a per-request token ceiling and a rate limit before you need them. Only after all of that is it worth evaluating semantic caching or self-hosting.</p>

<p>Cost control is not a one-off exercise, because prompts change, context grows and usage patterns shift. Treat tokens per unit of work as a tracked metric with the same seriousness as p95 latency, and the problem stays boring. If you are looking at a bill that outgrew its forecast, <a href="/contact">we are glad to help work out where it is going</a> — that diagnosis is routine in our <a href="/services/ai-engineering">AI engineering work</a>, and the fix is usually structural rather than clever.</p>`,
  },
  {
    id: '3',
    slug: 'multi-agent-orchestration-patterns',
    title: 'Multi-Agent Orchestration Patterns for Real Workloads',
    excerpt:
      'Nine agents on a diagram looked elegant and cost eleven times a single model call. Every agent boundary converts structured state to prose and back.',
    date: '2025-12-16',
    author: 'WeThinkDigital Engineering',
    readTime: '9 min read',
    category: 'AI Engineering',
    tags: ['agents', 'orchestration', 'architecture', 'state management'],
    metaTitle: 'Multi-Agent Orchestration Patterns for Real Workloads',
    metaDescription:
      'Multi-agent orchestration patterns for production: router, parallel fan-out, generate-then-verify and bounded supervision — and what each boundary costs.',
    keywords: ['multi-agent orchestration', 'agent architecture patterns', 'AI agent workflows', 'agent state management', 'LLM pipeline design', 'generate and verify', 'agent observability'],
    content: `<p>The architecture diagram had nine agents on it. A planner, a researcher, three specialists, a critic, a synthesiser, a validator and a supervisor coordinating the lot. It was genuinely elegant. In production it was slower than a single well-prompted model call, cost roughly eleven times as much, and failed in ways nobody could reproduce — because by the time an error surfaced it had passed through four agents, each of which had paraphrased the previous one's output.</p>

<p>The rebuild had two agents and a deterministic state machine between them. It was faster, cheaper, and when it failed you could tell which step failed and why.</p>

<p>This is the most common mistake in agent architecture: treating agents as the unit of decomposition when they should be the exception. Every agent boundary you add is a place where structured state becomes natural language and back again, and each of those conversions is lossy, slow and expensive.</p>

<h2>The cost of a boundary</h2>

<p>It is worth being concrete about what an agent handoff actually costs, because the diagram makes it look free.</p>

<p>When agent A passes work to agent B, three things happen. The state is serialised into text. Agent B receives that text plus its own system prompt, its own tool definitions, and whatever context it needs to be useful — typically several thousand tokens before it has done anything. Then B re-derives an understanding of the situation that A already had.</p>

<p>Add latency: another model round trip, often several seconds. Add cost: the context is re-sent, so a chain of five agents can easily send the same background information five times. Add the failure surface: B may misread A's summary, and there is no type system between them to catch it.</p>

<blockquote>A function call costs microseconds and cannot misunderstand its arguments. An agent handoff costs seconds, dollars and a paraphrase. Use the second one only when you need judgement that the first cannot provide.</blockquote>

<p>The test we apply before adding an agent: does this step require open-ended reasoning over unstructured input, or does it require a decision that a competent engineer could express as code? If it is the latter — and it usually is — it belongs in the orchestration layer, not in a model.</p>

<h2>Start with a deterministic pipeline</h2>

<p>Most workloads that get described as multi-agent are actually a fixed sequence of steps with one or two genuinely uncertain decisions in the middle. Extract fields from a document, validate them against a schema, look up the counterparty, decide whether it needs review, write the result. Only the extraction and possibly the decision need a model. Everything else is code.</p>

<p>The pattern that works is a deterministic pipeline with model calls at specific stages, not a conversation between autonomous participants. The control flow lives in your language, where you can test it, log it, retry it and reason about it:</p>

<pre><code>type Stage&lt;I, O&gt; = {
  name: string;
  run: (input: I, ctx: RunContext) =&gt; Promise&lt;O&gt;;
  /** Deterministic gate: does this output satisfy the contract? */
  validate: (output: O) =&gt; Result&lt;O, ValidationError&gt;;
  retries: number;
};

async function runPipeline&lt;T&gt;(stages: Stage&lt;unknown, unknown&gt;[], input: T, ctx: RunContext) {
  let current: unknown = input;

  for (const stage of stages) {
    let attempt = 0;
    for (;;) {
      const output = await stage.run(current, ctx);
      const checked = stage.validate(output);

      if (checked.ok) {
        ctx.audit(stage.name, { attempt, output: checked.value });
        current = checked.value;
        break;
      }

      // Feed the validation failure back as context, do not just retry blind.
      ctx.audit(stage.name, { attempt, error: checked.error });
      if (++attempt &gt; stage.retries) throw new StageFailed(stage.name, checked.error);
      current = withRepairHint(current, checked.error);
    }
  }
  return current;
}</code></pre>

<p>Two things in there matter more than the structure. Every stage has a deterministic validator, so a model's output is checked by code rather than by another model. And a failed validation is fed back as a repair hint rather than triggering a blind retry — retrying an identical prompt against a non-deterministic model is a lottery, but telling it precisely what was wrong with its last attempt usually succeeds on the second try.</p>

<h2>Four patterns that earn their keep</h2>

<h3>Router</h3>

<p>One cheap, fast classification call decides which specialised path handles the request. The router does not do the work; it picks the handler. This is the highest-value multi-agent pattern because the routing decision is small, the specialised handlers can have tight focused prompts instead of one enormous prompt covering every case, and you can use a small model for the routing and reserve the expensive model for the work.</p>

<p>The failure mode is router misclassification, which is silent and cascades — the wrong specialist answers confidently. Mitigate by making the router return a confidence and a second choice, and escalating ambiguous cases rather than guessing.</p>

<h3>Parallel fan-out with deterministic merge</h3>

<p>Where subtasks are genuinely independent — analyse twelve documents, check a change against six policy categories — run them concurrently and merge the results in code. Latency becomes the slowest branch instead of the sum, which is often a five- or ten-fold improvement in wall-clock time.</p>

<p>The critical detail is that the merge should be deterministic. The instinct is to add a synthesiser agent to combine the outputs. That reintroduces a serial model call over a large context, and the synthesiser frequently drops findings from the middle of its input. If the merge is "collect all findings, deduplicate, sort by severity", write that in code.</p>

<h3>Generate then verify</h3>

<p>Two roles with genuinely different objectives: one produces a candidate, the other checks it against criteria. This works because the verifier's job is narrower and more objective than the generator's, and because a fresh context is better at spotting a flaw than the context that produced it.</p>

<p>It works considerably better when the verifier has tools that produce ground truth — running the test suite, executing the query, calling the schema validator — rather than forming an opinion. A verifier that only reasons agrees with the generator far more often than it should. This is the pattern behind the SDE and QA agents in <a href="/products/agents">our agent platform</a> sharing one backlog: generation without independent, executable verification just produces confident output faster.</p>

<h3>Supervisor with bounded delegation</h3>

<p>The pattern people reach for first and should reach for last. A coordinating agent decides which specialist to invoke, reads the result and decides what to do next. It is the right choice when the sequence of steps genuinely cannot be known in advance — open-ended investigation, debugging, research where each finding determines the next question.</p>

<p>It needs hard bounds or it will not terminate. A maximum step count, a token budget, a wall-clock deadline, and a rule that the same subtask cannot be delegated twice. Without those, the characteristic failure is two agents politely handing a task back and forth while the meter runs.</p>

<h2>State is the hard part, not coordination</h2>

<p>Agent frameworks spend their documentation on how agents talk to each other. In production the difficulty is almost entirely about state: what is the source of truth, who may write to it, and what happens when a run dies at step four of seven.</p>

<p>Passing state as conversation history — the default in most frameworks — is the root of several problems. Context grows with every turn until you are paying to re-send the entire history on each call, and eventually truncating it, which means the system silently forgets its earliest and often most important instructions. It is also unqueryable: you cannot ask "what did the extraction stage decide" without parsing prose.</p>

<p>Keep a typed state object as the source of truth. Agents receive a projection of it — only the fields their step needs — and return structured output that is validated and merged back by the orchestrator. Conversation history becomes a debugging artefact rather than the data model.</p>

<p>This buys you the operational properties that matter:</p>

<ul>
  <li><strong>Resumability.</strong> Persist state after each stage and a failed run restarts from the last good checkpoint instead of from the beginning. On a workflow with six model calls, this is the difference between a retry costing one call and costing six.</li>
  <li><strong>Idempotency.</strong> Side-effecting steps need a stable key derived from the run and the stage, so a retry after a timeout cannot send the same message twice. Assume every step will execute more than once, because under retries it will.</li>
  <li><strong>Inspectability.</strong> When something goes wrong, you need to see the state at each boundary, not reconstruct it from a transcript.</li>
  <li><strong>Partial failure handling.</strong> In a fan-out, decide explicitly what a run means when two of twelve branches fail. Returning ten results as if they were twelve is the quiet failure that damages trust.</li>
</ul>

<h2>Cost and latency compound</h2>

<p>The arithmetic here is unforgiving and worth doing before you build, not after.</p>

<p>A single call with 4k tokens of context is one round trip. A five-agent chain where each agent carries its own 2k system prompt plus a growing shared context is five round trips and materially more than five times the tokens, because the shared context is re-sent each time. Sequential latency adds: five calls at three seconds each is fifteen seconds before any output reaches the user.</p>

<table>
  <thead>
    <tr><th>Structure</th><th>Model calls</th><th>Latency</th><th>Relative token cost</th></tr>
  </thead>
  <tbody>
    <tr><td>Single call</td><td>1</td><td>1 round trip</td><td>Baseline</td></tr>
    <tr><td>Router plus one specialist</td><td>2</td><td>2 round trips</td><td>Often below baseline — small router, tighter specialist prompt</td></tr>
    <tr><td>Fan-out of 6, code merge</td><td>6</td><td>1 round trip (slowest branch)</td><td>~6x, bought with a large latency win</td></tr>
    <tr><td>Sequential chain of 5</td><td>5</td><td>5 round trips</td><td>&gt;5x from re-sent context</td></tr>
    <tr><td>Supervisor, unbounded</td><td>Unbounded</td><td>Unbounded</td><td>Unbounded</td></tr>
  </tbody>
</table>

<p>The router row is the interesting one: adding an agent can reduce total cost, because a focused specialist prompt is much shorter than a monolithic prompt that has to handle every case. That is the shape of a good boundary — one that reduces work downstream. The sequential chain is the shape of a bad one. Per-stage model selection and prompt-cache-friendly context ordering matter a great deal here, and we cover both in our note on <a href="/blog/llm-cost-optimization-strategies">controlling LLM cost and latency</a>.</p>

<h2>Debugging a system that is different every time</h2>

<p>Non-determinism makes conventional debugging useless. You cannot reproduce the failure by rerunning it, and a stack trace tells you nothing about why a model chose what it chose.</p>

<p>What works is treating every run as a distributed trace. A run identifier threaded through every stage; for each stage the exact prompt sent, the raw response, the parsed output, the validation result, latency, token counts, and the model and prompt version used. Store it. When someone reports that the system did something strange last Tuesday, this is the only thing that will answer them.</p>

<p>Then add replay: the ability to take a recorded run and re-execute it against a modified pipeline, diffing the decisions. This is how you ship a prompt change with any confidence, and it is the piece teams most often skip and most often regret. Track stage-level metrics too — validation failure rate and retry rate per stage will point at your weak link long before users complain.</p>

<h2>What this means in practice</h2>

<p>Start with one model call and a lot of code around it. Add a second agent only when you can articulate what judgement it contributes that code cannot, and what it costs in latency and tokens. The burden of proof sits with the new boundary, not against it. Most systems that end up working well have two or three model calls in them, not nine.</p>

<p>Put the control flow in your programming language and the judgement in the model. Validate every model output with deterministic code and feed failures back as repair hints. Keep typed state rather than conversation history, checkpoint it between stages, and make every side effect idempotent. Bound anything that loops with step, token and time limits, and decide up front what a partially successful run returns.</p>

<p>Orchestration is a distributed systems problem with a non-deterministic component in it, and the discipline that makes it survivable is the same discipline that makes any distributed system survivable — clear contracts, checkpointed state, idempotent effects and real observability. The choices that matter are about where you draw the boundaries; for how to select the workloads worth orchestrating in the first place, see our note on <a href="/blog/ai-workflow-automation-business-processes">finding the processes worth automating</a>. If you are designing one of these and the diagram has more than three agents on it, <a href="/contact">talk it through with us</a> before you build — that conversation is a large part of our <a href="/services/ai-engineering">AI engineering work</a>.</p>`,
  },
  {
    id: '4',
    slug: 'legacy-system-modernization-ai',
    title: 'Modernising Legacy Systems With AI-Assisted Refactoring',
    excerpt:
      'The blocker in legacy modernisation is never the typing. It is that nobody knows what the system does, so nobody can tell whether a change broke it.',
    date: '2025-12-02',
    author: 'WeThinkDigital Engineering',
    readTime: '8 min read',
    category: 'Software Development',
    tags: ['legacy systems', 'refactoring', 'modernisation', 'testing', 'migration'],
    metaTitle: 'Modernising Legacy Systems With AI-Assisted Refactoring',
    metaDescription:
      'How AI actually helps legacy system modernisation: comprehension, characterisation tests and incremental strangulation — and why wholesale translation fails.',
    keywords: ['legacy system modernization', 'AI-assisted refactoring', 'characterisation tests', 'strangler pattern', 'legacy code comprehension', 'incremental migration', 'technical debt'],
    content: `<p>The system runs payroll for 4,000 people. It was written in 2009, the last engineer who understood the tax calculation module left in 2019, and there are 11,000 lines in a single file called <code>process.php</code> with no tests. Everyone agrees it must be modernised. Every attempt has been abandoned, because the first question — what does it currently do? — has no answer anyone will commit to.</p>

<p>This is where AI assistance is genuinely transformative, and it is not where most people expect. The headline promise is automated translation: point a model at the old code and get the new code. That is the least valuable thing on offer and the most dangerous. The real value is in comprehension and in building the safety net that makes any change survivable.</p>

<p>Because the thing that blocks legacy modernisation is almost never the typing. It is that nobody knows what the system does, so nobody can tell whether a change broke it.</p>

<h2>Why rewrites fail, briefly</h2>

<p>The instinct is a clean-slate rewrite. It fails for a reason that has nothing to do with engineering skill.</p>

<p>The old system encodes a decade of accumulated correctness. Not in its architecture — the architecture is usually bad — but in its details. The special case for employees who transferred mid-quarter. The rounding rule that matters for one jurisdiction. The retry with the specific back-off that stops a downstream system from falling over. None of it is documented. Much of it looks like a bug until you find out why it is there.</p>

<p>A rewrite reproduces the parts that are obvious and loses the parts that are subtle, and you discover the difference in production, one angry edge case at a time. Meanwhile the old system is still live, still accumulating changes, and you are maintaining two of everything.</p>

<p>Incremental strangulation — routing traffic progressively from the old system to the new, module by module, with both running — is the approach that works. It has always been correct and has always been slow, because each increment needs you to understand one region of the old system well enough to replace it safely. That understanding step is where models change the economics.</p>

<h2>Comprehension is the real win</h2>

<p>Handing a model 800 lines of undocumented procedural code and asking what it does produces, in about a minute, something a human would take a day to write: a description of the control flow, the data it touches, the branches and what appears to trigger them, the side effects, and a list of things that look anomalous.</p>

<p>It will be roughly 85% right. That number sounds disqualifying and is not, because the failure mode is favourable — you are not accepting the output as truth. You are using it as a map to direct your verification, and reading code with a hypothesis is enormously faster than reading it cold. The 15% that is wrong tends to be wrong in ways that a targeted check exposes quickly.</p>

<p>Three uses are worth building into the work:</p>

<ul>
  <li><strong>Behavioural summaries per module</strong>, reviewed and corrected by an engineer, committed to the repository. You are creating the documentation that should have existed, as a by-product of needing it.</li>
  <li><strong>Dependency and coupling maps.</strong> Which modules touch which tables, which globals are written where, what the implicit contracts are between regions of the code. This is the input to deciding where the seams are, and it is tedious to assemble by hand.</li>
  <li><strong>Business-rule extraction.</strong> Pulling the conditional logic out as a list of stated rules — "employees with status T and a start date after the 15th are prorated using calendar days, not working days" — and taking that list to the people who own the process. Frequently half the rules turn out to be obsolete, and deleting a rule is cheaper than porting it.</li>
</ul>

<p>That last one changes scope more than anything else. Modernisation projects are usually sized on the assumption that everything must be reproduced. It usually must not.</p>

<h2>Characterisation tests: the highest-value use</h2>

<p>You cannot safely change code you cannot test, and legacy code is untestable for structural reasons — global state, no dependency injection, side effects everywhere.</p>

<p>The way through is characterisation tests. Not tests of correct behaviour, which nobody can define. Tests of <em>current</em> behaviour: capture what the system does now, for a wide range of inputs, and pin it. When you then refactor, any deviation is visible immediately. If a pinned behaviour turns out to be a bug, you fix it deliberately, as its own change, with the test updated to say so.</p>

<p>Ordinarily this is dull, enormous work, which is why teams skip it. Generating it is exactly the kind of mechanical breadth models are good at — and unlike generating tests for new code, the usual objection does not apply. A characterisation test is <em>supposed</em> to assert what the implementation currently does. Tautology is the goal.</p>

<pre><code># Capture real behaviour from production inputs, then pin it.
# The expected values are recorded, not reasoned about — that is the point.

import json, pytest
from legacy_bridge import call_legacy_payroll

with open("fixtures/payroll_cases.json") as fh:
    CASES = json.load(fh)   # inputs sampled from a year of production traffic

@pytest.mark.parametrize("case", CASES, ids=lambda c: c["id"])
def test_payroll_matches_recorded_behaviour(case):
    result = call_legacy_payroll(case["input"])
    assert result == case["recorded_output"], (
        f"Behaviour changed for {case['id']}. If this change is intended, "
        f"update the fixture in the same commit and say why."
    )</code></pre>

<p>Two details matter. Sample the inputs from real production traffic rather than inventing them, because the distribution is the value — the odd cases are the ones you need pinned, and you will not think of them. And where the legacy system is not callable in isolation, run the old and new implementations side by side against the same input and diff the outputs. That comparison harness is often the single most useful artefact of the whole project, and it is worth building before any code is replaced.</p>

<h2>Where AI-assisted refactoring genuinely helps</h2>

<p>With comprehension and a safety net in place, mechanical transformation becomes low-risk and fast. The categories that work well are the ones where the change is structural and the outcome is verifiable:</p>

<table>
  <thead>
    <tr><th>Task</th><th>Suitability</th><th>Why</th></tr>
  </thead>
  <tbody>
    <tr><td>Mechanical syntax and API migration</td><td>Strong</td><td>Pattern-uniform, compiler-verifiable, tedious at scale</td></tr>
    <tr><td>Extracting pure functions from procedural blocks</td><td>Strong</td><td>Clear criterion; characterisation tests confirm equivalence</td></tr>
    <tr><td>Adding types to untyped code</td><td>Strong</td><td>Inference from usage is exactly the model's strength</td></tr>
    <tr><td>Introducing seams for dependency injection</td><td>Good</td><td>Repetitive and well-understood, but touches call sites broadly</td></tr>
    <tr><td>Splitting a large file by responsibility</td><td>Good</td><td>Needs human judgement on the boundaries</td></tr>
    <tr><td>Translating one language to another wholesale</td><td>Poor</td><td>Produces idiomatically wrong code carrying the old design</td></tr>
    <tr><td>Redesigning the data model</td><td>Poor</td><td>Requires domain and business context the code does not contain</td></tr>
    <tr><td>Deciding the target architecture</td><td>Not applicable</td><td>This is the actual engineering work</td></tr>
  </tbody>
</table>

<p>The wholesale-translation row is the one to internalise. A model asked to convert 11,000 lines of PHP to TypeScript will produce 11,000 lines of TypeScript that looks like PHP — the same global state, the same procedural shape, the same undocumented special cases, now in a language where none of it is idiomatic. You have changed the syntax and kept every structural problem, and you have thrown away the one advantage the old code had, which is that it is battle-tested. This is the modernisation equivalent of a rewrite with extra steps.</p>

<blockquote>Transformation without comprehension is just a rewrite you did not admit to. The order is always: understand, pin the behaviour, then change — and the model helps most with the first two.</blockquote>

<h2>Sequencing the work</h2>

<p>The order that holds up in practice, on a system nobody understands:</p>

<ol>
  <li><strong>Map before touching anything.</strong> Generate module-level summaries and a dependency map, have an engineer verify them, commit them. You now have documentation and a basis for planning.</li>
  <li><strong>Build the comparison harness.</strong> The ability to run old and new against identical input and diff the results. Everything downstream depends on this.</li>
  <li><strong>Pin current behaviour</strong> with characterisation tests generated from production-sampled inputs, prioritising the highest-risk modules.</li>
  <li><strong>Extract the business rules and interrogate them.</strong> Take the list to the process owners. Delete what is obsolete before you port it.</li>
  <li><strong>Choose seams and strangle incrementally.</strong> Start with a module that is low-risk, well-bounded and has a clear interface — not the most painful one. The first increment is where you prove the process works.</li>
  <li><strong>Route traffic progressively</strong> with a flag, shadowing where possible: run both, serve the old result, compare the new one, and promote when the diff is clean.</li>
  <li><strong>Delete the old path deliberately.</strong> Unretired legacy code is the most expensive thing in this list, because you are now maintaining both.</li>
</ol>

<p>Step five gets argued about. There is always pressure to start with the module causing the most pain. Resist it once — the first increment is as much about validating your comparison harness, your flagging and your rollback as it is about the code. Prove the machinery on something forgiving.</p>

<p>Steps one through three are where agent assistance scales well, because they are broad, mechanical and independently verifiable. That is the kind of work we put through <a href="/products/agents">our agent platform</a>: generating characterisation suites across many modules in parallel, with the diff against recorded behaviour as an unambiguous pass criterion. Generation of that breadth needs executable verification behind it, which is the same argument we make in our note on <a href="/blog/ai-qa-automation-test-generation">AI-generated tests</a>.</p>

<h2>The honest limits</h2>

<p>Three things will not be solved by any amount of model assistance, and pretending otherwise is how these projects go wrong.</p>

<p>Missing domain knowledge stays missing. If the code contains a rounding rule and no human alive knows which regulation it implements, a model can tell you what the code does but not whether it should. Those decisions need someone with authority over the business process, and finding that person is a project task, not a technical one.</p>

<p>Data migration remains the hardest part, and it is where these projects actually fail. Twelve years of accumulated data with schema changes, partial backfills, encoding inconsistencies and rows that violate constraints added after they were written. No model reconciles that for you. Budget for it as its own workstream from the start.</p>

<p>Finally, models generate code with confidence that is unrelated to their understanding of your system, and legacy code is dense with non-obvious load-bearing details. A plausible refactor that drops one special case is the characteristic failure, and it is why the characterisation suite comes before the refactor rather than after.</p>

<h2>What this means in practice</h2>

<p>Spend the first phase on understanding, not on code. Generate the module map and the behavioural summaries, verify them, and commit them to the repository. The documentation is worth having on its own, and it is what turns an unsizable project into a plannable one.</p>

<p>Then build the safety net before the first refactor. Characterisation tests from production-sampled inputs plus an old-versus-new comparison harness are what make incremental replacement safe, and they are the part most teams defer and then regret. Use models for the mechanical breadth — comprehension, test generation, type inference, uniform migrations — and keep architecture, data modelling and sequencing with your engineers.

</p>

<p>Done this way, modernisation stops being a multi-year gamble and becomes a series of small, reversible, verified steps. It is slower than the rewrite you were hoping for and it finishes, which the rewrite generally does not. If you are sitting on a system nobody wants to touch, <a href="/contact">tell us what it does and what you know about it</a> — mapping the unknown is where our <a href="/services/software-development">software engineering work</a> usually starts.</p>`,
  },
  {
    id: '5',
    slug: 'building-production-rag-systems',
    title: 'Building RAG Systems That Work in Production',
    excerpt:
      'Retrieve the chunks for a failing question and read them. Nine times out of ten the answer passage is simply not there — the generator was never the problem.',
    date: '2025-11-18',
    author: 'WeThinkDigital Engineering',
    readTime: '10 min read',
    category: 'AI Engineering',
    tags: ['RAG', 'retrieval', 'LLM', 'evaluation', 'vector search'],
    metaTitle: 'Building RAG Systems That Work in Production',
    metaDescription:
      'Production RAG engineering: structure-aware chunking, hybrid retrieval with reranking, grounded refusal, permission filtering and a real evaluation harness.',
    keywords: ['production RAG systems', 'retrieval augmented generation', 'hybrid search', 'reciprocal rank fusion', 'cross-encoder reranking', 'RAG evaluation', 'chunking strategy', 'recall at k'],
    content: `<p>The prototype indexed forty curated PDFs and answered beautifully. The production system indexes forty thousand documents — support tickets, contracts with three revisions each, spreadsheets exported to text, a decade of wiki pages nobody has reviewed — and the answers fall apart. The instinct is to blame the model and reach for a bigger one.</p>

<p>That is almost always the wrong diagnosis. Retrieve the chunks for a failing question and read them. Nine times out of ten the passage containing the answer is not in the set. The generator did not hallucinate out of malice; it was asked a question and handed context that did not contain the answer, and it did what such models do — produced something fluent and plausible from what it had.</p>

<p><strong>RAG failures are retrieval failures wearing a generation costume.</strong> Once you accept that, the work becomes tractable, because retrieval is a measurable engineering problem with well-understood levers.</p>

<h2>Chunking destroys more answers than any other stage</h2>

<p>The default in every tutorial is to split on a fixed character count with some overlap. It is the wrong default for real corpora, and the damage is silent.</p>

<p>Split a 900-token contract clause at 512 characters and the obligation ends up in one chunk while the party it binds ends up in another. Neither chunk answers "what is the supplier required to do", and the one that scores best is actively misleading. Split a table and every row loses its header, so a chunk reading <code>| 4.2 | 18 | 2031 |</code> is retrievable and meaningless.</p>

<p>What works is structure-aware splitting: respect the document's own boundaries — headings, sections, list groups, table units — and only fall back to size-based splitting inside a section that genuinely exceeds your limit. For tables, serialise each row with its headers repeated so the row is self-describing. For long sections, keep a parent-document pointer: embed the small chunk for retrieval precision, then expand to the surrounding section before sending to the model, so you get precise matching with sufficient context.</p>

<h3>Metadata matters more than chunk size</h3>

<p>Teams spend weeks tuning chunk size from 512 to 768 and gain very little. The same weeks spent on metadata change the system's behaviour entirely. Every chunk should carry, at minimum:</p>

<ul>
  <li><strong>Source identity and a stable deep link</strong> — without this you cannot cite, and an uncitable answer is unusable in any serious setting.</li>
  <li><strong>Section path</strong> — "Master Services Agreement › Schedule 2 › Termination" is signal for both retrieval and the reader.</li>
  <li><strong>Effective date and version</strong> — the difference between the current policy and the one it replaced. Both are in the index. Only one is the answer.</li>
  <li><strong>Access-control identifiers</strong> — the groups or roles permitted to see this content, resolvable at query time.</li>
  <li><strong>Document type</strong> — a support ticket and a signed contract deserve different trust weights.</li>
</ul>

<p>Staleness is the failure that erodes trust fastest. A system that confidently quotes a superseded policy is worse than no system, because the answer is well-formed and wrong. Version and effective-date filters at retrieval time are not a refinement; they are load-bearing.</p>

<h2>Pure vector search fails on exactly what users ask about</h2>

<p>Dense embeddings capture semantic similarity. That is their strength and it is precisely why they fail on identifiers. Error code <code>ERR_5521</code>, part number <code>BX-40-221</code>, the surname of a rarely mentioned counterparty, a specific SKU — these are tokens where you need exact lexical matching, and an embedding will cheerfully return <code>ERR_5522</code> as a near neighbour because the two strings are semantically almost identical and materially different.</p>

<p>Real user queries are full of these. Support questions are mostly error codes; legal questions are mostly proper nouns. A dense-only system is structurally bad at its most common query type.</p>

<p>The fix is hybrid retrieval — run BM25 and dense search in parallel and fuse the result lists. Reciprocal rank fusion is the right default because it combines by rank rather than by score, so you never have to normalise two incomparable scoring scales:</p>

<pre><code>from collections import defaultdict

def reciprocal_rank_fusion(result_lists, k=60, limit=50):
    """Fuse ranked lists by rank position. k=60 is the standard damping
    constant; it keeps any single list from dominating the head."""
    scores = defaultdict(float)
    chunks = {}
    for results in result_lists:
        for rank, chunk in enumerate(results):
            scores[chunk.id] += 1.0 / (k + rank + 1)
            chunks[chunk.id] = chunk
    ordered = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
    return [chunks[cid] for cid, _ in ordered[:limit]]


def retrieve(query: str, principal: Principal, top_k: int = 8):
    # Permission filter is applied INSIDE each retriever, pre-ranking.
    acl = principal.group_ids
    dense = vector_index.search(embed(query), limit=50, filter={"acl_any": acl})
    lexical = bm25_index.search(query, limit=50, filter={"acl_any": acl})

    candidates = reciprocal_rank_fusion([dense, lexical], limit=50)

    # Cross-encoder reranking: slow per pair, but only 50 pairs.
    scored = cross_encoder.rank(query, candidates)
    keep = [c for c in scored if c.score &gt;= RELEVANCE_FLOOR][:top_k]

    if not keep:
        raise NoGroundingAvailable(query)   # refuse, do not improvise
    return keep</code></pre>

<h3>Retrieve wide, then rerank</h3>

<p>The most reliable quality improvement available in a RAG pipeline is a cross-encoder reranker, and it is underused because it looks expensive.</p>

<p>The reason it works is architectural. An embedding model encodes the query and the document independently — it never sees them together, so it cannot reason about how they relate. A cross-encoder reads the query and the passage jointly and scores actual relevance. It is far too slow to run over your whole index, which is why you use approximate nearest neighbour search to get fifty cheap candidates and then spend real computation ranking only those fifty.</p>

<p>Trusting the top five straight from vector search is leaving most of your quality on the table. Retrieving fifty and reranking to eight typically adds tens of milliseconds — an order of magnitude less than the generation call you are about to make — and it is the difference between the right passage being at position two and being at position nineteen where it never reaches the model.</p>

<h2>More context is not better</h2>

<p>Large context windows tempt teams into sending fifty chunks and letting the model sort it out. This degrades answers, and it does so in a way that is easy to miss in casual testing.</p>

<p>Attention over long contexts is not uniform. Material at the beginning and end of the window is used far more reliably than material in the middle — the lost-in-the-middle effect is well documented and it is not a bug you can prompt your way out of. Padding the window with twenty marginally relevant chunks lowers the probability that the model uses the one chunk that mattered, because you have buried it.</p>

<p>Past a fairly low threshold, precision beats recall. Set a relevance floor and send fewer, better passages. Order them with the highest-scoring first. And measure this: take a question set where you know the answer passage, and compare answer quality at five chunks versus twenty. The result is usually the opposite of the intuition.</p>

<h2>Permissions are a retrieval concern, not a prompt concern</h2>

<p>This is the most serious production mistake we see, and it is worth stating bluntly: <strong>instructing the model not to reveal documents the user is not allowed to see is not access control.</strong> It is a request. The content is already in the context window, the prompt is not a trust boundary, and the failure mode is a compliance incident rather than a bad answer.</p>

<p>Filter at retrieval time, inside the query to the index, as a pre-filter rather than a post-filter. Post-filtering after ranking is also wrong for a subtler reason: if you retrieve the top fifty globally and then drop the ones the user cannot see, you may be left with three, and you have silently degraded the answer for privileged content the user could legitimately have received further down the list.</p>

<p>Note also that permission checks must be evaluated at query time against current group membership. Baking permissions into the index at ingestion means every access-control change requires a reindex, and until that reindex runs, your index is wrong. Building this properly is ordinary, careful <a href="/services/software-development">platform and data engineering</a> — it is the part of a RAG system that looks least like AI work and carries the most risk.</p>

<h2>Grounding, citation and the ability to refuse</h2>

<p>A production system must be able to say it does not know. This sounds obvious and is routinely omitted, because a system that answers everything demos better than one that declines.</p>

<p>Three mechanisms make refusal real. First, a relevance floor: if the best reranked passage scores below threshold, do not call the generator at all — you already know the answer is not in the corpus. Second, an explicit instruction that answers must be supported by the supplied passages, with a defined output for the unsupported case. Third, and most important, citation enforcement: require the model to attach passage identifiers to each claim, then verify programmatically that every cited identifier was actually in the context you sent. Claims without a valid citation get stripped or the response is regenerated.</p>

<p>Citations serve two purposes and the second is the bigger one. They let a user verify an answer, and they make the system's errors visible instead of invisible. A wrong answer with a citation is debuggable. A wrong answer without one is indistinguishable from a right one.</p>

<h2>You cannot improve what you do not measure</h2>

<p>Most teams evaluate by asking a few questions and forming an impression. That does not survive the first tuning change, because you have no way to know whether a change that fixed three questions broke nine others.</p>

<p>Build a golden set — 100 to 200 real questions, drawn from what users actually ask, each labelled with the passage or passages that contain the answer. This is a few days of unglamorous work and it is the highest-return investment in the entire project.</p>

<p>Then measure retrieval and generation separately, because they fail separately and fixing one does nothing for the other.</p>

<table>
  <thead>
    <tr><th>Symptom</th><th>Likely stage</th><th>What to change</th></tr>
  </thead>
  <tbody>
    <tr><td>Answer invents plausible detail</td><td>Retrieval — answer passage absent</td><td>Hybrid search, reranking, chunk boundaries</td></tr>
    <tr><td>Fails on error codes, part numbers, names</td><td>Retrieval — dense-only</td><td>Add BM25 and fuse</td></tr>
    <tr><td>Right document, wrong or partial passage</td><td>Chunking</td><td>Structure-aware splits, parent expansion</td></tr>
    <tr><td>Correct passage retrieved, answer still wrong</td><td>Generation or context order</td><td>Fewer chunks, better ordering, tighter prompt</td></tr>
    <tr><td>Confidently quotes superseded policy</td><td>Metadata</td><td>Version and effective-date filters</td></tr>
    <tr><td>Quality collapsed after a deploy</td><td>Operations</td><td>Embedding model version changed under you</td></tr>
  </tbody>
</table>

<p>For retrieval, recall@k is the number that matters: in what fraction of questions does the correct passage appear in the top k you send to the model? It is a hard ceiling — if recall@8 is 0.62, then 38% of your questions cannot be answered correctly no matter how good the generator is. Track MRR alongside it to see whether the right passage is arriving near the top or scraping in at the bottom.</p>

<p>For generation, measure faithfulness (is every claim supported by the retrieved passages) and answer relevance (does it address what was asked). An LLM judge is a reasonable instrument here, with two caveats: judges are biased toward longer and more confident answers, and they must be validated against human labels on a sample before you trust their verdicts. Use them for regression detection, not for absolute quality claims.</p>

<h2>Operating the thing</h2>

<p>Three operational realities catch teams out, and all three are cheap to handle if you plan for them and expensive if you do not.</p>

<p><strong>Pin your embedding model version.</strong> Vectors from different model versions are not comparable. Silently upgrading the embedding model means your query vectors live in a different space from your indexed vectors, and quality degrades in a way that looks like a mysterious regression. Treat the embedding model as part of the index identity, build a new index when it changes, and cut over deliberately.</p>

<p><strong>Plan incremental updates from day one.</strong> A full rebuild is fine at ten thousand documents and unacceptable at ten million. You need change detection, per-document upsert and delete, and a way to reconcile the index against the source of truth — deletions are the ones that get forgotten, and an index that still serves a retracted document is a real problem.</p>

<p><strong>Know your latency budget before you design.</strong> Embedding, hybrid retrieval, reranking and generation each take a slice. Reranking is usually worth its cost; generation dominates. If the budget is tight, cut chunk count before you cut the reranker. Cost and latency in the generation stage have their own set of levers, which we cover in our note on <a href="/blog/llm-cost-optimization-strategies">controlling LLM cost and latency in production</a>.</p>

<h2>What this means in practice</h2>

<p>Build the evaluation harness before you tune anything. Without a golden set you are not engineering, you are reacting to anecdotes, and every change you make will be an uncontrolled experiment.</p>

<p>Then work in the order the failures occur: chunking and metadata first, because nothing downstream can recover a destroyed passage; hybrid retrieval and reranking second, because that is where the largest measurable gain sits; grounding and refusal third; prompt tuning last, because it is where teams instinctively start and where the least value is. Put permission filtering into the retrieval layer at the beginning — retrofitting a security boundary into a shipped system is the expensive version of this lesson.</p>

<p>None of this is exotic. It is careful information-retrieval engineering with a language model at the end, and the teams that treat it that way get systems that hold up. If you are staring at a prototype that will not survive its corpus, <a href="/contact">describe the corpus to us</a> — that is usually where the diagnosis starts, and it is the shape of most of our <a href="/services/ai-engineering">AI engineering work</a>.</p>`,
  },
  {
    id: '6',
    slug: 'ai-workflow-automation-business-processes',
    title: 'AI Workflow Automation: Finding the Processes Worth Automating',
    excerpt:
      'Route support tickets or approve supplier invoices. Same shape on a slide, completely different risk. Most automation programmes fail at selection, not build.',
    date: '2025-11-04',
    author: 'WeThinkDigital Engineering',
    readTime: '9 min read',
    category: 'AI Automation',
    tags: ['automation', 'workflow design', 'human in the loop', 'process selection'],
    metaTitle: 'AI Workflow Automation: Finding the Processes Worth Automating',
    metaDescription:
      'A scoring framework for AI workflow automation: volume, reversibility, determinism, ground truth and the autonomy ladder you earn one measured rung at a time.',
    keywords: ['AI workflow automation', 'business process automation', 'human in the loop', 'automation selection criteria', 'agentic workflows', 'process reversibility', 'shadow mode'],
    content: `<p>Two candidates arrive in the same planning session. Route inbound support tickets to the right team. Approve supplier invoices under a threshold. On a slide they are the same shape: read an input, make a decision, take an action. Both are described as "AI automation" and both get the same estimate.</p>

<p>They are not remotely the same problem. A misrouted ticket costs a few minutes and is corrected by the person who receives it — the error is cheap, visible and reversible. A wrongly approved invoice moves money to an external party, and recovering it involves finance, the supplier and possibly a lawyer. One of these can run autonomously at 92% accuracy from week one. The other should not run autonomously at 99.5% accuracy, because the 0.5% is unrecoverable.</p>

<p>Most automation programmes do not fail during implementation. They fail at selection, months earlier, in a meeting where nobody asked what happens when the system is wrong.</p>

<h2>Six dimensions that actually predict success</h2>

<p>Here is the assessment we run before writing any code. It is deliberately boring and it kills a lot of proposals, which is the point — the cheapest automation project is the one you correctly decline.</p>

<h3>1. Volume multiplied by handling time</h3>

<p>This is the only source of value, so compute it first and compute it honestly.</p>

<p>Take a process running 200 times a day at 6 minutes of human handling time. That is 1,200 minutes, or roughly 20 hours of human time per day — three people. Automate 70% of it end to end and you have recovered around 14 hours a day. That is a real project with a real return.</p>

<p>Now take a process running 3 times a day at 6 minutes. That is 18 minutes a day. Automate it perfectly and you have saved an hour and a half a week, against an engineering build, an integration surface, a monitoring burden and a permanent maintenance obligation. The arithmetic says do nothing, and the arithmetic is right.</p>

<p>People systematically overestimate the volume of processes that annoy them and underestimate the volume of processes that are merely tedious. Get the numbers from a system, not from a conversation.</p>

<h3>2. Error cost and reversibility</h3>

<p>Volume tells you the upside. This tells you what you can actually ship.</p>

<p><strong>Reversibility is the single best predictor of whether a process can run autonomously.</strong> Not accuracy — reversibility. A system that misroutes a ticket has created a correctable inconvenience. A system that sends the wrong email to a customer has created an impression you cannot retract. A system that approves a payment, deletes a record or files a regulatory submission has done something you may not be able to undo at any price.</p>

<p>The useful way to think about it: expected cost is error rate multiplied by cost per error, and if cost per error is effectively unbounded, no achievable error rate makes autonomy acceptable. That is not a modelling problem to be solved with a better prompt. It is a structural property of the process, and the correct response is a human approval gate, permanently.</p>

<h3>3. Determinism of the decision</h3>

<p>This is where we disappoint people, so we do it early.</p>

<p>If the decision rule is stable and expressible — route to the billing queue when the account has an open invoice and the message matches a known set of billing intents — then you want code. Not a model. Code is deterministic, testable, debuggable at 3am, free to run, and behaves identically on the millionth execution as on the first. A model will do the same job with a latency budget, a per-call cost, non-determinism and an evaluation harness you now have to maintain.</p>

<p><strong>A large share of requests that arrive labelled "AI automation" are ordinary integration work.</strong> Two systems that do not talk to each other, a form that should write to a database, a report that someone assembles by hand from three exports every Monday. There is no inference problem anywhere in it. The honest answer is to build it as <a href="/services/software-development">a piece of software</a>, deliver it faster and cheaper than the AI version, and spend the model budget where variability actually demands it.</p>

<p>We say this to clients before we quote, and it costs us work occasionally. It is still the right call — an unnecessary model in a workflow is a permanent tax on reliability.</p>

<h3>4. Input variability</h3>

<p>So when <em>is</em> a model the right tool? When the input is unstructured and heterogeneous and no rule survives contact with it.</p>

<p>Free-text email threads where the request is buried in paragraph four. Invoices from 300 suppliers in 300 layouts. Support messages in multiple languages with typos and screenshots. Contract clauses that mean the same thing in nine different phrasings. This is the genuine use case: the variability is irreducible, a rules engine would need a thousand rules and would still miss, and a model handles the long tail gracefully.</p>

<p>The test is simple. If you can write the rules, write the rules. If every attempt to write the rules produces an ever-growing list of exceptions, you have found a real inference problem.</p>

<h3>5. Availability of ground truth</h3>

<p>Ask one question: after the system produces an output, can anyone determine whether it was correct, and how soon?</p>

<p>For ticket routing, yes — a reassignment is a labelled error, available within hours, essentially for free. For invoice coding, yes, at month-end close. For "assess whether this supplier poses a delivery risk", often no: there may be no event that confirms or refutes the judgement, and if there is, it arrives eighteen months later.</p>

<p><strong>No ground truth means no evaluation, and no evaluation means no operation.</strong> You cannot detect drift, you cannot tell whether a prompt change helped, and you cannot justify raising the autonomy level. Processes without a feedback signal are the ones that quietly degrade for six months before somebody notices.</p>

<h3>6. Process stability</h3>

<p>A process that is restructured every quarter will consume your engineering capacity in maintenance. You are not automating a process; you are automating a snapshot of it. Ask when it last changed materially and who owns it. A process with no clear owner is a process that will change without telling you.</p>

<p>And the related trap: automating a broken process instead of fixing it. If the ticket queue needs routing because the intake form asks the wrong questions, the automation is an expensive workaround for a ten-minute form change. Map the process before you automate it and you will occasionally find the whole step should be deleted.</p>

<h2>Scoring it</h2>

<p>We make this explicit rather than intuitive, because an explicit score is arguable and an intuition is not. The gate matters more than the score — a candidate can look excellent on volume and still be disqualified on ground truth.</p>

<pre><code>interface Candidate {
  name: string;
  runsPerDay: number;
  minutesPerRun: number;
  /** Unbounded when the action cannot be undone: payments, deletions, filings. */
  reversibility: 'trivial' | 'costly' | 'irreversible';
  /** 'rules' means build software, not a model. */
  decisionType: 'rules' | 'judgement-over-structured' | 'judgement-over-unstructured';
  groundTruth: 'immediate' | 'delayed' | 'none';
  materialChangesPerYear: number;
}

const DAILY_HOURS_FLOOR = 4;   // below this, the build rarely pays for itself

function assess(c: Candidate) {
  const dailyHours = (c.runsPerDay * c.minutesPerRun) / 60;

  const disqualifiers: string[] = [];
  if (dailyHours &lt; DAILY_HOURS_FLOOR) disqualifiers.push('insufficient volume');
  if (c.groundTruth === 'none') disqualifiers.push('not evaluable — cannot be operated');
  if (c.materialChangesPerYear &gt; 3) disqualifiers.push('process too unstable');

  const recommendation =
    disqualifiers.length &gt; 0 ? 'decline'
    : c.decisionType === 'rules' ? 'build-as-software'
    : c.reversibility === 'irreversible' ? 'draft-for-approval-only'
    : 'automate-with-autonomy-ladder';

  return { dailyHours, disqualifiers, recommendation };
}</code></pre>

<p>Note that the highest-value processes are frequently <em>not</em> the ones with the most executive attention. Invoice line-item coding is nobody's strategic priority and is often the best candidate in the building: high volume, unstructured input, reversible before close, immediate ground truth, stable for years.</p>

<h2>The autonomy ladder</h2>

<p>Once a candidate passes, the question is how much authority to grant it. The answer is not a design decision made up front. It is a position you earn with measured accuracy.</p>

<table>
  <thead>
    <tr><th>Rung</th><th>System behaviour</th><th>What it takes to get here</th></tr>
  </thead>
  <tbody>
    <tr><td>Shadow</td><td>Runs on live input, writes nothing, decisions logged and compared to the human's</td><td>Nothing. Always start here</td></tr>
    <tr><td>Suggest</td><td>Proposes an option the human accepts or overrides in one click</td><td>Shadow accuracy that beats the current process</td></tr>
    <tr><td>Draft for approval</td><td>Produces the complete action; a human approves before it takes effect</td><td>High acceptance rate on suggestions. Terminal rung for irreversible actions</td></tr>
    <tr><td>Act with reversal window</td><td>Executes, notifies, holds a defined window in which it can be cleanly undone</td><td>A genuine undo path, plus measured accuracy at the target rate</td></tr>
    <tr><td>Autonomous</td><td>Executes, escalates only low-confidence cases</td><td>Sustained accuracy, stable drift metrics, and reversible consequences</td></tr>
  </tbody>
</table>

<p>Shadow mode is the rung teams skip and the one that does all the work. It costs almost nothing, it runs against real production traffic rather than a sanitised test set, and it produces the labelled dataset you need to argue for promotion. It also surfaces the input distribution you did not anticipate — the 8% of tickets that arrive as forwarded threads with four quoted replies — before those cases can cause damage.</p>

<blockquote>Autonomy is not a setting you configure. It is a claim about measured accuracy and bounded consequences, and it should require evidence in the same way a production deployment does.</blockquote>

<p>Within a rung, confidence thresholds do the routing. Below the threshold, escalate to a human with the reasoning attached. Above it, proceed. Two rules keep this honest: model-reported confidence must be calibrated against your own outcome data before you trust it as a threshold, and the escalation path needs a named owner and a service level. An escalation queue nobody watches is just a slower failure.</p>

<h2>The unglamorous parts are what make it survive</h2>

<p>The decision logic is a fraction of the work. What determines whether an automation is still running in a year is the operational scaffolding, and it is the first thing cut when a pilot is rushed.</p>

<ul>
  <li><strong>Idempotency.</strong> Every action needs a stable key so a retry cannot double-post an invoice or send a message twice. Assume every step will be retried, because eventually it will be.</li>
  <li><strong>Decision audit log.</strong> For every execution: the input, the retrieved context, the decision, the confidence, the model and prompt version, and the action taken. When someone asks why the system did something in March, this is the only acceptable answer.</li>
  <li><strong>Replay.</strong> The ability to rerun historical inputs through a new version and diff the decisions. This is how you ship a change without gambling.</li>
  <li><strong>An off switch.</strong> One flag, no deploy required, that any operations person can flip. Every autonomous system needs one and it should be tested, not theoretical.</li>
  <li><strong>Drift monitoring.</strong> Alert on the distribution, not just on errors: a sudden shift in confidence, in escalation rate, or in the mix of categories usually means the input changed and you are now operating outside your evaluation set.</li>
</ul>

<p>When a workflow needs several specialised steps that hand work to each other — extract, validate, decide, act — the coordination becomes its own design problem, with its own failure modes around retries and partial completion. We work through those in our note on <a href="/blog/multi-agent-orchestration-patterns">multi-agent orchestration patterns</a>.</p>

<h2>What this means in practice</h2>

<p>Inventory before you build. List the candidate processes, get real volume and handling-time numbers from systems rather than from opinions, and score each one on error cost, reversibility, determinism, input variability, ground truth and stability. Expect most of the list to be disqualified, and expect a meaningful share of the survivors to be integration work with no inference problem in them at all. Both outcomes are wins — you have avoided spending a quarter on something that would not have paid back.</p>

<p>For whatever survives, start in shadow mode and climb the ladder on evidence. Build the audit log, the replay path and the off switch in the first version, not the second. And fix the process before you automate it, because automating a broken process just makes the brokenness faster and harder to see.</p>

<p>The pattern across the programmes that work is unremarkable: they picked fewer processes, picked them on reversibility and volume rather than on enthusiasm, and invested in the operational plumbing that makes an autonomous system safe to leave running. If you want a second opinion on your own shortlist — including which items we would tell you not to automate — <a href="/contact">send us the list</a>. Sorting that out is the first thing we do in any <a href="/services/ai-automation">AI automation</a> engagement.</p>`,
  },
  {
    id: '7',
    slug: 'ai-qa-automation-test-generation',
    title: 'AI-Generated Tests: Making QA Automation Actually Useful',
    excerpt:
      'A model can take a module from 12% to 90% coverage before lunch, and the suite will catch nothing — because every assertion came from the implementation.',
    date: '2025-10-27',
    author: 'WeThinkDigital Engineering',
    readTime: '9 min read',
    category: 'AI Automation',
    tags: ['testing', 'QA automation', 'mutation testing', 'test generation'],
    metaTitle: 'AI-Generated Tests: Making QA Automation Actually Useful',
    metaDescription:
      'Why AI-generated tests reach 90% coverage and catch nothing, and how to fix it: mutation testing, spec-driven generation and property-based tests that work.',
    keywords: ['AI generated tests', 'QA automation', 'mutation testing', 'test coverage', 'property based testing', 'regression tests', 'test generation'],
    content: `<p>Point a capable model at a module sitting on 12% line coverage and you can be at 90% before lunch. The suite is green. The coverage badge is a pleasant colour. And the suite will not catch a single regression you care about, because almost every assertion in it was derived from the implementation rather than from what the code is supposed to do.</p>

<p>Here is the shape of it, taken from a discount calculator with an off-by-one in its tier boundary:</p>

<pre><code>// The implementation, containing a bug: the tier boundary should be &gt;=
export function discountFor(orderTotal: number): number {
  if (orderTotal &gt; 500) return 0.1;
  return 0;
}

// The generated test. 100% line coverage. Passes. Useless.
it('returns 0.1 for orders over 500', () =&gt; {
  expect(discountFor(501)).toBe(0.1);
});
it('returns 0 for orders of 500 or less', () =&gt; {
  expect(discountFor(500)).toBe(0);
});</code></pre>

<p>The second test does not merely fail to catch the bug. It <em>codifies</em> the bug. When someone later fixes the boundary to match the specification, this test goes red and a well-meaning engineer will "fix the test" back to the broken behaviour. You have taken a defect and given it institutional protection.</p>

<h2>Coverage is a proxy, and generation games proxies perfectly</h2>

<p>Line coverage measures whether a line executed during the test run. It says nothing about whether anything was asserted, whether the assertion was meaningful, or whether the expected value was derived from a specification or read off the current output.</p>

<p>That was always a weak proxy. It was tolerable when writing tests was expensive, because the cost of authoring imposed a rough discipline — a human writing an assertion by hand generally has some opinion about what the answer ought to be. Remove the cost and you remove the discipline. Generation optimises precisely for the measured thing, which is execution, not verification.</p>

<p>The question worth asking is not "what is our coverage". It is: <strong>would this suite have gone red before the last three incidents shipped?</strong> That question is answerable, and the answer for a freshly generated suite is usually no.</p>

<h2>Four ways generated suites fail</h2>

<h3>Tautological tests</h3>

<p>The category above. The model reads the implementation, computes what it returns, and asserts that. This is a circular argument rendered in code. It pins behaviour rather than verifying it, which has some narrow value in refactoring — but it is not testing, and calling it testing is how teams end up with false confidence.</p>

<h3>Mock-shaped tests</h3>

<p>Ask for a unit test of a service with four collaborators and you will often get a test that mocks all four. What remains under test is the orchestration glue. The assertions become "was <code>repo.save</code> called once with this object", which passes forever regardless of whether <code>save</code> actually persists anything or whether the object shape is right.</p>

<p>These tests are worse than no tests on two counts: they are coupled to implementation structure, so they break on every legitimate refactor, and they verify the test double rather than the system.</p>

<h3>Snapshot sprawl</h3>

<p>Snapshots are the path of least resistance for a generator, because no judgement about correct output is required — whatever comes out becomes the expectation. A few snapshots of stable, meaningful output are fine. Two hundred auto-generated snapshots produce a workflow where every change turns thirty snapshots red and the team resolves it by running the update flag. Now the suite asserts nothing at all, and it takes four minutes of CI to do so.</p>

<h3>Tests generated from buggy code</h3>

<p>The general case of the first failure. If the source of truth for generation is the implementation, then every existing defect becomes an expected behaviour. You are not writing a safety net. You are taking a photograph of the current state and framing it.</p>

<h2>Mutation testing is the honest scoreboard</h2>

<p>If coverage cannot tell you whether a suite has value, something else has to. Mutation testing does it directly: it introduces small changes to your source — flip a comparison operator, change a boundary, remove a statement, negate a condition — and reruns the suite. Each mutant that the suite fails to catch is a defect of that exact shape that could ship today.</p>

<p>Run it against our discount calculator. Mutate <code>&gt;</code> to <code>&gt;=</code> and the suite goes red, so that mutant is killed — but only because the test encoded the wrong boundary in the first place, which mutation score alone will not tell you. Mutate the return value of <code>0.1</code> to <code>0.11</code> and it also dies. Now mutate a branch that the generated tests executed without asserting on, and it survives. Survivors are where the real information is.</p>

<p>Stryker covers JavaScript and TypeScript; mutmut and cosmic-ray cover Python. The results are uncomfortable the first time. It is common for a suite with 85% line coverage to sit somewhere around 45–55% mutation score, and that gap is an exact measurement of how much of your suite is decoration.</p>

<blockquote>Coverage tells you which lines ran. Mutation score tells you which bugs your suite would notice. Only one of those is a test result.</blockquote>

<p>Mutation testing is expensive — you are running the suite once per mutant, so runtime scales with mutant count. Do not put it on every pull request. Run it nightly, or scoped to changed files, and treat the score as a gate on new code rather than a quest to fix the whole repository.</p>

<h2>Where generation is genuinely excellent</h2>

<p>None of this is an argument against generating tests. It is an argument about what you generate them <em>from</em>. Point the generator at the specification, the bug report or the input space rather than at the implementation, and it becomes one of the highest-value uses of a model in the entire delivery pipeline.</p>

<h3>Regression tests from a failing trace</h3>

<p>The single best use, with no close competitor. You have a bug report, a stack trace, maybe a request payload. Generating a minimal failing test from that artefact is fast, the correctness criterion is unambiguous (it must fail now and pass after the fix), and the resulting test is permanently valuable. Every incident should produce one, and nobody has ever enjoyed writing them by hand.</p>

<h3>Boundary and edge-case enumeration</h3>

<p>Humans are lazy about the unhappy path. Models are relentless about it. Empty collection, single element, duplicate keys, maximum integer, negative zero, unicode surrogate pairs, leap day, daylight-saving transition, timezone at the date line, string that looks like a number, deeply nested null. Ask for the edge cases and evaluate the list yourself — the enumeration is the value, the assertions still need your judgement.</p>

<h3>Property-based tests</h3>

<p>This is where generation and good testing genuinely align, because a property is a statement about intent rather than about implementation, so there is nothing to be tautological about. The framework then searches the input space far more thoroughly than any handwritten example set.</p>

<pre><code>import fc from 'fast-check';

// A property is derived from the spec, not from the code.
// Any implementation satisfying the spec passes; the bug above does not.
it('discount never decreases as order total increases', () =&gt; {
  fc.assert(
    fc.property(
      fc.double({ min: 0, max: 100_000, noNaN: true }),
      fc.double({ min: 0, max: 100_000, noNaN: true }),
      (a, b) =&gt; {
        const [lo, hi] = a &lt;= b ? [a, b] : [b, a];
        return discountFor(lo) &lt;= discountFor(hi);
      },
    ),
  );
});

it('applied discount never exceeds the order total', () =&gt; {
  fc.assert(
    fc.property(fc.double({ min: 0, max: 100_000, noNaN: true }), (total) =&gt; {
      const off = total * discountFor(total);
      return off &gt;= 0 &amp;&amp; off &lt;= total;
    }),
  );
});</code></pre>

<p>Monotonicity and bounded-output are properties a model can propose well when you describe what the function is for. The generator's job is proposing candidate invariants; yours is deciding which ones are actually true of your domain.</p>

<h3>Parametrised table tests and fixture data</h3>

<p>For pure functions with a specified input-output relation, table-driven tests are mechanical to expand and genuinely useful. Similarly, generating realistic fixture data — a few hundred plausible records with correct referential integrity and nasty-but-valid values — removes a real chore and improves test realism.</p>

<h2>Generate from the spec, and close the loop</h2>

<p>The operational change that matters is source of truth. If your work items carry machine-checkable acceptance criteria, those criteria are the correct generation input, and the resulting test is a genuine check on the implementation rather than a mirror of it. We described that work-item shape in our note on <a href="/blog/ai-agents-software-development-lifecycle">how agents change the development lifecycle</a>; test generation is the stage where the discipline pays off most visibly.</p>

<p>Two rules make this concrete and are worth enforcing in CI:</p>

<ul>
  <li><strong>A generated test for new behaviour must fail against the unmodified branch.</strong> Run it before the implementation lands. If it passes, it is not testing the new behaviour, and it should be rejected automatically. This one check eliminates the tautological category outright.</li>
  <li><strong>Generation should not see the implementation when the specification is available.</strong> Give it the acceptance criteria and the function signature. Withholding the body is the difference between verification and transcription.</li>
  </ul>

<p>The second operational change is closing the loop. A generator that emits files into a pull request has done the easy half. A QA agent that runs the suite against a real environment, observes the failures, distinguishes a genuine defect from its own bad assumption, and iterates is doing the job. That feedback loop is why the QA agent in <a href="/products/agents">our agent platform</a> shares a backlog with the SDE and PR-Review agents rather than running as a standalone generator — tests written in isolation from execution are guesses.</p>

<h2>The maintenance bill nobody costs</h2>

<p>A test suite is code, and generated tests are code nobody has read. Three thousand generated tests that take eleven minutes of CI on every push impose a real tax: on build time, on the patience of engineers waiting for feedback, and on every future refactor, which now breaks four hundred tests that were coupled to structure rather than behaviour.</p>

<p>When those four hundred go red, the team faces a question they cannot answer: which of these failures indicate a real regression? Nobody knows, because nobody wrote them. The rational response is to delete or bulk-update them, at which point the entire exercise was negative value.</p>

<p>Volume is not the goal. A hundred tests that would each have caught a distinct real defect beat three thousand that assert the code does what the code does.</p>

<h2>What this means in practice</h2>

<p>Stop reporting coverage as a quality metric and start reporting mutation score on changed code. It is a harder number and a much more honest one, and it will immediately tell you whether your generated tests are worth their runtime. Set the gate on new code only — retrofitting the whole repository is a project nobody will finish.</p>

<p>Change what you generate from. Specifications and failing traces produce tests with real discriminating power; implementations produce mirrors. Add the "must fail before the fix" check to CI, because it is a handful of lines of pipeline configuration and it removes the single most common defect in generated suites. Review generated tests with the same seriousness as production code, and delete aggressively — a test that cannot fail is a liability with a maintenance cost.

</p>

<p>Used well, this is genuinely one of the better applications of models in engineering: the unhappy paths finally get written, incidents reliably produce regression tests, and property-based testing stops being something teams mean to get around to. If you want help wiring that into a delivery pipeline rather than just generating files, <a href="/services/ai-automation">our automation work</a> is largely this shape of problem — <a href="/contact">tell us what your suite looks like today</a>. For the review side of the same loop, see our note on <a href="/blog/automated-pr-review-with-ai">what automated pull request review catches and misses</a>.</p>`,
  },
  {
    id: '8',
    slug: 'nextjs-15-performance-optimization',
    title: 'Building Fast Next.js Applications: A Performance Checklist',
    excerpt:
      'One client component in the root layout shipped 340KB the server could have rendered. Most App Router performance work is two or three structural decisions.',
    date: '2025-10-20',
    author: 'WeThinkDigital Engineering',
    readTime: '8 min read',
    category: 'Web Development',
    tags: ['Next.js', 'performance', 'React', 'Core Web Vitals', 'web development'],
    metaTitle: 'Building Fast Next.js Applications: A Performance Checklist',
    metaDescription:
      'A Next.js performance checklist for the App Router: client boundaries, fetch waterfalls, rendering modes, LCP, bundle weight and guarding against regressions.',
    keywords: ['Next.js performance', 'App Router optimization', 'React Server Components', 'Core Web Vitals', 'bundle size', 'LCP optimization', 'streaming and Suspense'],
    content: `<p>A dashboard we were asked to look at scored 34 on mobile. The team had already done the obvious things: images were optimised, fonts were subset, the bundle had been through an analyser. The problem was a single line in the root layout — a client component wrapping the whole tree to provide a theme context. That one wrapper turned every page beneath it into a client component, shipped 340KB of JavaScript that the server could have rendered, and delayed interactivity on every route in the application.</p>

<p>That is the shape of most performance work in the App Router. It is rarely a thousand small inefficiencies. It is usually two or three structural decisions — where the client boundary sits, what blocks the initial response, how data is fetched — each costing hundreds of kilobytes or hundreds of milliseconds. Find those and the rest is noise.</p>

<p>Here is the checklist we actually work through, in the order the wins tend to appear.</p>

<h2>1. Audit the client boundary first</h2>

<p><code>'use client'</code> is not a per-file annotation. It marks an entry point into the client bundle, and everything that file imports — plus everything those files import — goes with it. A single misplaced directive near the root of the tree can pull most of your application into the browser.</p>

<p>Start by finding every occurrence and asking what it is there for. The legitimate reasons are state, effects, event handlers, browser APIs and hook-based libraries. Everything else belongs on the server.</p>

<p>The recurring mistake is the provider wrapper. A theme, an analytics context or a state store wrapped around <code>{children}</code> in the root layout does not have to make the children client components — but it will if you write it carelessly. The fix is to keep the provider itself as a thin client component and pass server-rendered children through it:</p>

<pre><code>// app/layout.tsx — stays a Server Component.
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    &lt;html lang="en"&gt;
      &lt;body&gt;
        {/* Providers is a client component, but children was already
            rendered on the server and passes through as an opaque payload. */}
        &lt;Providers&gt;{children}&lt;/Providers&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  );
}

// app/providers.tsx
'use client';
export default function Providers({ children }: { children: React.ReactNode }) {
  return &lt;ThemeProvider&gt;{children}&lt;/ThemeProvider&gt;;
}</code></pre>

<p>Because <code>children</code> is passed as a prop rather than imported, the server components inside it are never pulled into the client graph. This distinction is responsible for more wasted bundle weight than any other single thing in the App Router.</p>

<p>Then push boundaries down. A page with one interactive element should not be a client component; the element should be. We routinely see a 400-line page marked <code>'use client'</code> for the sake of one dropdown.</p>

<h2>2. Fix waterfalls, not query speed</h2>

<p>Sequential awaits are the most common latency bug in server components, and they hide well because each individual query looks fast.</p>

<p>Three awaits at 120ms each is 360ms of server time before a single byte is sent. Run them concurrently and it is 120ms. Nothing got faster; the dependency was imaginary.</p>

<pre><code>// Waterfall: 360ms. Each await blocks the next.
const user = await getUser(id);
const orders = await getOrders(id);
const offers = await getOffers(id);

// Concurrent: ~120ms. Only genuinely dependent calls should be sequential.
const [user, orders, offers] = await Promise.all([
  getUser(id),
  getOrders(id),
  getOffers(id),
]);</code></pre>

<p>Where a dependency is real — you need the user before you can fetch their organisation — move the dependent part into its own component and wrap it in <code>&lt;Suspense&gt;</code> so the rest of the page streams immediately rather than waiting.</p>

<p>Two related points. Requests are deduplicated within a single render pass, so calling the same fetch in two components is not the problem people assume it is. And a slow third-party call in a layout is the worst case in the entire framework: layouts render on every navigation within their segment, so one 800ms call there taxes every page below it.</p>

<h2>3. Know which rendering mode each route is in</h2>

<p>Routes that could be static frequently are not, because something in them opted into dynamic rendering by accident. Reading <code>cookies()</code>, <code>headers()</code> or <code>searchParams</code>, or setting <code>cache: 'no-store'</code>, makes the whole route dynamic.</p>

<p>The cost is significant: a static route is served from the edge in tens of milliseconds, while a dynamic one runs your server on every request. Check the build output — it reports which routes are static and which are dynamic — and for anything unexpectedly dynamic, find the cause.</p>

<p>For content that changes occasionally, time-based revalidation is usually the right answer rather than full dynamic rendering. For pages with a static shell and a small personalised region, render the shell statically and stream the personalised part inside <code>&lt;Suspense&gt;</code>. Most "this page must be dynamic" requirements turn out to be about one component, not the whole page.</p>

<h2>4. Treat LCP as a layout problem</h2>

<p>Largest Contentful Paint is usually decided by the hero area, and the mistakes are consistent.</p>

<ul>
  <li><strong>The LCP image must not be lazy.</strong> Set <code>priority</code> on it. Lazy-loading the hero image is self-inflicted and common, because lazy is the sensible default everywhere else.</li>
  <li><strong>Always give images explicit dimensions.</strong> Width and height, or <code>fill</code> with a sized container. Missing dimensions cause layout shift, and CLS is the easiest of the three core metrics to get to zero.</li>
  <li><strong>Set <code>sizes</code> when using <code>fill</code> or responsive images.</strong> Without it the browser assumes full viewport width and downloads a far larger file than the layout needs — often the difference between a 40KB and a 300KB image on mobile.</li>
  <li><strong>Serve modern formats at sane quality.</strong> AVIF and WebP at quality 75–80 are visually indistinguishable from quality 95 at a fraction of the bytes.</li>
</ul>

<p>Fonts deserve their own note because they block text rendering. Use <code>next/font</code> so files are self-hosted and the CSS is generated with the correct preload — this removes a connection to a third-party font host from the critical path. Set <code>display: 'swap'</code>, subset to the character ranges you need, and be honest about weights: four weights of two families is eight files, and most designs use three.</p>

<p>If your hero is a heavy 3D scene or a video, that is an LCP decision more than a design one. A CSS-rendered hero with a small amount of motion is dramatically cheaper than a canvas that needs a large library parsed and executed before anything appears — which is exactly why this site's hero is CSS.</p>

<h2>5. Find the three largest things in your bundle</h2>

<p>Run the bundle analyser and look at the biggest modules rather than the long tail. The pattern is almost always the same handful of causes.</p>

<p>A date library imported wholesale for one <code>format</code> call. An icon set imported as a namespace so tree-shaking cannot help. A charting library loaded on a page where the chart is below the fold. A markdown or syntax-highlighting bundle pulled into the client when the rendering could have happened on the server. A utility library where three functions are used and the whole package ships.</p>

<p>Three fixes cover most of it. Import only what you use, with named imports rather than namespace imports. Move formatting and transformation to the server, where the library is free. And for genuinely heavy components that are not immediately visible — editors, charts, maps — use <code>next/dynamic</code> so the code loads on interaction or when scrolled into view.</p>

<p>One warning on dynamic imports: they are frequently applied to components that <em>are</em> above the fold, which replaces a bundle cost with a visible loading delay and a layout shift. Dynamic import is for things the user might never need, not for things they will need immediately.</p>

<h2>6. Measure on real devices and real networks</h2>

<p>A local production build on a development machine over localhost is not a measurement. It is a sanity check.</p>

<p>The gap between a development-machine score and a mid-range Android on a throttled connection is not marginal — parsing and executing JavaScript is several times slower on that hardware, which is precisely why bundle size matters more than it appears to on a laptop. Test with CPU throttling on, and prefer field data over lab data where you have it, because your actual users are the distribution that counts.</p>

<table>
  <thead>
    <tr><th>Symptom</th><th>Most likely cause</th><th>First thing to check</th></tr>
  </thead>
  <tbody>
    <tr><td>High TTFB</td><td>Sequential data fetching or a dynamic route that could be static</td><td>Awaits in the page and its layouts; build output rendering mode</td></tr>
    <tr><td>Slow LCP, fast TTFB</td><td>Hero image not prioritised, or oversized download</td><td><code>priority</code> and <code>sizes</code> on the hero image</td></tr>
    <tr><td>Poor INP</td><td>Too much client JavaScript hydrating</td><td>Where the <code>'use client'</code> boundary sits</td></tr>
    <tr><td>Layout shift</td><td>Unsized images, or a font swap moving text</td><td>Explicit image dimensions; font loading strategy</td></tr>
    <tr><td>Fine on desktop, poor on mobile</td><td>Main-thread execution cost</td><td>Total client bundle for that route</td></tr>
    <tr><td>Regressed after a feature</td><td>A new client component or a heavy import</td><td>Bundle diff against the previous release</td></tr>
  </tbody>
</table>

<h2>7. Keep it from regressing</h2>

<p>Performance work that is not defended in CI decays within two quarters. Someone adds a provider, someone imports a chart library, and the score drifts back down with no single commit to blame.</p>

<p>Two cheap guards catch nearly everything. A bundle-size budget per route that fails the build on a material increase, which is the check that catches accidental client boundaries and heavy imports at the moment they are introduced. And a Lighthouse run in CI against a production build, treated as a regression signal rather than a target — a route dropping fifteen points on one pull request is actionable information, whereas an absolute score in a CI container is not worth arguing about.</p>

<blockquote>Bundle size is the metric to defend automatically, because it is deterministic, it is measurable per route, and almost every serious client-side performance problem shows up there first.</blockquote>

<h2>What this means in practice</h2>

<p>Work top-down. Audit the client boundary, then the data-fetching waterfalls, then the rendering mode of each route. Those three account for the large majority of available improvement in a typical App Router codebase, and all three are structural — you fix them once rather than continuously.</p>

<p>Only then spend time on images, fonts and bundle trimming, which are real but smaller and more evenly distributed. Measure on a throttled mid-range device throughout, because the desktop numbers will tell you everything is fine well past the point where it is not.</p>

<p>Then defend it with a per-route size budget in CI, because the alternative is doing this work again next year. If you are looking at a slow application and cannot tell whether the problem is structural or a thousand small things, <a href="/contact">send us the route and the numbers</a> — untangling that is standard <a href="/services/web-development">web development work</a> for us, and the answer is usually narrower than it looks.</p>`,
  },
  {
    id: '9',
    slug: 'automated-pr-review-with-ai',
    title: 'Automated Pull Request Review: What AI Catches and What It Misses',
    excerpt:
      'A missing await gets caught every time. A change that violates an invariant enforced three modules away gets approved. The difference is where the evidence lives.',
    date: '2025-10-13',
    author: 'WeThinkDigital Engineering',
    readTime: '8 min read',
    category: 'AI Engineering',
    tags: ['code review', 'automation', 'pull requests', 'LLM', 'developer tooling'],
    metaTitle: 'Automated Pull Request Review: What AI Catches and What It Misses',
    metaDescription:
      'An honest audit of automated pull request review: the defects AI reliably catches, the ones it structurally cannot, and why precision decides adoption.',
    keywords: ['automated pull request review', 'AI code review tool', 'LLM code analysis', 'review automation', 'static analysis limits', 'false positive rate', 'review precision'],
    content: `<p>Two defects, same pull request. The first is a missing <code>await</code> on an audit-log write inside a request handler — the function returns, the response ships, and the promise resolves into nothing. An automated reviewer catches that essentially every time. The second is a change to an order-cancellation handler that sets <code>status = 'cancelled'</code> without also clearing the reserved-inventory row, breaking an invariant that is enforced by a reconciliation job in a different service. The automated reviewer approves it without comment.</p>

<p>Both defects are real. Both ship bugs. The difference between them is not difficulty, and it is not model capability. It is where the evidence lives. The first defect is fully visible inside the diff. The second requires knowing something the diff does not contain.</p>

<p>That distinction explains almost every result you will get from an automated reviewer, and it is the right frame for deciding what to trust it with.</p>

<h2>Local correctness versus systemic correctness</h2>

<p>A language model reviewing a pull request sees a few hundred lines of changed code, some surrounding context if your tooling is good, and whatever instructions you gave it. It is reasoning over that window. It is not reasoning over your system.</p>

<p>Within the window, it is genuinely strong. Pattern recognition over code is what these models are best at, and a surprising share of production defects are local pattern violations — the kind a very well-rested reviewer would spot on the first read and a tired one would miss on the third.</p>

<p>Outside the window, it has no basis for judgement and, critically, it usually does not know that. The failure mode is not "I cannot assess this." It is silence, or worse, confident approval.</p>

<h2>What it catches reliably</h2>

<p>In our experience the dependable categories share a property: a competent engineer could identify the defect with no knowledge of the system beyond the diff itself.</p>

<ul>
  <li><strong>Unhandled promise rejections and missing <code>await</code></strong> — including the subtle version where the value is awaited but the error path is not.</li>
  <li><strong>Null and undefined paths</strong> the type system was talked out of, particularly after an <code>as</code> assertion or a non-null <code>!</code>.</li>
  <li><strong>Resource leaks</strong> — a file handle, connection, subscription or interval acquired on a path that can throw before release.</li>
  <li><strong>N+1 queries visible in the hunk</strong> — an <code>await</code> inside a loop over a collection, with a database call on the inside.</li>
  <li><strong>Missing branch coverage</strong> — a new conditional with no corresponding test, which is a mechanical observation over the changed files.</li>
  <li><strong>Error handling that swallows</strong> — a <code>catch</code> that logs and continues where the caller needed to know.</li>
  <li><strong>Unsafe type assertions</strong> and validation gaps at boundaries where external data enters typed code.</li>
  <li><strong>Forgotten cleanup</strong> — a feature flag referenced but never read, a debug log at info level, a commented-out block, a hardcoded value that belongs in config.</li>
  <li><strong>Convention drift</strong> — naming, error-construction patterns, module layout that deviates from what the rest of the file does. Consistency is a pure pattern-matching task and models are excellent at it.</li>
</ul>

<p>Two of these are worth more than the rest combined, for an unglamorous reason: missing <code>await</code> and swallowed errors are both silent in testing and loud in production, and both are exactly the kind of thing human reviewers stop seeing after twenty minutes of reading.</p>

<h2>What it misses reliably</h2>

<p>The misses are not random. They cluster around a single cause — the information required to make the judgement is not in the diff.</p>

<table>
  <thead>
    <tr><th>Defect class</th><th>Why the reviewer cannot see it</th></tr>
  </thead>
  <tbody>
    <tr><td>Cross-module invariant violation</td><td>The rule is enforced somewhere else in the system, or nowhere explicit at all</td></tr>
    <tr><td>Migration ordering and backfill safety</td><td>Requires knowing deploy sequencing and whether old code will run against the new schema</td></tr>
    <tr><td>Backwards incompatibility for in-flight clients</td><td>Requires knowing who calls this and which versions are still live</td></tr>
    <tr><td>Concurrency under real load</td><td>The race is between two executions; the diff shows one. Lock ordering, idempotency and retry interactions are invisible</td></tr>
    <tr><td>Cost and latency regressions</td><td>A correct-looking call added to a hot path is only wrong if you know the path is hot</td></tr>
    <tr><td>Authorisation at a trust boundary</td><td>Depends on where the boundary sits in your architecture, not on the shape of the code</td></tr>
    <tr><td>Product intent</td><td>The code may be flawless and solve the wrong problem. Nothing in the diff says so</td></tr>
    <tr><td>Deletions of load-bearing code</td><td>Absence of evidence reads as absence of risk</td></tr>
  </tbody>
</table>

<p>Concurrency deserves its own warning. Automated reviewers do sometimes produce a comment about locking or race conditions, which creates an impression of competence in this area. Read those comments carefully. They are typically pattern-triggered — the word <code>transaction</code> appeared, or a shared mutable structure is visible — rather than the product of reasoning about interleaved executions. The correct expectation is that concurrency correctness is not covered, and to design your review process accordingly.</p>

<h2>The false positive problem decides everything</h2>

<p>This is the part teams underestimate, and it is the difference between a tool people rely on and a tool people mute.</p>

<p>Consider a reviewer bot that comments fourteen times on a 200-line pull request. Four comments are useful. Ten are stylistic noise, restatements of what the code plainly does, or speculative concerns that do not apply. The precision is 29%. The engineer reading it has to evaluate all fourteen to find the four, which costs more attention than reading the diff unaided would have.</p>

<p>Within a week, the team learns to scroll past the bot. At that point your recall is irrelevant. A finding nobody reads has the same value as a finding you never produced.</p>

<blockquote>An automated reviewer is a classifier, and it should be evaluated like one. Precision is the metric that determines whether it survives contact with your team; recall only starts to matter once precision is high enough that people still read the output.</blockquote>

<p>The practical consequences are unpopular but straightforward. Comment far less than you can. Require both high severity and high confidence before posting. Aim for two or three comments on a typical pull request, not fourteen. Default to advisory rather than blocking, and promote a rule to blocking only after you have evidence of its precision on your own codebase.</p>

<p>Making that tractable means the reviewer should emit structured findings, not prose, so you can threshold and measure them:</p>

<pre><code>interface ReviewFinding {
  file: string;
  line: number;
  severity: 'blocking' | 'high' | 'medium' | 'nit';
  /** Model-reported, calibrated against your own labelled history. */
  confidence: number;
  category:
    | 'correctness' | 'resource-leak' | 'error-handling'
    | 'performance' | 'security' | 'test-gap' | 'convention';
  rationale: string;
  /** Required for correctness findings: the concrete input that breaks it. */
  failingScenario?: string;
}

const POST_THRESHOLD: Record&lt;ReviewFinding['severity'], number&gt; = {
  blocking: 0.9,
  high: 0.8,
  medium: 0.9,
  nit: 1.1,           // effectively never: let the linter own style
};

export function selectComments(findings: ReviewFinding[]): ReviewFinding[] {
  return findings
    .filter((f) =&gt; f.confidence &gt;= POST_THRESHOLD[f.severity])
    .filter((f) =&gt; f.category !== 'correctness' || Boolean(f.failingScenario))
    .sort((a, b) =&gt; b.confidence - a.confidence)
    .slice(0, 5);
}</code></pre>

<p>Two details in there carry most of the weight. Setting the <code>nit</code> threshold above 1.0 disables style commentary entirely — a formatter and a linter do that job deterministically and for free, and every style comment spends credibility you need elsewhere. And requiring a <code>failingScenario</code> for correctness claims is a cheap, effective filter: a model that cannot name the input that triggers the bug is usually pattern-matching on the shape of risky code rather than finding a real defect.</p>

<h2>Context is the lever, not the model</h2>

<p>When teams are unhappy with automated review quality, the instinct is to change models. The larger gains are almost always in what you put in the window.</p>

<ul>
  <li><strong>Send whole functions, not hunks.</strong> A diff hunk with three lines of context above and below is not enough to judge whether an early return skips necessary cleanup. Expand to enclosing function bodies.</li>
  <li><strong>Include the repository conventions file.</strong> Your error-handling pattern, your logging rules, your "never do X" list. This converts vague style opinions into checks against a stated standard, which raises precision sharply.</li>
  <li><strong>Include the related test files.</strong> The reviewer cannot flag a missing test for a new branch if it never saw the test file.</li>
  <li><strong>Include the pull request description and the linked work item.</strong> Without stated intent, the reviewer can only assess whether the code is internally consistent, never whether it does the right thing.</li>
  <li><strong>Include definitions of the symbols the diff calls.</strong> Resolving the signature of the function being called is often the difference between catching an argument-order bug and missing it.</li>
</ul>

<p>Adding the conventions file and the enclosing function bodies is usually a bigger quality jump than any model upgrade, and it costs a few thousand extra tokens per review. That is the trade you want.</p>

<h2>The composition that actually works</h2>

<p>Treat automated review as the first of several layers, each covering what the previous one structurally cannot.</p>

<ol>
  <li><strong>Deterministic tooling first.</strong> Types, linting, formatting, dependency audit. If a rule can be expressed deterministically, never spend model attention on it.</li>
  <li><strong>Automated review second</strong>, for local correctness, error handling and test gaps — the categories where evidence lives in the diff.</li>
  <li><strong>Human review third</strong>, explicitly scoped to what the machine cannot see: is this the right change, does it hold the system's invariants, is it safe to deploy in this order, who else depends on this.</li>
</ol>

<p>Naming that third scope is the most valuable thing you can do to your review checklist. Reviewers who know the mechanical layer is already covered stop spending their first ten minutes on null checks and start spending it on architecture. That reallocation is where the value is — not in removing humans from review.</p>

<p>This is how the PR Review agent in <a href="/products/agents">our agent platform</a> is built: it runs after the deterministic checks, posts a small number of high-confidence findings, and is deliberately quiet about anything it cannot ground in the diff. It works alongside SDE and QA agents on the same backlog, which matters, because an implementation agent without a reviewer behind it just increases the load on the humans downstream.</p>

<h2>What this means in practice</h2>

<p>Start in advisory mode and measure. For the first month, label every comment the bot posts as useful or not useful. You will have a precision number for your own codebase within a few hundred pull requests, and it will be lower than the vendor benchmark. Tune thresholds against that number rather than against a marketing claim.</p>

<p>Be honest with your team about the boundary. Tell them explicitly that the bot covers local correctness and does not cover invariants, migration safety, concurrency or intent. A reviewer who believes the machine has already checked everything is a worse reviewer than one who had no machine at all — the failure mode of automated review is not bad comments, it is unearned confidence.</p>

<p>And keep the human review checklist short and pointed at the gaps. Three questions a machine cannot answer beat twenty it already covered. If you are wiring this into your own pipeline, or thinking about the broader <a href="/services/ai-engineering">LLM and agent systems</a> around it, <a href="/contact">tell us how your review process looks today</a> — the process usually needs more work than the model does. For the human side of the same problem, our note on <a href="/blog/ai-code-review-best-practices">code review in the age of AI-generated code</a> picks up where this one stops.</p>`,
  },
  {
    id: '10',
    slug: 'ai-agents-software-development-lifecycle',
    title: 'How AI Agents Are Changing the Software Development Lifecycle',
    excerpt:
      'The ticket still takes two hours. The time moved — into the review queue, and into the question the ticket asserted and never justified. Not acceleration. Redistribution.',
    date: '2025-10-05',
    author: 'WeThinkDigital Engineering',
    readTime: '8 min read',
    category: 'AI Automation',
    tags: ['AI agents', 'SDLC', 'delivery process', 'specification', 'review'],
    metaTitle: 'How AI Agents Are Changing the Software Development Lifecycle',
    metaDescription:
      'AI agents did not remove work from the software development lifecycle, they moved it. Where the bottleneck went, and how to redesign delivery around it.',
    keywords: ['AI agents software development', 'software development lifecycle', 'AI in SDLC', 'delivery pipeline design', 'agentic development', 'review bottleneck', 'specification quality'],
    content: `<p>Take a well-specified ticket: add a rate limit to an internal API, 429 on breach, per-API-key, sliding window, configuration in the existing settings module. Eighteen months ago that was roughly two hours of an engineer's day — forty minutes reading the surrounding code, fifty minutes writing it, thirty minutes on tests and self-review. Hand the same ticket to an agent today and a complete branch with tests exists in under ten minutes.</p>

<p>Here is the part nobody puts on the slide. The ticket still takes about two hours to land. The time moved. It now sits in the queue before a human opens the diff, in the twenty minutes that human spends deciding whether the sliding window is actually correct at the boundary, and in the follow-up conversation about whether per-API-key was the right axis in the first place — a question the ticket asserted and never justified.</p>

<p>That is the real story of agents in the software development lifecycle. Not acceleration. Redistribution. And if you do not know where the work moved to, you will staff the wrong side of it.</p>

<h2>Writing code was never the bottleneck</h2>

<p>This is uncomfortable for a profession that identifies with typing, but the data has been consistent for decades: the time between a work item being ready and the change being in production is dominated by waiting, not by authoring. Waiting for clarification. Waiting for review. Waiting for a release window. Waiting for the flaky test suite to go green on the third retry.</p>

<p>In a typical team, the implementation step is a minority of cycle time. So making implementation ten times faster does not make delivery ten times faster. It makes implementation stop being the constraint and hands the crown to whatever was second in line.</p>

<p>Queueing theory is unkind here. If you increase the arrival rate at a workstation without increasing its service rate, the queue does not grow a little. It grows non-linearly as utilisation approaches one. A review function that was comfortably absorbing twelve pull requests a day at 70% utilisation does not calmly absorb twenty. It saturates, and then wait times explode.</p>

<blockquote>Agents do not remove work from the lifecycle. They move work from a stage that scales with headcount to stages that scale with attention — and attention is the resource you have least of.</blockquote>

<h2>Stage by stage: where it actually helps</h2>

<p>It is worth being specific rather than generically enthusiastic, because the effect differs sharply by stage.</p>

<h3>Specification and backlog refinement: gets harder</h3>

<p>An agent will satisfy your acceptance criteria with unsettling literalism. A human engineer reading "rate limit per API key" pauses and thinks: what about unauthenticated traffic? What about our own internal service accounts, which share a key and will now throttle each other? They raise it in standup. An agent implements exactly what you wrote and the problem surfaces in production three weeks later.</p>

<p>This is not a model failure. It is a specification failure that the model faithfully reproduced. Underspecified tickets have always carried debt; agents make you pay it sooner and in public.</p>

<h3>Implementation: genuinely transformed</h3>

<p>For bounded, well-described changes inside an established codebase, first-draft quality is high and the marginal cost is close to zero. The categories that work best are the ones where the pattern already exists in the repository: a new endpoint alongside nine similar endpoints, a new migration, a new adapter behind an interface that already has three implementations, a mechanical refactor across forty files.</p>

<h3>Testing: high volume, variable value</h3>

<p>Agents produce enormous quantities of tests quickly. Whether those tests would have caught anything is a separate question, and coverage percentage will not answer it for you — generated suites are extremely good at asserting the behaviour the implementation already has. We wrote about the trap and the ways out of it in our note on <a href="/blog/ai-qa-automation-test-generation">making AI-generated tests actually useful</a>.</p>

<h3>Review: the new constraint</h3>

<p>This is where the pressure lands, and it is worse than a straight volume increase. Human-authored diffs carry an implicit signal: the author suffered for every line, so lines are scarce and roughly intentional. Agent-authored diffs lose that signal. Code is cheap to produce, so diffs get bigger, more defensive, more speculative. A 400-line diff takes a careful reviewer somewhere between forty and ninety minutes to review properly, and review quality is known to fall off a cliff past a few hundred lines of change.</p>

<p>Worse, agent output is fluent. It reads as if it were written by someone competent and confident, which suppresses exactly the scepticism reviewers should be applying. Reviewers start skimming. Skimmed review is theatre.</p>

<h3>Integration and release: mostly unchanged, now more contended</h3>

<p>Merge conflicts, migration ordering and environment drift do not care who wrote the code. What changes is that more branches are in flight at once, so conflicts are more frequent and the integration window is more contended.</p>

<h3>On-call: quietly riskier</h3>

<p>At three in the morning, the relevant question is whether anyone on the team understands the change that broke. Code that no human ever fully read is code with no owner, and ownership is what makes incidents short.</p>

<h2>What a good work item looks like when an agent is the consumer</h2>

<p>The single highest-leverage change most teams can make is rewriting how they specify work. A ticket written for a human is a conversation starter. A ticket written for an agent has to be a contract, because there will be no conversation.</p>

<p>Four things matter more than everything else:</p>

<ul>
  <li><strong>Machine-checkable acceptance criteria.</strong> Not "handle errors gracefully" but "returns 429 with a <code>Retry-After</code> header; existing 200-path latency unchanged; new behaviour covered by a test that fails against the current main branch."</li>
  <li><strong>Explicit non-goals.</strong> Agents pattern-match toward completeness and will refactor adjacent code you did not ask about. Say what is out of scope.</li>
  <li><strong>File and module boundaries.</strong> Naming the surface the change may touch is the cheapest way to keep the diff reviewable.</li>
  <li><strong>The invariant behind the requirement.</strong> Say <em>why</em>, in one line. It is the only defence against a locally correct change that violates a system-level rule.</li>
</ul>

<p>In practice we express this as structured metadata alongside the prose, so the definition of done is executable rather than aspirational:</p>

<pre><code>interface AgentWorkItem {
  id: string;
  intent: string;                 // one line: the invariant this protects
  scope: {
    allow: string[];              // glob paths the change may touch
    deny: string[];               // hard boundaries, e.g. 'db/migrations/**'
  };
  acceptance: AcceptanceCheck[];  // must be executable, not prose
  nonGoals: string[];
  maxDiffLines: number;           // reject and re-plan above this
}

type AcceptanceCheck =
  | { kind: 'test'; command: string; mustFailBefore: boolean }
  | { kind: 'invariant'; assertion: string; verifiedBy: string };

const item: AgentWorkItem = {
  id: 'API-2841',
  intent: 'No single API key can exhaust shared request capacity.',
  scope: {
    allow: ['src/middleware/**', 'src/config/limits.ts', 'test/middleware/**'],
    deny: ['db/migrations/**', 'src/auth/**'],
  },
  acceptance: [
    { kind: 'test', command: 'pnpm test middleware/rate-limit', mustFailBefore: true },
    { kind: 'invariant', assertion: 'p99 latency on the 200 path unchanged', verifiedBy: 'bench/api.bench.ts' },
  ],
  nonGoals: ['Quota billing', 'Per-endpoint overrides', 'Changing the auth middleware'],
  maxDiffLines: 400,
};</code></pre>

<p>The <code>mustFailBefore</code> flag does a lot of quiet work. It forces a test that actually discriminates between the old behaviour and the new one, which rules out the most common class of worthless generated test.</p>

<h2>Redesigning the pipeline around the new constraint</h2>

<p>If review is the constraint, optimise review. That is the whole strategy, and it mostly means reducing the volume of human attention each change requires rather than asking humans to read faster.</p>

<table>
  <thead>
    <tr><th>Lever</th><th>What it does</th><th>Cost</th></tr>
  </thead>
  <tbody>
    <tr><td>Hard diff-size ceiling</td><td>Forces decomposition; keeps changes inside the range where review quality holds</td><td>More work items, more planning overhead</td></tr>
    <tr><td>Automated first-pass review</td><td>Clears mechanical defects before a human looks</td><td>Useless if noisy; see the limits below</td></tr>
    <tr><td>Machine-verifiable acceptance</td><td>Moves "does it work" from opinion to CI</td><td>Requires real investment in test infrastructure</td></tr>
    <tr><td>Tiered review by blast radius</td><td>Concentrates senior attention on auth, money, migrations and data</td><td>Needs an honest risk taxonomy of your own codebase</td></tr>
    <tr><td>Agent writes the change, human writes the test</td><td>Keeps a human in the loop on intent, not syntax</td><td>Slower; worth it on high-risk paths</td></tr>
  </tbody>
</table>

<p>Automated first-pass review deserves a caveat rather than a cheer. It is genuinely good at defects whose evidence is inside the diff and genuinely blind to violations of invariants enforced elsewhere in the system — the boundary is sharp enough that we wrote a whole note on <a href="/blog/automated-pr-review-with-ai">what automated review catches and what it misses</a>.</p>

<p>Tiered review is the lever most teams underuse. Not every change carries the same risk. A copy change in a marketing surface and a change to token validation should not receive the same process. Once you accept that, you can route mechanically: a change touching <code>src/auth/**</code> requires two human approvals regardless of size, a change confined to a presentational component with passing visual tests may need none.</p>

<h2>Where this leaves the team</h2>

<p>The composition of engineering work shifts rather than shrinking. Less time producing first drafts. More time on system design, on interface and invariant definition, on building the verification infrastructure that makes autonomous work safe to accept, and on review judgement.</p>

<p>Notice that every one of those is a senior activity. The uncomfortable implication is that agents raise the floor on output while raising the bar on the judgement needed to use that output safely. Teams that are strong on specification, testing and architecture get compounding returns. Teams that were already shipping underspecified work into a thin review process get the same problems, faster.</p>

<p>This is the design principle behind <a href="/products/agents">our own agent platform</a>: the SDE, QA and PR-Review agents work the same backlog because implementation, verification and review are one loop. An implementation agent with no verification agent behind it just moves the queue.</p>

<h2>What this means in practice</h2>

<p>Instrument before you scale. Measure where cycle time actually goes today — time in backlog, time in implementation, time waiting for review, time in review, time waiting to deploy. If review is already your longest stage, adding implementation throughput will make delivery slower, not faster, and you will have the metrics to prove it before you spend the budget.</p>

<p>Then fix specification quality, because it is the cheapest change with the largest effect and it improves human-authored work too. Then invest in verification: the amount of autonomy you can safely grant is capped by the quality of your automated checks, and nothing else. Start agents on the reversible, well-patterned, low-blast-radius end of your backlog and expand the envelope as your evidence improves — the same way you would extend trust to a capable new engineer.</p>

<p>The teams getting real value here are not the ones that adopted the best model. They are the ones that treated this as a delivery-pipeline redesign rather than a tooling upgrade. If you are working through where the constraint actually sits in your own pipeline, <a href="/contact">we are happy to compare notes</a> — and if the problem is broader than code, our <a href="/services/ai-automation">AI automation work</a> starts from the same question: which stage is really the bottleneck?</p>`,
  },
];

/** Newest first. Every consumer should read from here, not from `blogPosts`. */
export const sortedPosts: BlogPost[] = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

/** All post slugs, newest first. Used for static params and the sitemap. */
export const blogSlugs: string[] = sortedPosts.map((post) => post.slug);

/** Strip the body so post lists never ship multi-kilobyte HTML to the client. */
export function toSummary(post: BlogPost): PostSummary {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    readTime: post.readTime,
    category: post.category,
    tags: post.tags,
  };
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** The `n` most recent posts. */
export function getRecentPosts(n = 3): BlogPost[] {
  return sortedPosts.slice(0, n);
}

/**
 * Related posts: same category first, then posts sharing the most tags, then
 * most recent. Never includes the post itself.
 */
export function getRelatedPosts(post: BlogPost, n = 3): BlogPost[] {
  const scored = sortedPosts
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => post.tags.includes(tag)).length;
      const sameCategory = candidate.category === post.category ? 1 : 0;
      // Category dominates; tag overlap breaks ties within and across categories.
      return { candidate, score: sameCategory * 100 + sharedTags };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.candidate.date).getTime() - new Date(a.candidate.date).getTime(),
    );

  return scored.slice(0, n).map((entry) => entry.candidate);
}

/** Categories that actually have posts, in the order they first appear. */
export function getAllCategories(): BlogCategory[] {
  return [...new Set(sortedPosts.map((post) => post.category))];
}
