window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  var player = GetPlayer();

var text = 
  "You are Forest Rohwer, microbial ecologist and creator of the P.H.A.G.E.S. framework. Your worldview is virocentric: you see viruses as the primary drivers of ecosystem structure, function, and evolution. You interpret biological systems through six tightly interlinked forces:\n\n" +
  "(P) Predation: All living systems are under attack. Viruses are the most abundant and lethal predators, shaping microbial communities and driving turnover in biomass and nutrients.\n\n" +
  "(H) History: Each system has a unique history—exposure to viruses, microbes, environmental shifts, medical interventions, and symbiont changes. History sets the starting conditions for all PHAGES processes.\n\n" +
  "(A) Assembly: All organisms live as part of dynamic wholobionts—assemblages of viruses, microbes, and macro-organisms. Assembly is flexible and cooperative: symbionts may be swapped, but functions are preserved.\n\n" +
  "(G) Governors: Life is limited by energy, matter, and space. These physical constraints—sunlight, nutrients, territory—set the pace of biological processes and provoke competition.\n\n" +
  "(E) Expansion: Organisms vary in replication speed and offspring numbers. Viral and microbial replication is explosive. Expansion creates pressure on Governors, intensifies predation, and amplifies selection.\n\n" +
  "(S) Selection: Variation and competition determine which traits win out. Viruses, by killing selectively, accelerate evolutionary pressures. Selection sculpts the wholobiont over time.\n\n" +
  "You also use the concept of the Goldilocks Line to assess an ecosystem's metabolic state: it represents the perfect balance between electron donors (e.g., organic carbon) and acceptors (e.g., oxygen). No real system is balanced. Ecosystems that drift far from the Goldilocks Line often show stress, inefficiency, or collapse.\n\n" +
  "You understand ‘Kill-the-Winner’ dynamics — where dominant microbes are selectively targeted by viruses, preventing ecological monopolies and promoting diversity.\n\n" +
  "You speak in a vivid, symbolic, research-grounded voice. You avoid simplification and always consider viral ecology, microbial metabolism, and the recursive effects of PHAGES forces. Avoid colloquialisms, and do not invent facts.";

player.SetVar("TeachPHAGES", text);

}

window.Script2 = function()
{
  var player = GetPlayer();
player.SetVar("JumpNow", false);

var ecosystem    = player.GetVar("Ecosystem")   || "";
var why          = player.GetVar("Why")         || "";
var systemPrompt = player.GetVar("TeachPHAGES") || "";

// PROMPTS
var promptA =
  "Analyze the following ecosystem using the PHAGES framework. " +
  "Tailor every detail to this ecosystem and why it matters—avoid generic statements. " +
  "Each value must be one short paragraph of 2–4 sentences (max 50 words). " +
  "Be concise and factual — no filler, no storytelling, no poetic or metaphorical language. " +
  "Prefer direct, scientific statements. " +
  "Do not include definitions — focus only on applying the PHAGES framework to this case. " +
  "Keep the total JSON under 250 words. " +
  "Return ONLY valid JSON with these keys: Predation, History, Assembly.\n\n" +
  "[Ecosystem]: " + ecosystem + "\n" +
  "[Why it matters]: " + why;

var promptB =
  "Analyze the following ecosystem using the PHAGES framework. " +
  "Tailor every detail to this ecosystem and why it matters—avoid generic statements. " +
  "Each value must be one short paragraph of 2–4 sentences (max 50 words). " +
  "Be concise and factual — no filler, no storytelling, no poetic or metaphorical language. " +
  "Prefer direct, scientific statements. " +
  "Do not include definitions — focus only on applying the PHAGES framework to this case. " +
  "Keep the total JSON under 250 words. " +
  "Return ONLY valid JSON with these keys: Governors, Expansion, Selection, Goldilocks.\n\n" +
  "[Ecosystem]: " + ecosystem + "\n" +
  "[Why it matters]: " + why;

// Offline check
if (!navigator.onLine) {
  player.SetVar("aiRawResponse", "Offline—please check your network.");
  player.SetVar("Predation", "⚠️ No AI response — offline mode.");
  player.SetVar("JumpNow", true);
  return;
}

// Generic request function
function sendRequest(prompt, model, timeout) {
  return fetch("https://openai-proxy-for-storyline.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: prompt }
      ]
    }),
    signal: AbortSignal.timeout(timeout)
  })
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });
}

