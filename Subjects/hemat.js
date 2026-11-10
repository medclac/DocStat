/**
 * MedCalc Module: Hematology & Oncology (HEM) - Ultimate Unabridged Master Edition v8
 * Fully compatible with the MedCalc HTML application structure.
 */
(function () {
  "use strict";

  var makeN = (typeof window !== "undefined" && window.N) ? window.N : function (id, label, defaultVal, extra) {
    extra = extra || {};
    return Object.assign({ id: id, label: label, type: "number", value: defaultVal, default: defaultVal }, extra);
  };
  var makeS = (typeof window !== "undefined" && window.S) ? window.S : function (id, label, defaultVal, options) {
    options = options || [];
    return { id: id, label: label, type: "select", value: defaultVal, default: defaultVal, options: options };
  };

  var hemCategory = {
    id: "hem",
    name: "Hematology & Oncology",
    icon: "🩸",
    desc: "Unabridged suite: Anemia, Leukemia, Lymphoma, MPN/MDS, Myeloma, Coagulation, and Transfusion",
    organs: ["blood", "bone marrow", "lymph nodes", "spleen", "plasma"],
    region: "systemic"
  };

  var hemTools = [
    // ==============================================================
    // 1. GENERAL HEMATOLOGY & ANEMIA
    // ==============================================================
    {
      id: "rbcIndices",
      cat: "hem",
      type: "calc",
      name: "Red Blood Cell (RBC) Indices",
      desc: "Calculates MCV, MCH, and MCHC from standard complete blood count (CBC) values.",
      organ: "Red Blood Cells", region: "Hematology", subject: "Anemia",
      keywords: ["mcv", "mch", "mchc", "rbc", "anemia", "indices"],
      fields: [
        makeN("hb", "Hemoglobin (g/dL)", 12.0, { min: 3, max: 25, step: 0.1 }),
        makeN("hct", "Hematocrit (%)", 36.0, { min: 10, max: 75, step: 0.1 }),
        makeN("rbc", "RBC Count (Millions/µL)", 4.0, { min: 1.0, max: 10.0, step: 0.1 })
      ],
      calc: function (v) {
        var hb = +v.hb, hct = +v.hct, rbc = +v.rbc;
        var mcv = (hct / rbc) * 10;
        var mch = (hb / rbc) * 10;
        var mchc = (hb / hct) * 100;
        return { 
          value: "MCV: " + mcv.toFixed(1) + " fL | MCH: " + mch.toFixed(1) + " pg | MCHC: " + mchc.toFixed(1) + " g/dL", 
          eq: "Use these values for morphological classification (Microcytic, Normocytic, Macrocytic)." 
        };
      }
    },
    {
      id: "microcyticDiscrim",
      cat: "hem",
      type: "calc",
      name: "Microcytic Anemia Multi-Index Calculator",
      desc: "Calculates Mentzer, Shine & Lal, Green & King, England & Fraser, RDWI, Srivastava, and Ehsani indices.",
      organ: "Red Blood Cells", region: "Hematology", subject: "Anemia",
      keywords: ["mentzer", "england", "shine", "green", "ida", "thalassemia", "rdwi", "iron", "deficiency", "microcytic"],
      fields: [
        makeN("mcv", "MCV (fL)", 72, { min: 50, max: 120, step: 0.1 }),
        makeN("mch", "MCH (pg)", 24, { min: 15, max: 40, step: 0.1 }),
        makeN("rbc", "RBC Count (Millions/µL)", 5.5, { min: 1.0, max: 8.0, step: 0.1 }),
        makeN("hb", "Hemoglobin (g/dL)", 11.0, { min: 3, max: 20, step: 0.1 }),
        makeN("rdw", "RDW-CV (%)", 14.0, { min: 10, max: 35, step: 0.1 })
      ],
      calc: function (v) {
        var mcv = +v.mcv, mch = +v.mch, rbc = +v.rbc, hb = +v.hb, rdw = +v.rdw;
        var mentzer = mcv / rbc;
        var shine = (mcv * mcv * mch) / 100;
        var green = (mcv * mcv * rdw) / (hb * 100);
        var england = mcv - rbc - (5 * hb) - 3.4;
        var rdwi = (mcv * rdw) / rbc;
        var sriv = mch / rbc;
        var ehsani = mcv - (10 * rbc);
        
        var thalScore = 0, total = 7;
        if (mentzer < 13) thalScore++;
        if (shine < 1530) thalScore++;
        if (green < 65) thalScore++;
        if (england < 0) thalScore++;
        if (rdwi < 220) thalScore++;
        if (sriv < 3.8) thalScore++;
        if (ehsani < 15) thalScore++;
        
        var result = "Thalassemia Trait Likely (" + thalScore + "/" + total + " indices match)";
        if (thalScore <= 3) result = "Iron Deficiency Anemia (IDA) Likely (" + (total - thalScore) + "/" + total + " indices match)";
        var details = "Mentzer: " + mentzer.toFixed(1) + " | Shine&Lal: " + shine.toFixed(0) + " | Green&King: " + green.toFixed(1) + " | England: " + england.toFixed(1);
        return { value: result, eq: details };
      }
    },
    {
      id: "whoAnemiaSeverity",
      cat: "hem",
      type: "class",
      name: "WHO Anemia Severity Classification",
      desc: "Classifies anemia severity based on hemoglobin thresholds by patient demographics.",
      organ: "Blood", region: "Systemic", subject: "Anemia",
      keywords: ["who", "anemia", "severity", "hemoglobin", "hgb", "hb"],
      fields: [
        makeS("demo", "Patient Demographic", "men", [
          ["men", "Men (15+ yrs)"], ["women", "Non-pregnant Women (15+ yrs)"], ["preg", "Pregnant Women"],
          ["child_u5", "Children (6 - 59 months)"], ["child_5_11", "Children (5 - 11 yrs)"], ["child_12_14", "Children (12 - 14 yrs)"]
        ]),
        makeN("hb", "Hemoglobin (g/dL)", 9.5, { min: 2, max: 20, step: 0.1 })
      ],
      table: {
        headers: ["Severity", "Notes"],
        rows: [
          { id: "normal", cols: ["Normal / No Anemia", "Above WHO threshold"] },
          { id: "mild", cols: ["Mild Anemia", "Close to normal boundary"] },
          { id: "mod", cols: ["Moderate Anemia", "Symptomatic threshold"] },
          { id: "severe", cols: ["Severe Anemia", "High clinical risk, consider transfusion"] }
        ]
      },
      calc: function (v) {
        var d = v.demo, h = +v.hb;
        var limits = {
          "men": { norm: 13.0, mild: 11.0, severe: 8.0 }, "women": { norm: 12.0, mild: 11.0, severe: 8.0 },
          "preg": { norm: 11.0, mild: 10.0, severe: 7.0 }, "child_u5": { norm: 11.0, mild: 10.0, severe: 7.0 },
          "child_5_11": { norm: 11.5, mild: 11.0, severe: 8.0 }, "child_12_14": { norm: 12.0, mild: 11.0, severe: 8.0 }
        };
        var thr = limits[d], match = "normal";
        if (h < thr.severe) match = "severe";
        else if (h < thr.mild) match = "mod";
        else if (h < thr.norm) match = "mild";
        var title = match === "normal" ? "Normal" : match === "mild" ? "Mild Anemia" : match === "mod" ? "Moderate Anemia" : "Severe Anemia";
        return { value: title, matchId: match, eq: "Thresholds apply to sea level; adjust upwards for altitude or smoking." };
      }
    },
    {
      id: "ganzoniFormula",
      cat: "hem",
      type: "calc",
      name: "Ganzoni Iron Deficit Formula",
      desc: "Calculates total iron deficit for IV iron dosing.",
      organ: "Blood / Liver", region: "Hematology", subject: "Iron Deficiency",
      keywords: ["ganzoni", "iron", "deficit", "anemia", "tsat", "tibc", "ferinject"],
      fields: [
        makeN("weight", "Body Weight (kg)", 70, { min: 30, max: 200, step: 1 }),
        makeN("actualHb", "Actual Hemoglobin (g/dL)", 8.5, { min: 3, max: 16, step: 0.1 }),
        makeN("targetHb", "Target Hemoglobin (g/dL)", 15, { min: 10, max: 16, step: 0.1 }),
        makeN("depot", "Depot Iron Store Goal (mg)", 500, { min: 0, max: 1000, step: 100 })
      ],
      calc: function (v) {
        var deficit = Math.max(0, +v.weight * (+v.targetHb - +v.actualHb) * 2.4 + +v.depot);
        return { value: "Total Iron Deficit: " + Math.round(deficit) + " mg", eq: "Evaluate TSAT and TIBC concurrently." };
      }
    },
    {
      id: "reticIndex",
      cat: "hem",
      type: "calc",
      name: "Reticulocyte Production Index (RPI)",
      desc: "Adjusts reticulocyte count for anemia and premature marrow release.",
      organ: "Bone Marrow", region: "Hematology", subject: "Anemia",
      keywords: ["rpi", "reticulocyte", "anemia", "marrow response", "retic"],
      fields: [
        makeN("retic", "Reticulocyte Count (%)", 4.0, { min: 0, max: 30, step: 0.1 }),
        makeN("hct", "Patient Hematocrit (%)", 25, { min: 10, max: 60, step: 1 })
      ],
      calc: function (v) {
        var hct = +v.hct;
        var matFactor = hct >= 36 ? 1.0 : hct >= 26 ? 1.5 : hct >= 16 ? 2.0 : 2.5;
        var rpi = (+v.retic * (hct / 45.0)) / matFactor;
        return { value: "RPI: " + rpi.toFixed(2), eq: rpi < 2 ? "RPI < 2 indicates inadequate marrow response (hypoproliferative)." : "RPI ≥ 2 indicates appropriate marrow response (hemolysis/bleeding)." };
      }
    },
    
    // ==============================================================
    // 2. BONE MARROW FAILURE & HEMOLYSIS
    // ==============================================================
    {
      id: "camittaAplastic",
      cat: "hem",
      type: "class",
      name: "Camitta Criteria for Aplastic Anemia",
      desc: "Classifies severity of acquired aplastic anemia.",
      organ: "Bone Marrow", region: "Hematology", subject: "Bone Marrow Failure",
      keywords: ["camitta", "aplastic", "anemia", "marrow failure", "saa", "vsaa", "nsaa"],
      fields: [
        makeS("bm", "Bone Marrow Cellularity < 25%", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("anc", "Absolute Neutrophil Count (ANC)", "0", [["0", "> 500 /µL"], ["1", "200 - 500 /µL"], ["2", "< 200 /µL"]]),
        makeS("plt", "Platelet Count < 20,000 /µL", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("retic", "Absolute Reticulocyte Count < 20,000 /µL", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["Severity", "Criteria"],
        rows: [
          { id: "nsaa", cols: ["Non-Severe (NSAA)", "Does not meet SAA cytopenia criteria"] },
          { id: "saa", cols: ["Severe (SAA)", "BM <25% + 2 of 3 severe cytopenias"] },
          { id: "vsaa", cols: ["Very Severe (vSAA)", "SAA criteria + ANC < 200"] }
        ]
      },
      calc: function (v) {
        var cytopenias = (+v.anc >= 1 ? 1 : 0) + +v.plt + +v.retic;
        var match = "nsaa";
        if (v.bm === "1" && cytopenias >= 2) match = v.anc === "2" ? "vsaa" : "saa";
        return { value: match === "vsaa" ? "vSAA" : match === "saa" ? "SAA" : "NSAA", matchId: match, eq: "Requires exclusion of Fanconi/Diamond-Blackfan and PNH clone analysis." };
      }
    },
    {
      id: "plasmicScore",
      cat: "hem",
      type: "class",
      name: "PLASMIC Score (TTP Risk)",
      desc: "Predicts probability of severe ADAMTS13 deficiency.",
      organ: "Microvasculature", region: "Hematology", subject: "TMA",
      keywords: ["plasmic", "ttp", "adamts13", "tma", "hemolysis", "thrombotic", "thrombocytopenic", "purpura"],
      fields: [
        makeS("plt", "Platelets < 30k", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("hemolysis", "Hemolysis (Retic >2.5%, low haptoglobin, or high indir bili)", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("cancer", "No active cancer in past year", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("transplant", "No history of solid organ/stem cell transplant", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("mcv", "MCV < 90 fL", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("inr", "INR < 1.5", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("creat", "Creatinine < 2.0 mg/dL", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["Score", "TTP Risk", "Action"],
        rows: [
          { id: "low", cols: ["0-4", "Low", "Alternative TMA (HUS, DIC)"] },
          { id: "int", cols: ["5", "Intermediate", "Await ADAMTS13"] },
          { id: "high", cols: ["6-7", "High", "PLEX urgently"] }
        ]
      },
      calc: function (v) {
        var total = +v.plt + +v.hemolysis + +v.cancer + +v.transplant + +v.mcv + +v.inr + +v.creat;
        var match = total >= 6 ? "high" : total === 5 ? "int" : "low";
        return { value: "PLASMIC: " + total + "/7", matchId: match, eq: "French and Bentley scores offer alternative TTP probabilities." };
      }
    },
    {
      id: "hlh2004",
      cat: "hem",
      type: "class",
      name: "HLH-2004 Diagnostic Criteria",
      desc: "Standard criteria for Hemophagocytic Lymphohistiocytosis.",
      organ: "Macrophages", region: "Immunology", subject: "HLH",
      keywords: ["hlh", "hlh-2004", "hemophagocytic", "ferritin", "hscore", "lymphohistiocytosis", "macrophage"],
      fields: [
        makeS("fever", "Fever ≥ 38.5°C", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("sm", "Splenomegaly", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("cyto", "Cytopenias (≥2 lineages)", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("tg", "HyperTG OR Hypofibrinogenemia", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("hemo", "Hemophagocytosis in BM/spleen/LNs", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("ferr", "Ferritin ≥ 500 ng/mL", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("nk", "Low/absent NK cell activity", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("cd25", "Soluble CD25 ≥ 2400 U/mL", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["Criteria Met", "Diagnosis"],
        rows: [
          { id: "neg", cols: ["< 5", "Criteria Not Met"] },
          { id: "pos", cols: ["≥ 5", "HLH Confirmed"] }
        ]
      },
      calc: function (v) {
        var total = +v.fever + +v.sm + +v.cyto + +v.tg + +v.hemo + +v.ferr + +v.nk + +v.cd25;
        var match = total >= 5 ? "pos" : "neg";
        return { value: total + "/8 Criteria", matchId: match, eq: "The HScore is an alternative probability-based model for secondary HLH in adults." };
      }
    },
    {
      id: "hScoreHlh",
      cat: "hem",
      type: "calc",
      name: "HScore for Reactive HLH",
      desc: "Estimates probability of secondary Hemophagocytic Lymphohistiocytosis in adults.",
      organ: "Macrophages", region: "Immunology", subject: "HLH",
      keywords: ["hscore", "hlh", "hemophagocytic", "ferritin", "macrophage", "lymphohistiocytosis"],
      fields: [
        makeS("immuno", "Known underlying immunosuppression (HIV/organtxp)", "0", [["0", "No (0)"], ["18", "Yes (+18)"]]),
        makeS("temp", "Max Temperature (°C)", "0", [["0", "< 38.4 (0)"], ["33", "38.4 - 39.4 (+33)"], ["49", "> 39.4 (+49)"]]),
        makeS("organ", "Organomegaly", "0", [["0", "None (0)"], ["23", "Hepatomegaly OR Splenomegaly (+23)"], ["38", "Hepatomegaly AND Splenomegaly (+38)"]]),
        makeS("cyto", "Number of Cytopenias (Hb<=9.2, WBC<=5k, Plt<=110k)", "0", [["0", "1 lineage (0)"], ["24", "2 lineages (+24)"], ["34", "3 lineages (+34)"]]),
        makeS("ferritin", "Ferritin (ng/mL)", "0", [["0", "< 2000 (0)"], ["35", "2000 - 6000 (+35)"], ["50", "> 6000 (+50)"]]),
        makeS("trig", "Triglycerides (mg/dL)", "0", [["0", "< 133 (0)"], ["44", "133 - 354 (+44)"], ["64", "> 354 (+64)"]]),
        makeS("fib", "Fibrinogen (mg/dL)", "0", [["0", "> 250 (0)"], ["30", "< 250 (+30)"]]),
        makeS("ast", "SGOT / AST (U/L)", "0", [["0", "< 30 (0)"], ["19", "≥ 30 (+19)"]]),
        makeS("hemo", "Hemophagocytosis features on bone marrow aspirate", "0", [["0", "No (0)"], ["35", "Yes (+35)"]])
      ],
      calc: function(v) {
        var total = +v.immuno + +v.temp + +v.organ + +v.cyto + +v.ferritin + +v.trig + +v.fib + +v.ast + +v.hemo;
        var prob = "Low";
        if (total >= 250) prob = "> 99%";
        else if (total >= 169) prob = "~ 93%";
        else if (total >= 90) prob = "< 10%";
        else prob = "< 1%";
        return { value: "HScore: " + total + " Points", eq: "Probability of HLH: " + prob + ". Note: Cutoff of 169 provides optimal sensitivity/specificity." };
      }
    },

    // ==============================================================
    // 3. MPN & MDS (MYELOPROLIFERATIVE & MYELODYSPLASTIC)
    // ==============================================================
    {
      id: "dipssPmf",
      cat: "hem",
      type: "class",
      name: "DIPSS for Primary Myelofibrosis",
      desc: "Dynamic International Prognostic Scoring System for PMF.",
      organ: "Bone Marrow", region: "Oncology", subject: "MPN",
      keywords: ["dipss", "pmf", "myelofibrosis", "mpn", "ipss", "myeloproliferative", "neoplasm"],
      fields: [
        makeS("age", "Age > 65 years", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("wbc", "WBC > 25 × 10^9/L", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("hb", "Hemoglobin < 10 g/dL", "0", [["0", "No"], ["2", "Yes (+2)"]]),
        makeS("blasts", "Peripheral Blood Blasts ≥ 1%", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("sx", "Constitutional Symptoms", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["DIPSS Score", "Risk Group", "Median Survival"],
        rows: [
          { id: "low", cols: ["0", "Low Risk", "Not reached"] },
          { id: "int1", cols: ["1 - 2", "Intermediate-1", "14.2 years"] },
          { id: "int2", cols: ["3 - 4", "Intermediate-2", "4 years"] },
          { id: "high", cols: ["5 - 6", "High Risk", "1.5 years"] }
        ]
      },
      calc: function(v) {
        var total = +v.age + +v.wbc + +v.hb + +v.blasts + +v.sx;
        var match = total >= 5 ? "high" : total >= 3 ? "int2" : total >= 1 ? "int1" : "low";
        return { value: "DIPSS Score: " + total, matchId: match, eq: "MIPSS70 incorporates molecular data (CALR, ASXL1, etc.) for transplant-eligible patients." };
      }
    },
    {
      id: "ipssRMds",
      cat: "hem",
      type: "class",
      name: "IPSS-R for Myelodysplastic Syndromes",
      desc: "Revised International Prognostic Scoring System for MDS.",
      organ: "Bone Marrow", region: "Oncology", subject: "MDS",
      keywords: ["ipss-r", "mds", "myelodysplastic", "blasts", "karyotype", "syndrome", "ipss"],
      fields: [
        makeS("cyto", "Cytogenetic Risk Group", "1", [
          ["0", "Very Good (-Y, del(11q))"],
          ["1", "Good (Normal, del(5q), del(20q), double incl del(5q))"],
          ["2", "Intermediate (del(7q), +8, +19, i(17q), other clones)"],
          ["3", "Poor (der(3)q21/q26, -7, double incl -7/del(7q), complex 3 abnormalities)"],
          ["4", "Very Poor (>3 abnormalities)"]
        ]),
        makeS("blasts", "Bone Marrow Blasts (%)", "0", [
          ["0", "≤ 2%"], ["1", "> 2% to < 5%"], ["2", "5% to 10%"], ["3", "> 10%"]
        ]),
        makeS("hb", "Hemoglobin (g/dL)", "0", [
          ["0", "≥ 10"], ["1", "8 to < 10"], ["1.5", "< 8"]
        ]),
        makeS("plt", "Platelets (× 10^9/L)", "0", [
          ["0", "≥ 100"], ["0.5", "50 to < 100"], ["1", "< 50"]
        ]),
        makeS("anc", "Absolute Neutrophil Count (× 10^9/L)", "0", [
          ["0", "≥ 0.8"], ["0.5", "< 0.8"]
        ])
      ],
      table: {
        headers: ["IPSS-R Score", "Risk Group", "Median Survival"],
        rows: [
          { id: "vlow", cols: ["≤ 1.5", "Very Low", "8.8 years"] },
          { id: "low", cols: ["> 1.5 - 3", "Low", "5.3 years"] },
          { id: "int", cols: ["> 3 - 4.5", "Intermediate", "3.0 years"] },
          { id: "high", cols: ["> 4.5 - 6", "High", "1.6 years"] },
          { id: "vhigh", cols: ["> 6", "Very High", "0.8 years"] }
        ]
      },
      calc: function(v) {
        var total = +v.cyto + +v.blasts + +v.hb + +v.plt + +v.anc;
        var match = total > 6 ? "vhigh" : total > 4.5 ? "high" : total > 3 ? "int" : total > 1.5 ? "low" : "vlow";
        return { value: "IPSS-R Score: " + total.toFixed(1), matchId: match, eq: "IPSS-M should be used if NGS molecular data (e.g., TP53, SF3B1) is available." };
      }
    },

    // ==============================================================
    // 4. LEUKEMIA SCORING & PROGNOSTICS
    // ==============================================================
    {
      id: "sanzScore",
      cat: "hem",
      type: "class",
      name: "Sanz Score (APL Relapse Risk)",
      desc: "Relapse risk stratification for Acute Promyelocytic Leukemia.",
      organ: "Bone Marrow", region: "Oncology", subject: "AML",
      keywords: ["sanz", "apl", "aml", "pethema", "leukemia", "promyelocytic", "acute", "myeloid"],
      fields: [
        makeN("wbc", "WBC Count (× 10^9/L)", 5.0, { min: 0, max: 200, step: 0.1 }),
        makeN("plt", "Platelet Count (× 10^9/L)", 50.0, { min: 0, max: 500, step: 1 })
      ],
      table: {
        headers: ["Risk Group", "Criteria", "Management"],
        rows: [
          { id: "low", cols: ["Low Risk", "WBC ≤ 10 and Plt > 40", "Standard ATRA + ATO"] },
          { id: "int", cols: ["Intermediate Risk", "WBC ≤ 10 and Plt ≤ 40", "Standard ATRA + ATO (or low-dose chemo)"] },
          { id: "high", cols: ["High Risk", "WBC > 10", "ATRA + ATO + Anthracycline/Chemotherapy"] }
        ]
      },
      calc: function(v) {
        var w = +v.wbc, p = +v.plt;
        var match = w > 10 ? "high" : (p <= 40 ? "int" : "low");
        return { value: "Sanz Risk: " + match.toUpperCase(), matchId: match, eq: "Standard PETHEMA risk classification." };
      }
    },
    {
      id: "nciRome",
      cat: "hem",
      type: "class",
      name: "NCI/Rome Risk Criteria (Pediatric ALL)",
      desc: "Initial clinical risk stratification for pediatric B-cell ALL.",
      organ: "Bone Marrow", region: "Oncology", subject: "ALL",
      keywords: ["nci", "rome", "all", "leukemia", "pediatric", "lymphoblastic", "acute"],
      fields: [
        makeN("age", "Age at Diagnosis (years)", 5, { min: 0, max: 21, step: 0.1 }),
        makeN("wbc", "WBC Count (× 10^9/L)", 20, { min: 0, max: 500, step: 1 })
      ],
      table: {
        headers: ["Risk Group", "Criteria"],
        rows: [
          { id: "std", cols: ["Standard Risk", "Age 1 to <10 years AND WBC < 50,000/µL"] },
          { id: "high", cols: ["High Risk", "Age ≥ 10 years OR Age < 1 year OR WBC ≥ 50,000/µL"] }
        ]
      },
      calc: function(v) {
        var a = +v.age, w = +v.wbc;
        var isHigh = (a < 1 || a >= 10 || w >= 50);
        var match = isHigh ? "high" : "std";
        return { value: "NCI/Rome: " + (isHigh ? "High Risk" : "Standard Risk"), matchId: match, eq: "MRD, Ph+, and CNS status will further upstage risk (e.g., AIEOP-BFM, UKALL protocols)." };
      }
    },
    {
      id: "cllStaging",
      cat: "hem",
      type: "class",
      name: "CLL Staging (Rai & Binet)",
      desc: "Clinical staging systems for Chronic Lymphocytic Leukemia.",
      organ: "Lymph Nodes", region: "Oncology", subject: "CLL",
      keywords: ["rai", "binet", "cll", "leukemia", "lymphocytic", "chronic"],
      fields: [
        makeS("areas", "Involved Lymphoid Areas (0-5)", "1", [["0", "0 to 2 areas"], ["1", "3 to 5 areas"]]),
        makeN("hb", "Hemoglobin (g/dL)", 12, { min: 5, max: 20, step: 0.1 }),
        makeN("plt", "Platelets (× 10^9/L)", 150, { min: 10, max: 500, step: 1 })
      ],
      table: {
        headers: ["Staging System", "Stage", "Criteria / Survival Note"],
        rows: [
          { id: "low", cols: ["Rai 0 / Binet A", "Low Risk", "Hb ≥11, Plt ≥100, <3 areas. (Observe)"] },
          { id: "int", cols: ["Rai I-II / Binet B", "Intermediate", "Hb ≥11, Plt ≥100, ≥3 areas (Binet B)."] },
          { id: "high", cols: ["Rai III-IV / Binet C", "High Risk", "Hb <11 (Rai III) or Hb <10 (Binet C) or Plt <100."] }
        ]
      },
      calc: function(v) {
        var hb = +v.hb, plt = +v.plt, areas = v.areas === "1" ? 3 : 1;
        var rai = "0", binet = "A", match = "low";
        if (hb < 11 || plt < 100) {
            match = "high"; rai = plt < 100 ? "IV" : "III";
            binet = (hb < 10 || plt < 100) ? "C" : (areas >= 3 ? "B" : "A"); 
        } else if (areas >= 3) {
            match = "int"; rai = "I-II"; binet = "B";
        }
        return { value: "Rai Stage " + rai + " | Binet Stage " + binet, matchId: match, eq: "Binet C strictly requires Hb < 10 g/dL or Plt < 100k. Rai III strictly requires Hb < 11." };
      }
    },
    {
      id: "cllIpi",
      cat: "hem",
      type: "class",
      name: "CLL-IPI (Prognostic Index)",
      desc: "Integrates genetic and clinical factors for CLL survival/treatment prediction.",
      organ: "Blood / LN", region: "Oncology", subject: "CLL",
      keywords: ["cll-ipi", "cll", "tp53", "ighv", "b2m", "leukemia", "lymphocytic", "chronic"],
      fields: [
        makeS("tp53", "TP53 deleted or mutated?", "0", [["0", "No (0)"], ["4", "Yes (+4)"]]),
        makeS("ighv", "IGHV unmutated?", "0", [["0", "No/Mutated (0)"], ["2", "Yes/Unmutated (+2)"]]),
        makeS("b2m", "Beta-2 microglobulin > 3.5 mg/L?", "0", [["0", "No (0)"], ["2", "Yes (+2)"]]),
        makeS("stage", "Rai I-IV or Binet B-C?", "0", [["0", "No (0)"], ["1", "Yes (+1)"]]),
        makeS("age", "Age > 65 years?", "0", [["0", "No (0)"], ["1", "Yes (+1)"]])
      ],
      table: {
        headers: ["CLL-IPI Score", "Risk Group", "5-Year OS"],
        rows: [
          { id: "low", cols: ["0 - 1", "Low Risk", "93% (Do not treat)"] },
          { id: "int", cols: ["2 - 3", "Intermediate Risk", "79% (Do not treat unless symptomatic)"] },
          { id: "high", cols: ["4 - 6", "High Risk", "63% (Treatment often indicated)"] },
          { id: "vhigh", cols: ["7 - 10", "Very High Risk", "23% (Novel targeted agents or clinical trials)"] }
        ]
      },
      calc: function(v) {
        var total = +v.tp53 + +v.ighv + +v.b2m + +v.stage + +v.age;
        var match = total >= 7 ? "vhigh" : total >= 4 ? "high" : total >= 2 ? "int" : "low";
        return { value: "CLL-IPI Score: " + total + " / 10", matchId: match, eq: "IPS-E is an alternative score used specifically for early-stage asymptomatic CLL." };
      }
    },
    {
      id: "sokalScore",
      cat: "hem",
      type: "class",
      name: "Sokal Score for CML",
      desc: "Prognostic risk score for Chronic Myeloid Leukemia (CML) in chronic phase.",
      organ: "Bone Marrow", region: "Oncology", subject: "CML",
      keywords: ["sokal", "cml", "leukemia", "hasford", "eutos", "elts", "myeloid", "chronic"],
      fields: [
        makeN("age", "Age (years)", 50, { min: 18, max: 100, step: 1 }),
        makeN("spleen", "Spleen size (cm below costal margin)", 0, { min: 0, max: 30, step: 1 }),
        makeN("plt", "Platelets (× 10^9/L)", 350, { min: 50, max: 3000, step: 10 }),
        makeN("blasts", "Peripheral Blood Blasts (%)", 1, { min: 0, max: 100, step: 1 })
      ],
      table: {
        headers: ["Sokal Score", "Risk Group"],
        rows: [
          { id: "low", cols: ["< 0.8", "Low Risk"] },
          { id: "int", cols: ["0.8 - 1.2", "Intermediate Risk"] },
          { id: "high", cols: ["> 1.2", "High Risk"] }
        ]
      },
      calc: function(v) {
        var age = +v.age, spl = +v.spleen, plt = +v.plt, blasts = +v.blasts;
        var pRatio = plt / 700;
        var score = (0.0116 * (age - 43.4)) + (0.0345 * (spl - 7.51)) + (0.188 * ((pRatio * pRatio) - 0.563)) + (0.0887 * (blasts - 2.10));
        var index = Math.exp(score);
        var finalScore = index.toFixed(2);
        
        var match = index > 1.2 ? "high" : index >= 0.8 ? "int" : "low";
        return { value: "Sokal Index: " + finalScore, matchId: match, eq: "Hasford (Euro), EUTOS, and ELTS scores incorporate Eosinophils and Basophils for modern TKI-era prognosis." };
      }
    },

    // ==============================================================
    // 5. LYMPHOMA
    // ==============================================================
    {
      id: "ipsHodgkin",
      cat: "hem",
      type: "class",
      name: "Hasenclever IPS (Hodgkin Lymphoma)",
      desc: "International Prognostic Score for advanced classical Hodgkin Lymphoma.",
      organ: "Lymph Nodes", region: "Oncology", subject: "Lymphoma",
      keywords: ["ips", "hodgkin", "hasenclever", "lymphoma"],
      fields: [
        makeS("alb", "Albumin < 4 g/dL", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("hb", "Hemoglobin < 10.5 g/dL", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("male", "Male Sex", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("age", "Age ≥ 45 years", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("stage", "Stage IV disease", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("wbc", "WBC ≥ 15,000 /µL", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("lymph", "Lymphocytes < 600 /µL OR < 8% of WBC", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["IPS Score", "5-Year Progression-Free Survival"],
        rows: [
          { id: "s0", cols: ["0 Points", "~ 84%"] },
          { id: "s1", cols: ["1 Point", "~ 77%"] },
          { id: "s2", cols: ["2 Points", "~ 67%"] },
          { id: "s3", cols: ["3 Points", "~ 60%"] },
          { id: "s4", cols: ["4 Points", "~ 51%"] },
          { id: "s5", cols: ["≥ 5 Points", "~ 42%"] }
        ]
      },
      calc: function (v) {
        var total = +v.alb + +v.hb + +v.male + +v.age + +v.stage + +v.wbc + +v.lymph;
        var match = total >= 5 ? "s5" : "s" + total;
        return { value: "Hasenclever IPS: " + total + " / 7", matchId: match, eq: "PET-adapted strategies (Deauville scoring) often supersede baseline IPS during treatment." };
      }
    },
    {
      id: "ipiLymphoma",
      cat: "hem",
      type: "class",
      name: "IPI (International Prognostic Index) for DLBCL",
      desc: "Standard risk stratification for aggressive Non-Hodgkin Lymphoma.",
      organ: "Lymph Nodes", region: "Oncology", subject: "Lymphoma",
      keywords: ["ipi", "dlbcl", "lymphoma", "r-ipi", "nccn-ipi", "non-hodgkin"],
      fields: [
        makeS("age", "Age > 60 years", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("stage", "Ann Arbor Stage III/IV", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("ens", "Extranodal sites > 1", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("ps", "ECOG PS ≥ 2", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("ldh", "LDH > ULN", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["IPI Score", "Risk Group", "Notes"],
        rows: [
          { id: "i01", cols: ["0-1", "Low", "R-IPI and NCCN-IPI vary weights"] },
          { id: "i2", cols: ["2", "Low-Int", ""], },
          { id: "i3", cols: ["3", "High-Int", ""], },
          { id: "i45", cols: ["4-5", "High", "CNS-IPI tracks relapse risk"] }
        ]
      },
      calc: function (v) {
        var total = +v.age + +v.stage + +v.ens + +v.ps + +v.ldh;
        var match = total >= 4 ? "i45" : total === 3 ? "i3" : total === 2 ? "i2" : "i01";
        return { value: "IPI Score: " + total + "/5", matchId: match, eq: "Used primarily for DLBCL." };
      }
    },
    {
      id: "flipiLymphoma",
      cat: "hem",
      type: "class",
      name: "FLIPI (Follicular Lymphoma IPI)",
      desc: "Risk stratification for Follicular Lymphoma.",
      organ: "Lymph Nodes", region: "Oncology", subject: "Lymphoma",
      keywords: ["flipi", "follicular", "lymphoma", "gelf", "pod24"],
      fields: [
        makeS("age", "Age > 60 years", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("stage", "Ann Arbor Stage III or IV", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("hb", "Hemoglobin < 12 g/dL", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("nodes", "Number of nodal sites > 4", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("ldh", "LDH > Upper limit of normal", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["FLIPI Score", "Risk Group", "10-Year OS"],
        rows: [
          { id: "low", cols: ["0 - 1", "Low Risk", "71%"] },
          { id: "int", cols: ["2", "Intermediate Risk", "51%"] },
          { id: "high", cols: ["3 - 5", "High Risk", "36%"] }
        ]
      },
      calc: function (v) {
        var total = +v.age + +v.stage + +v.hb + +v.nodes + +v.ldh;
        var match = total >= 3 ? "high" : total === 2 ? "int" : "low";
        return { value: "FLIPI Score: " + total + " / 5", matchId: match, eq: "GELF criteria dictates treatment indication; FLIPI dictates prognosis. FLIPI-2 replaces 'number of nodes' with 'beta-2 microglobulin'." };
      }
    },

    // ==============================================================
    // 6. MULTIPLE MYELOMA
    // ==============================================================
    {
      id: "mayo2020",
      cat: "hem",
      type: "class",
      name: "Mayo 20/2/20 Model (Smoldering Myeloma)",
      desc: "Predicts risk of progression from Smoldering Multiple Myeloma to Active Myeloma.",
      organ: "Plasma Cells", region: "Oncology", subject: "Myeloma",
      keywords: ["mayo", "smm", "smoldering", "myeloma", "progression"],
      fields: [
        makeS("bmpc", "Bone Marrow Plasma Cells > 20%", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("mspike", "M-Protein Spike > 2 g/dL", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("flc", "Involved:Uninvolved FLC Ratio > 20", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["Score", "Risk of Progression (2-Year)", "Action"],
        rows: [
          { id: "low", cols: ["0 Points", "Low Risk (5%)", "Observe"] },
          { id: "int", cols: ["1 Point", "Intermediate Risk (17%)", "Close observation"] },
          { id: "high", cols: ["2 - 3 Points", "High Risk (46%)", "Consider clinical trials or early intervention"] }
        ]
      },
      calc: function(v) {
        var total = +v.bmpc + +v.mspike + +v.flc;
        var match = total >= 2 ? "high" : total === 1 ? "int" : "low";
        return { value: "Mayo 20/2/20 Score: " + total + " / 3", matchId: match, eq: "PETHEMA is an alternative risk model based on flow cytometry." };
      }
    },
    {
      id: "issMyeloma",
      cat: "hem",
      type: "class",
      name: "ISS & R-ISS for Multiple Myeloma",
      desc: "Revised International Staging System for Myeloma prognosis.",
      organ: "Plasma Cells", region: "Oncology", subject: "Myeloma",
      keywords: ["iss", "r-iss", "myeloma", "b2m", "albumin", "fish", "plasma", "cell", "multiple"],
      fields: [
        makeS("b2m", "Beta-2 Microglobulin (mg/L)", "mid", [["low", "< 3.5"], ["mid", "3.5 - 5.4"], ["high", "≥ 5.5"]]),
        makeS("alb", "Serum Albumin (g/dL)", "norm", [["norm", "≥ 3.5"], ["low", "< 3.5"]]),
        makeS("ldh", "Serum LDH", "norm", [["norm", "Normal"], ["high", "> ULN"]]),
        makeS("fish", "High-Risk FISH (del17p, t(4;14), t(14;16))", "no", [["no", "Absent"], ["yes", "Present"]])
      ],
      table: {
        headers: ["R-ISS Stage", "Criteria"],
        rows: [
          { id: "s1", cols: ["Stage I", "ISS I (B2M<3.5, Alb≥3.5) + Normal LDH + Standard FISH"] },
          { id: "s3", cols: ["Stage III", "ISS III (B2M≥5.5) + (High LDH OR High-Risk FISH)"] },
          { id: "s2", cols: ["Stage II", "Not Stage I or III"] }
        ]
      },
      calc: function (v) {
        var isIss1 = (v.b2m === "low" && v.alb === "norm");
        var isIss3 = (v.b2m === "high");
        var match = "s2";
        if (isIss1 && v.ldh === "norm" && v.fish === "no") match = "s1";
        else if (isIss3 && (v.ldh === "high" || v.fish === "yes")) match = "s3";
        return { value: "R-ISS " + (match==="s1"?"Stage I":match==="s3"?"Stage III":"Stage II"), matchId: match, eq: "The newer R2-ISS incorporates 1q+ abnormalities. Durie-Salmon is the historical staging method." };
      }
    },
    {
      id: "slimCrab",
      cat: "hem",
      type: "class",
      name: "SLiM-CRAB Criteria (Active Myeloma)",
      desc: "Differentiates Active Multiple Myeloma from Smoldering Myeloma.",
      organ: "Plasma Cells", region: "Hematology", subject: "Myeloma",
      keywords: ["slim-crab", "myeloma", "imwg", "crab", "plasma", "cell", "multiple"],
      fields: [
        makeS("calc", "C - Calcium > 11 mg/dL", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("renal", "R - Renal (CrCl < 40 or Cr > 2)", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("ane", "A - Anemia (Hb < 10)", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("bone", "B - Bone Lesions (≥1 osteolytic)", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("bm", "S - BM Plasma Cells ≥ 60%", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("flc", "Li - Inv/Uninv FLC Ratio ≥ 100", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("mri", "M - MRI > 1 focal lesion", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["Status", "Diagnosis"],
        rows: [
          { id: "smm", cols: ["0 Criteria", "Smoldering Myeloma (SMM) if clonal PC ≥10%"] },
          { id: "mm", cols: ["≥ 1 Criterion", "Active Multiple Myeloma"] }
        ]
      },
      calc: function (v) {
        var total = +v.calc + +v.renal + +v.ane + +v.bone + +v.bm + +v.flc + +v.mri;
        var match = total >= 1 ? "mm" : "smm";
        return { value: total + " Defining Events", matchId: match, eq: "If 0 criteria, refer to Mayo 20/2/20 model to stratify smoldering myeloma risk." };
      }
    },

    // ==============================================================
    // 7. COAGULATION, THROMBOSIS & BLEEDING
    // ==============================================================
    {
      id: "hemoVwdStaging",
      cat: "hem",
      type: "class",
      name: "Hemophilia & VWD Classifications Router",
      desc: "Severity definitions for Hemophilia A/B and Von Willebrand Disease types.",
      organ: "Plasma", region: "Coagulation", subject: "Bleeding",
      keywords: ["hemophilia", "vwd", "fviii", "fix", "vwf", "bleeding", "von", "willebrand"],
      fields: [
        makeS("disease", "Disorder Category", "hemo", [
          ["hemo", "Hemophilia A and B (Severity)"],
          ["vwd", "Von Willebrand Disease (ISTH Types)"]
        ])
      ],
      table: {
        headers: ["Classification", "Clinical Definition / Lab Finding"],
        rows: [
          { id: "hemo", cols: ["Severe: < 1%", "Spontaneous joint/muscle bleeds. Mod: 1-5% (Bleeds with minor trauma). Mild: >5 to 40% (Bleeds with major trauma/surgery)."] },
          { id: "vwd", cols: ["Type 1 vs 2 vs 3", "Type 1: Partial quantitative def. Type 2: Qualitative variants (2A, 2B, 2M, 2N). Type 3: Virtually absent VWF."] }
        ]
      },
      calc: function(v) {
        return { value: v.disease === "hemo" ? "Hemophilia Severity" : "VWD Types", matchId: v.disease, eq: "Use the ISTH Bleeding Assessment Tool (ISTH-BAT) to quantify bleeding phenotype." };
      }
    },
    {
      id: "4tScore",
      cat: "hem",
      type: "class",
      name: "4Ts Score for HIT",
      desc: "Pretest probability of Heparin-Induced Thrombocytopenia.",
      organ: "Platelets", region: "Coagulation", subject: "Thrombosis",
      keywords: ["4t", "hit", "heparin", "thrombocytopenia", "hep", "induced"],
      fields: [
        makeS("t1", "Thrombocytopenia", "0", [["2", "> 50% fall or nadir ≥ 20k"], ["1", "30-50% fall or nadir 10-19k"], ["0", "< 30% fall or nadir < 10k"]]),
        makeS("t2", "Timing of platelet fall", "0", [["2", "Days 5-10 or ≤1 day (prior exp)"], ["1", "> day 10 or unclear"], ["0", "≤ 4 days (no exposure)"]]),
        makeS("t3", "Thrombosis or sequelae", "0", [["2", "New thrombosis/necrosis"], ["1", "Progressive/suspected"], ["0", "None"]]),
        makeS("t4", "oTher causes of thrombocytopenia", "0", [["2", "None apparent"], ["1", "Possible"], ["0", "Definite"]])
      ],
      table: {
        headers: ["Score", "HIT Probability", "Action"],
        rows: [
          { id: "low", cols: ["0-3", "Low (≤5%)", "Continue heparin"] },
          { id: "int", cols: ["4-5", "Int (~14%)", "Stop heparin, start DTI, order PF4"] },
          { id: "high", cols: ["6-8", "High (~64%)", "Stop heparin, start DTI, order PF4 & SRA"] }
        ]
      },
      calc: function (v) {
        var total = +v.t1 + +v.t2 + +v.t3 + +v.t4;
        var match = total >= 6 ? "high" : total >= 4 ? "int" : "low";
        return { value: "4Ts Score: " + total + "/8", matchId: match, eq: "The HEP score is an alternative HIT scoring system." };
      }
    },
    {
      id: "isthDic",
      cat: "hem",
      type: "class",
      name: "ISTH DIC Score",
      desc: "Standardized scoring for Disseminated Intravascular Coagulation.",
      organ: "Coagulation Cascade", region: "Hematology / ICU", subject: "DIC",
      keywords: ["isth", "dic", "coagulation", "sic", "jaam", "disseminated", "intravascular"],
      fields: [
        makeS("plt", "Platelets (/µL)", "0", [["0", "> 100k"], ["1", "50k - 100k"], ["2", "< 50k"]]),
        makeS("ddimer", "D-Dimer / FDPs", "0", [["0", "No increase"], ["2", "Moderate increase"], ["3", "Strong increase"]]),
        makeS("pt", "Prolonged PT", "0", [["0", "< 3 sec"], ["1", "3 - 6 sec"], ["2", "> 6 sec"]]),
        makeS("fib", "Fibrinogen", "0", [["0", "> 100 mg/dL"], ["1", "< 100 mg/dL"]])
      ],
      table: {
        headers: ["Score", "Status", "Action"],
        rows: [
          { id: "no", cols: ["< 5", "Non-overt DIC", "Repeat daily"] },
          { id: "yes", cols: ["≥ 5", "Overt DIC", "Treat cause; replace factors if bleeding"] }
        ]
      },
      calc: function (v) {
        var total = +v.plt + +v.ddimer + +v.pt + +v.fib;
        var match = total >= 5 ? "yes" : "no";
        return { value: "ISTH DIC Score: " + total, matchId: match, eq: "The JAAM DIC score and SIC score are alternatives for sepsis-induced coagulopathy." };
      }
    },
    {
      id: "wellsDvt",
      cat: "hem",
      type: "class",
      name: "Wells Score for DVT",
      desc: "Clinical prediction rule for deep vein thrombosis.",
      organ: "Venous System", region: "Coagulation", subject: "Thrombosis",
      keywords: ["wells", "dvt", "thrombosis", "vte", "deep", "vein"],
      fields: [
        makeS("cancer", "Active cancer (treatment within 6 mo)", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("immob", "Paralysis, paresis, or recent plaster immobilization", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("bed", "Recently bedridden >3d or major surgery <12w", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("tend", "Localized tenderness along deep venous system", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("swell", "Entire leg swollen", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("calf", "Calf swelling >3cm compared to asymptomatic leg", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("edema", "Pitting edema confined to symptomatic leg", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("veins", "Collateral superficial veins (non-varicose)", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("prev", "Previously documented DVT", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("alt", "Alternative diagnosis at least as likely as DVT", "0", [["0", "No"], ["-2", "Yes (-2)"]])
      ],
      table: {
        headers: ["Wells Score", "Probability", "Action (Two-level model)"],
        rows: [
          { id: "unlikely", cols: ["< 2", "DVT Unlikely", "D-dimer testing to rule out DVT"] },
          { id: "likely", cols: ["≥ 2", "DVT Likely", "Compression ultrasonography"] }
        ]
      },
      calc: function(v) {
        var total = +v.cancer + +v.immob + +v.bed + +v.tend + +v.swell + +v.calf + +v.edema + +v.veins + +v.prev + +v.alt;
        var match = total >= 2 ? "likely" : "unlikely";
        return { value: "Wells DVT Score: " + total, matchId: match, eq: "Two-level classification is clinically preferred." };
      }
    },
    {
      id: "wellsPe",
      cat: "hem",
      type: "class",
      name: "Wells Score for PE",
      desc: "Clinical prediction rule for pulmonary embolism.",
      organ: "Pulmonary", region: "Coagulation", subject: "Thrombosis",
      keywords: ["wells", "pe", "pulmonary embolism", "vte", "pulmonary", "embolism"],
      fields: [
        makeS("dvt", "Clinical symptoms of DVT", "0", [["0", "No"], ["3", "Yes (+3)"]]),
        makeS("alt", "Other diagnoses less likely than PE", "0", [["0", "No"], ["3", "Yes (+3)"]]),
        makeS("hr", "Heart rate > 100", "0", [["0", "No"], ["1.5", "Yes (+1.5)"]]),
        makeS("immob", "Immobilization (≥3d) or Surgery (past 4wk)", "0", [["0", "No"], ["1.5", "Yes (+1.5)"]]),
        makeS("prev", "Previous DVT/PE", "0", [["0", "No"], ["1.5", "Yes (+1.5)"]]),
        makeS("hemo", "Hemoptysis", "0", [["0", "No"], ["1", "Yes (+1)"]]),
        makeS("cancer", "Malignancy (active or treated in past 6mo)", "0", [["0", "No"], ["1", "Yes (+1)"]])
      ],
      table: {
        headers: ["Wells Score", "Probability", "Action (Two-level model)"],
        rows: [
          { id: "unlikely", cols: ["≤ 4.0", "PE Unlikely", "Consider PERC rule or D-Dimer"] },
          { id: "likely", cols: ["> 4.0", "PE Likely", "CTPA indicated"] }
        ]
      },
      calc: function(v) {
        var total = +v.dvt + +v.alt + +v.hr + +v.immob + +v.prev + +v.hemo + +v.cancer;
        var match = total > 4 ? "likely" : "unlikely";
        return { value: "Wells PE Score: " + total, matchId: match, eq: "Using the simplified dichotomous model." };
      }
    },
    {
      id: "percRule",
      cat: "hem",
      type: "class",
      name: "PERC Rule for PE",
      desc: "Pulmonary Embolism Rule-out Criteria for very low-risk patients.",
      organ: "Pulmonary", region: "Coagulation", subject: "Thrombosis",
      keywords: ["perc", "pe", "pulmonary embolism", "rule-out", "pulmonary", "embolism"],
      fields: [
        makeS("age", "Age ≥ 50 years", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("hr", "Heart rate ≥ 100 bpm", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("sao2", "O2 saturation on room air < 95%", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("dvt", "Prior history of DVT or PE", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("trauma", "Recent trauma or surgery (past 4 weeks)", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("hemo", "Hemoptysis", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("estrogen", "Exogenous estrogen use", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("leg", "Unilateral leg swelling", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["PERC Rule Result", "Interpretation", "Action"],
        rows: [
          { id: "neg", cols: ["0 Positive Criteria", "PE Ruled Out", "No further testing required (if pre-test prob <15%)"] },
          { id: "pos", cols: ["≥ 1 Positive Criteria", "Cannot Rule Out PE", "Proceed to D-dimer testing or imaging"] }
        ]
      },
      calc: function(v) {
        var total = +v.age + +v.hr + +v.sao2 + +v.dvt + +v.trauma + +v.hemo + +v.estrogen + +v.leg;
        var match = total > 0 ? "pos" : "neg";
        return { value: total + " Criteria Positive", matchId: match, eq: "Only applicable if clinician implicitly assesses PE probability as low." };
      }
    },
    {
      id: "spesiScore",
      cat: "hem",
      type: "class",
      name: "sPESI Score (Simplified PESI)",
      desc: "Pulmonary Embolism Severity Index to predict 30-day mortality.",
      organ: "Pulmonary", region: "Cardiovascular", subject: "Thrombosis",
      keywords: ["spesi", "pesi", "pe", "pulmonary embolism", "mortality", "pulmonary", "embolism"],
      fields: [
        makeS("age", "Age > 80 years", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("cancer", "History of Cancer", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("hf", "Chronic cardiopulmonary disease", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("hr", "Heart rate ≥ 110 bpm", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("sbp", "Systolic BP < 100 mmHg", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("sao2", "O2 Saturation < 90%", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["sPESI Score", "Risk Group", "30-Day Mortality"],
        rows: [
          { id: "low", cols: ["0 Points", "Low Risk", "~ 1.0% (Consider outpatient management)"] },
          { id: "high", cols: ["≥ 1 Points", "High Risk", "~ 10.9% (Requires admission/monitoring)"] }
        ]
      },
      calc: function(v) {
        var total = +v.age + +v.cancer + +v.hf + +v.hr + +v.sbp + +v.sao2;
        var match = total >= 1 ? "high" : "low";
        return { value: "sPESI: " + total + " Points", matchId: match, eq: "An alternative to the original complex PESI tool." };
      }
    },
    {
      id: "paduaScore",
      cat: "hem",
      type: "class",
      name: "Padua Prediction Score",
      desc: "Assesses VTE risk in hospitalized medical patients to guide prophylaxis.",
      organ: "Vasculature", region: "Coagulation", subject: "Thrombosis",
      keywords: ["padua", "vte", "prophylaxis", "hospitalized", "medical"],
      fields: [
        makeS("cancer", "Active cancer", "0", [["0", "No (0)"], ["3", "Yes (+3)"]]),
        makeS("prev", "Previous VTE", "0", [["0", "No (0)"], ["3", "Yes (+3)"]]),
        makeS("mobility", "Reduced mobility (bedrest ≥3 days)", "0", [["0", "No (0)"], ["3", "Yes (+3)"]]),
        makeS("thromb", "Known thrombophilic condition", "0", [["0", "No (0)"], ["3", "Yes (+3)"]]),
        makeS("trauma", "Recent (≤1 mo) trauma or surgery", "0", [["0", "No (0)"], ["2", "Yes (+2)"]]),
        makeS("elderly", "Elderly (≥ 70 years)", "0", [["0", "No (0)"], ["1", "Yes (+1)"]]),
        makeS("hf", "Heart and/or respiratory failure", "0", [["0", "No (0)"], ["1", "Yes (+1)"]]),
        makeS("ami", "Acute MI or ischemic stroke", "0", [["0", "No (0)"], ["1", "Yes (+1)"]]),
        makeS("inf", "Acute infection or rheumatologic disorder", "0", [["0", "No (0)"], ["1", "Yes (+1)"]]),
        makeS("obese", "Obesity (BMI ≥ 30)", "0", [["0", "No (0)"], ["1", "Yes (+1)"]]),
        makeS("horm", "Ongoing hormonal treatment", "0", [["0", "No (0)"], ["1", "Yes (+1)"]])
      ],
      table: {
        headers: ["Padua Score", "VTE Risk", "Action"],
        rows: [
          { id: "low", cols: ["0 - 3", "Low Risk (0.3%)", "Mechanical prophylaxis only (if any)"] },
          { id: "high", cols: ["≥ 4", "High Risk (11%)", "Pharmacologic thromboprophylaxis recommended"] }
        ]
      },
      calc: function(v) {
        var total = +v.cancer + +v.prev + +v.mobility + +v.thromb + +v.trauma + +v.elderly + +v.hf + +v.ami + +v.inf + +v.obese + +v.horm;
        var match = total >= 4 ? "high" : "low";
        return { value: "Padua Score: " + total + " / 20", matchId: match, eq: "The Caprini score is preferred for Surgical VTE risk prediction." };
      }
    },
    {
      id: "khoranaScore",
      cat: "hem",
      type: "class",
      name: "Khorana Score (Cancer-Associated Thrombosis)",
      desc: "Predicts VTE risk in ambulatory patients initiating chemotherapy.",
      organ: "Vasculature", region: "Oncology", subject: "Thrombosis",
      keywords: ["khorana", "vte", "thrombosis", "cancer", "chemotherapy"],
      fields: [
        makeS("cancer", "Cancer Type", "0", [["0", "Breast, colorectal, prostate, other"], ["1", "Lung, lymphoma, gynecologic, bladder, testicular"], ["2", "Stomach or pancreas"]]),
        makeS("plt", "Pre-chemo Plt ≥ 350k", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("wbc", "Pre-chemo WBC > 11k", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("hgb", "Hb < 10 or ESA use", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("bmi", "BMI ≥ 35", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["Score", "VTE Risk", "Recommendation"],
        rows: [
          { id: "low", cols: ["0", "Low (0.8-3%)", "Observation"] },
          { id: "int", cols: ["1-2", "Intermediate (~2%)", "Prophylaxis considered (Score 2)"] },
          { id: "high", cols: ["≥3", "High (~7.1%)", "Thromboprophylaxis recommended"] }
        ]
      },
      calc: function (v) {
        var total = +v.cancer + +v.plt + +v.wbc + +v.hgb + +v.bmi;
        var match = total >= 3 ? "high" : total >= 1 ? "int" : "low";
        return { value: "Khorana Score: " + total + "/6", matchId: match, eq: "Caprini (Surgical) and Padua (Medical) are used for inpatient VTE risk." };
      }
    },
    {
      id: "hasBled",
      cat: "hem",
      type: "class",
      name: "HAS-BLED Bleeding Risk",
      desc: "Estimates 1-year major bleeding risk for AF patients on anticoagulation.",
      organ: "Systemic", region: "Cardiovascular", subject: "Bleeding",
      keywords: ["has-bled", "bleeding", "atrial fibrillation", "afib", "anticoagulation"],
      fields: [
        makeS("h", "Hypertension (>160 systolic)", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("a", "Abnormal Renal/Liver Function", "0", [["0", "None"], ["1", "One"], ["2", "Both"]]),
        makeS("s", "Stroke history", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("b", "Bleeding history", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("l", "Labile INRs (if on Warfarin)", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("e", "Elderly (>65)", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("d", "Drugs (NSAIDs)/Alcohol", "0", [["0", "None"], ["1", "One"], ["2", "Both"]])
      ],
      table: {
        headers: ["Score", "Risk", "Action"],
        rows: [
          { id: "low", cols: ["0-1", "Low", "Routine monitor"] },
          { id: "int", cols: ["2", "Mod", "Monitor"] },
          { id: "high", cols: ["≥3", "High", "Correct reversible risks"] }
        ]
      },
      calc: function (v) {
        var total = +v.h + +v.a + +v.s + +v.b + +v.l + +v.e + +v.d;
        var match = total >= 3 ? "high" : total === 2 ? "int" : "low";
        return { value: "HAS-BLED: " + total + "/9", matchId: match, eq: "Weigh against CHA2DS2-VASc stroke risk." };
      }
    },

    // ==============================================================
    // 8. TRANSFUSION MEDICINE
    // ==============================================================
    {
      id: "cciCalc",
      cat: "hem",
      type: "calc",
      name: "Corrected Count Increment (CCI)",
      desc: "Determines platelet transfusion refractoriness by adjusting for body surface area and dose.",
      organ: "Platelets", region: "Transfusion", subject: "Refractoriness",
      keywords: ["cci", "platelet", "transfusion", "refractory", "ppr"],
      fields: [
        makeN("pre", "Pre-transfusion Platelets (/µL)", 10000, { min: 0, max: 100000, step: 1000 }),
        makeN("post", "Post-transfusion Platelets (10-60m, /µL)", 30000, { min: 0, max: 200000, step: 1000 }),
        makeN("bsa", "Body Surface Area (m²)", 1.8, { min: 0.5, max: 3.5, step: 0.05 }),
        makeN("yield", "Number of Platelets Transfused (x 10^11)", 3.0, { min: 1, max: 10, step: 0.5 })
      ],
      calc: function (v) {
        var diff = +v.post - +v.pre;
        var cci = (diff * +v.bsa) / +v.yield;
        return { 
          value: "CCI: " + Math.round(cci), 
          eq: cci >= 7500 ? "Adequate response (> 7,500 at 1 hr)." : "Suboptimal response (< 7,500). If repeated, suspect HLA/HPA alloimmunization." 
        };
      }
    },
    {
      id: "mablCalc",
      cat: "hem",
      type: "calc",
      name: "Maximum Allowable Blood Loss (MABL)",
      desc: "Calculates total blood volume and acceptable surgical blood loss before transfusion.",
      organ: "Blood Volume", region: "Transfusion", subject: "Hemorrhage",
      keywords: ["mabl", "tbv", "ebv", "blood loss", "transfusion"],
      fields: [
        makeS("ptType", "Patient Type (for EBV factor)", "adult_m", [
          ["adult_m", "Adult Male (~70 mL/kg)"],
          ["adult_f", "Adult Female (~65 mL/kg)"],
          ["infant", "Infant (~80 mL/kg)"],
          ["neonate", "Neonate (~85 mL/kg)"]
        ]),
        makeN("weight", "Body Weight (kg)", 70, { min: 2, max: 200, step: 1 }),
        makeN("initHct", "Initial Hematocrit (%)", 40, { min: 15, max: 65, step: 1 }),
        makeN("targHct", "Lowest Acceptable Hematocrit (%)", 30, { min: 15, max: 40, step: 1 })
      ],
      calc: function (v) {
        var factors = { "adult_m": 70, "adult_f": 65, "infant": 80, "neonate": 85 };
        var ebv = +v.weight * factors[v.ptType];
        var i = +v.initHct, t = +v.targHct;
        if (t >= i) return { value: "MABL: 0 mL", eq: "Target Hct must be lower than Initial Hct." };
        var mabl = ebv * (i - t) / i;
        return { 
          value: "EBV: " + Math.round(ebv) + " mL | MABL: " + Math.round(mabl) + " mL", 
          eq: "Based on standard estimated blood volume (EBV) constants." 
        };
      }
    },
    {
      id: "abcScore",
      cat: "hem",
      type: "class",
      name: "ABC Score (Massive Transfusion Protocol)",
      desc: "Assessment of Blood Consumption predicts need for massive transfusion in trauma.",
      organ: "Blood Volume", region: "Transfusion / ER", subject: "Hemorrhage",
      keywords: ["abc", "mtp", "transfusion", "tash"],
      fields: [
        makeS("hr", "Heart Rate > 120 bpm", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("sbp", "Systolic BP ≤ 90 mmHg", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("fast", "Positive FAST ultrasound", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("mech", "Penetrating mechanism of injury", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["Score", "MTP Probability", "Action"],
        rows: [
          { id: "low", cols: ["0-1", "Low", "Routine crossmatch"] },
          { id: "high", cols: ["≥2", "High", "Activate MTP (1:1:1 ratio)"] }
        ]
      },
      calc: function (v) {
        var total = +v.hr + +v.sbp + +v.fast + +v.mech;
        var match = total >= 2 ? "high" : "low";
        return { value: "ABC Score: " + total + "/4", matchId: match, eq: "The TASH score is an alternative complex model." };
      }
    },

    // ==============================================================
    // 9. ONCOLOGY EMERGENCIES
    // ==============================================================
    {
      id: "masccScore",
      cat: "hem",
      type: "class",
      name: "MASCC Score (Febrile Neutropenia)",
      desc: "Identifies low-risk febrile neutropenia patients.",
      organ: "Systemic", region: "Oncology", subject: "Neutropenia",
      keywords: ["mascc", "febrile neutropenia", "cisne"],
      fields: [
        makeS("burden", "Burden of Illness", "5", [["5", "No/mild symptoms"], ["3", "Moderate"], ["0", "Severe"]]),
        makeS("hypo", "No hypotension", "0", [["5", "Yes"], ["0", "No"]]),
        makeS("copd", "No active COPD", "0", [["4", "Yes"], ["0", "No"]]),
        makeS("solid", "Solid tumor / Hem with no fungal hx", "0", [["4", "Yes"], ["0", "No"]]),
        makeS("outpt", "Outpatient status at fever onset", "0", [["3", "Yes"], ["0", "No"]]),
        makeS("dehydr", "No dehydration requiring IV fluids", "0", [["3", "Yes"], ["0", "No"]]),
        makeS("age", "Age < 60 years", "0", [["2", "Yes"], ["0", "No"]])
      ],
      table: {
        headers: ["Score", "Risk Level", "Disposition"],
        rows: [
          { id: "high", cols: ["< 21", "High Risk", "Inpatient IV antibiotics"] },
          { id: "low", cols: ["≥ 21", "Low Risk", "Consider outpatient oral antibiotics"] }
        ]
      },
      calc: function (v) {
        var total = +v.burden + +v.hypo + +v.copd + +v.solid + +v.outpt + +v.dehydr + +v.age;
        var match = total >= 21 ? "low" : "high";
        return { value: "MASCC Score: " + total + "/26", matchId: match, eq: "The CISNE score and Talcott classification are alternative models." };
      }
    }
  ];

  // ==============================================================
  // REGISTRATION INTO GLOBAL MEMORY
  // ==============================================================
  try {
    if (!Array.isArray(window.categories)) window.categories = [];
    if (!Array.isArray(window.tools)) window.tools = [];

    var catExists = false;
    for (var i = 0; i < window.categories.length; i++) {
      if (window.categories[i] && window.categories[i].id === hemCategory.id) {
        catExists = true; break;
      }
    }
    if (!catExists) window.categories.push(hemCategory);

    hemTools.forEach(function (tool) {
      var existingIdx = -1;
      for (var j = 0; j < window.tools.length; j++) {
        if (window.tools[j] && window.tools[j].id === tool.id) {
          existingIdx = j; break;
        }
      }
      if (existingIdx >= 0) window.tools[existingIdx] = tool;
      else window.tools.push(tool);
    });

    if (typeof window.SYNONYM_MAP === "object" && window.SYNONYM_MAP !== null) {
      window.SYNONYM_MAP["hem"] = ["hematology", "oncology", "blood", "leukemia", "lymphoma", "anemia", "transfusion", "myeloma", "coagulation", "thrombosis", "vte", "bleeding"];
      window.SYNONYM_MAP["anemia"] = ["mentzer", "mcv", "ganzoni", "camitta", "aplastic", "iron", "rpi", "who", "thalassemia", "pnh", "indices", "srivastava", "ehsani", "england"];
      window.SYNONYM_MAP["leukemia"] = ["aml", "all", "cml", "cll", "sanz", "nci", "rome", "rai", "binet", "sokal", "cll-ipi", "eln", "fab", "icc", "who"];
      window.SYNONYM_MAP["lymphoma"] = ["ipi", "dlbcl", "flipi", "follicular", "hodgkin", "ips", "hasenclever"];
      window.SYNONYM_MAP["myeloma"] = ["iss", "slim-crab", "smm", "mayo", "mgus"];
      window.SYNONYM_MAP["coagulation"] = ["plasmic", "ttp", "4ts", "hit", "isth", "dic", "khorana", "has-bled", "wells", "perc", "padua", "spesi"];
      window.SYNONYM_MAP["mpn"] = ["dipss", "pmf", "myelofibrosis", "ipss", "mds"];
      window.SYNONYM_MAP["transfusion"] = ["cci", "mabl", "abc", "mtp"];
    }

    if (typeof window.renderHome === "function") window.renderHome();
  } catch (err) {
    console.error("Error registering Hematology tools:", err);
  }
})();
