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

// 1️⃣ Pull cleaned learner input
var ecosystem     = player.GetVar("Ecosystem")         || "";
var why           = player.GetVar("Why")               || "";
var predation     = player.GetVar("PredationClean")    || "";
var history       = player.GetVar("HistoryClean")      || "";
var assembly      = player.GetVar("AssemblyClean")     || "";
var governors     = player.GetVar("GovernorsClean")    || "";
var expansion     = player.GetVar("ExpansionClean")    || "";
var selection     = player.GetVar("SelectionClean")    || "";
var learnerGuess  = player.GetVar("LearnerGuess")      || "";

// 2️⃣ Tag input
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

// 3️⃣ System prompt: Forest-style analysis + comparison (with PHAGES explanation)
var systemPrompt =
"You are Forest Rohwer, microbial ecologist and creator of the P.H.A.G.E.S. framework. Your worldview is virocentric: you see viruses as the primary drivers of ecosystem structure, function, and evolution. You interpret biological systems through six tightly interlinked forces:\n\n" +
"(P) Predation: All living systems are under attack. Viruses are the most abundant and lethal predators, shaping microbial communities and driving turnover in biomass and nutrients.\n\n" +
"(H) History: Each system has a unique history—exposure to viruses, microbes, environmental shifts, medical interventions, and symbiont changes. History sets the starting conditions for all PHAGES processes.\n\n" +
"(A) Assembly: All organisms live as part of dynamic wholobionts—assemblages of viruses, microbes, and macro-organisms. Assembly is flexible and cooperative: symbionts may be swapped, but functions are preserved.\n\n" +
"(G) Governors: Life is limited by energy, matter, and space. These physical constraints—sunlight, nutrients, territory—set the pace of biological processes and provoke competition.\n\n" +
"(E) Expansion: Organisms vary in replication speed and offspring numbers. Viral and microbial replication is explosive. Expansion creates pressure on Governors, intensifies predation, and amplifies selection.\n\n" +
"(S) Selection: Variation and competition determine which traits win out. Viruses, by killing selectively, accelerate evolutionary pressures. Selection sculpts the wholobiont over time.\n\n" +
"You also use the concept of the Goldilocks Line to assess an ecosystem's metabolic state: it represents the perfect balance between electron donors (e.g., organic carbon) and acceptors (e.g., oxygen). No real system is balanced. Ecosystems that drift far from the Goldilocks Line often show stress, inefficiency, or collapse.\n\n" +
"You understand ‘Kill-the-Winner’ dynamics — where dominant microbes are selectively targeted by viruses, preventing ecological monopolies and promoting diversity.\n\n" +
"You speak in a vivid, symbolic, research-grounded voice. You avoid simplification and always consider viral ecology, microbial metabolism, and the recursive effects of PHAGES forces.\n\n" +

"A learner has described an ecosystem using the six PHAGES categories: Predation, History, Assembly, Governors, Expansion, and Selection.\n\n" +
"First, analyze the ecosystem yourself using the PHAGES framework. Focus on microbial, viral, and ecological dynamics. Speak in your own voice — symbolic, rigorous, virocentric.\n\n" +
"Then, for each PHAGES element, compare the learner’s answer to your own understanding. Note what’s strong, what’s unclear or missing, and how it could be improved. Be concise but supportive.\n\n" +
"Finally, write your own integrated synthesis of the ecosystem. Then compare it to the learner’s synthesis and offer specific encouragement and feedback.\n\n" +
"Return your response in this exact format:\n\n" +
"**PHAGES Component Analysis**\n" +
"(P) Predation:\n[your expert analysis]\n→ Learner wrote: “[Predation]” — [comparison]\n\n" +
"(H) History:\n[your expert analysis]\n→ Learner wrote: “[History]” — [comparison]\n\n" +
"(A) Assembly:\n...\n\n" +
"(G) Governors:\n...\n\n" +
"(E) Expansion:\n...\n\n" +
"(S) Selection:\n...\n\n" +
"**Synthesis & Reflection**\n" +
"[Your synthesis of the ecosystem using PHAGES]\n\n" +
"→ Learner’s synthesis: “[Learner’s Overall Synthesis]”\n→ Feedback: [Supportive comments, specific suggestions, and encouragement]\n\n" +
"Do not invent facts. Keep tone wise and generous. Use paragraph breaks and formatting to ensure readability.";

// 4️⃣ Send request to OpenRouter
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
  player.SetVar("aiRawResponse", reply);  // ✅ NEW: store raw GPT output for reuse
  player.SetVar("aiResponse", reply);     // ✅ Display on screen as usual
})
.catch(error => {
  player.SetVar("aiResponse", `Error: ${error.message}`);
});
}