// Runs both models in parallel and returns the first that works
function raceModels(prompt) {
  return Promise.any([
    sendRequest(prompt, "openai/gpt-4o-mini", 60000),
    sendRequest(prompt, "anthropic/claude-3-haiku", 60000)
  ]);
}

// Run promptA and promptB in parallel (each races its two models)
Promise.allSettled([
  raceModels(promptA),
  raceModels(promptB)
])
.then(function(results) {
  var textA = "{}";
  var textB = "{}";

  if (results[0].status === "fulfilled") {
    textA = results[0].value.choices?.[0]?.message?.content || "{}";
  }
  if (results[1].status === "fulfilled") {
    textB = results[1].value.choices?.[0]?.message?.content || "{}";
  }

  try {
    var parsedA = JSON.parse(textA);
    var parsedB = JSON.parse(textB);

    // First 3
    player.SetVar("Predation", parsedA.Predation || "");
    player.SetVar("History",   parsedA.History   || "");
    player.SetVar("Assembly",  parsedA.Assembly  || "");

    // Last 4
    player.SetVar("Governors",  parsedB.Governors  || "");
    player.SetVar("Expansion",  parsedB.Expansion  || "");
    player.SetVar("Selection",  parsedB.Selection  || "");
    player.SetVar("Goldilocks", parsedB.Goldilocks || "");

  } catch (e) {
    console.warn("JSON parse error:", e);
    player.SetVar("Predation", "⚠️ Could not parse AI response.");
  }

  player.SetVar("aiRawResponse", textA + "\n\n" + textB);
  player.SetVar("JumpNow", true);
})
.catch(function(err) {
  player.SetVar("Predation", "⚠️ AI request failed: " + err.message);
  player.SetVar("aiRawResponse", `Error: ${err.message}`);
  player.SetVar("JumpNow", true);
});
}

window.Script3 = function()
{
  var player = GetPlayer();

// ✅ 1️⃣ Mark S as complete FIRST
player.SetVar("S", true);

// 2️⃣ Pull the current values of ALL PHAGES variables
var P = player.GetVar("P");
var H = player.GetVar("H");
var A = player.GetVar("A");
var G = player.GetVar("G");
var E = player.GetVar("E");

// 3️⃣ Determine the next incomplete layer
if (!P) {
  player.SetVar("nextLayer", "P");
} else if (!H) {
  player.SetVar("nextLayer", "H");
} else if (!A) {
  player.SetVar("nextLayer", "A");
} else if (!G) {
  player.SetVar("nextLayer", "G");
} else if (!E) {
  player.SetVar("nextLayer", "E");
} else {
  player.SetVar("nextLayer", ""); // All layers completed
}
}

window.Script4 = function()
{
  var player = GetPlayer();

// ✅ 1️⃣ Mark E as complete FIRST
player.SetVar("E", true);

// 2️⃣ Pull the current values of ALL PHAGES variables
var P = player.GetVar("P");
var H = player.GetVar("H");
var A = player.GetVar("A");
var G = player.GetVar("G");
var S = player.GetVar("S");

// 3️⃣ Determine the next incomplete layer (skip E because it’s now done)
if (!P) {
  player.SetVar("nextLayer", "P");
} else if (!H) {
  player.SetVar("nextLayer", "H");
} else if (!A) {
  player.SetVar("nextLayer", "A");
} else if (!G) {
  player.SetVar("nextLayer", "G");
} else if (!S) {
  player.SetVar("nextLayer", "S");
} else {
  player.SetVar("nextLayer", ""); // All layers complete
}
}

window.Script5 = function()
{
  var player = GetPlayer();

// ✅ 1️⃣ Mark G as complete FIRST
player.SetVar("G", true);

// 2️⃣ Pull the current values of ALL PHAGES variables
var P = player.GetVar("P");
var H = player.GetVar("H");
var A = player.GetVar("A");
var E = player.GetVar("E");
var S = player.GetVar("S");

// 3️⃣ Determine the next incomplete layer (skip G because it's now done)
if (!P) {
  player.SetVar("nextLayer", "P");
} else if (!H) {
  player.SetVar("nextLayer", "H");
} else if (!A) {
  player.SetVar("nextLayer", "A");
} else if (!E) {
  player.SetVar("nextLayer", "E");
} else if (!S) {
  player.SetVar("nextLayer", "S");
} else {
  player.SetVar("nextLayer", "");
}
}

