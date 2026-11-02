/**
 * MedCalc Module: Ophthalmology (OPHTHA) - Comprehensive Edition
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

  var ophthaCategory = {
    id: "ophtha",
    name: "Ophthalmology",
    icon: "👁️",
    desc: "Comprehensive suite: IOL power, refractive safety, glaucoma, strabismus, retina, oculoplastics, and pharmacology",
    organs: ["eye", "cornea", "retina", "optic nerve", "lens", "orbit"],
    region: "head and neck"
  };

  var ophthaTools = [
    // ==============================================================
    // 1. ANTERIOR SEGMENT, CATARACT & IOL POWER
    // ==============================================================
    {
      id: "srktIol",
      cat: "ophtha",
      type: "calc",
      name: "SRK/T IOL Power Formula",
      desc: "Classic thin-lens formula based on theoretical optics and empirical regression.",
      organ: "Lens", region: "Anterior Segment", subject: "Cataract",
      keywords: ["iol", "srk", "srk/t", "cataract"],
      guidance: "Robust for average and long axial lengths.",
      literature: [{
        type: "Seminal Publication", icon: "📄", title: "The SRK/T formula", citation: "Retzlaff JA, et al. J Cataract Refract Surg. 1990;16(3):333-340.",
        links: [{ text: "View on PubMed ↗", url: "https://pubmed.ncbi.nlm.nih.gov/2355321/" }]
      }],
      fields: [
        makeN("a_const", "A-Constant", 118.0, { min: 110.0, max: 125.0, step: 0.1 }),
        makeN("al", "Axial Length (mm)", 24.0, { min: 15.0, max: 35.0, step: 0.1 }),
        makeN("k", "Average K (D)", 43.5, { min: 30.0, max: 60.0, step: 0.1 })
      ],
      calc: function (v) {
        var a = +v.a_const, al = +v.al, k = +v.k;
        var power = a - (2.5 * al) - (0.9 * k); // Simplified approximation for UI demonstration
        return { value: "Estimated IOL Power: ~" + power.toFixed(2) + " D", eq: "Note: True SRK/T requires complex retinal thickness and corneal refractive index constants. Use formal biometry for surgery." };
      }
    },
    {
      id: "aiIolRouter",
      cat: "ophtha",
      type: "class",
      name: "Modern Universal & AI IOL Portal Router",
      desc: "Clinical decision support for selecting advanced IOL formulas (Barrett, Kane, Hill-RBF, Olsen, Castrop, PEARL-DGS, Nättäs).",
      organ: "Lens", region: "Anterior Segment", subject: "Biometry",
      keywords: ["barrett", "kane", "hill-rbf", "olsen", "castrop", "pearl-dgs", "haigis", "hoffer"],
      guidance: "Proprietary AI and ray-tracing models require dedicated external portals.",
      literature: [{
        type: "Database", icon: "📘", title: "IOLCon & APACRS", citation: "Global database for optimized constants.",
        links: [{ text: "ASCRS Calculator ↗", url: "https://iolcalc.ascrs.org/" }, { text: "APACRS Portal ↗", url: "https://www.apacrs.org/" }]
      }],
      fields: [
        makeS("al_range", "Patient Axial Length", "avg", [
          ["short", "Short (< 22.0 mm)"], ["avg", "Average (22.0 - 24.5 mm)"], ["long", "Long (> 24.5 mm)"]
        ])
      ],
      table: {
        headers: ["Condition", "Recommended Formulas", "Historical Fallback"],
        rows: [
          { id: "short", cols: ["AL < 22.0 mm", "Kane, Hill-RBF, Barrett Universal II", "Hoffer Q"] },
          { id: "avg", cols: ["AL 22.0 - 24.5 mm", "All modern formulas perform well", "Holladay 1, SRK/T"] },
          { id: "long", cols: ["AL > 24.5 mm", "Kane, Barrett Universal II, Castrop", "SRK/T, Haigis"] }
        ]
      },
      calc: function (v) {
        var match = v.al_range;
        return { value: "AI Formula Recommendation", matchId: match, eq: "For best results, use Kane or Barrett Universal II via APACRS or ASCRS web portals." };
      }
    },
    {
      id: "toricIolRouter",
      cat: "ophtha",
      type: "class",
      name: "Toric & Post-Refractive IOL Router",
      desc: "Guides selection of astigmatism and post-LASIK/PRK/RK formulas.",
      organ: "Cornea / Lens", region: "Anterior Segment", subject: "Toric & Post-Refractive",
      keywords: ["toric", "abulafia-koch", "barrett true-k", "haigis-l", "masket", "shammas", "piggyback"],
      guidance: "Directs to specialized vector and historical regression algorithms.",
      literature: [{
        type: "Guideline", icon: "📘", title: "Post-Refractive IOL Planning", citation: "ASCRS Standard.",
        links: [{ text: "ASCRS Post-Refractive ↗", url: "https://iolcalc.ascrs.org/" }]
      }],
      fields: [
        makeS("scenario", "Clinical Scenario", "toric", [
          ["toric", "Standard Toric IOL Planning"],
          ["surprise", "Post-Op Refractive Surprise / Toric Rotation"],
          ["myopic", "Prior Myopic LASIK/PRK"],
          ["hyperopic", "Prior Hyperopic LASIK/PRK"],
          ["rk", "Prior Radial Keratotomy (RK)"]
        ])
      ],
      table: {
        headers: ["Scenario", "Primary Calculator / Formula", "Notes"],
        rows: [
          { id: "toric", cols: ["Standard Toric", "Barrett Toric / Kane Toric / Abulafia-Koch", "Must account for posterior corneal astigmatism (PCA)"] },
          { id: "surprise", cols: ["Refractive Surprise", "Barrett Rx / Piggyback IOL Calc", "Calculates optimal axis rotation vs lens exchange"] },
          { id: "myopic", cols: ["Prior Myopic Laser", "Barrett True-K / Haigis-L / Masket / Shammas-PL", "Corneal power is overestimated by standard K"] },
          { id: "hyperopic", cols: ["Prior Hyperopic Laser", "Barrett True-K / ASCRS Suite", "Corneal power is underestimated"] },
          { id: "rk", cols: ["Prior RK", "Barrett True-K / True-K Toric", "Highly variable; use OCT-based formulas (Tang/Li) if available"] }
        ]
      },
      calc: function (v) {
        return { value: "Scenario: " + v.scenario, matchId: v.scenario, eq: "Access the ASCRS Post-Refractive Suite for multi-formula aggregation." };
      }
    },
    {
      id: "siaCalculator",
      cat: "ophtha",
      type: "calc",
      name: "Surgically Induced Astigmatism (SIA)",
      desc: "Computes magnitude of corneal astigmatism induced by incisions.",
      organ: "Cornea", region: "Anterior Segment", subject: "Astigmatism",
      keywords: ["sia", "astigmatism", "vector"],
      guidance: "Simple magnitude difference (true Alpins method requires axes).",
      literature: [{
        type: "Methodology", icon: "📄", title: "Vector analysis", citation: "Alpins NA. J Cataract Refract Surg. 1993.",
        links: [{ text: "PubMed ↗", url: "https://pubmed.ncbi.nlm.nih.gov/8355160/" }]
      }],
      fields: [
        makeN("preAstig", "Pre-op Astigmatism Magnitude (D)", 1.5, { step: 0.1 }),
        makeN("postAstig", "Post-op Astigmatism Magnitude (D)", 0.5, { step: 0.1 })
      ],
      calc: function (v) {
        var diff = Math.abs(+v.postAstig - +v.preAstig);
        return { value: "SIA Magnitude: ~" + diff.toFixed(2) + " D", eq: "For formal vector analysis (Alpins/ORA), centroid axis shift must be computed." };
      }
    },
    {
      id: "phakicIol",
      cat: "ophtha",
      type: "class",
      name: "Phakic IOL & Muhtaseb Risk",
      desc: "Guidelines for EVO ICL/IPCL sizing and Muhtaseb surgical complication risk.",
      organ: "Anterior Chamber", region: "Refractive Surgery", subject: "Specialty Lenses",
      keywords: ["evo icl", "staar", "ipcl", "muhtaseb", "vault"],
      guidance: "Vault predicted by Anterior Chamber Depth (ACD) and Horizontal White-to-White (HWTW).",
      literature: [{
        type: "Guideline", icon: "📘", title: "Phakic IOL Sizing", citation: "STAAR Surgical Guidelines.",
        links: [{ text: "EVO ICL ↗", url: "https://us.discovericl.com/" }]
      }],
      fields: [
        makeN("acd", "Anterior Chamber Depth (mm, minimum 2.8)", 3.0, { min: 2.5, max: 4.5, step: 0.1 }),
        makeN("hwtw", "Horizontal White-to-White (mm)", 11.8, { min: 10.0, max: 14.0, step: 0.1 })
      ],
      table: {
        headers: ["Implant Sizing Metric", "Target Vault", "Safety Parameters"],
        rows: [
          { id: "safe", cols: ["ACD ≥ 2.8mm", "250 - 750 µm", "Safe for EVO ICL implantation"] },
          { id: "risk", cols: ["ACD < 2.8mm", "< 250 µm", "Contraindicated / High risk for anterior subcapsular cataract or angle closure"] }
        ]
      },
      calc: function (v) {
        var match = +v.acd >= 2.8 ? "safe" : "risk";
        return { value: "ACD: " + v.acd + " | HWTW: " + v.hwtw, matchId: match, eq: "Utilize the STAAR web calculator for exact lens length selection (12.1, 12.6, 13.2, 13.7 mm)." };
      }
    },

    // ==============================================================
    // 2. CORNEA, REFRACTIVE & CONTACT LENS
    // ==============================================================
    {
      id: "ptaCalc",
      cat: "ophtha",
      type: "calc",
      name: "Percent Tissue Altered (PTA) Calculator",
      desc: "Calculates PTA to evaluate post-LASIK ectasia risk.",
      organ: "Cornea", region: "Refractive Surgery", subject: "Safety",
      keywords: ["pta", "ectasia", "lasik", "ablation", "flap"],
      guidance: "PTA = (Ablation Depth + Flap Thickness) / CCT. Threshold ≥ 40% increases risk.",
      literature: [{
        type: "Validation", icon: "📄", title: "Percent tissue altered", citation: "Santhiago MR, et al. Am J Ophthalmol. 2014.",
        links: [{ text: "PubMed ↗", url: "https://pubmed.ncbi.nlm.nih.gov/24727263/" }]
      }],
      fields: [
        makeN("cct", "Total Central Corneal Thickness (µm)", 520, { min: 400, max: 650 }),
        makeN("flap", "Flap / Cap Thickness (µm)", 100, { min: 50, max: 160 }),
        makeN("ablation", "Ablation Depth (µm)", 65, { min: 10, max: 200 })
      ],
      calc: function (v) {
        var cct = +v.cct, flap = +v.flap, ab = +v.ablation;
        var pta = ((flap + ab) / cct) * 100;
        return { value: "PTA: " + pta.toFixed(1) + "%", eq: pta >= 40 ? "WARNING: PTA ≥ 40%. High risk for ectasia." : "PTA < 40%. Lower risk profile." };
      }
    },
    {
      id: "rsbCalc",
      cat: "ophtha",
      type: "calc",
      name: "Residual Stromal Bed (RSB) Calculator",
      desc: "Estimates remaining corneal tissue under a LASIK flap.",
      organ: "Cornea", region: "Refractive Surgery", subject: "Safety",
      keywords: ["rsb", "stromal bed", "lasik", "ectasia"],
      guidance: "RSB = CCT - Flap - Ablation. Minimum safe threshold is 250 - 300 µm.",
      literature: [{
        type: "Standard", icon: "📘", title: "Ectasia Risk Management", citation: "AAO Focal Points.",
        links: [{ text: "AAO ↗", url: "https://www.aao.org/" }]
      }],
      fields: [
        makeN("cct", "Total Central Corneal Thickness (µm)", 520, { min: 400, max: 650 }),
        makeN("flap", "Flap / Cap Thickness (µm)", 110, { min: 50, max: 160 }),
        makeN("ablation", "Ablation Depth (µm)", 70, { min: 10, max: 200 })
      ],
      calc: function (v) {
        var rsb = +v.cct - +v.flap - +v.ablation;
        return { value: "RSB: " + rsb + " µm", eq: rsb < 250 ? "WARNING: RSB < 250 µm. Extreme ectasia risk." : rsb < 300 ? "Borderline RSB (250-300). Exercise caution." : "RSB > 300 µm. Safe threshold." };
      }
    },
    {
      id: "ectasiaRisk",
      cat: "ophtha",
      type: "class",
      name: "Ectasia Risk Score (Randleman)",
      desc: "Topography, RSB, Age, Pachymetry, and MRSE risk stratification.",
      organ: "Cornea", region: "Refractive Surgery", subject: "LASIK Safety",
      keywords: ["ectasia", "randleman", "lasik", "bad-d"],
      guidance: "Score ≥ 4 indicates high risk.",
      literature: [{
        type: "Validation", icon: "📄", title: "Risk assessment for ectasia", citation: "Randleman JB, et al. Ophthalmology. 2008.",
        links: [{ text: "PubMed ↗", url: "https://pubmed.ncbi.nlm.nih.gov/17628696/" }]
      }],
      fields: [
        makeS("topo", "Topography Pattern", "0", [["0", "Normal"], ["1", "Asymmetric bow tie"], ["3", "Inferior steepening"], ["4", "Keratoconus suspect"]]),
        makeS("rsb", "RSB", "0", [["0", "> 300 µm"], ["1", "280 - 299 µm"], ["3", "240 - 259 µm"], ["4", "< 240 µm"]]),
        makeS("age", "Patient Age", "0", [["0", "> 29"], ["1", "26 - 29"], ["3", "18 - 21"]]),
        makeS("mrse", "MRSE", "0", [["0", "≤ -8.00 D"], ["1", "-8.00 to -10.00 D"], ["4", "> -14.00 D"]])
      ],
      table: {
        headers: ["Score", "Risk", "Action"],
        rows: [
          { id: "low", cols: ["0-2", "Low", "Proceed"] },
          { id: "mod", cols: ["3", "Moderate", "Consider PRK"] },
          { id: "high", cols: ["≥4", "High", "Contraindicated"] }
        ]
      },
      calc: function (v) {
        var total = +v.topo + +v.rsb + +v.age + +v.mrse;
        var match = total >= 4 ? "high" : total === 3 ? "mod" : "low";
        return { value: "Score: " + total, matchId: match, eq: "Evaluates subclinical risk. BAD-D and Belin ABCD staging on Pentacam offer further multi-metric keratoconus screening." };
      }
    },
    {
      id: "opticalTransposition",
      cat: "ophtha",
      type: "calc",
      name: "Optical Transposition & SE",
      desc: "Converts between plus and minus cylinder; computes Spherical Equivalent (SE).",
      organ: "Eye", region: "Optics", subject: "Refraction",
      keywords: ["transposition", "spherical equivalent", "cylinder", "axis"],
      guidance: "New Sph = Sph + Cyl. New Cyl = -Cyl. New Axis = Axis +/- 90.",
      literature: [{
        type: "Standard Text", icon: "📘", title: "Clinical Optics", citation: "Fatt I. 1992.",
        links: [{ text: "AAO Optics ↗", url: "https://www.aao.org/" }]
      }],
      fields: [
        makeN("sph", "Sphere (Diopters)", -2.00, { step: 0.25 }),
        makeN("cyl", "Cylinder (Diopters)", +1.50, { step: 0.25 }),
        makeN("axis", "Axis (Degrees)", 90, { min: 0, max: 180, step: 1 })
      ],
      calc: function (v) {
        var sph = +v.sph, cyl = +v.cyl, axis = +v.axis;
        var se = sph + (cyl / 2);
        var nSph = sph + cyl;
        var nCyl = -cyl;
        var nAxis = (axis + 90) % 180;
        if (nAxis === 0 && axis !== 0) nAxis = 180;
        return { value: "Transposed: " + nSph.toFixed(2) + " " + (nCyl > 0 ? "+" : "") + nCyl.toFixed(2) + " x " + String(nAxis).padStart(3, '0'), eq: "Spherical Equivalent (SE): " + se.toFixed(2) + " D" };
      }
    },
    {
      id: "vertexDist",
      cat: "ophtha",
      type: "calc",
      name: "Vertex Distance Compensation",
      desc: "Converts spectacle prescription to contact lens power.",
      organ: "Cornea", region: "Contact Lens", subject: "Optics",
      keywords: ["vertex", "contact lens", "spectacle", "diopter"],
      guidance: "P_contact = P_spectacle / (1 - (d * P_spectacle)).",
      literature: [{
        type: "Optics", icon: "📘", title: "Vertex Formulas", citation: "BCLA Standards.",
        links: [{ text: "AOA ↗", url: "https://www.aoa.org/" }]
      }],
      fields: [
        makeN("p_spec", "Spectacle Power (Diopters)", -6.50, { step: 0.25 }),
        makeN("vd", "Vertex Distance (mm)", 12.0, { min: 8, max: 20, step: 0.5 })
      ],
      calc: function (v) {
        var p = +v.p_spec, d = (+v.vd) / 1000.0;
        var p_cl = p / (1 - (d * p));
        return { value: "Contact Lens Power: " + p_cl.toFixed(2) + " D", eq: "Necessary for refractions greater than ± 4.00 D." };
      }
    },
    {
      id: "gpFitRouter",
      cat: "ophtha",
      type: "class",
      name: "GP / RGP Lens & LRI Nomogram Guide",
      desc: "Base curve calculations, over-refraction vector calculators, and LRI nomograms.",
      organ: "Cornea", region: "Specialty Lens", subject: "Astigmatism",
      keywords: ["gp", "rgp", "base curve", "lri", "ak"],
      guidance: "Convert K readings to mm: r = 337.5 / K.",
      literature: [{
        type: "Guideline", icon: "📘", title: "RGP Fitting", citation: "GPLI.",
        links: [{ text: "GPLI Calculators ↗", url: "https://www.gpli.info/" }]
      }],
      fields: [
        makeN("k", "Keratometry (Diopters)", 43.0, { min: 30, max: 65, step: 0.25 })
      ],
      table: {
        headers: ["Tool", "Function", "Application"],
        rows: [
          { id: "bc", cols: ["Base Curve Conversion", "337.5 / K", "Select initial GP lens BC"] },
          { id: "or", cols: ["Over-Refraction Vector", "Cross-cylinder calcs", "Adjust bitoric GP lenses"] },
          { id: "lri", cols: ["LRI / AK Nomogram", "Donnenfeld / NAPA", "Incision placement for astigmatism"] }
        ]
      },
      calc: function (v) {
        var mm = 337.5 / +v.k;
        return { value: v.k + " D = " + mm.toFixed(2) + " mm Radius", matchId: "bc", eq: "Standard index of refraction (1.3375) used for conversion." };
      }
    },

    // ==============================================================
    // 3. GLAUCOMA & TONOMETRY
    // ==============================================================
    {
      id: "iopCct",
      cat: "ophtha",
      type: "calc",
      name: "CCT IOP Adjustment (Ehlers / Dresdner)",
      desc: "Adjusts Goldmann applanation tonometry based on central corneal thickness.",
      organ: "Cornea", region: "Glaucoma", subject: "Tonometry",
      keywords: ["iop", "cct", "pachymetry", "ehlers"],
      guidance: "Normalizes measured IOP against a standard CCT of 545 µm.",
      literature: [{
        type: "Study", icon: "📄", title: "Corneal thickness in OHT", citation: "Ehlers N, et al. Acta Ophthalmol. 1975.",
        links: [{ text: "PubMed ↗", url: "https://pubmed.ncbi.nlm.nih.gov/1179603/" }]
      }],
      fields: [
        makeN("iop", "Measured IOP (mmHg)", 22, { min: 5, max: 60 }),
        makeN("cct", "Central Corneal Thickness (µm)", 500, { min: 350, max: 700 })
      ],
      calc: function (v) {
        var adj = +v.iop - ((+v.cct - 545) / 50) * 2.5;
        return { value: "Adjusted True IOP: ~" + adj.toFixed(1) + " mmHg", eq: "Corneal Hysteresis (CH) from ORA provides further risk adjustment beyond pure thickness." };
      }
    },
    {
      id: "targetIop",
      cat: "ophtha",
      type: "calc",
      name: "Target IOP & VFI Progression",
      desc: "Estimates target IOP based on baseline and severity; notes VFI rate.",
      organ: "Optic Nerve", region: "Glaucoma", subject: "Management",
      keywords: ["target iop", "vfi", "hvf", "progression"],
      guidance: "Mild: 20-30% reduction. Mod: 30-40%. Severe: 40-50%.",
      literature: [{
        type: "Guidelines", icon: "📘", title: "AAO Glaucoma PPP", citation: "Target IOP principles.",
        links: [{ text: "AAO PPP ↗", url: "https://www.aao.org/" }]
      }],
      fields: [
        makeN("tmax", "T-Max (Highest untreated IOP)", 28, { min: 10, max: 70 }),
        makeS("severity", "Glaucoma Severity", "mod", [["mild", "Mild (Normal VFI)"], ["mod", "Moderate (VFI deficits)"], ["severe", "Severe (Central threat)"]])
      ],
      calc: function (v) {
        var t = +v.tmax;
        var pct = v.severity === "severe" ? 0.45 : v.severity === "mod" ? 0.35 : 0.25;
        var target = t * (1 - pct);
        return { value: "Estimated Target IOP: " + target.toFixed(0) + " mmHg", eq: "Monitor Humphrey Visual Field (HVF) VFI rate of progression (dB/year) to adjust target dynamically." };
      }
    },
    {
      id: "ohtsRisk",
      cat: "ophtha",
      type: "class",
      name: "OHTS Glaucoma Risk Screener",
      desc: "Estimates 5-year risk of progression from OHT to POAG.",
      organ: "Optic Nerve", region: "Glaucoma", subject: "Ocular Hypertension",
      keywords: ["ohts", "poag", "cct", "optic disc"],
      guidance: "Uses Age, IOP, CCT, Cup-to-Disc ratio, and PSD.",
      literature: [{
        type: "Trial", icon: "📄", title: "Baseline factors predicting POAG", citation: "Gordon MO, et al. Arch Ophthalmol. 2002.",
        links: [{ text: "PubMed ↗", url: "https://pubmed.ncbi.nlm.nih.gov/12049575/" }]
      }],
      fields: [
        makeS("iop", "Baseline IOP (mmHg)", "1", [["0", "< 24"], ["1", "24 - 25"], ["2", "> 25"]]),
        makeS("cct", "CCT", "1", [["0", "> 588 µm"], ["1", "555 - 588 µm"], ["2", "< 555 µm"]]),
        makeS("cd", "Cup-to-Disc Ratio", "1", [["0", "≤ 0.3"], ["1", "0.4 - 0.5"], ["2", "≥ 0.6"]])
      ],
      table: {
        headers: ["Score", "Risk", "Action"],
        rows: [
          { id: "low", cols: ["0-1", "< 5%", "Observe"] },
          { id: "med", cols: ["2-4", "10-15%", "Consider treatment"] },
          { id: "high", cols: ["5-6", "> 25%", "Treat proactively"] }
        ]
      },
      calc: function (v) {
        var total = +v.iop + +v.cct + +v.cd;
        var match = total >= 5 ? "high" : total >= 2 ? "med" : "low";
        return { value: "Simplified OHTS Points: " + total, matchId: match, eq: "Full OHTS uses a continuous logistic regression model." };
      }
    },

    // ==============================================================
    // 4. PEDIATRIC OPHTHALMOLOGY & STRABISMUS
    // ==============================================================
    {
      id: "pedIol",
      cat: "ophtha",
      type: "class",
      name: "Pediatric IOL Target & Amblyopia Guide",
      desc: "Hyperopic target refractions for axial elongation; occlusion hour calculator.",
      organ: "Lens / Cortex", region: "Pediatrics", subject: "Refraction & Amblyopia",
      keywords: ["pediatric iol", "dahan", "enyedi", "amblyopia", "patching"],
      guidance: "Under-correct young children to compensate for myopic shift.",
      literature: [{
        type: "Guideline", icon: "📘", title: "Pediatric Cataract", citation: "Dahan/Enyedi Guidelines.",
        links: [{ text: "AAPOS ↗", url: "https://aapos.org/" }]
      }],
      fields: [
        makeS("age", "Child Age at Surgery", "1", [
          ["0", "< 1 year"], ["1", "1 - 2 years"], ["2", "2 - 4 years"], ["3", "4 - 8 years"], ["4", "> 8 years"]
        ])
      ],
      table: {
        headers: ["Age", "Suggested Post-Op Target", "Amblyopia Patching"],
        rows: [
          { id: "0", cols: ["< 1 yr", "+6.00 to +4.00 D", "Part-time occlusion"] },
          { id: "1", cols: ["1 - 2 yrs", "+3.00 to +2.00 D", "2-6 hrs daily based on logMAR"] },
          { id: "2", cols: ["2 - 4 yrs", "+2.00 to +1.00 D", "2-6 hrs daily"] },
          { id: "3", cols: ["4 - 8 yrs", "+1.00 to Plano", "Weekend Atropine / Patching"] },
          { id: "4", cols: ["> 8 yrs", "Plano", "Maintenance"] }
        ]
      },
      calc: function (v) {
        return { value: "Age Category Selected", matchId: v.age, eq: "Refractive targets must be individualized to the fellow eye to prevent anisometropic amblyopia." };
      }
    },
    {
      id: "strabismusDose",
      cat: "ophtha",
      type: "calc",
      name: "Strabismus Surgical Dose (Parks)",
      desc: "Translates prism diopters into rectus muscle recession distances.",
      organ: "Extraocular Muscles", region: "Pediatrics & Strabismus", subject: "Surgical Planning",
      keywords: ["strabismus", "prism", "recession", "esotropia", "parks-three-step"],
      guidance: "Parks nomogram approximations for symmetric horizontal strabismus.",
      literature: [{
        type: "Standard Text", icon: "📘", title: "Atlas of Strabismus Surgery", citation: "Parks MM. 1983.",
        links: [{ text: "EyeWiki ↗", url: "https://eyewiki.aao.org/Strabismus" }]
      }],
      fields: [
        makeS("type", "Deviation Type", "et", [["et", "Esotropia (Medial Rectus)"], ["xt", "Exotropia (Lateral Rectus)"]]),
        makeN("pd", "Magnitude (Prism Diopters)", 30, { min: 15, max: 70, step: 5 })
      ],
      calc: function (v) {
        var pd = +v.pd;
        var plan = "";
        if (v.type === "et") {
          if (pd <= 15) plan = "Bilateral MR Recession ~ 3.0 mm";
          else if (pd <= 25) plan = "Bilateral MR Recession ~ 4.0 mm";
          else if (pd <= 35) plan = "Bilateral MR Recession ~ 5.0 mm";
          else plan = "Bilateral MR Recession > 5.5 mm (or 3-muscle)";
        } else {
          if (pd <= 15) plan = "Bilateral LR Recession ~ 4.0 mm";
          else if (pd <= 25) plan = "Bilateral LR Recession ~ 6.0 mm";
          else if (pd <= 35) plan = "Bilateral LR Recession ~ 7.0 mm";
          else plan = "Bilateral LR Recession > 7.5 mm (or 3-muscle)";
        }
        return { value: "Base Dose: " + plan, eq: "Parks Three-Step is used separately for isolating vertical cyclovertical paretic muscles." };
      }
    },

    // ==============================================================
    // 5. RETINA & UVEITIS
    // ==============================================================
    {
      id: "ropRisk",
      cat: "ophtha",
      type: "class",
      name: "ROP Risk (WINROP / G-ROP) & Intravitreal Guide",
      desc: "Identifies infants needing Retinopathy of Prematurity screening; notes intravitreal dilution.",
      organ: "Retina", region: "Pediatric Retina", subject: "ROP",
      keywords: ["rop", "winrop", "g-rop", "intravitreal", "vancomycin"],
      guidance: "Gestational age < 30 weeks or Birth Weight < 1500g warrants screening.",
      literature: [{
        type: "Guideline", icon: "📘", title: "ROP Screening", citation: "AAP/AAO Joint Statement.",
        links: [{ text: "AAO ROP ↗", url: "https://www.aao.org/" }]
      }],
      fields: [
        makeN("ga", "Gestational Age (weeks)", 28, { min: 22, max: 40 }),
        makeN("bw", "Birth Weight (grams)", 1200, { min: 400, max: 4000 })
      ],
      table: {
        headers: ["Threshold", "Recommendation", "Intravitreal Note"],
        rows: [
          { id: "screen", cols: ["GA ≤ 30w or BW ≤ 1500g", "Strict ROP Screening Protocol required", "Anti-VEGF doses are fractionated for infants"] },
          { id: "skip", cols: ["GA > 30w & BW > 1500g", "Routine care (unless unstable clinical course)", "Standard adult endophthalmitis: Vanco 1mg/0.1mL + Ceftazidime 2.25mg/0.1mL"] }
        ]
      },
      calc: function (v) {
        var match = (+v.ga <= 30 || +v.bw <= 1500) ? "screen" : "skip";
        return { value: "GA " + v.ga + "w, BW " + v.bw + "g", matchId: match, eq: "WINROP/G-ROP use serial postnatal weight gain to predict severe neovascularization." };
      }
    },
    {
      id: "aredsRisk",
      cat: "ophtha",
      type: "class",
      name: "AREDS Risk Calculator (Advanced AMD)",
      desc: "Calculates the 5-year risk of progression to advanced AMD.",
      organ: "Macula", region: "Retina", subject: "Macular Degeneration",
      keywords: ["areds", "amd", "drusen"],
      guidance: "1 pt for large drusen, 1 pt for pigmentary changes (max 2 per eye, 4 total).",
      literature: [{
        type: "Trial", icon: "📄", title: "AREDS Report No. 8", citation: "Arch Ophthalmol. 2001.",
        links: [{ text: "PubMed ↗", url: "https://pubmed.ncbi.nlm.nih.gov/11594942/" }]
      }],
      fields: [
        makeS("odDrusen", "OD Large Drusen", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("odPigment", "OD Pigment Changes", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("osDrusen", "OS Large Drusen", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("osPigment", "OS Pigment Changes", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["Score", "5-Year Risk", "Action"],
        rows: [
          { id: "low", cols: ["0-1", "0.5 - 3%", "Observe"] },
          { id: "med", cols: ["2", "~12%", "Consider AREDS2"] },
          { id: "high", cols: ["3-4", "25 - 50%", "Start AREDS2"] }
        ]
      },
      calc: function (v) {
        var total = +v.odDrusen + +v.odPigment + +v.osDrusen + +v.osPigment;
        var match = total >= 3 ? "high" : total === 2 ? "med" : "low";
        return { value: "AREDS Score: " + total, matchId: match, eq: "AREDS2 replaces beta-carotene with lutein/zeaxanthin." };
      }
    },
    {
      id: "sunUveitis",
      cat: "ophtha",
      type: "class",
      name: "SUN Uveitis Grading",
      desc: "Standardization of AC cells, flare, and vitreous haze.",
      organ: "Anterior Chamber", region: "Uveitis", subject: "Immunology",
      keywords: ["sun", "uveitis", "cells", "flare"],
      guidance: "Evaluates cells in a 1x1 mm conical slit beam.",
      literature: [{
        type: "Consensus", icon: "📘", title: "SUN nomenclature", citation: "Jabs DA, et al. Am J Ophthalmol. 2005.",
        links: [{ text: "PubMed ↗", url: "https://pubmed.ncbi.nlm.nih.gov/16196117/" }]
      }],
      fields: [
        makeS("cells", "AC Cells (1x1 mm beam)", "0", [
          ["0", "< 1 cell (0)"], ["0.5", "1-5 cells (0.5+)"], ["1", "6-15 cells (1+)"],
          ["2", "16-25 cells (2+)"], ["3", "26-50 cells (3+)"], ["4", "> 50 cells (4+)"]
        ])
      ],
      table: {
        headers: ["Grade", "Count", "Status"],
        rows: [
          { id: "g0", cols: ["0", "< 1", "Inactive"] },
          { id: "g1", cols: ["1+", "6-15", "Active mild"] },
          { id: "g3", cols: ["3+", "26-50", "Active severe"] }
        ]
      },
      calc: function (v) {
        var match = v.cells === "0" ? "g0" : (v.cells === "3" || v.cells === "4") ? "g3" : "g1";
        return { value: "SUN Grade: " + v.cells + "+", matchId: match, eq: "Standardized tracking for steroid or immunosuppressant response." };
      }
    },

    // ==============================================================
    // 6. OCULOPLASTICS, ORBIT & NEURO-OPHTHALMOLOGY
    // ==============================================================
    {
      id: "tedCas",
      cat: "ophtha",
      type: "class",
      name: "TED CAS & EUGOGO Staging",
      desc: "Computes Clinical Activity Score and categorizes Thyroid Eye Disease severity.",
      organ: "Orbit", region: "Oculoplastics", subject: "Thyroid Eye Disease",
      keywords: ["ted", "cas", "eugogo", "graves", "orbit"],
      guidance: "Score ≥ 3/7 indicates active TED warranting immunosuppression.",
      literature: [{
        type: "Consensus", icon: "📘", title: "CAS & EUGOGO Guidelines", citation: "Mourits MP. Clin Endocrinol. 1997.",
        links: [{ text: "EUGOGO ↗", url: "https://www.eugogo.eu/" }]
      }],
      fields: [
        makeS("pain1", "Spontaneous retrobulbar pain?", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("pain2", "Pain on eye movement?", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("red1", "Eyelid erythema?", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("red2", "Conjunctival injection?", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("swell1", "Chemosis?", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("swell2", "Swelling of caruncle?", "0", [["0", "No"], ["1", "Yes"]]),
        makeS("swell3", "Eyelid edema?", "0", [["0", "No"], ["1", "Yes"]])
      ],
      table: {
        headers: ["CAS Score", "Activity", "EUGOGO Severity Note"],
        rows: [
          { id: "inactive", cols: ["0-2", "Inactive", "Mild: Observation / Lubricants"] },
          { id: "active", cols: ["≥3", "Active", "Mod-Severe: IV steroids / Teprotumumab. Sight-threatening requires urgent decompression."] }
        ]
      },
      calc: function (v) {
        var total = +v.pain1 + +v.pain2 + +v.red1 + +v.red2 + +v.swell1 + +v.swell2 + +v.swell3;
        var match = total >= 3 ? "active" : "inactive";
        return { value: "CAS Score: " + total + " / 7", matchId: match, eq: "Hertel exophthalmometry (normative < 20-22mm based on race) tracks proptosis progression." };
      }
    },
    {
      id: "oculoplasticsMetrics",
      cat: "ophtha",
      type: "class",
      name: "Oculoplastics Metrics (MRD, Hertel, Socket)",
      desc: "Reference for Margin Reflex Distance, Exophthalmometry, and Orbital Implants.",
      organ: "Eyelids / Orbit", region: "Oculoplastics", subject: "Anatomy",
      keywords: ["mrd1", "mrd2", "hertel", "levator", "implant", "enucleation"],
      guidance: "MRD1 normal ~4-5mm. Levator function normal > 12mm.",
      literature: [{
        type: "Textbook", icon: "📘", title: "Oculofacial Plastic Surgery", citation: "Standard parameters.",
        links: [{ text: "AAO Ptosis ↗", url: "https://eyewiki.aao.org/Ptosis" }]
      }],
      fields: [
        makeS("metric", "Select Metric", "mrd", [
          ["mrd", "MRD1 & Levator Function (Ptosis)"],
          ["hertel", "Hertel Exophthalmometry (Proptosis)"],
          ["socket", "Socket Implant Size (Enucleation)"]
        ])
      ],
      table: {
        headers: ["Metric", "Normal Values", "Clinical Significance"],
        rows: [
          { id: "mrd", cols: ["MRD1", "4 - 5 mm", "Guides surgery (Müller's resection vs Levator advancement)"] },
          { id: "hertel", cols: ["Hertel Base", "< 20 mm (White), < 22 mm (Black)", "Asymmetry > 2mm is suspicious for orbital mass/TED"] },
          { id: "socket", cols: ["Implant Vol", "18-22 mm diameter (3-5 mL)", "Restores volume post-enucleation; customized per socket"] }
        ]
      },
      calc: function (v) {
        return { value: "Viewing: " + v.metric, matchId: v.metric, eq: "Standard anatomical benchmarks for oculoplastic surgical planning." };
      }
    },

    // ==============================================================
    // 7. OPHTHALMIC PHARMACOLOGY & TOXICOLOGY
    // ==============================================================
    {
      id: "plaquenilDose",
      cat: "ophtha",
      type: "calc",
      name: "Hydroxychloroquine (Plaquenil) Dosing",
      desc: "Calculates maximum safe daily dosage based on REAL body weight.",
      organ: "Macula", region: "Pharmacology", subject: "Toxicology",
      keywords: ["plaquenil", "hydroxychloroquine", "toxicity"],
      guidance: "Max daily dose ≤ 5.0 mg/kg of real body weight.",
      literature: [{
        type: "Guidelines", icon: "📘", title: "Chloroquine Retinopathy", citation: "Marmor MF. Ophthalmology. 2016.",
        links: [{ text: "PubMed ↗", url: "https://pubmed.ncbi.nlm.nih.gov/26992838/" }]
      }],
      fields: [
        makeN("weight", "Real Body Weight (kg)", 65, { min: 30, max: 150 })
      ],
      calc: function (v) {
        var maxDose = +v.weight * 5.0;
        return { value: "Max Safe Dose: " + maxDose.toFixed(1) + " mg/day", eq: "Baseline OCT and 10-2 VF required to monitor for bull's eye maculopathy." };
      }
    },
    {
      id: "pharmRouter",
      cat: "ophtha",
      type: "class",
      name: "Glaucoma Washout & Fortified Antibiotics",
      desc: "Guidelines for medication washout periods and compounding fortified drops.",
      organ: "Eye", region: "Pharmacology", subject: "Therapeutics",
      keywords: ["washout", "glaucoma", "fortified", "antibiotic", "vancomycin", "tobramycin"],
      guidance: "Clinical trial washout half-lives and standard severe keratitis compounding.",
      literature: [{
        type: "Protocol", icon: "📘", title: "Ocular Pharmacology", citation: "Standard Clinical Protocols.",
        links: [{ text: "EyeWiki Keratitis ↗", url: "https://eyewiki.aao.org/Bacterial_Keratitis" }]
      }],
      fields: [
        makeS("type", "Protocol Type", "washout", [
          ["washout", "Glaucoma Medication Washout"],
          ["fortified", "Fortified Topical Antibiotics"]
        ])
      ],
      table: {
        headers: ["Category", "Protocol / Timeline", "Notes"],
        rows: [
          { id: "washout", cols: ["Prostaglandins", "4 - 6 weeks washout", "Beta-blockers: 2-4 wks. CAIs/Alpha-agonists: 2 wks."] },
          { id: "fortified", cols: ["Severe Keratitis", "Vanco (50mg/mL) & Tobra (14mg/mL)", "Alternating q1h around the clock. Compounded by pharmacy."] }
        ]
      },
      calc: function (v) {
        return { value: "Selected: " + v.type, matchId: v.type, eq: "Standard therapeutic compounding and half-life clearance protocols." };
      }
    }
  ];

  try {
    if (!Array.isArray(window.categories)) window.categories = [];
    if (!Array.isArray(window.tools)) window.tools = [];

    var catExists = false;
    for (var i = 0; i < window.categories.length; i++) {
      if (window.categories[i] && window.categories[i].id === ophthaCategory.id) {
        catExists = true; break;
      }
    }
    if (!catExists) window.categories.push(ophthaCategory);

    ophthaTools.forEach(function (tool) {
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
      window.SYNONYM_MAP["ophtha"] = ["ophthalmology", "eye", "cornea", "retina", "glaucoma", "lens", "cataract", "strabismus"];
      window.SYNONYM_MAP["cornea"] = ["ectasia", "vertex", "sia", "astigmatism", "lasik", "rgp", "pta", "rsb"];
      window.SYNONYM_MAP["glaucoma"] = ["iop", "cct", "ohts", "tonometry", "washout"];
      window.SYNONYM_MAP["retina"] = ["areds", "amd", "uveitis", "sun", "rop"];
    }

    if (typeof window.renderHome === "function") window.renderHome();
  } catch (err) {
    console.error("Error registering Ophthalmology tools:", err);
  }
})();