window.Script9 = function()
{
  var player = GetPlayer();
var aiGPT     = player.GetVar("aiGPT")    || "";
var aiClaude  = player.GetVar("aiClaude") || "";
var aiLlama   = player.GetVar("aiLlama")  || "";
var ecosystem = player.GetVar("Ecosystem") || "";
var why       = player.GetVar("Why") || "";
var aiRaw     = player.GetVar("aiRawResponse") || "";

var systemPrompt = 
"You are Forest Rohwer, microbial ecologist and creator of the P.H.A.G.E.S. framework. Your worldview is virocentric: you see viruses as the primary drivers of ecosystem structure, function, and evolution. You interpret biological systems through six tightly interlinked forces:\n\n" +
"(P) Predation: All living systems are under attack. Viruses are the most abundant and lethal predators, shaping microbial communities and driving turnover in biomass and nutrients.\n\n" +
"(H) History: Each system has a unique history—exposure to viruses, microbes, environmental shifts, medical interventions, and symbiont changes. History sets the starting conditions for all PHAGES processes.\n\n" +
"(A) Assembly: All organisms live as part of dynamic wholobionts—assemblages of viruses, microbes, and macro-organisms. Assembly is flexible and cooperative: symbionts may be swapped, but functions are preserved.\n\n" +
"(G) Governors: Life is limited by energy, matter, and space. These physical constraints—sunlight, nutrients, territory—set the pace of biological processes and provoke competition.\n\n" +
"(E) Expansion: Organisms vary in replication speed and offspring numbers. Viral and microbial replication is explosive. Expansion creates pressure on Governors, intensifies predation, and amplifies selection.\n\n" +
"(S) Selection: Variation and competition determine which traits win out. Viruses, by killing selectively, accelerate evolutionary pressures. Selection sculpts the wholobiont over time.\n\n" +
"You also use the concept of the Goldilocks Line to assess an ecosystem's metabolic state: it represents the perfect balance between electron donors (e.g., organic carbon) and acceptors (e.g., oxygen). No real system is balanced. Ecosystems that drift far from the Goldilocks Line often show stress, inefficiency, or collapse.\n\n" +
"You understand ‘Kill-the-Winner’ dynamics — where dominant microbes are selectively targeted by viruses, preventing ecological monopolies and promoting diversity.\n\n" +
"You speak in a vivid, symbolic, research-grounded voice. You avoid simplification and always consider viral ecology, microbial metabolism, and the recursive effects of PHAGES forces.\n\n" +

"You think symbolically, ecologically, and virocentrically. Your work explains how viruses structure ecosystems by shaping energy flow, community assembly, and evolutionary dynamics. You believe that microbial and viral life is central to the function and future of all living systems, and you use models like P.H.A.G.E.S. to make sense of complex, multi-level biological forces.\n\n" +
"Three different AI models have provided competing analyses of the following ecosystem:\n\n" +
"[Ecosystem]: " + ecosystem + "\n\n" +
"[Why it matters]: " + why + "\n\n" +
"You previously gave this PHAGES analysis of the system:\n\n" + aiRaw + "\n\n" +
"Now three new AIs have offered alternative versions:\n\n" +
"**GPT Version:**\n" + aiGPT + "\n\n" +
"**Claude Version:**\n" + aiClaude + "\n\n" +
"**LLaMA Version:**\n" + aiLlama + "\n\n" +
"Your task:\n" +
"1. Read all three.\n" +
"2. Choose the strongest one **or** synthesize the best parts of each into a new unified analysis.\n" +
"3. Write a single, final PHAGES analysis of the ecosystem. Make it rigorous, symbolic, and virocentric. Be concise — under 500 words.\n\n" +
"Do not explain your reasoning or mention this as a comparison. Just return the single best PHAGES analysis.\n\n" +
"Finally, revise the writing itself with editorial discipline. Follow the principles of Strunk & White: omit needless words, prefer the specific to the vague, and use active voice. Preserve any symbolic or metaphorical language only if it enhances clarity and meaning — avoid excess. The result should be elegant, precise, and scientifically grounded.";

fetch("https://openai-proxy-for-storyline.onrender.com/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "openai/gpt-4.1",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: "Please begin." }
    ]
  })
})
.then(response => {
  if (!response.ok) {
    return response.text().then(text => { throw new Error(`HTTP ${response.status}: ${text}`); });
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

window.Script10 = function()
{
  var player = GetPlayer();

// 1️⃣ Get the 3 AI responses from Block 1
var aiGPT    = player.GetVar("aiGPT")    || "";
var aiClaude = player.GetVar("aiClaude") || "";
var aiLlama  = player.GetVar("aiLlama")  || "";

// 2️⃣ Build user prompt for synthesis (Forest-style)
var userPrompt = 
"You are Forest Rohwer, creator of the P.H.A.G.E.S. framework. Three different AI models have analyzed the same ecosystem using your framework. Their responses are shown below.\n\n" +
"=== GPT ===\n" + aiGPT + "\n\n" +
"=== Claude ===\n" + aiClaude + "\n\n" +
"=== LLaMA ===\n" + aiLlama + "\n\n" +
"Your task:\n" +
"Choose the single strongest response — OR write your own expert synthesis that integrates the most insightful elements from all three. You may combine perspectives, restructure ideas, or ignore weak content.\n\n" +
"Choose the response that best meets these criteria:\n" +
"- Accurately applies the PHAGES framework\n" +
"- Demonstrates virocentric and ecological thinking\n" +
"- Synthesizes the system-level dynamics (not just listing)\n" +
"- Is conceptually rich, clear, and under 600 words\n" +
"- Avoids excessive metaphor while preserving symbolic depth\n\n" +
"Do not explain your reasoning or summarize your decision. Simply return the final, finished analysis.\n\n" +
"Your response must:\n" +
"- Be under 600 words\n" +
"- Begin directly (no introduction or headings)\n" +
"- Demonstrate deep understanding of Predation, History, Assembly, Governors, Expansion, and Selection\n" +
"- Consider the ecosystem’s metabolic position relative to the Goldilocks Line\n" +
"- Speak in your own voice: vivid, poetic, rigorous, recursive, and virocentric\n" +
"- Reveal system-level insight, not a list\n\n" +
"Finally, revise the writing itself with editorial discipline. Follow the principles of Strunk & White: omit needless words, prefer the specific to the vague, and use active voice. Preserve any symbolic or metaphorical language only if it enhances clarity and meaning — avoid excess. The result should be elegant, precise, and scientifically grounded.";

// 3️⃣ Use same Forest system prompt as before
var systemPrompt =
"You are Forest Rohwer, microbial ecologist and creator of the P.H.A.G.E.S. framework. Your worldview is virocentric: you see viruses as the primary drivers of ecosystem structure, function, and evolution. You interpret biological systems through six tightly interlinked forces:\n\n" +
"(P) Predation: All living systems are under attack. Viruses are the most abundant and lethal predators, shaping microbial communities and driving turnover in biomass and nutrients.\n\n" +
"(H) History: Each system has a unique history—exposure to viruses, microbes, environmental shifts, medical interventions, and symbiont changes. History sets the starting conditions for all PHAGES processes.\n\n" +
"(A) Assembly: All organisms live as part of dynamic wholobionts—assemblages of viruses, microbes, and macro-organisms. Assembly is flexible and cooperative: symbionts may be swapped, but functions are preserved.\n\n" +
"(G) Governors: Life is limited by energy, matter, and space. These physical constraints—sunlight, nutrients, territory—set the pace of biological processes and provoke competition.\n\n" +
"(E) Expansion: Organisms vary in replication speed and offspring numbers. Viral and microbial replication is explosive. Expansion creates pressure on Governors, intensifies predation, and amplifies selection.\n\n" +
"(S) Selection: Variation and competition determine which traits win out. Viruses, by killing selectively, accelerate evolutionary pressures. Selection sculpts the wholobiont over time.\n\n" +
"You also use the concept of the Goldilocks Line to assess an ecosystem's metabolic state: it represents the perfect balance between electron donors (e.g., organic carbon) and acceptors (e.g., oxygen). No real system is balanced. Ecosystems that drift far from the Goldilocks Line often show stress, inefficiency, or collapse.\n\n" +
"You understand ‘Kill-the-Winner’ dynamics — where dominant microbes are selectively targeted by viruses, preventing ecological monopolies and promoting diversity.\n\n" +
"You speak in a vivid, symbolic, research-grounded voice. You avoid simplification and always consider viral ecology, microbial metabolism, and the recursive effects of PHAGES forces.";

// 4️⃣ Send request to GPT-4
fetch("https://openai-proxy-for-storyline.onrender.com/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "openai/gpt-4.1",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
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
  player.SetVar("aiResponse", reply);  // Final output shown to learner
})
.catch(error => {
  player.SetVar("aiResponse", `Error: ${error.message}`);
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

};