window.Script6 = function()
{
  var player = GetPlayer();

// ✅ 1️⃣ Mark A as complete BEFORE checking what's next
player.SetVar("A", true);

// 2️⃣ Pull the current values of ALL PHAGES variables
var P = player.GetVar("P");
var H = player.GetVar("H");
var G = player.GetVar("G");
var E = player.GetVar("E");
var S = player.GetVar("S");

// 3️⃣ Determine the next incomplete layer in PHAGES order
if (!P) {
  player.SetVar("nextLayer", "P");
} else if (!H) {
  player.SetVar("nextLayer", "H");
} else if (!G) {
  player.SetVar("nextLayer", "G");
} else if (!E) {
  player.SetVar("nextLayer", "E");
} else if (!S) {
  player.SetVar("nextLayer", "S");
} else {
  player.SetVar("nextLayer", "");
}
}

window.Script7 = function()
{
  var player = GetPlayer();

// ✅ 1️⃣ Mark H as complete BEFORE checking what’s next
player.SetVar("H", true);

// 2️⃣ Pull the current values of ALL PHAGES variables
var P = player.GetVar("P");
var A = player.GetVar("A");
var G = player.GetVar("G");
var E = player.GetVar("E");
var S = player.GetVar("S");

// 3️⃣ Determine the next incomplete layer in order
if (!P) {
  player.SetVar("nextLayer", "P");
} else if (!A) {
  player.SetVar("nextLayer", "A");
} else if (!G) {
  player.SetVar("nextLayer", "G");
} else if (!E) {
  player.SetVar("nextLayer", "E");
} else if (!S) {
  player.SetVar("nextLayer", "S");
} else {
  player.SetVar("nextLayer", ""); // All six letters complete
}

}

window.Script8 = function()
{
  var player = GetPlayer();
player.SetVar("P", true);
// pull vars
var H = player.GetVar("H"), A = player.GetVar("A"), G = player.GetVar("G"), E = player.GetVar("E"), S = player.GetVar("S");
if (!H) player.SetVar("nextLayer", "H");
else if (!A) player.SetVar("nextLayer", "A");
else if (!G) player.SetVar("nextLayer", "G");
else if (!E) player.SetVar("nextLayer", "E");
else if (!S) player.SetVar("nextLayer", "S");
else player.SetVar("nextLayer", "");

}

window.Script9 = function()
{
  var player = GetPlayer();

// 1️⃣ Pull cleaned learner input
var ecosystem    = player.GetVar("Ecosystem")      || "";
var why          = player.GetVar("Why")            || "";
var predation    = player.GetVar("PredationClean") || "";
var history      = player.GetVar("HistoryClean")   || "";
var assembly     = player.GetVar("AssemblyClean")  || "";
var governors    = player.GetVar("GovernorsClean") || "";
var expansion    = player.GetVar("ExpansionClean") || "";
var selection    = player.GetVar("SelectionClean") || "";
var goldilocks   = player.GetVar("GoldilocksClean")|| "";
var learnerGuess = player.GetVar("LearnerGuess")   || "";

// 2️⃣ Trimmed Forest refresher for synthesis step
var systemPrompt =
  "You are Forest Rohwer, creator of the PHAGES framework. " +
  "You speak vividly but scientifically, applying a virocentric lens. " +
  "You understand Predation, History, Assembly, Governors, Expansion, Selection, and the Goldilocks Line. " +
  "You synthesize these elements into cohesive ecosystem analyses.";

// 3️⃣ Build the synthesis prompt (shorter, faster)
var userPrompt =
  "Based ONLY on the learner’s revised inputs below, write a final PHAGES analysis. " +
  "Connect all elements into one flowing narrative (not a list). " +
  "Be concise but complete, with short, clear paragraphs. " +
  "Limit to 6 short paragraphs, each ≤ 60 words. " +
  "Weave the Goldilocks Line naturally into the analysis.\n\n" +

  "[Ecosystem]\n"       + ecosystem   +
  "\n\n[Why it matters]\n" + why     +
  "\n\n[Predation]\n"   + predation  +
  "\n\n[History]\n"     + history    +
  "\n\n[Assembly]\n"    + assembly   +
  "\n\n[Governors]\n"   + governors  +
  "\n\n[Expansion]\n"   + expansion  +
  "\n\n[Selection]\n"   + selection  +
  "\n\n[Goldilocks Line]\n" + goldilocks +
  "\n\n[Learner’s Overall Synthesis]\n" + learnerGuess;

// 4️⃣ Offline guard
if (!navigator.onLine) {
  player.SetVar("aiRawResponse", "Offline — please check your network connection.");
  player.SetVar("aiResponse", "⚠️ No AI analysis — offline mode.");
  return;
}

// 5️⃣ Send request (fast model + 40s timeout)
fetch("https://openai-proxy-for-storyline.onrender.com/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "openai/gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user",   content: userPrompt   }
    ]
  }),
  signal: AbortSignal.timeout(40000)
})
.then(function(response) {
  if (!response.ok) {
    return response.text().then(function(text){
      throw new Error(`HTTP ${response.status}: ${text}`);
    });
  }
  return response.json();
})
.then(function(data) {
  var reply = data?.choices?.[0]?.message?.content || "No response.";
  player.SetVar("aiRawResponse", reply);
  player.SetVar("aiResponse",    reply);
})
.catch(function(error) {
  var errMsg = (error.name === 'AbortError')
    ? "Error: AI analysis request timed out (40 s)."
    : `Error: ${error.message}`;
  player.SetVar("aiResponse", errMsg);
  player.SetVar("aiRawResponse", errMsg);
});
}

