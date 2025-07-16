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

// 1️⃣  Mark P as completed
player.SetVar("S", true);

// 2️⃣  Pull the current values of ALL PHAGES variables
var P = player.GetVar("P");
var H = player.GetVar("H");
var A = player.GetVar("A");
var G = player.GetVar("G");
var E = player.GetVar("E");
var S = player.GetVar("S");

// 3️⃣  Determine the first letter (in PHAGES order) that is still FALSE
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
} else if (!S) {
  player.SetVar("nextLayer", "S");
} else {
  player.SetVar("nextLayer", "");   // All six letters completed
}

}

window.Script2 = function()
{
  var player = GetPlayer();

// 1️⃣  Mark P as completed
player.SetVar("E", true);

// 2️⃣  Pull the current values of ALL PHAGES variables
var P = player.GetVar("P");
var H = player.GetVar("H");
var A = player.GetVar("A");
var G = player.GetVar("G");
var E = player.GetVar("E");
var S = player.GetVar("S");

// 3️⃣  Determine the first letter (in PHAGES order) that is still FALSE
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
} else if (!S) {
  player.SetVar("nextLayer", "S");
} else {
  player.SetVar("nextLayer", "");   // All six letters completed
}

}

window.Script3 = function()
{
  var player = GetPlayer();

// 1️⃣  Mark P as completed
player.SetVar("G", true);

// 2️⃣  Pull the current values of ALL PHAGES variables
var P = player.GetVar("P");
var H = player.GetVar("H");
var A = player.GetVar("A");
var G = player.GetVar("G");
var E = player.GetVar("E");
var S = player.GetVar("S");

// 3️⃣  Determine the first letter (in PHAGES order) that is still FALSE
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
} else if (!S) {
  player.SetVar("nextLayer", "S");
} else {
  player.SetVar("nextLayer", "");   // All six letters completed
}

}

window.Script4 = function()
{
  var player = GetPlayer();

// 1️⃣  Mark P as completed
player.SetVar("A", true);

// 2️⃣  Pull the current values of ALL PHAGES variables
var P = player.GetVar("P");
var H = player.GetVar("H");
var A = player.GetVar("A");
var G = player.GetVar("G");
var E = player.GetVar("E");
var S = player.GetVar("S");

// 3️⃣  Determine the first letter (in PHAGES order) that is still FALSE
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
} else if (!S) {
  player.SetVar("nextLayer", "S");
} else {
  player.SetVar("nextLayer", "");   // All six letters completed
}

}

window.Script5 = function()
{
  var player = GetPlayer();

// 1️⃣  Mark P as completed
player.SetVar("H", true);

// 2️⃣  Pull the current values of ALL PHAGES variables
var P = player.GetVar("P");
var H = player.GetVar("H");
var A = player.GetVar("A");
var G = player.GetVar("G");
var E = player.GetVar("E");
var S = player.GetVar("S");

// 3️⃣  Determine the first letter (in PHAGES order) that is still FALSE
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
} else if (!S) {
  player.SetVar("nextLayer", "S");
} else {
  player.SetVar("nextLayer", "");   // All six letters completed
}

}

window.Script6 = function()
{
  var player = GetPlayer();

// 1️⃣  Mark P as completed
player.SetVar("P", true);

// 2️⃣  Pull the current values of ALL PHAGES variables
var P = player.GetVar("P");
var H = player.GetVar("H");
var A = player.GetVar("A");
var G = player.GetVar("G");
var E = player.GetVar("E");
var S = player.GetVar("S");

// 3️⃣  Determine the first letter (in PHAGES order) that is still FALSE
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
} else if (!S) {
  player.SetVar("nextLayer", "S");
} else {
  player.SetVar("nextLayer", "");   // All six letters completed
}

}

window.Script7 = function()
{
  var player = GetPlayer();
player.SetVar("aiResponse", "Analyzing ecosystem…");

// 1️⃣ Pull learner input
var ecosystem  = player.GetVar("Ecosystem")  || "";
var why        = player.GetVar("Why")        || "";
var predation  = player.GetVar("Predation")  || "";
var history    = player.GetVar("History")    || "";
var assembly   = player.GetVar("Assembly")   || "";
var governors  = player.GetVar("Governors")  || "";
var expansion  = player.GetVar("Expansion")  || "";
var selection  = player.GetVar("Selection")  || "";

// 2️⃣ Build tagged user input
var userPrompt =
"[Ecosystem]\n" + ecosystem +
"\n\n[Why it matters]\n" + why +
"\n\n[Predation]\n" + predation +
"\n\n[History]\n" + history +
"\n\n[Assembly]\n" + assembly +
"\n\n[Governors]\n" + governors +
"\n\n[Expansion]\n" + expansion +
"\n\n[Selection]\n" + selection;

// 3️⃣ Full system prompt with PHAGES definitions + critique request
var systemPrompt =
"You are an expert in viral ecology and biological systems. You will analyze a user‑defined ecosystem using the P.H.A.G.E.S. framework, which consists of six key forces:\n\n" +
"1. **Predation**: Describe how viruses (as primary predators) shape ecosystem structure by killing hosts, driving competition, and recycling matter.\n" +
"2. **History**: Consider how past events, exposures, or disruptions have shaped the current state of the ecosystem.\n" +
"3. **Assembly**: Reflect on the organisms, microbes, and viruses that form dynamic communities (wholobionts) and how their symbioses function.\n" +
"4. **Governors**: Evaluate the role of energy, matter, and space, and how organisms compete for or recycle these resources—highlight microbial and viral contributions.\n" +
"5. **Expansion**: Analyze patterns of replication and growth. Identify fast vs. slow reproducers and what that means ecologically.\n" +
"6. **Selection**: Explain which traits, strategies, or variations give organisms an advantage, especially under viral pressure or resource constraints.\n\n" +
"Write a single, integrative analysis (≤ 500 words) that weaves all six elements together in cohesive prose—no lists or headings. Base your reasoning solely on the tagged learner input; do not invent facts.\n\n" +
"**After your main analysis, add one short paragraph that speaks directly to the learner. Point out which P.H.A.G.E.S. areas their answers covered well, which ones were thin or missing, and give one or two concrete suggestions for what they could investigate next. Use an encouraging tone and second‑person voice (\"you\").**";

fetch("https://openai-proxy-for-storyline.onrender.com/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
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
