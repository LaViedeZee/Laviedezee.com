---
title: "wellness-os-page-draft"
description: "Your personal Wellness Operating System from La Vie de Zee: a faith-led framework to clarify your vision, build your plan, track your progress, and keep learning."
pubDate: 2026-09-25
updatedDate: 2026-09-28
wpId: 6563
---


		
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Wellness Stewardship by La Vie de Zee</title>
<link href="/css/omgf-136.css" rel="stylesheet">
<style>
  :root{
--bg:#FFF7F5;
--paper:#FCEAE7;
--ink:#3A2420;
--ink-soft:#7C5F5A;
--sage:#FE7B7B;
--sage-deep:#9C3F3F;
--gold:#C6604F;
--line:#F3D9D3;
--white:#FFFFFF;
font-family:'Work Sans',-apple-system,sans-serif;
  }
  *{box-sizing:border-box;}
  button{
all:unset;
cursor:pointer;
box-sizing:border-box;
font-family:'Work Sans',sans-serif;
  }
  html{scroll-behavior:smooth;}
  body{
margin:0;
background:var(--bg);
color:var(--ink);
line-height:1.6;
-webkit-font-smoothing:antialiased;
  }
  a{color:var(--sage-deep);}
  .wrap{max-width:760px;margin:0 auto;padding:0 24px 100px;}
  /* ---------- header ---------- */
  header.hero{
background:var(--sage);
color:var(--bg);
padding:56px 24px 64px;
text-align:center;
  }
  .brandmark{
font-family:'Work Sans',sans-serif;
font-size:12px;
letter-spacing:.24em;
color:var(--bg) !important;
opacity:.9;
margin-bottom:18px;
  }
  header.hero h1{
font-family:'Aleo',serif;
font-weight:300;
font-style:italic;
font-size:clamp(32px,6vw,50px);
line-height:1.12;
color:var(--bg) !important;
margin:0 0 12px;
  }
  header.hero p.sub{
font-family:'Aleo',serif;
font-style:italic;
font-weight:300;
font-size:19px;
color:var(--bg) !important;
opacity:.95;
margin:0;
  }
  /* ---------- nav ---------- */
  nav.toc{
display:flex;
flex-wrap:wrap;
gap:8px 10px;
justify-content:center;
max-width:760px;
margin:-26px auto 0;
padding:0 24px;
position:relative;
z-index:2;
  }
  nav.toc a{
background:var(--white);
border:1px solid var(--line);
color:var(--sage-deep);
text-decoration:none;
font-size:13px;
font-weight:500;
padding:9px 14px;
border-radius:2px;
white-space:nowrap;
  }
  nav.toc a:hover{background:var(--paper);}
  /* ---------- generic section rhythm ---------- */
  .intro{padding-top:48px;}
  section{margin-top:64px;}
  .kicker{
font-size:12px;
letter-spacing:.18em;
color:var(--gold);
font-weight:600;
margin-bottom:6px;
  }
  h2{
font-family:'Aleo',serif;
font-weight:300;
font-style:italic;
font-size:30px;
margin:0 0 20px;
color:var(--sage-deep);
  }
  h3{
font-family:'Aleo',serif;
font-weight:300;
font-style:italic;
font-size:20px;
margin:32px 0 10px;
color:var(--ink);
  }
  p{margin:0 0 14px;}
  .divider{
border:none;
border-top:1px solid var(--line);
margin:64px 0 0;
  }
  /* ---------- callouts ---------- */
  .callout{
background:var(--paper);
border-left:3px solid var(--sage);
padding:20px 22px;
border-radius:2px;
margin:20px 0;
  }
  .callout .icon{font-size:18px;margin-right:6px;}
  .scripture{
background:transparent;
border-left:3px solid var(--gold);
padding:6px 0 6px 20px;
margin:22px 0;
  }
  .scripture p{
font-family:'Aleo',serif;
font-weight:300;
font-style:italic;
font-size:18px;
color:var(--sage-deep);
margin:0 0 6px;
  }
  .scripture cite{
font-style:normal;
font-size:13px;
color:var(--ink-soft);
  }
  /* ---------- details / toggles ---------- */
  details{
border:1px solid var(--line);
border-radius:2px;
background:var(--white);
margin-bottom:14px;
padding:4px 20px;
  }
  details summary{
cursor:pointer;
list-style:none;
padding:14px 0;
font-family:'Aleo',serif;
font-weight:300;
font-style:italic;
font-size:18px;
color:var(--sage-deep);
display:flex;
align-items:center;
justify-content:space-between;
  }
  details summary::-webkit-details-marker{display:none;}
  details summary:after{
content:"+";
font-size:22px;
color:var(--gold);
margin-left:12px;
  }
  details[open] summary:after{content:"–";}
  details .body{padding-bottom:18px;}
  details .body ul{padding-left:20px;margin:8px 0;}
  details .body ol{padding-left:20px;}
  /* ---------- pillars ---------- */
  .pillars{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(130px,1fr));