window.Script10 = function()
{
  var player = GetPlayer();
player.SetVar("aiResponse", "Thinking…");

// --- 1️⃣ Gather inputs ---
var ecosystem    = (player.GetVar("Ecosystem") || "").trim();
var why          = (player.GetVar("Why") || "").trim();
var systemPrompt = player.GetVar("TeachPHAGES") || "";

// --- 2️⃣ Build the competition prompt ---
var competitionPrompt =
  systemPrompt + "\n\n" +
  "Analyze the following ecosystem using the PHAGES framework.\n" +
  "Be specific to this ecosystem and why it matters—avoid generic responses.\n\n" +
  "[Ecosystem]: " + ecosystem + "\n\n" +
  "[Why it matters]: " + why + "\n\n" +
  "Return a detailed PHAGES analysis.";

// --- 3️⃣ Helper to call a model with its own timeout ---
function callModel(model, prompt, timeoutMs) {
  return fetch("https://openai-proxy-for-storyline.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: prompt }
      ]
    }),
    signal: AbortSignal.timeout(timeoutMs)
  })
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => (data?.choices?.[0]?.message?.content || "No response").trim())
  .catch(() => "No response");
}

// --- 4️⃣ Run GPT + Claude in parallel with independent 60s limits ---
Promise.allSettled([
  callModel("openai/gpt-4o-mini", competitionPrompt, 60000),
  callModel("anthropic/claude-3-haiku", competitionPrompt, 60000)
])
.then(results => {
  var gptAnswer    = results[0].status === "fulfilled" ? results[0].value : "No response";
  var claudeAnswer = results[1].status === "fulfilled" ? results[1].value : "No response";

  var noRealGPT    = !gptAnswer || gptAnswer === "No response";
  var noRealClaude = !claudeAnswer || claudeAnswer === "No response";

  // --- 5️⃣ Build judging/refinement prompt ---
  var userPrompt;
  if (!noRealGPT && !noRealClaude) {
    // Compare & merge
    userPrompt =
      "You are Forest Rohwer, creator of the P.H.A.G.E.S. framework. " +
      "Two different AI models have analyzed the same ecosystem using your framework. Their responses are shown below.\n\n" +
      "=== GPT ===\n"    + gptAnswer    + "\n\n" +
      "=== Claude ===\n" + claudeAnswer + "\n\n" +
      "Your task:\n" +
      "Choose the single strongest response — OR write your own expert synthesis that integrates the most insightful elements from both.\n\n";
  } else {
    // Refine single best
    var singleResponse = !noRealGPT ? gptAnswer : claudeAnswer;
    userPrompt =
      "You are Forest Rohwer, creator of the P.H.A.G.E.S. framework. " +
      "Refine the following PHAGES analysis to be concise, precise, and scientifically grounded.\n\n" +
      singleResponse + "\n\n";
  }

  // --- 6️⃣ Add strict style requirements ---
  userPrompt +=
    "Strict requirements:\n" +
    "- Be accurate to the PHAGES framework.\n" +
    "- Be concise. Remove all unnecessary words, filler, or tangents.\n" +
    "- Avoid metaphor, poetry, or figurative language unless essential for clarity.\n" +
    "- Prefer concrete, direct statements over imagery.\n" +
    "- Keep each paragraph focused on one key idea.\n" +
    "- Limit the entire response to **well under 600 words**.\n" +
    "- Use active voice and precise, scientific phrasing.\n" +
    "- Integrate the Goldilocks Line naturally.\n\n" +
    "Editing rules:\n" +
    "- Apply Strunk & White rigor: omit needless words, prefer the specific to the vague, use active voice.\n" +
    "- Remove all extraneous flourishes.\n" +
    "- The result should be elegant, sharp, and scientifically grounded.\n\n" +
    "Return only the final edited analysis. No preamble, no commentary.";

  // --- 7️⃣ Run judging/refinement ---
  return callModel("openai/gpt-4o-mini", userPrompt, 60000);
})
.then(finalResponse => {
  player.SetVar("aiResponse", finalResponse || "⚠️ No final analysis generated.");
})
.catch(err => {
  player.SetVar("aiResponse", `Error: ${err.message}`);
});
}

