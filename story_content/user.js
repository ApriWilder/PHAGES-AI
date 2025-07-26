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

window.Script2 = function()
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

window.Script3 = function()
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

window.Script4 = function()
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

window.Script5 = function()
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

window.Script6 = function()
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

window.Script7 = function()
{
  var player = GetPlayer();
player.SetVar("aiResponse", "Cleaning your answers…");

// 1️⃣ Pull raw learner input
var predation  = player.GetVar("Predation")  || "";
var history    = player.GetVar("History")    || "";
var assembly   = player.GetVar("Assembly")   || "";
var governors  = player.GetVar("Governors")  || "";
var expansion  = player.GetVar("Expansion")  || "";
var selection  = player.GetVar("Selection")  || "";

// 2️⃣ Replace blank inputs with "No answer."
if (!predation.trim())  predation  = "No answer.";
if (!history.trim())    history    = "No answer.";
if (!assembly.trim())   assembly   = "No answer.";
if (!governors.trim())  governors  = "No answer.";
if (!expansion.trim())  expansion  = "No answer.";
if (!selection.trim())  selection  = "No answer.";

// 3️⃣ Construct user prompt
var userPrompt =
"[Predation]\n" + predation +
"\n\n[History]\n" + history +
"\n\n[Assembly]\n" + assembly +
"\n\n[Governors]\n" + governors +
"\n\n[Expansion]\n" + expansion +
"\n\n[Selection]\n" + selection;

// 4️⃣ System prompt — clean without overwriting weird input
var systemPrompt =
"You are a science educator reviewing student responses to the P.H.A.G.E.S. framework.\n\n" +
"Your job is to fix grammar, clarify slang or vague language, and translate informal responses into accurate biological terms — while **preserving the original idea**.\n\n" +
"If a response is unclear but not empty, do not erase or rewrite it. Instead, wrap it in quotes and add a question mark. Example:\n" +
"  \"they vibe with the coral\"?\n\n" +
"If a response is blank or says 'No answer.', return exactly: No answer.\n\n" +
"Use this format:\n" +
"[Predation]\n<response>\n\n[History]\n<response>\n\n[Assembly]\n<response>\n\n[Governors]\n<response>\n\n[Expansion]\n<response>\n\n[Selection]\n<response>\n\n" +
"No commentary. No skipped tags. No invented content.";

// 5️⃣ Send to OpenRouter
fetch("https://openai-proxy-for-storyline.onrender.com/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "openai/gpt-4.1",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user",   content: userPrompt }
    ]
  })
})
.then(response => {
  if (!response.ok) {
    return response.text().then(text => {
      throw new Error(`HTTP ${response.status}: ${text}`);
    });
  }
  return response.json();
})
.then(data => {
  var reply = data?.choices?.[0]?.message?.content || "No response.";

  // 6️⃣ Extract cleaned responses
  var cleanedPredation  = /\[Predation\]\s*([\s\S]*?)\n\s*\[/.exec(reply)?.[1]?.trim() || "No answer.";
  var cleanedHistory    = /\[History\]\s*([\s\S]*?)\n\s*\[/.exec(reply)?.[1]?.trim() || "No answer.";
  var cleanedAssembly   = /\[Assembly\]\s*([\s\S]*?)\n\s*\[/.exec(reply)?.[1]?.trim() || "No answer.";
  var cleanedGovernors  = /\[Governors\]\s*([\s\S]*?)\n\s*\[/.exec(reply)?.[1]?.trim() || "No answer.";
  var cleanedExpansion  = /\[Expansion\]\s*([\s\S]*?)\n\s*\[/.exec(reply)?.[1]?.trim() || "No answer.";
  var cleanedSelection  = /\[Selection\]\s*([\s\S]*)/.exec(reply)?.[1]?.trim() || "No answer.";

  // 7️⃣ Push cleaned results to Storyline
  player.SetVar("PredationClean",  cleanedPredation);
  player.SetVar("HistoryClean",    cleanedHistory);
  player.SetVar("AssemblyClean",   cleanedAssembly);
  player.SetVar("GovernorsClean",  cleanedGovernors);
  player.SetVar("ExpansionClean",  cleanedExpansion);
  player.SetVar("SelectionClean",  cleanedSelection);

  // 8️⃣ Signal completion
  player.SetVar("aiResponse", "Answers cleaned and updated.");
})
.catch(error => {
  player.SetVar("aiResponse", `Error: ${error.message}`);
});
}

window.Script8 = function()
{
  var player = GetPlayer();
player.SetVar("aiResponse", "Analyzing ecosystem…");

// 1️⃣ Pull learner input (cleaned variables)
var ecosystem     = player.GetVar("Ecosystem")     || "";
var why           = player.GetVar("Why")           || "";
var predation     = player.GetVar("PredationClean")     || "";
var history       = player.GetVar("HistoryClean")       || "";
var assembly      = player.GetVar("AssemblyClean")      || "";
var governors     = player.GetVar("GovernorsClean")     || "";
var expansion     = player.GetVar("ExpansionClean")     || "";
var selection     = player.GetVar("SelectionClean")     || "";
var learnerGuess  = player.GetVar("LearnerGuess")        || "";

// 2️⃣ Build tagged input for AI
var userPrompt =
"[Ecosystem]\n" + ecosystem +
"\n\n[Why it matters]\n" + why +
"\n\n[Predation]\n" + predation +
"\n\n[History]\n" + history +
"\n\n[Assembly]\n" + assembly +
"\n\n[Governors]\n" + governors +
"\n\n[Expansion]\n" + expansion +
"\n\n[Selection]\n" + selection +
"\n\n[Learner’s Overall Synthesis]\n" + learnerGuess;

// 3️⃣ Instruction prompt for OpenRouter
var systemPrompt =
"You are an expert in viral ecology and pedagogy. The learner has described an ecosystem using the PHAGES framework.\n\n" +
"First, analyze the ecosystem yourself based on their inputs. Then compare each PHAGES element (P, H, A, G, E, S) to what the learner wrote. Explain what they got right, what was unclear or missing, and how their response might be strengthened.\n\n" +
"Then, write your own integrated synthesis of the ecosystem based on their full PHAGES input. Finally, compare this to their final synthesis ('Learner’s Overall Synthesis') and provide encouragement and specific suggestions.\n\n" +
"Return your response in **this exact format**:\n\n" +
"**PHAGES Component Analysis**\n" +
"(P) Predation: [your analysis]\n→ Learner wrote: “[their response]” — [commentary]\n\n" +
"(H) History: ...\n→ Learner wrote: “...” — ...\n\n" +
"(A) Assembly: ...\n\n" +
"...continue through S...\n\n" +
"**Overall Synthesis & Feedback**\n" +
"[your synthesis of ecosystem]\n\n" +
"→ Learner’s synthesis: “[their LearnerGuess]”\n→ Feedback: [compare, encourage, and suggest]\n\n" +
"Keep the tone supportive but rigorous. Use second person when addressing the learner. Do not invent facts not supported by the inputs.";

// 4️⃣ Send to OpenRouter proxy
fetch("https://openai-proxy-for-storyline.onrender.com/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "openai/gpt-4.1",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user",   content: userPrompt }
    ]
  })
})
.then(response => {
  if (!response.ok) {
    return response.text().then(text => {
      throw new Error(`HTTP ${response.status}: ${text}`);
    });
  }
  return response.json();
})
.then(data => {
  var reply = data?.choices?.[0]?.message?.content || "No response.";
  player.SetVar("aiResponse", reply);
})
.catch(error => {
  player.SetVar("aiResponse", `Error: ${error.message}`);
});

}

};