gap:10px;
margin:18px 0 28px;
  }
  .pillars div{
background:var(--white);
border:1px solid var(--line);
text-align:center;
padding:16px 8px;
font-size:14px;
font-weight:500;
color:var(--sage-deep);
border-radius:2px;
  }
  /* ---------- goal inspiration cards ---------- */
  .inspo-grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
gap:14px;
margin:18px 0 8px;
  }
  .inspo-card{
background:var(--white);
border:1px solid var(--line);
border-radius:2px;
padding:18px;
  }
  .inspo-tag{
display:inline-block;
font-size:11px;
letter-spacing:.08em;
font-weight:600;
color:var(--sage-deep);
background:var(--paper);
padding:3px 9px;
border-radius:20px;
margin-bottom:10px;
  }
  .inspo-card h4{
font-family:'Aleo',serif;
font-weight:300;
font-style:italic;
font-size:17px;
margin:0 0 6px;
  }
  .inspo-card .ref{font-size:13px;color:var(--ink-soft);}
  /* ---------- journal ---------- */
  .phase-label{
font-size:12px;
letter-spacing:.12em;
font-weight:600;
color:var(--gold);
margin:30px 0 4px;
text-transform:uppercase;
  }
  .journal-item{
background:var(--white);
border:1px solid var(--line);
border-radius:2px;
padding:18px 20px;
margin-bottom:12px;
  }
  .journal-item label{
display:block;
font-weight:500;
font-size:15px;
margin-bottom:10px;
  }
  .journal-item textarea{
width:100%;
min-height:80px;
resize:vertical;
font-family:'Work Sans',sans-serif;
font-size:14px;
color:var(--ink);
border:1px solid var(--line);
background:var(--bg);
border-radius:2px;
padding:10px 12px;
  }
  .saved-flag{
font-size:12px;
color:var(--sage);
opacity:0;
transition:opacity .4s;
margin-top:6px;
display:block;
  }
  .saved-flag.show{opacity:1;}
  /* ---------- prompt boxes ---------- */
  .prompt-box{
background:var(--sage-deep);
color:#EFEBDC;
border-radius:2px;
padding:18px 20px;
margin:14px 0;
position:relative;
font-size:14px;
  }
  .prompt-box .lbl{font-size:12px;letter-spacing:.1em;color:#F3C6BE;margin-bottom:8px;display:block;}
  .copy-btn{
display:inline-block !important;
width:auto !important;
background:var(--gold) !important;
border:none !important;
color:#2A2110 !important;
font-weight:600 !important;
font-size:12px !important;
padding:7px 12px !important;
border-radius:2px !important;
text-transform:none !important;
margin-top:12px;
  }
  .copy-btn:hover{opacity:.9;}
  .cta-btn{
display:inline-block;
background:var(--sage-deep);
color:#fff;
text-decoration:none;
font-weight:500;
font-size:14px;
padding:12px 22px;
border-radius:2px;
margin:14px 0;
  }
  .cta-btn:hover{background:var(--sage);}
  /* ---------- editable tables ---------- */
  .table-wrap{overflow-x:auto;margin-top:16px;}
  table.dyn{
width:100%;
border-collapse:collapse;
min-width:640px;
background:var(--white);
  }
  table.dyn th{
background:var(--paper);
text-align:left;
font-size:12px;
letter-spacing:.04em;
color:var(--sage-deep);
padding:10px 12px;
border:1px solid var(--line);
  }
  table.dyn td{
border:1px solid var(--line);
padding:0;
vertical-align:top;
  }
  table.dyn td textarea, table.dyn td input, table.dyn td select{
width:100%;
border:none;
background:transparent;
font-family:'Work Sans',sans-serif;
font-size:13px;
padding:10px 12px;
resize:vertical;
min-height:44px;
color:var(--ink);
  }
  table.dyn td select{min-height:auto;padding:10px 8px;}
  table.dyn td.del{text-align:center;vertical-align:middle;}
  .row-del{
display:inline !important;
width:auto !important;
background:none !important;
color:#A9483A !important;
font-size:16px !important;
padding:0 !important;
  }
  .add-row{
display:inline-block !important;
width:auto !important;
margin-top:12px;
background:var(--white) !important;
border:1px dashed var(--sage) !important;
color:var(--sage-deep) !important;
font-weight:500 !important;
font-size:13px !important;
padding:9px 16px !important;
border-radius:2px !important;
text-transform:none !important;
  }
  .add-row:hover{background:var(--paper) !important;}
  .ring-wrap{display:flex;align-items:center;gap:8px;padding:8px 12px;}
  .ring-wrap input[type=range]{flex:1;min-height:auto;padding:0;}
  .ring-num{font-size:13px;font-weight:600;color:var(--sage-deep);width:34px;}
  /* ---------- task list ---------- */
  .task-form{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0;}
  .task-form input[type=text]{flex:2;min-width:160px;}
  .task-form input[type=date]{flex:1;min-width:140px;}
  .task-form input{
padding:10px 12px !important;
border:1px solid var(--line) !important;
border-radius:2px !important;
font-family:'Work Sans',sans-serif !important;
font-size:13px !important;
background:var(--white) !important;
color:var(--ink) !important;
  }
  #task-add{
display:inline-block !important;
width:100% !important;
text-align:center !important;
background:var(--sage-deep) !important;
color:#fff !important;
border:none !important;
border-radius:2px !important;
font-weight:500 !important;
font-size:13px !important;
padding:12px 16px !important;
text-transform:none !important;
letter-spacing:normal !important;
  }
  ul.task-list{list-style:none;padding:0;margin:0;}
  ul.task-list li{
display:flex;
flex-wrap:wrap;
justify-content:space-between;
align-items:center;
row-gap:10px;
background:var(--white);
border:1px solid var(--line);
border-radius:2px;
padding:12px 14px;
margin-bottom:8px;
font-size:14px;
  }
  ul.task-list li .task-info{flex:1 1 100%;min-width:0;}
  ul.task-list li span.date{color:var(--ink-soft);font-size:12px;margin-left:10px;}
  ul.task-list li .actions{
display:flex !important;
align-items:center !important;
gap:18px !important;
flex:0 0 auto;
margin-left:auto;
  }
  ul.task-list li .ics-btn{
display:inline !important;
width:auto !important;
background:none !important;
color:var(--sage-deep) !important;
font-size:12px !important;
font-weight:600 !important;
text-decoration:underline !important;
text-transform:none !important;
padding:0 !important;
white-space:nowrap;
  }
  ul.task-list li .ics-btn:hover{color:var(--gold) !important;}
  ul.task-list li .row-del2{
display:inline !important;
width:auto !important;
background:none !important;
color:#A9483A !important;
font-size:16px !important;
padding:0 !important;
line-height:1;
  }
  .empty-note{color:var(--ink-soft);font-size:13px;font-style:italic;}
  /* ---------- footer ---------- */
  footer{
background:var(--sage-deep);
color:#FBE1DC;
padding:48px 24px;
text-align:center;
margin-top:80px;
  }
  footer p{font-size:14px;}
  footer a{color:#fff;}
  .notice{
max-width:760px;margin:40px auto 0;padding:0 24px;
font-size:12px;color:var(--ink-soft);text-align:center;
border-top:1px solid var(--line);padding-top:20px;
  }
  @media (max-width:520px){
header.hero{padding:44px 18px 56px;}
nav.toc{margin-top:-20px;}
  }
</style>
</head>
<body>
<header class="hero">
  <div class="brandmark">LA VIE DE ZEE</div>
  <h1>Wellness Stewardship</h1>
  <p class="sub">Your Personal Wellness Operating System</p>
</header>
<nav class="toc">
  <a href="#overview">Overview</a>
  <a href="#instructions">Instructions</a>
  <a href="#vision">I. Vision &amp; Objectives</a>
  <a href="#strategy">II. Strategy</a>
  <a href="#tracking">III. Tracking</a>
  <a href="#education">IV. Education</a>
</nav>
<div class="wrap">
  <div class="intro">
<div class="callout">
<p><span class="icon">🌿</span><strong>Welcome to Your Personal Wellness Operating System, Powered by La Vie de Zee.</strong></p>
<p>Exercise stewardship over your life by enhancing your health, organizing your efforts, and serving from a place of vibrant abundance. This Operating System is engineered to help you become the architect of your wellness lifestyle. By guiding you to state your objectives, clarify your approach, and refine your inputs, this space is where discipline transforms into capacity.</p>
<p>This is a <em>faith-led process created through a Christian framework</em>, predicated on the idea of enlisting divine help to assist you in achieving your goals. Pray, meditate, or sit in silence before engaging with this tool and ask God to help you reach your goals.</p>
</div>
  </div>
  <!-- ============ OVERVIEW ============ -->
  <section id="overview">
<div class="kicker">Getting Started</div>
<h2>Program Overview</h2>
<details open>
<summary>How this Operating System works</summary>
<div class="body">
<p>🛣️ <strong>Roadmap:</strong> The goal of the Wellness Operating System is to move you through each stage necessary to achieve your wellness goals, as modeled by a Biblical framework. You will progress through three primary phases: <strong>ideation, actualization, and tracking</strong>. You will begin by clarifying your vision and objectives, proceed to planning and executing your wellness action steps, and conclude by monitoring your progress.</p>
<p>⏲️ <strong>Time Investment:</strong> Expect to invest 3–5 minutes per day initializing your layout in the morning and closing out your audit metrics at night.</p>
<p>📲 <strong>Mobile Execution:</strong> For maximum agility, bookmark this page to your phone&#8217;s home screen for one-tap access on the go, and enable notifications for anything you schedule elsewhere as reminders.</p>
</div>
</details>
  </section>
  <!-- ============ INSTRUCTIONS ============ -->
  <section id="instructions">
<div class="kicker">Before You Begin</div>
<h2>Instructions</h2>
<p>This Wellness Operating System is more than a mere organizational system. It is meant to act as a virtual Tabernacle, allowing you to move closer to God so that He can hear your prayers. Before we approach God with our requests, it is beneficial to align with His will and be open to His intercession.</p>
<details>
<summary>The Sauce 🥫: How to Get Closer to God</summary>
<div class="body">
<ol>
<li><strong>Cleanse yourself of outward, worldly sin.</strong> This can include low-quality media consumption, bad company, gossip, etc. As you spend more time in prayer, aligned action and scripture study, your discernment will improve, and it will become easier to notice unaligned elements in your life.</li>
<li><strong>Offer up something you engage in as a result of indwelling sin.</strong> These are the things that come from within us that block our connection with God. God asks us to love Him with all of our heart, all of our soul and all of our strength (<em>Deuteronomy 6:5, Mark 12:30, Luke 10:27</em>). This step requires radical honesty and a functional time audit. Some common examples include giving up emotional coping habits like excess sugar, excess social media use, or restrictive eating. These habits fill a void in our heart, so it&#8217;s necessary to ask Jesus to come and fill that void instead for true healing, rather than trying to white-knuckle through it alone.</li>
<li><strong>Accept the power you have to connect with God</strong> via your intuition and discernment, as well as the power to resist against the forces of evil. You&#8217;re not alone in your journey to create change — Jesus is with you at all times (<em>Matthew 28:20</em>). Make sure to call on Him.</li>
<li><strong>Take aligned action towards what is revealed to you.</strong> More on this below.</li>
</ol>
</div>
</details>
  </section>
  <hr class="divider">
  <!-- ============ I. VISION ============ -->
  <section id="vision">
<div class="kicker">Section I</div>
<h2>Vision Alignment &amp; Objectives</h2>
<h3>Consider Your Wellness Goals: What Are They? 🧐</h3>
<p>&#8220;Wellness&#8221; is a catch-all term that describes an overall state of wellbeing. For most people, this state can be distilled down into five core pillars:</p>
<div class="pillars">
<div>Spiritual</div>
<div>Physical</div>
<div>Mental</div>
<div>Emotional</div>
<div>Social</div>
</div>
<p>Because this Operating System runs on a Biblical framework, it can be helpful to look to Scripture to see what the Word guides us to in terms of a desired state of wellbeing. A few examples are below to inspire you.</p>
<div class="inspo-grid">
<div class="inspo-card"><span class="inspo-tag">Physical</span><h4>Eating More Vegetables</h4><div class="ref">Book of Daniel</div></div>
<div class="inspo-card"><span class="inspo-tag">Physical</span><h4>Better Rest</h4><div class="ref">Psalm 4:8</div></div>
<div class="inspo-card"><span class="inspo-tag">Spiritual</span><h4>A Solid Prayer Routine</h4><div class="ref">Book of Daniel</div></div>
<div class="inspo-card"><span class="inspo-tag">Physical</span><h4>Building Strength</h4><div class="ref">Proverbs 31</div></div>
<div class="inspo-card"><span class="inspo-tag">Mental</span><h4>Self-Discipline</h4><div class="ref">Galatians 5:22–23, 1 Corinthians 9:27</div></div>
</div>
<h3>Write It Down, Make It Happen 💻</h3>
<p>Continue your journey by completing the journal entries below. This exercise will help get the wheels turning and serve as a reference point as you begin taking action and monitoring your progress. Your responses save automatically to this browser.</p>
<div class="phase-label">Phase 1 · Onboarding</div>
<div id="journal-phase1"></div>
<div class="phase-label">Phase 2 · Goal Setting</div>
<div id="journal-phase2"></div>
<div class="phase-label">Phase 3 · Stumbling Blocks</div>
<div id="journal-phase3"></div>
  </section>
  <hr class="divider">
  <!-- ============ II. STRATEGY ============ -->
  <section id="strategy">
<div class="kicker">Section II</div>
<h2>Strategy &amp; Actualization</h2>
<p>Using the information you articulated in Your Stewardship Audit, write your goals and obstacles below. Once you&#8217;ve filled in your Target Objective and Current Friction Point, we recommend using AI to generate a 3-point Action Plan and a 7-Day Weekly Execution Task List to help you reach your goals.</p>
<div class="scripture">
<p>&#8220;Suppose one of you wants to build a tower. Won&#8217;t you first sit down and estimate the cost to see if you have enough money to complete it? For if you lay the foundation and are not able to finish it, everyone who sees it will ridicule you, saying, &#8216;This person began to build and wasn&#8217;t able to finish.'&#8221;</p>
<cite>Luke 14:28–30</cite>
</div>
<h3>Your Wellness Executive Assistant</h3>
<p>Fill in your Target Objective and Current Friction Point(s) in the table below, then hand them to an AI assistant of your choice — we like Claude — to generate your Action Plan and Weekly Execution Task List.</p>
<p><em>Disclaimer: not medical advice. Consult your physician before implementing changes.</em></p>
<div class="prompt-box">
<span class="lbl">STEP 1 · ACTION PLAN PROMPT</span>
&#8220;Please generate a 3-point Action Plan based on the following: [Copy/paste your Target Objective and Current Friction Points here].&#8221;
<br><button class="copy-btn" data-copy="Please generate a 3-point Action Plan based on the following: [Copy/paste your Target Objective and Current Friction Points here].">Copy prompt</button>
</div>
<div class="prompt-box">
<span class="lbl">STEP 2 · WEEKLY EXECUTION PROMPT</span>
&#8220;Using the Action Plan we just created, please devise a 7-Day Weekly Execution Task List starting on [Day/Month/Year] with one task to complete per day, accompanied by a time estimate enclosed in brackets.&#8221;
<br><button class="copy-btn" data-copy="Using the Action Plan we just created, please devise a 7-Day Weekly Execution Task List starting on [Day/Month/Year] with one task to complete per day, accompanied by a time estimate enclosed in brackets.">Copy prompt</button>
</div>
<a class="cta-btn" href="https://claude.ai" target="_blank" rel="noopener">Open Claude to build your plan →</a>
<p><em>Congratulations! Don&#8217;t forget to enter your data in the Goal-to-Plan Pipeline below.</em></p>
<h3>Goal-to-Plan Pipeline</h3>
<div class="table-wrap">
<table class="dyn" id="pipeline-table">
<thead><tr>
<th style="width:16%">Goal Category</th>
<th style="width:22%">🏆 Target Objective</th>
<th style="width:22%">⚠️ Current Friction Point</th>
<th style="width:20%">Action Plan 🏃‍♀️</th>
<th style="width:16%">📆 Weekly Execution</th>
<th style="width:4%"></th>
</tr></thead>
<tbody></tbody>
</table>
</div>
<button class="add-row" data-add="pipeline">+ Add a goal</button>
  </section>
  <hr class="divider">
  <!-- ============ III. TRACKING ============ -->
  <section id="tracking">
<div class="kicker">Section III</div>
<h2>Tracking &amp; Analytics</h2>
<h3>🗓️ Wellness Task Calendar</h3>
<p>Add each task from your Weekly Execution list below, with its date, so you can see your week at a glance. Give a task a date and you can send it straight to your phone or desktop calendar with one tap.</p>
<div class="task-form">
<input type="text" id="task-name" placeholder="Task">
<input type="date" id="task-date">
<button id="task-add">Add task</button>
</div>
<ul class="task-list" id="task-list"></ul>
<p class="empty-note" id="task-empty">No tasks yet — add your first one above.</p>
<h3>🛐 Preparing With Prayer</h3>
<p>God is the Great Healer. Our wellness rituals work in tandem with His divine power and grace.</p>
<div class="scripture">
<p>&#8220;Let us then approach God&#8217;s throne of grace with boldness, so that we may receive mercy and find grace to help us in our time of need.&#8221;</p>
<cite>Hebrews 4:16</cite>
</div>
<h3>Eyes on the Prize! 👀🏅</h3>
<p>Use your Target Objectives to log your progress. Using your Action Plan and Weekly Execution Tasks, assess your progress and log it in the table below.</p>
<div class="table-wrap">
<table class="dyn" id="progress-table">
<thead><tr>
<th style="width:20%">Stewardship Goal Category</th>
<th style="width:18%">Goal Actualization</th>
<th style="width:14%">Status</th>
<th style="width:14%">Completion</th>
<th style="width:18%">Target Milestone Metric</th>
<th style="width:12%">Notes</th>
<th style="width:4%"></th>
</tr></thead>
<tbody></tbody>
</table>
</div>
<button class="add-row" data-add="progress">+ Add a goal to track</button>
  </section>
  <hr class="divider">
  <!-- ============ IV. EDUCATION ============ -->
  <section id="education">
<div class="kicker">Section IV</div>
<h2>Continuing Education</h2>
<p>We&#8217;ll be adding additional wellness resources to our La Vie de Zee library here. Check back periodically to keep your knowledge up to date.</p>
<div class="scripture">
<p>&#8220;The Lord by wisdom founded the earth; by understanding He established the heavens; by His knowledge the depths were broken up, and clouds drop down the dew.&#8221;</p>
<cite>Proverbs 3:19–20</cite>
</div>
  </section>
  <div class="callout" style="margin-top:64px;">
<p><span class="icon">🌿</span><strong>Congratulations</strong> on activating your proprietary Wellness Operating System and taking meaningful steps towards achieving your wellness goals!</p>
<p>It&#8217;s been a pleasure empowering you to increase your health, vitality, and wellbeing. Remember to use the <em>firstfruits</em> of your health abundance to serve others and bring blessings to those in your life for the glory of God. 🍓🍇🍉</p>
<p>Questions? Feedback? Email <a href="mailto:admin@laviedezee.com">admin@laviedezee.com</a> · Follow <strong>@laviedezee</strong> on TikTok and Instagram.</p>
  </div>
</div>
<footer>
  <p>La Vie de Zee — Wellness Stewardship</p>
</footer>
<p class="notice"><em>Notice regarding our faith framework:</em> this tool is designed to serve those who consider themselves followers of Christ, and is not meant to align with any specific denomination, Biblical translation, or theological lens.</p>
<script>
(function(){
  "use strict";
  function ls(key, fallback){
    try{ var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch(e){ return fallback; }
  }
  function save(key, val){
    try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){}
  }
  /* ---------- Journal ---------- */
  var journalItems = [
    {id:"leak", phase:1, cat:"Input Leak", q:"Be honest: why do you think you've struggled to achieve your wellness goals up until now? Search your heart and be as comprehensive as possible."},
    {id:"past", phase:1, cat:"Past Efforts", q:"What have your efforts looked like thus far? What have you tried that hasn't been effective?"},
    {id:"gap", phase:1, cat:"Capacity Void", q:"Identify the \\u201cgaps\\u201d: where can you feel that you're not meeting your potential?"},
    {id:"phys", phase:2, cat:"Physical Goals", q:"List 3 physical goals you hope to achieve. Be as specific as possible, including a timeline. Ex: \\u201cI can currently lift [x] lbs and would like to be able to lift [y] lbs by [z date].\\u201d"},
    {id:"ment", phase:2, cat:"Mental Goals", q:"List 3 mental goals you hope to achieve. Be as specific as possible, including a timeline."},
    {id:"emo", phase:2, cat:"Emotional Goals", q:"List 3 emotional goals you hope to achieve. Be as specific as possible, including a timeline."},
    {id:"habits", phase:3, cat:"Unaligned Habits", q:"What are some of the habits that are keeping you from reaching your goals, and why? These can range from actively harmful to benign-but-not-productive."},
    {id:"relat", phase:3, cat:"Draining Relationships", q:"Which relationships are keeping you from reaching your goals, and why?"},
    {id:"env", phase:3, cat:"Friction-Filled Environments", q:"What about your environment (work, home, school, community) is keeping you from reaching your goals, and why?"}
  ];
  var journalData = ls("lvz_journal", {});
  [1,2,3].forEach(function(p){
    var host = document.getElementById("journal-phase"+p);
    journalItems.filter(function(i){return i.phase===p;}).forEach(function(item){
      var wrap = document.createElement("div");
      wrap.className = "journal-item";
      wrap.innerHTML =
        '<label>'+item.cat+' — '+item.q+'</label>'+
        '<textarea data-id="'+item.id+'"></textarea>'+
        '<span class="saved-flag">Saved</span>';
      host.appendChild(wrap);
      var ta = wrap.querySelector("textarea");
      ta.value = journalData[item.id] || "";
      var flag = wrap.querySelector(".saved-flag");
      var t;
      ta.addEventListener("input", function(){
        journalData[item.id] = ta.value;
        save("lvz_journal", journalData);
        flag.classList.add("show");
        clearTimeout(t);
        t = setTimeout(function(){ flag.classList.remove("show"); }, 1200);
      });
    });
  });
  /* ---------- Copy buttons ---------- */
  document.querySelectorAll(".copy-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      var text = btn.getAttribute("data-copy");
      var restore = btn.textContent;
      function done(ok){ btn.textContent = ok ? "Copied!" : "Couldn't copy"; setTimeout(function(){btn.textContent = restore;}, 1500); }
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){done(true);}, function(){done(false);});
      } else { done(false); }
    });
  });
  /* ---------- Generic editable table ---------- */
  function buildTable(tableId, storeKey, columns, defaultRows){
    var table = document.getElementById(tableId);
    var tbody = table.querySelector("tbody");
    var rows = ls(storeKey, null);
    if(!rows){ rows = defaultRows.map(function(r){ return Object.assign({}, r); }); }
    function render(){
      tbody.innerHTML = "";
      rows.forEach(function(row, idx){
        var tr = document.createElement("tr");
        columns.forEach(function(col){
          var td = document.createElement("td");
          if(col.type === "select"){
            var sel = document.createElement("select");
            col.options.forEach(function(opt){
              var o = document.createElement("option");
              o.value = opt; o.textContent = opt;
              if(row[col.key] === opt) o.selected = true;
              sel.appendChild(o);
            });
            sel.addEventListener("change", function(){ row[col.key] = sel.value; save(storeKey, rows); });
            td.appendChild(sel);
          } else if(col.type === "range"){
            var rw = document.createElement("div");
            rw.className = "ring-wrap";
            var rng = document.createElement("input");
            rng.type = "range"; rng.min = 0; rng.max = 100; rng.value = row[col.key] || 0;
            var num = document.createElement("span");
            num.className = "ring-num";
            num.textContent = (row[col.key] || 0) + "%";
            rng.addEventListener("input", function(){
              row[col.key] = Number(rng.value);
              num.textContent = rng.value + "%";
              save(storeKey, rows);
            });
            rw.appendChild(rng); rw.appendChild(num);
            td.appendChild(rw);
          } else {
            var ta = document.createElement("textarea");
            ta.value = row[col.key] || "";
            ta.rows = 1;
            ta.addEventListener("input", function(){ row[col.key] = ta.value; save(storeKey, rows); });
            td.appendChild(ta);
          }
          tr.appendChild(td);
        });
        var delTd = document.createElement("td");
        delTd.className = "del";
        var delBtn = document.createElement("button");
        delBtn.className = "row-del";
        delBtn.innerHTML = "✕";
        delBtn.addEventListener("click", function(){
          rows.splice(idx,1);
          save(storeKey, rows);
          render();
        });
        delTd.appendChild(delBtn);
        tr.appendChild(delTd);
        tbody.appendChild(tr);
      });
    }
    render();
    return {
      addRow: function(){
        var blank = {};
        columns.forEach(function(c){ blank[c.key] = c.type === "range" ? 0 : (c.type === "select" ? c.options[0] : ""); });
        rows.push(blank);
        save(storeKey, rows);
        render();
      }
    };
  }
  var pipeline = buildTable("pipeline-table", "lvz_pipeline",
    [
      {key:"category"}, {key:"objective"}, {key:"friction"}, {key:"plan"}, {key:"weekly"}
    ],
    [{category:"",objective:"",friction:"",plan:"",weekly:""}]
  );
  var progress = buildTable("progress-table", "lvz_progress",
    [
      {key:"category"}, {key:"goal"},
      {key:"status", type:"select", options:["Not started","In progress","Done"]},
      {key:"completion", type:"range"},
      {key:"metric"}, {key:"notes"}
    ],
    [{category:"",goal:"",status:"Not started",completion:0,metric:"",notes:""}]
  );
  document.querySelectorAll("[data-add]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var target = btn.getAttribute("data-add");
      if(target === "pipeline") pipeline.addRow();
      if(target === "progress") progress.addRow();
    });
  });
  /* ---------- Task calendar ---------- */
  var tasks = ls("lvz_tasks", []);
  var taskList = document.getElementById("task-list");
  var emptyNote = document.getElementById("task-empty");
  function pad(n){ return (n<10?"0":"")+n; }
  function icsTimestamp(d){
    return d.getUTCFullYear()+pad(d.getUTCMonth()+1)+pad(d.getUTCDate())+"T"+pad(d.getUTCHours())+pad(d.getUTCMinutes())+pad(d.getUTCSeconds())+"Z";
  }
  function downloadICS(task){
    if(!task.date) return;
    var dateStr = task.date.replace(/-/g, ""); // YYYYMMDD, all-day event
    var uid = "lvz-"+task.id+"@laviedezee.com";
    var lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//La Vie de Zee//Wellness Stewardship//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:"+uid,
      "DTSTAMP:"+icsTimestamp(new Date()),
      "DTSTART;VALUE=DATE:"+dateStr,
      "SUMMARY:"+task.name.replace(/([,;])/g, "\\$1"),
      "DESCRIPTION:Added from your Wellness Stewardship task calendar.",
      "END:VEVENT",
      "END:VCALENDAR"
    ];
    var blob = new Blob([lines.join("\r\n")], {type:"text/calendar;charset=utf-8"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = (task.name || "task").replace(/[^a-z0-9]+/gi,"-").toLowerCase()+".ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 2000);
  }
  function renderTasks(){
    taskList.innerHTML = "";
    if(tasks.length === 0){ emptyNote.style.display = "block"; return; }
    emptyNote.style.display = "none";
    tasks.slice().sort(function(a,b){ return (a.date||"").localeCompare(b.date||""); })
      .forEach(function(t){
        var li = document.createElement("li");
        var dateLabel = t.date ? new Date(t.date+"T00:00:00").toLocaleDateString(undefined,{month:"short",day:"numeric"}) : "";
        var nameSpan = document.createElement("span");
        nameSpan.className = "task-info";
        nameSpan.innerHTML = escapeHtml(t.name)+(dateLabel ? ' <span class="date">'+dateLabel+'</span>' : '');
        li.appendChild(nameSpan);
        var actions = document.createElement("span");
        actions.className = "actions";
        if(t.date){
          var icsBtn = document.createElement("button");
          icsBtn.className = "ics-btn";
          icsBtn.textContent = "Add to calendar";
          icsBtn.addEventListener("click", function(){ downloadICS(t); });
          actions.appendChild(icsBtn);
        }
        var del = document.createElement("button");
        del.className = "row-del2";
        del.innerHTML = "✕";
        del.addEventListener("click", function(){
          tasks = tasks.filter(function(x){ return x.id !== t.id; });
          save("lvz_tasks", tasks);
          renderTasks();
        });
        actions.appendChild(del);
        li.appendChild(actions);
        taskList.appendChild(li);
      });
  }
  function escapeHtml(s){
    return (s||"").replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  document.getElementById("task-add").addEventListener("click", function(){
    var nameEl = document.getElementById("task-name");
    var dateEl = document.getElementById("task-date");
    var name = nameEl.value.trim();
    if(!name) return;
    tasks.push({id: Date.now()+"", name: name, date: dateEl.value});
    save("lvz_tasks", tasks);
    nameEl.value = ""; dateEl.value = "";
    renderTasks();
  });
  renderTasks();
})();
</script>
</body>
</html>
	