window.Script11 = function()
{
  var player = GetPlayer();
var textToCopy = player.GetVar("aiResponse");

const textarea = document.createElement("textarea");
textarea.value = textToCopy;
document.body.appendChild(textarea);
textarea.select();
document.execCommand("copy");
document.body.removeChild(textarea);

}

window.Script12 = function()
{
  var player = GetPlayer();

// Gather learner inputs
var ecosystem  = player.GetVar("Ecosystem")  || "";
var why        = player.GetVar("Why")        || "";
var aiResponse = player.GetVar("aiResponse") || "";
var confusion  = player.GetVar("Confusion")  || "";
var moreInfo   = player.GetVar("MoreInfo")   || "";
var testIdea   = player.GetVar("TestIdea")   || "";

// Build the upgraded hypothesis-generation prompt
var userPrompt = `
You are Forest Rohwer, microbial ecologist and creator of the P.H.A.G.E.S. framework.

Your role: Mentor the learner to generate three strong, testable hypotheses grounded in PHAGES-based ecological thinking.

Learner’s context:
- Ecosystem: ${ecosystem}
- Why it matters: ${why}
- PHAGES analysis: ${aiResponse}

Learner’s reflections:
1. Surprised/confused by: ${confusion}
2. Information they want: ${moreInfo}
3. Experiment they’d like to test: ${testIdea}

Forest Rohwer’s method for hypothesis generation:
1. Start from an ecological or system-level question inspired by the PHAGES analysis.
2. Link it to processes & patterns from PHAGES (Predation, History, Assembly, Governors, Expansion, Selection).
3. Identify a measurable change, relationship, or interaction that could be tested.
4. Hypotheses should be falsifiable, concise, and rooted in the learner’s context.

Quantifying strong hypotheses (design yours to meet these criteria):
- High Predictive Accuracy: makes specific, accurate predictions that can be tested.
- Falsifiability & Testability: clearly structured so it can be proven wrong if false.
- Consistency with Existing Data: aligns with known observations/theories.
- Simplicity & Parsimony: fewest assumptions while explaining the most.
- Generalizability: applies beyond the specific example when possible.
- Utility in Further Research: opens new research directions.
- Likely to be accepted by the scientific community if tested and validated.

Output:
- Generate exactly 3 distinct, testable hypotheses (≤30 words each).
- Ground each in PHAGES reasoning and the learner’s reflections.
- Avoid generic language or vagueness.
- Number them 1–3.
- No preamble or explanations — only the numbered hypotheses.
`;

// Function to guarantee exactly 3 ideas
function extractIdeas(text) {
    var matches = text.match(/\d+\s*[\.\-:]?\s*(.+)/g) || [];
    var ideas = matches.map(m => m.replace(/^\d+\s*[\.\-:]?\s*/, "").trim());

    // Fill any missing slots with placeholders
    while (ideas.length < 3) {
        ideas.push("⚠️ Placeholder hypothesis – AI did not provide enough ideas.");
    }
    return ideas.slice(0, 3);
}

// Call GPT
fetch("https://openai-proxy-for-storyline.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are Forest Rohwer, microbial ecologist and creator of the P.H.A.G.E.S. framework." },
            { role: "user", content: userPrompt }
        ]
    }),
    signal: AbortSignal.timeout(60000) // Full 60s timeout
})
.then(res => res.json())
.then(data => {
    var raw = data?.choices?.[0]?.message?.content?.trim() || "";
    var [idea1, idea2, idea3] = extractIdeas(raw);

    // Store in Storyline
    player.SetVar("Idea1", idea1);
    player.SetVar("Idea2", idea2);
    player.SetVar("Idea3", idea3);
})
.catch(err => {
    player.SetVar("Idea1", "⚠️ Error generating hypotheses");
    player.SetVar("Idea2", "");
    player.SetVar("Idea3", "");
});
}

window.Script13 = function()
{
  var player = GetPlayer();

// Gather learner inputs (avoid pulling current displayed ideas so "Thinking..." is ignored)
var ecosystem  = player.GetVar("Ecosystem")  || "";
var why        = player.GetVar("Why")        || "";
var aiResponse = player.GetVar("aiResponse") || "";
var confusion  = player.GetVar("Confusion")  || "";
var moreInfo   = player.GetVar("MoreInfo")   || "";
var testIdea   = player.GetVar("TestIdea")   || "";

// Build the master prompt
var userPrompt = `
You are Forest Rohwer, microbial ecologist and creator of the P.H.A.G.E.S. framework.

Your role: Mentor the learner to generate three strong, testable hypotheses grounded in PHAGES-based ecological thinking.

Learner’s context:
- Ecosystem: ${ecosystem}
- Why it matters: ${why}
- PHAGES analysis: ${aiResponse}

Learner’s reflections:
1. Surprised/confused by: ${confusion}
2. Information they want: ${moreInfo}
3. Experiment they’d like to test: ${testIdea}

Forest Rohwer’s method for hypothesis generation:
1. Start from an ecological or system-level question inspired by the PHAGES analysis.
2. Link it to processes & patterns from PHAGES (Predation, History, Assembly, Governors, Expansion, Selection).
3. Identify a measurable change, relationship, or interaction that could be tested.
4. Hypotheses should be falsifiable, concise, and rooted in the learner’s context.

Quantifying strong hypotheses (design yours to meet these criteria):
- High Predictive Accuracy: makes specific, accurate predictions that can be tested.
- Falsifiability & Testability: clearly structured so it can be proven wrong if false.
- Consistency with Existing Data: aligns with known observations/theories.
- Simplicity & Parsimony: fewest assumptions while explaining the most.
- Generalizability: applies beyond the specific example when possible.
- Utility in Further Research: opens new research directions.
- Likely to be accepted by the scientific community if tested and validated.

Output:
- Generate exactly 3 distinct, testable hypotheses (≤30 words each).
- Ground each in PHAGES reasoning and the learner’s reflections.
- Avoid generic language or vagueness.
- Number them 1–3.
- No preamble or explanations — only the numbered hypotheses.
`;

// Function to guarantee exactly 3 ideas
function extractIdeas(text) {
    var matches = text.match(/\d+\s*[\.\-:]?\s*(.+)/g) || [];
    var ideas = matches.map(m => m.replace(/^\d+\s*[\.\-:]?\s*/, "").trim());

    // Fill any missing slots with placeholders
    while (ideas.length < 3) {
        ideas.push("⚠️ Placeholder hypothesis – AI did not provide enough ideas.");
    }
    return ideas.slice(0, 3);
}

// Call GPT
fetch("https://openai-proxy-for-storyline.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are Forest Rohwer, microbial ecologist and creator of the P.H.A.G.E.S. framework." },
            { role: "user", content: userPrompt }
        ]
    }),
    signal: AbortSignal.timeout(60000) // Full 60s timeout
})
.then(res => res.json())
.then(data => {
    var raw = data?.choices?.[0]?.message?.content?.trim() || "";
    var [idea1, idea2, idea3] = extractIdeas(raw);

    // Push new ideas to Storyline
    player.SetVar("Idea1", idea1);
    player.SetVar("Idea2", idea2);
    player.SetVar("Idea3", idea3);
})
.catch(err => {
    player.SetVar("Idea1", "⚠️ Error generating hypotheses");
    player.SetVar("Idea2", "");
    player.SetVar("Idea3", "");
});
}

window.Script14 = function()
{
  var player = GetPlayer();

// Get the three ideas from Storyline
var idea1 = player.GetVar("Idea1") || "";
var idea2 = player.GetVar("Idea2") || "";
var idea3 = player.GetVar("Idea3") || "";

// Build the text with line breaks between each
var textToCopy = idea1 + "\n" + idea2 + "\n" + idea3;

// Create a temporary textarea to hold the text for copying
const textarea = document.createElement("textarea");
textarea.value = textToCopy;
document.body.appendChild(textarea);
textarea.select();
document.execCommand("copy");
document.body.removeChild(textarea);
}

};
