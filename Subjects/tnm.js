/**
 * MedCalc Module: Oncology & Surgical Staging (ONCO)
 * Fully compatible with the MedCalc HTML application structure (neuro.js architecture).
 * Covers: Breast, Gynecological (FIGO/TNM), Genitourinary, Ophthalmic, Endocrine, and Pediatric Solid Tumors.
 1. Head and Neck Sites:
 *    - Lip and Oral Cavity
 *    - HPV-Mediated (p16-positive) Oropharyngeal Cancer
 *    - HPV-Negative Oropharyngeal Cancer and Hypopharynx
 *    - Nasopharynx
 *    - Larynx (Supraglottis, Glottis, Subglottis)
 *    - Nasal Cavity and Paranasal Sinuses (Maxillary and Ethmoid)
 *    - Major Salivary Glands (Parotid, Submandibular, Sublingual)
 *    - Cervical Lymph Nodes and Unknown Primary Tumors of the Head and Neck
 *    - Cutaneous Carcinoma of the Head and Neck (cSCC)
 *    - Mucosal Melanoma of the Head and Neck
 * 2. Digestive System Sites:
 *    - Esophagus and Esophagogastric Junction (EGJ)
 *    - Stomach (Gastric Carcinoma)
 *    - Small Intestine (Duodenum, Jejunum, Ileum)
 *    - Appendix (Carcinoma and Goblet Cell Carcinoid)
 *    - Colon and Rectum (Colorectal Carcinoma)
 *    - Anal Canal and Perianal Skin
 *    - Gastrointestinal Stromal Tumor (GIST)
 *    - Well-Differentiated Neuroendocrine Tumors (NETs) of Stomach, Duodenum/Ampulla, Jejunum/Ileum, Appendix, Colorectum, Pancreas
 *    - Liver (Hepatocellular Carcinoma / Intrahepatic Cholangiocarcinoma)
 *    - Gallbladder
 *    - Intrahepatic Bile Ducts
 *    - Perihilar Bile Ducts
 *    - Distal Extrahepatic Bile Duct
 *    - Ampulla of Vater
 *    - Exocrine Pancreas (Pancreatic Ductal Adenocarcinoma)
 * - 3. Thorax & Respiratory Sites (Lung NSCLC/SCLC, Pleural Mesothelioma, Thymic Epithelial Tumors)
 * - 4. Musculoskeletal Sites (Bone Sarcomas: Appendicular, Pelvis, Spine; Soft Tissue Sarcomas: Trunk/Extremities, Retroperitoneum, Visceral, Head & Neck, Unusual Histologies)
 * - 5. Skin Cancers (Cutaneous Melanoma, Merkel Cell Carcinoma, Non-Melanoma Skin Cancer)
 */
(function () {
  "use strict";

  // Global helper constructors declared in the application header
  var makeN = (typeof window !== "undefined" && window.N) ? window.N : function (id, label, defaultVal, extra) {
    extra = extra || {};
    return Object.assign({ id: id, label: label, type: "number", value: defaultVal, default: defaultVal }, extra);
  };
  var makeS = (typeof window !== "undefined" && window.S) ? window.S : function (id, label, defaultVal, options) {
    options = options || [];
    return { id: id, label: label, type: "select", value: defaultVal, default: defaultVal, options: options };
  };

  var oncoCategory = {
    id: "onco",
    name: "Surgical Oncology & TNM/FIGO Staging",
    icon: "🎗️",
    desc: "Anatomic and prognostic stage classifi  for Breast, Gynecologic, Genitourinary, Ophthalmic, Endocrine,Pediatric solid,Thoracic, Musculoskeletal, and Cutaneous neoplasms",
    organs: ["breast", "vulva", "cervix", "endometrium", "ovary", "prostate", "testis", "kidney", "bladder", "eye", "thyroid", "adrenal","lung", "pleura", "thymus", "bone", "soft tissue", "skin"],
    region: "multi-system oncology"
  };

  var oncoTools = [
    // ==============================================================
    // 1. HEAD AND NECK SITES
    // ==============================================================
    {
      id: "oralCavityAJCC",
      cat: "onco_hn_gi",
      type: "class",
      name: "Lip and Oral Cavity Carcinoma (AJCC 8th)",
      desc: "TNM staging for squamous cell carcinoma of lip and oral cavity incorporating Depth of Invasion (DOI) and Extranodal Extension (ENE).",
      organ: "Lip / Oral Tongue / Floor of Mouth / Buccal",
      region: "Head & Neck Surgical Oncology",
      subject: "Oral Cavity Cancer",
      keywords: ["oral cavity", "lip", "tongue", "doi", "depth of invasion", "ene", "ajcc 8th"],
      guidance: "T-category incorporates both maximum surface dimension and Depth of Invasion (DOI): T1 (≤2cm, DOI ≤5mm); T2 (≤2cm, DOI 5-10mm or 2-4cm, DOI ≤10mm); T3 (>4cm or DOI >10mm); T4a (cortical bone, tongue deep extrinsic muscle, maxillary sinus, skin); T4b (masticator space, pterygoid plates, skull base, internal carotid).",
      literature: [{
        type: "AJCC 8th Consensus",
        icon: "📄",
        title: "International validation of the 8th edition AJCC TNM staging system for oral cavity cancer",
        citation: "Almangush A, et al. Oral Oncol. 2020;103:104617.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/32087541/" },
          { text: "NCI Adult Oral Cavity Treatment PDQ ↗", url: "https://www.cancer.gov/types/head-and-neck/hp/adult/oral-cavity-treatment-pdq" },
          { text: "NCCN Head and Neck Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "AHNS Oral Cavity Resources ↗", url: "https://www.ahns.info/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor & Depth of Invasion (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 2 cm AND Depth of Invasion (DOI) ≤ 5 mm"],
          ["T2", "T2 — Tumor ≤ 2 cm with DOI > 5 mm to ≤ 10 mm; OR tumor > 2 cm to ≤ 4 cm with DOI ≤ 10 mm"],
          ["T3", "T3 — Tumor > 4 cm; OR any tumor with DOI > 10 mm"],
          ["T4a", "T4a — Moderately advanced: invades cortical bone, deep muscle of tongue, maxillary sinus, or facial skin"],
          ["T4b", "T4b — Very advanced: invades masticator space, pterygoid plates, skull base, or encases internal carotid"]
        ]),
        makeS("nCat", "Regional Cervical Lymph Nodes (Clinical cN)", "N0", [
          ["N0", "cN0 — No regional lymph node metastasis"],
          ["N1", "cN1 — Single ipsilateral node ≤ 3 cm, ENE negative"],
          ["N2a", "cN2a — Single ipsilateral node > 3 cm but ≤ 6 cm, ENE negative"],
          ["N2b", "cN2b — Multiple ipsilateral nodes, none > 6 cm, ENE negative"],
          ["N2c", "cN2c — Bilateral or contralateral nodes, none > 6 cm, ENE negative"],
          ["N3a", "cN3a — Any lymph node > 6 cm, ENE negative"],
          ["N3b", "cN3b — Single or multiple nodes with clinical Extranodal Extension (ENE+)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lung, bone, liver)"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Treatment Strategy"],
        rows: [
          { id: "ocI", cols: ["Stage I", "T1 N0 M0", "Primary surgical resection with transoral margin control ± elective neck dissection (END for DOI > 3-4 mm)"] },
          { id: "ocII", cols: ["Stage II", "T2 N0 M0", "Wide local excision + ipsilateral neck dissection"] },
          { id: "ocIII", cols: ["Stage III", "T3 N0 or T1-T3 N1 M0", "Radical compartmental resection + selective neck dissection + adjuvant radiotherapy"] },
          { id: "ocIVA", cols: ["Stage IVA", "T4a N0-N1, or T1-T4a N2 M0", "Composite resection with microvascular free flap reconstruction + adjuvant chemoradiation (Cisplatin)"] },
          { id: "ocIVB_C", cols: ["Stage IVB / IVC", "T4b Any N, Any T N3, or M1", "Definitive chemoradiation or palliative systemic therapy (anti-PD-1 / KEYNOTE-048)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVC (M1)", matchId: "ocIVB_C", eq: "Distant metastatic oral cancer. Systemic immunotherapy (Pembrolizumab ± chemotherapy)." };
        if (v.tCat === "T4b" || v.nCat.startsWith("N3")) return { value: "Stage IVB", matchId: "ocIVB_C", eq: "Very advanced local invasion or ENE+ / bulky nodal disease." };
        if (v.tCat === "T4a" || v.nCat.startsWith("N2")) return { value: "Stage IVA", matchId: "ocIVA", eq: "Moderately advanced local disease or multi-nodal regional involvement." };
        if (v.tCat === "T3" || v.nCat === "N1") return { value: "Stage III", matchId: "ocIII", eq: "Tumor > 4 cm, DOI > 10 mm, or single ipsilateral nodal metastasis." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "ocII", eq: "Intermediate primary tumor (2-4 cm or DOI 5-10 mm)." };
        return { value: "Stage I (T1 N0 M0)", matchId: "ocI", eq: "Early superficial oral cavity carcinoma." };
      }
    },
    {
      id: "hpvPositiveOropharynx",
      cat: "onco_hn_gi",
      type: "class",
      name: "HPV-Mediated (p16-Positive) Oropharyngeal Carcinoma",
      desc: "Distinct AJCC 8th Edition clinical (cTNM) and pathological (pTNM) classification reflecting favorable radio-chemosensitivity.",
      organ: "Oropharynx (Base of Tongue, Tonsils, Soft Palate)",
      region: "Head & Neck Oncology",
      subject: "HPV-Mediated Oropharyngeal Cancer",
      keywords: ["hpv", "p16", "oropharynx", "tonsil", "base of tongue", "ajcc 8th"],
      guidance: "p16 overexpression by IHC (≥70% strong diffuse nuclear/cytoplasmic staining) defines this entity. Clinical N-staging: cN1 (ipsilateral nodes ≤6cm); cN2 (contralateral/bilateral ≤6cm); cN3 (>6cm). Notice lack of Stage IV unless distant metastatic (M1).",
      literature: [{
        type: "AJCC 8th Landmark Study",
        icon: "📄",
        title: "Validation of the 8th Edition of the AJCC/UICC Staging System for HPV-Mediated Oropharyngeal Cancer",
        citation: "O'Sullivan B, et al. Lancet Oncol. 2016;17(4):440-451.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/26936724/" },
          { text: "NCI Adult Oropharyngeal Cancer PDQ ↗", url: "https://www.cancer.gov/types/head-and-neck/hp/adult/oropharyngeal-treatment-pdq" },
          { text: "NCCN Head and Neck Cancer Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "ASCO Guidelines on HPV-Related Head and Neck Cancer ↗", url: "https://www.asco.org/practice-patients/guidelines" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor Extent (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 2 cm in greatest dimension"],
          ["T2", "T2 — Tumor > 2 cm but ≤ 4 cm in greatest dimension"],
          ["T3", "T3 — Tumor > 4 cm OR extension to lingual surface of epiglottis"],
          ["T4", "T4 — Invades larynx, deep muscle of tongue, medial pterygoid, hard palate, mandible, or skull base"]
        ]),
        makeS("cnCat", "Clinical Nodal Status (cN)", "cN0", [
          ["cN0", "cN0 — No regional lymph node metastasis"],
          ["cN1", "cN1 — One or more ipsilateral lymph nodes, none > 6 cm"],
          ["cN2", "cN2 — Contralateral or bilateral lymph nodes, none > 6 cm"],
          ["cN3", "cN3 — Lymph node(s) > 6 cm in greatest dimension"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (Stage IV)"]
        ])
      ],
      table: {
        headers: ["Clinical Stage", "TNM Grouping", "Standard Protocol"],
        rows: [
          { id: "hpvI", cols: ["Stage I", "T1-T2 cN0-cN1 M0", "Definitive IMRT radiotherapy alone or transoral robotic surgery (TORS) + neck dissection"] },
          { id: "hpvII", cols: ["Stage II", "T1-T2 cN2, or T3 cN0-cN2 M0", "Definitive concurrent chemoradiotherapy (Cisplatin + IMRT) or TORS + risk-adapted adjuvant therapy"] },
          { id: "hpvIII", cols: ["Stage III", "T4 or cN3 M0", "Concurrent high-dose Cisplatin + IMRT; clinical trials for de-escalation"] },
          { id: "hpvIV", cols: ["Stage IV", "Any T Any N M1", "Systemic immunotherapy (Pembrolizumab) ± platinum chemotherapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Clinical Stage IV (M1)", matchId: "hpvIV", eq: "Distant metastatic p16+ oropharyngeal cancer." };
        if (v.tCat === "T4" || v.cnCat === "cN3") return { value: "Clinical Stage III", matchId: "hpvIII", eq: "Advanced primary tumor or bulky nodes > 6 cm." };
        if (v.tCat === "T3" || v.cnCat === "cN2") return { value: "Clinical Stage II", matchId: "hpvII", eq: "Bilateral/contralateral nodes or T3 primary tumor." };
        return { value: "Clinical Stage I (T1-T2 cN0-cN1 M0)", matchId: "hpvI", eq: "Early HPV-mediated cancer with favorable long-term overall survival (>85-90%)." };
      }
    },
    {
      id: "hpvNegOropharynxHypopharynx",
      cat: "onco_hn_gi",
      type: "class",
      name: "HPV-Negative Oropharyngeal Cancer & Hypopharynx",
      desc: "AJCC 8th staging for traditional smoking/alcohol-associated oropharyngeal carcinoma (p16-negative) and hypopharyngeal carcinoma.",
      organ: "Hypopharynx / HPV-neg Oropharynx",
      region: "Head & Neck Oncology",
      subject: "HPV-Negative Head & Neck Cancer",
      keywords: ["hpv-negative", "hypopharynx", "pyriform sinus", "postcricoid", "p16-negative", "ajcc 8th"],
      guidance: "Hypopharynx sub-sites: Pyriform sinus, postcricoid area, posterior pharyngeal wall. Hypopharynx T1 ≤2cm (1 subsite); T2 2-4cm or >1 subsite; T3 >4cm or hemilarynx fixation; T4a thyroid/cricoid cartilage, hyoid, thyroid gland, strap muscles; T4b prevertebral fascia, carotid encasement.",
      literature: [{
        type: "Clinical Guidelines",
        icon: "📄",
        title: "Prognostic impact of the 8th edition AJCC staging in HPV-negative head and neck carcinoma",
        citation: "Huang SH, et al. Cancer. 2018;124(11):2327-2339.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/29579331/" },
          { text: "NCI Hypopharyngeal Cancer Treatment PDQ ↗", url: "https://www.cancer.gov/types/head-and-neck/hp/adult/hypopharyngeal-treatment-pdq" },
          { text: "NCCN Head and Neck Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "EHNS European Head and Neck Society ↗", url: "https://ehns.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor Extent (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 2 cm, confined to 1 subsite"],
          ["T2", "T2 — Tumor > 2 cm to ≤ 4 cm, or invades more than 1 subsite without hemilarynx fixation"],
          ["T3", "T3 — Tumor > 4 cm OR with hemilarynx fixation or esophageal extension"],
          ["T4a", "T4a — Invades thyroid/cricoid cartilage, hyoid bone, thyroid gland, or strap muscles"],
          ["T4b", "T4b — Invades prevertebral fascia, encases carotid artery, or mediastinal structures"]
        ]),
        makeS("nCat", "Regional Nodes (cN)", "N0", [
          ["N0", "cN0 — Regional nodes negative"],
          ["N1", "cN1 — Single ipsilateral node ≤ 3 cm, ENE negative"],
          ["N2a_b", "cN2a-b — Single ipsilateral >3 to ≤6 cm OR multiple ipsilateral ≤6 cm, ENE-"],
          ["N2c", "cN2c — Bilateral or contralateral nodes ≤ 6 cm, ENE-"],
          ["N3", "cN3 — Node > 6 cm (N3a) or clinical Extranodal Extension ENE+ (N3b)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Grouping", "Intervention"],
        rows: [
          { id: "negI", cols: ["Stage I", "T1 N0 M0", "Definitive radiotherapy or transoral endoscopic resection"] },
          { id: "negII", cols: ["Stage II", "T2 N0 M0", "Definitive IMRT or partial pharyngectomy"] },
          { id: "negIII", cols: ["Stage III", "T3 N0 or T1-T3 N1 M0", "Concurrent Chemoradiotherapy (organ preservation) or Total Laryngopharyngectomy"] },
          { id: "negIVA", cols: ["Stage IVA", "T4a N0-N1, or T1-T4a N2 M0", "Concurrent Chemoradiation or total laryngopharyngectomy + neck dissection"] },
          { id: "negIVB_C", cols: ["Stage IVB / IVC", "T4b Any N, Any T N3, or M1", "Palliative chemotherapy / anti-PD-1 (Pembrolizumab)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVC (M1)", matchId: "negIVB_C", eq: "Distant metastatic disease." };
        if (v.tCat === "T4b" || v.nCat === "N3") return { value: "Stage IVB", matchId: "negIVB_C", eq: "Locally unresectable / prevertebral invasion or ENE+." };
        if (v.tCat === "T4a" || v.nCat === "N2a_b" || v.nCat === "N2c") return { value: "Stage IVA", matchId: "negIVA", eq: "Cartilage invasion or multi-nodal metastasis." };
        if (v.tCat === "T3" || v.nCat === "N1") return { value: "Stage III", matchId: "negIII", eq: "Hemilarynx fixation or single ipsilateral node." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "negII", eq: "Tumor 2-4 cm or multiple subsites." };
        return { value: "Stage I (T1 N0 M0)", matchId: "negI", eq: "Early superficial tumor." };
      }
    },
    {
      id: "nasopharynxAJCC",
      cat: "onco_hn_gi",
      type: "class",
      name: "Nasopharyngeal Carcinoma (NPC - AJCC 8th)",
      desc: "EBV-associated endemic and non-endemic nasopharyngeal carcinoma staging.",
      organ: "Nasopharynx / Fossa of Rosenmüller",
      region: "Head & Neck Oncology",
      subject: "Nasopharyngeal Carcinoma",
      keywords: ["npc", "nasopharynx", "ebv", "rosenmuller", "gemcitabine", "cisplatin", "ajcc 8th"],
      guidance: "T1 confined to nasopharynx / oropharynx / nasal cavity; T2 parapharyngeal extension; T3 bony skull base, pterygoid, paranasal sinuses; T4 intracranial, cranial nerves, hypopharynx, orbit, parotid. N1 unilateral cervical / bilateral retropharyngeal ≤6cm; N2 bilateral cervical ≤6cm; N3 >6cm or below caudal border of cricoid cartilage.",
      literature: [{
        type: "Consensus Guidelines",
        icon: "📄",
        title: "Comparison of the 7th and 8th editions of the UICC/AJCC TNM staging system for nasopharyngeal carcinoma",
        citation: "Tang LL, et al. Lancet Oncol. 2016;17(4):452-460.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/26936725/" },
          { text: "NCI Nasopharyngeal Cancer Treatment PDQ ↗", url: "https://www.cancer.gov/types/head-and-neck/hp/adult/nasopharyngeal-treatment-pdq" },
          { text: "NCCN Nasopharyngeal Cancer Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "Chinese Society of Clinical Oncology (CSCO) NPC Guidelines ↗", url: "https://www.csco.org.cn/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Nasopharyngeal Tumor (T)", "T1", [
          ["T1", "T1 — Confined to nasopharynx, or extends to oropharynx/nasal cavity without parapharyngeal involvement"],
          ["T2", "T2 — Infiltrates parapharyngeal space, or prevertebral muscle, or medial pterygoid"],
          ["T3", "T3 — Infiltrates bony structures of skull base, cervical vertebra, pterygoid structures, or paranasal sinuses"],
          ["T4", "T4 — Intracranial extension, cranial nerve palsy, hypopharynx, orbit, parotid gland, or extensive lateral pterygoid"]
        ]),
        makeS("nCat", "Regional Cervical/Retropharyngeal Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Unilateral cervical lymph nodes ≤ 6 cm, and/or unilateral or bilateral retropharyngeal nodes ≤ 6 cm (above caudal cricoid)"],
          ["N2", "N2 — Bilateral cervical lymph nodes ≤ 6 cm, above caudal border of cricoid cartilage"],
          ["N3", "N3 — Cervical lymph node(s) > 6 cm, OR extension below caudal border of cricoid cartilage (supraclavicular fossa)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (bone, liver, lung)"]
        ])
      ],
      table: {
        headers: ["Stage", "Grouping", "Standard Clinical Protocol"],
        rows: [
          { id: "npcI", cols: ["Stage I", "T1 N0 M0", "Definitive IMRT radiotherapy alone (excellent disease control >95%)"] },
          { id: "npcII", cols: ["Stage II", "T2 N0, or T1-T2 N1 M0", "Concurrent Chemoradiotherapy (Cisplatin + IMRT) or IMRT alone"] },
          { id: "npcIII", cols: ["Stage III", "T3 N0-N2, or T1-T2 N2 M0", "Induction Chemotherapy (Gemcitabine + Cisplatin) followed by concurrent chemoradiotherapy"] },
          { id: "npcIVA", cols: ["Stage IVA", "T4 or N3 M0", "Induction GemCis + definitive concurrent chemoradiotherapy + adjuvant Capecitabine"] },
          { id: "npcIVB", cols: ["Stage IVB", "Any T Any N M1", "First-line Gemcitabine + Cisplatin + anti-PD-1 (Toripalimab / Pembrolizumab)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVB (M1)", matchId: "npcIVB", eq: "Distant metastatic NPC. Gemcitabine + Cisplatin + Toripalimab / anti-PD-1." };
        if (v.tCat === "T4" || v.nCat === "N3") return { value: "Stage IVA", matchId: "npcIVA", eq: "Intracranial/cranial nerve invasion or supraclavicular/bulky (>6cm) nodes." };
        if (v.tCat === "T3" || v.nCat === "N2") return { value: "Stage III", matchId: "npcIII", eq: "Skull base bony invasion or bilateral cervical lymph nodes." };
        if (v.tCat === "T2" || v.nCat === "N1") return { value: "Stage II", matchId: "npcII", eq: "Parapharyngeal space extension or unilateral/retropharyngeal nodal spread." };
        return { value: "Stage I (T1 N0 M0)", matchId: "npcI", eq: "Organ-confined nasopharyngeal carcinoma." };
      }
    },
    {
      id: "larynxCancerAJCC",
      cat: "onco_hn_gi",
      type: "class",
      name: "Laryngeal Carcinoma (Supraglottis, Glottis, Subglottis)",
      desc: "AJCC 8th staging system covering cord mobility, cartilage erosion, and subsite distribution.",
      organ: "Larynx (Vocal Cords / Epiglottis / Subglottis)",
      region: "Head & Neck Surgery",
      subject: "Laryngeal Cancer",
      keywords: ["larynx", "glottis", "supraglottis", "subglottis", "vocal cord", "paraglottic", "ajcc 8th"],
      guidance: "Glottis: T1a (1 cord), T1b (both cords); T2 (subglottis/supraglottis extension or impaired cord mobility); T3 (cord fixation or paraglottic space / minor thyroid cartilage invasion); T4a (through thyroid cartilage, trachea, strap muscles); T4b (prevertebral, carotid).",
      literature: [{
        type: "Consensus Reference",
        icon: "📄",
        title: "AJCC 8th Edition Staging for Larynx Cancer",
        citation: "Amin MB, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "NCI Adult Laryngeal Cancer Treatment PDQ ↗", url: "https://www.cancer.gov/types/head-and-neck/hp/adult/laryngeal-treatment-pdq" },
          { text: "NCCN Head and Neck Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "American Laryngological Association Guidelines ↗", url: "https://alahns.org/" }
        ]
      }],
      fields: [
        makeS("subsite", "Laryngeal Anatomical Subsite", "glottis", [
          ["glottis", "Glottis (True vocal cords and anterior commissure)"],
          ["supraglottis", "Supraglottis (Epiglottis, aryepiglottic folds, false cords, ventricles)"],
          ["subglottis", "Subglottis (Below true vocal cords to inferior cricoid border)"]
        ]),
        makeS("tCat", "Primary Laryngeal Tumor (T)", "T1", [
          ["T1", "T1 — Limited to subsite of origin, normal vocal cord mobility (T1a one cord, T1b both cords)"],
          ["T2", "T2 — Extension to adjacent subsite, or impaired vocal cord mobility"],
          ["T3", "T3 — True vocal cord fixation, OR paraglottic space invasion, OR minor thyroid cartilage erosion"],
          ["T4a", "T4a — Infiltrates through thyroid cartilage and/or extends into strap muscles, trachea, esophagus"],
          ["T4b", "T4b — Infiltrates prevertebral fascia, encases carotid artery, or invades mediastinum"]
        ]),
        makeS("nCat", "Regional Cervical Lymph Nodes (cN)", "N0", [
          ["N0", "cN0 — Regional nodes negative"],
          ["N1", "cN1 — Single ipsilateral node ≤ 3 cm, ENE negative"],
          ["N2", "cN2 — Ipsilateral >3 to ≤6 cm (N2a), multiple ipsilateral ≤6 cm (N2b), or bilateral/contralateral ≤6 cm (N2c)"],
          ["N3", "cN3 — Node > 6 cm (N3a) or clinical Extranodal Extension ENE+ (N3b)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Clinical Pathway"],
        rows: [
          { id: "larI", cols: ["Stage I", "T1 N0 M0", "Transoral laser microsurgery (TLM) or definitive radiation therapy (voice preservation >90%)"] },
          { id: "larII", cols: ["Stage II", "T2 N0 M0", "Definitive radiotherapy or transoral partial laryngectomy"] },
          { id: "larIII", cols: ["Stage III", "T3 N0 or T1-T3 N1 M0", "Concurrent Chemoradiotherapy (organ preservation protocol) or Total Laryngectomy if dysfunctional larynx"] },
          { id: "larIVA", cols: ["Stage IVA", "T4a N0-N1, or T1-T4a N2 M0", "Total Laryngectomy + bilateral neck dissection + adjuvant RT/CCRT, or definitive CCRT"] },
          { id: "larIVB_C", cols: ["Stage IVB / IVC", "T4b Any N, Any T N3, or M1", "Palliative chemotherapy / anti-PD-1 (Pembrolizumab)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVC (M1)", matchId: "larIVB_C", eq: "Distant metastatic laryngeal cancer." };
        if (v.tCat === "T4b" || v.nCat === "N3") return { value: "Stage IVB", matchId: "larIVB_C", eq: "Very advanced local disease (prevertebral / carotid) or ENE+." };
        if (v.tCat === "T4a" || v.nCat === "N2") return { value: "Stage IVA", matchId: "larIVA", eq: "Gross cartilage breach or multiple/contralateral cervical nodes." };
        if (v.tCat === "T3" || v.nCat === "N1") return { value: "Stage III", matchId: "larIII", eq: "Vocal cord fixation or single ipsilateral node." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "larII", eq: "Impaired cord mobility or multi-subsite extension." };
        return { value: "Stage I (T1 N0 M0)", matchId: "larI", eq: "Early mobile vocal cord tumor." };
      }
    },
    {
      id: "sinonasalCancerAJCC",
      cat: "onco_hn_gi",
      type: "class",
      name: "Nasal Cavity & Paranasal Sinuses (Maxillary & Ethmoid)",
      desc: "AJCC 8th staging for carcinomas of maxillary sinus and ethmoid sinus / nasal cavity.",
      organ: "Maxillary Sinus / Ethmoid Sinus / Nasal Cavity",
      region: "Head & Neck Surgery",
      subject: "Sinonasal Carcinomas",
      keywords: ["maxillary sinus", "ethmoid", "sinonasal", "cribriform plate", "orbit", "ajcc 8th"],
      guidance: "Maxillary: T1 mucosa of antrum; T2 bone erosion of hard palate/middle meatus; T3 posterior wall, subQ tissue, orbit floor; T4a anterior orbit, facial skin, pterygoid plates; T4b orbital apex, dura, brain, clivus. Ethmoid: T1 confined to ethmoid; T2 extends to nasal cavity; T3 anterior orbit/maxillary sinus; T4a cribriform plate, dura; T4b brain, orbital apex.",
      literature: [{
        type: "Sinonasal Staging Standard",
        icon: "📄",
        title: "AJCC Cancer Staging Manual 8th Edition: Nasal Cavity and Paranasal Sinuses",
        citation: "Amin MB, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "NCI Paranasal Sinus and Nasal Cavity Treatment PDQ ↗", url: "https://www.cancer.gov/types/head-and-neck/hp/adult/paranasal-sinus-treatment-pdq" },
          { text: "NCCN Head and Neck Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "American Rhinologic Society Oncology Guidelines ↗", url: "https://www.american-rhinologic.org/" }
        ]
      }],
      fields: [
        makeS("subsite", "Sinonasal Subsite", "maxillary", [
          ["maxillary", "Maxillary Sinus"],
          ["ethmoid", "Ethmoid Sinus / Nasal Cavity"]
        ]),
        makeS("tCat", "Primary Sinonasal Extent (T)", "T1", [
          ["T1", "T1 — Confined to mucosa of origin, no bone erosion"],
          ["T2", "T2 — Bone erosion/destruction (hard palate or middle meatus in maxillary; nasal cavity in ethmoid)"],
          ["T3", "T3 — Invades bone of posterior maxillary wall, ethmoid, facial subQ tissue, or medial/inferior orbit wall"],
          ["T4a", "T4a — Invades anterior orbit, skin of cheek, pterygoid plates, infratemporal fossa, or cribriform plate"],
          ["T4b", "T4b — Invades orbital apex, dura, brain, middle cranial fossa, cranial nerves, clivus, or nasopharynx"]
        ]),
        makeS("nCat", "Regional Nodes (cN)", "N0", [
          ["N0", "cN0 — Regional nodes negative"],
          ["N1", "cN1 — Single ipsilateral node ≤ 3 cm, ENE negative"],
          ["N2", "cN2 — Multiple ipsilateral, contralateral, or bilateral nodes ≤ 6 cm, ENE-"],
          ["N3", "cN3 — Node > 6 cm (N3a) or clinical ENE+ (N3b)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Intervention"],
        rows: [
          { id: "snI", cols: ["Stage I", "T1 N0 M0", "Endoscopic endonasal resection or infrastructure maxillectomy"] },
          { id: "snII", cols: ["Stage II", "T2 N0 M0", "Complete surgical resection (subtotal maxillectomy) ± adjuvant radiation"] },
          { id: "snIII", cols: ["Stage III", "T3 N0 or T1-T3 N1 M0", "Craniofacial / radical maxillectomy + postoperative IMRT / proton beam therapy"] },
          { id: "snIVA", cols: ["Stage IVA", "T4a N0-N1, or T1-T4a N2 M0", "Radical compartmental resection with orbital exenteration if involved + adjuvant CCRT"] },
          { id: "snIVB_C", cols: ["Stage IVB / IVC", "T4b Any N, Any T N3, or M1", "Definitive chemotherapy / radiation (often unresectable) or clinical trial"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVC (M1)", matchId: "snIVB_C", eq: "Distant metastatic sinonasal carcinoma." };
        if (v.tCat === "T4b" || v.nCat === "N3") return { value: "Stage IVB", matchId: "snIVB_C", eq: "Very advanced local disease (orbital apex, dura, brain, clivus)." };
        if (v.tCat === "T4a" || v.nCat === "N2") return { value: "Stage IVA", matchId: "snIVA", eq: "Moderately advanced local invasion or multi-nodal metastasis." };
        if (v.tCat === "T3" || v.nCat === "N1") return { value: "Stage III", matchId: "snIII", eq: "Bone erosion into orbit or single regional node." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "snII", eq: "Bone erosion confined to palate/meatus." };
        return { value: "Stage I (T1 N0 M0)", matchId: "snI", eq: "Early mucosal sinonasal cancer." };
      }
    },
    {
      id: "salivaryGlandCancerAJCC",
      cat: "onco_hn_gi",
      type: "class",
      name: "Major Salivary Gland Carcinomas (Parotid, Submandibular, Sublingual)",
      desc: "AJCC 8th staging for mucoepidermoid, adenoid cystic, and salivary duct carcinomas.",
      organ: "Parotid / Submandibular / Sublingual",
      region: "Head & Neck Surgery",
      subject: "Salivary Gland Malignancies",
      keywords: ["parotid", "salivary", "submandibular", "facial nerve", "adenoid cystic", "mucoepidermoid", "ajcc 8th"],
      guidance: "T1 ≤ 2 cm, no extraparenchymal extension (EPE); T2 > 2 to ≤ 4 cm, no EPE; T3 > 4 cm and/or soft tissue extraparenchymal extension; T4a invades skin, mandible, ear canal, or facial nerve; T4b skull base, pterygoid plates, or encases carotid.",
      literature: [{
        type: "Consensus Reference",
        icon: "📄",
        title: "Validation of the AJCC 8th Edition Staging System for Major Salivary Gland Carcinomas",
        citation: "Aro K, et al. Head Neck. 2019;41(1):173-181.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/30537402/" },
          { text: "NCI Salivary Gland Cancer Treatment PDQ ↗", url: "https://www.cancer.gov/types/head-and-neck/hp/adult/salivary-gland-treatment-pdq" },
          { text: "NCCN Salivary Gland Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "AHNS Salivary Section Portal ↗", url: "https://www.ahns.info/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Salivary Tumor (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 2 cm in greatest dimension without extraparenchymal extension"],
          ["T2", "T2 — Tumor > 2 cm but ≤ 4 cm in greatest dimension without extraparenchymal extension"],
          ["T3", "T3 — Tumor > 4 cm AND/OR having extraparenchymal extension into periglandular soft tissue"],
          ["T4a", "T4a — Invades skin, mandible, external auditory canal, and/or facial nerve (CN VII)"],
          ["T4b", "T4b — Invades skull base, pterygoid plates, or encases carotid artery"]
        ]),
        makeS("nCat", "Regional Cervical Nodes (cN)", "N0", [
          ["N0", "cN0 — Regional nodes negative"],
          ["N1", "cN1 — Single ipsilateral node ≤ 3 cm, ENE negative"],
          ["N2", "cN2 — Ipsilateral >3 to ≤6 cm, or multiple ipsilateral, or bilateral/contralateral ≤6 cm, ENE-"],
          ["N3", "cN3 — Node > 6 cm (N3a) or clinical ENE+ (N3b)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lung in adenoid cystic carcinoma)"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Management"],
        rows: [
          { id: "sgI", cols: ["Stage I", "T1 N0 M0", "Superficial/total parotidectomy with facial nerve preservation"] },
          { id: "sgII", cols: ["Stage II", "T2 N0 M0", "Total parotidectomy / submandibular gland excision ± neck dissection"] },
          { id: "sgIII", cols: ["Stage III", "T3 N0 or T1-T3 N1 M0", "Extended parotidectomy + neck dissection + postoperative radiotherapy"] },
          { id: "sgIVA", cols: ["Stage IVA", "T4a N0-N1, or T1-T4a N2 M0", "Radical parotidectomy with facial nerve sacrifice/grafting + neck dissection + PORT"] },
          { id: "sgIVB_C", cols: ["Stage IVB / IVC", "T4b Any N, Any T N3, or M1", "Palliative chemotherapy / Androgen Receptor targeted therapy (for Salivary Duct Carcinoma) / Lenvatinib"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVC (M1)", matchId: "sgIVB_C", eq: "Distant metastatic salivary carcinoma." };
        if (v.tCat === "T4b" || v.nCat === "N3") return { value: "Stage IVB", matchId: "sgIVB_C", eq: "Very advanced local skull base invasion or ENE+." };
        if (v.tCat === "T4a" || v.nCat === "N2") return { value: "Stage IVA", matchId: "sgIVA", eq: "Facial nerve or bone invasion, or multi-nodal metastasis." };
        if (v.tCat === "T3" || v.nCat === "N1") return { value: "Stage III", matchId: "sgIII", eq: "Extraparenchymal extension, tumor >4cm, or single ipsilateral node." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "sgII", eq: "Tumor 2-4 cm confined to gland." };
        return { value: "Stage I (T1 N0 M0)", matchId: "sgI", eq: "Small organ-confined tumor." };
      }
    },
    {
      id: "unknownPrimaryNeckNodes",
      cat: "onco_hn_gi",
      type: "class",
      name: "Cervical Nodes & Unknown Primary Tumors of Head & Neck",
      desc: "AJCC 8th staging algorithm for metastatic cervical adenopathy without an identified primary tumor (CUP-H&N).",
      organ: "Cervical Lymph Nodes / Waldeyer Ring",
      region: "Head & Neck Surgical Oncology",
      subject: "Carcinoma of Unknown Primary in Head & Neck",
      keywords: ["unknown primary", "cup", "cervical adenopathy", "ebv", "hpv", "p16", "ajcc 8th"],
      guidance: "Must be segregated by viral etiology: 1) HPV/p16-positive (staged as clinical HPV+ oropharyngeal cT0); 2) EBV-positive (staged as nasopharyngeal cT0); 3) HPV-negative / EBV-negative (staged under traditional Head & Neck nodal classification with ENE).",
      literature: [{
        type: "Consensus Staging",
        icon: "📄",
        title: "Carcinoma of Unknown Primary in the Head and Neck: AJCC 8th Edition Updates",
        citation: "Lydiatt WM, et al. CA Cancer J Clin. 2017;67(2):122-137.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28128848/" },
          { text: "NCI Head and Neck Unknown Primary PDQ ↗", url: "https://www.cancer.gov/types/head-and-neck" },
          { text: "NCCN Head and Neck Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "AHNS Unknown Primary Consensus Statement ↗", url: "https://www.ahns.info/" }
        ]
      }],
      fields: [
        makeS("biomarker", "Node Viral Biomarker Testing", "hpv_pos", [
          ["hpv_pos", "p16 / HPV-positive (presumed occult oropharynx)"],
          ["ebv_pos", "EBER / EBV-positive (presumed occult nasopharynx)"],
          ["neg", "p16-negative AND EBV-negative (traditional squamous cell carcinoma)"]
        ]),
        makeS("nCat", "Cervical Nodal Extent", "single_small", [
          ["single_small", "Single ipsilateral node ≤ 3 cm, ENE negative"],
          ["ipsi_mid", "Single ipsilateral node > 3 cm to ≤ 6 cm, ENE negative"],
          ["multi_ipsi", "Multiple ipsilateral nodes, none > 6 cm, ENE negative"],
          ["bilat", "Bilateral or contralateral nodes, none > 6 cm, ENE negative"],
          ["bulky", "Node(s) > 6 cm in dimension, ENE negative"],
          ["ene_pos", "Extranodal Extension present (clinically overt ENE+)"]
        ]),
        makeS("mCat", "Distant Metastasis", "M0", [
          ["M0", "M0 — Distant metastasis absent"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Etiology", "Assigned Stage", "Diagnostic & Therapeutic Workup"],
        rows: [
          { id: "cupHPV", cols: ["p16 / HPV-positive", "Clinical Stage I or II (Oropharynx Rules)", "Transoral robotic lingual/palatine mucosectomy + bilateral neck irradiation"] },
          { id: "cupEBV", cols: ["EBV-positive", "Clinical Stage II or III (Nasopharynx Rules)", "High-dose IMRT targeted to nasopharynx and bilateral neck lymphatic stations"] },
          { id: "cupNeg", cols: ["HPV-neg / EBV-neg", "Stage III to IVB (Traditional ENE Rules)", "Comprehensive bilateral neck dissection + adjuvant chemoradiation to Waldeyer ring"] },
          { id: "cupM1", cols: ["Distant Metastatic (M1)", "Stage IV / IVC", "Systemic immunotherapy + platinum doublet"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVC (M1)", matchId: "cupM1", eq: "Distant metastatic carcinoma of unknown primary." };
        if (v.biomarker === "hpv_pos") {
          var isStg1 = (v.nCat === "single_small" || v.nCat === "ipsi_mid" || v.nCat === "multi_ipsi");
          return {
            value: isStg1 ? "HPV+ CUP: Clinical Stage I (T0 N1 M0)" : "HPV+ CUP: Clinical Stage II (T0 N2 M0)",
            matchId: "cupHPV",
            eq: "Staged under HPV+ oropharyngeal rules. High cure rate with mucosal-directed chemoradiotherapy."
          };
        }
        if (v.biomarker === "ebv_pos") {
          return { value: "EBV+ CUP: Clinical Stage II / III", matchId: "cupEBV", eq: "Staged under nasopharyngeal rules. Presumed occult fossa of Rosenmüller primary." };
        }
        var matchNeg = (v.nCat === "ene_pos" || v.nCat === "bulky") ? "Stage IVB" : (v.nCat === "bilat" || v.nCat === "ipsi_mid" || v.nCat === "multi_ipsi") ? "Stage IVA" : "Stage III";
        return { value: "HPV-/EBV- CUP: " + matchNeg, matchId: "cupNeg", eq: "Aggressive biology; comprehensive mucosal and bilateral neck radiation required." };
      }
    },
    {
      id: "cutaneousScHeadNeck",
      cat: "onco_hn_gi",
      type: "class",
      name: "Cutaneous Carcinoma of Head & Neck (cSCC)",
      desc: "AJCC 8th Edition staging for cutaneous squamous cell carcinoma arising on the scalp, face, ears, and neck.",
      organ: "Head & Neck Skin / Dermis",
      region: "Dermatologic / Head & Neck Oncology",
      subject: "Head & Neck Cutaneous SCC",
      keywords: ["cscc", "cutaneous squamous", "head and neck skin", "perineural", "parotid node", "ajcc 8th"],
      guidance: "T1 ≤2cm; T2 >2 to ≤4cm; T3 >4cm or minor bone erosion or perineural invasion (nerve caliber ≥0.1mm) or deep invasion (>6mm); T4a gross cortical bone invasion; T4b skull base or skull base foramen. Note high risk of intra-parotid lymph node metastasis.",
      literature: [{
        type: "AJCC 8th Dermatology Standard",
        icon: "📄",
        title: "Validation of the AJCC 8th Edition Staging for Cutaneous Squamous Cell Carcinoma of the Head and Neck",
        citation: "Brunner M, et al. Eur J Surg Oncol. 2021;47(2):414-420.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/32958349/" },
          { text: "NCI Nonmelanoma Skin Cancer PDQ ↗", url: "https://www.cancer.gov/types/skin/hp/skin-treatment-pdq" },
          { text: "NCCN Squamous Cell Skin Cancer Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "Skin Cancer Foundation Medical Portal ↗", url: "https://www.skincancer.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Cutaneous SCC Extent (T)", "T1", [
          ["T1", "T1 — Maximum dimension ≤ 2 cm, no high-risk features"],
          ["T2", "T2 — Maximum dimension > 2 cm but ≤ 4 cm"],
          ["T3", "T3 — Dimension > 4 cm; OR minor bone erosion; OR perineural invasion (≥0.1mm); OR deep invasion (>6mm / beyond subcutaneous fat)"],
          ["T4a", "T4a — Gross cortical bone or marrow invasion"],
          ["T4b", "T4b — Skull base invasion or skull base foramen axial perineural invasion"]
        ]),
        makeS("nCat", "Regional Nodes (Parotid & Cervical Nodes)", "N0", [
          ["N0", "cN0 — Regional nodes negative"],
          ["N1", "cN1 — Single ipsilateral node ≤ 3 cm, ENE negative"],
          ["N2", "cN2 — Single node >3 to ≤6 cm, or multiple ipsilateral, or bilateral/contralateral ≤6 cm, ENE-"],
          ["N3", "cN3 — Node > 6 cm (N3a) or clinical ENE+ (N3b)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Management"],
        rows: [
          { id: "hncI", cols: ["Stage I", "T1 N0 M0", "Mohs micrographic surgery or wide local excision with 4-6 mm clear margins"] },
          { id: "hncII", cols: ["Stage II", "T2 N0 M0", "Wide local excision with margin control; consider sentinel node biopsy"] },
          { id: "hncIII", cols: ["Stage III", "T3 N0 or T1-T3 N1 M0", "Wide resection + superficial parotidectomy / neck dissection + adjuvant radiation"] },
          { id: "hncIV", cols: ["Stage IV", "T4, N2-N3, or M1", "Cemiplimab (anti-PD-1) or Pembrolizumab systemic immunotherapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.tCat.startsWith("T4") || v.nCat === "N2" || v.nCat === "N3") return { value: "Stage IV", matchId: "hncIV", eq: "Advanced cSCC with bone/skull base invasion or extensive nodes. Cemiplimab indicated." };
        if (v.tCat === "T3" || v.nCat === "N1") return { value: "Stage III", matchId: "hncIII", eq: "High risk due to deep/perineural invasion or single nodal metastasis." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "hncII", eq: "Intermediate tumor (2-4 cm)." };
        return { value: "Stage I (T1 N0 M0)", matchId: "hncI", eq: "Low risk superficial facial/scalp SCC." };
      }
    },
    {
      id: "mucosalMelanomaHeadNeck",
      cat: "onco_hn_gi",
      type: "class",
      name: "Mucosal Melanoma of the Head and Neck (AJCC 8th)",
      desc: "Staging for aggressive sinonasal and oral mucosal melanomas; classified only as Stage III, IVA, IVB, or IVC.",
      organ: "Sinonasal / Oral Cavity Mucosa",
      region: "Head & Neck Oncology",
      subject: "Mucosal Melanoma",
      keywords: ["mucosal melanoma", "sinonasal melanoma", "kit", "braf", "ajcc 8th"],
      guidance: "Reflecting intrinsically lethal biology, mucosal melanomas have NO Stage I or II. T3: Mucosa-confined; T4a: Involves deep cartilage, bone, skin; T4b: Involves brain, dura, skull base, carotid.",
      literature: [{
        type: "Consensus Guidelines",
        icon: "📄",
        title: "Head and neck mucosal melanoma: The 8th edition AJCC staging and treatment paradigm",
        citation: "López F, et al. Oral Oncol. 2020;105:104664.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/32247265/" },
          { text: "NCI Melanoma Health Professional PDQ ↗", url: "https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq" },
          { text: "NCCN Head and Neck Cancers Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "ESMO Clinical Practice Guidelines for Mucosal Melanoma ↗", url: "https://www.esmo.org/guidelines/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Mucosal Melanoma Extent (T)", "T3", [
          ["T3", "T3 — Mucosa-confined mucosal melanoma (all localized tumors start at T3)"],
          ["T4a", "T4a — Involves deep soft tissue, cartilage, bone, overlying skin, or orbit"],
          ["T4b", "T4b — Involves brain, dura mater, skull base, lower cranial nerves, or carotid artery"]
        ]),
        makeS("nCat", "Regional Cervical Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Regional lymph node metastasis present (automatically Stage IVA)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (Stage IVC)"]
        ])
      ],
      table: {
        headers: ["Stage Group", "TNM Criteria", "Therapeutic Protocol"],
        rows: [
          { id: "mmIII", cols: ["Stage III", "T3 N0 M0", "Complete wide surgical resection with negative margins + adjuvant proton or photon radiotherapy"] },
          { id: "mmIVA", cols: ["Stage IVA", "T4a N0, or T3-T4a N1 M0", "Radical compartmental resection + neck dissection + postoperative radiotherapy ± Nivolumab"] },
          { id: "mmIVB", cols: ["Stage IVB", "T4b Any N M0", "Unresectable local disease; dual immunotherapy (Nivolumab + Ipilimumab) or carbon ion therapy"] },
          { id: "mmIVC", cols: ["Stage IVC", "Any T Any N M1", "Dual checkpoint blockade (Nivo + Ipi) or targeted therapy if KIT/BRAF mutated"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVC (M1)", matchId: "mmIVC", eq: "Distant metastatic mucosal melanoma. Screen for KIT mutations." };
        if (v.tCat === "T4b") return { value: "Stage IVB (T4b)", matchId: "mmIVB", eq: "Locally unresectable / skull base or intracranial invasion." };
        if (v.tCat === "T4a" || v.nCat === "N1") return { value: "Stage IVA", matchId: "mmIVA", eq: "Locally moderately advanced or lymph node-positive mucosal melanoma." };
        return { value: "Stage III (T3 N0 M0)", matchId: "mmIII", eq: "Mucosa-confined tumor (earliest stage for mucosal melanoma)." };
      }
    },

    // ==============================================================
    // 2. DIGESTIVE SYSTEM SITES
    // ==============================================================
    {
      id: "esophagusEGJCancer",
      cat: "onco_hn_gi",
      type: "class",
      name: "Esophagus & Esophagogastric Junction (EGJ Carcinoma)",
      desc: "AJCC 8th clinical (cTNM) and pathologic (pTNM) staging for squamous cell carcinoma and adenocarcinoma of esophagus and EGJ (Siewert I/II).",
      organ: "Esophagus / Siewert I-II EGJ",
      region: "Gastrointestinal Oncology",
      subject: "Esophageal Malignancies",
      keywords: ["esophagus", "egj", "siewert", "squamous", "adenocarcinoma", "cross trial", "ajcc 8th"],
      guidance: "EGJ tumors with epicenter within 2 cm of the cardia extending into esophagus are staged as esophageal. Tis (HGD); T1a (lamina propria/muscularis mucosae); T1b (submucosa); T2 (muscularis propria); T3 (adventitia); T4a (pleura, pericardium, diaphragm, peritoneum); T4b (aorta, vertebral body, trachea).",
      literature: [{
        type: "AJCC 8th Landmark Study",
        icon: "📄",
        title: "AJCC Cancer Staging Manual 8th Edition: Esophagus and Esophagogastric Junction",
        citation: "Rice TW, et al. Ann Surg Oncol. 2017;24(4):857-864.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28105574/" },
          { text: "NCI Adult Esophageal Cancer Treatment PDQ ↗", url: "https://www.cancer.gov/types/esophageal/hp/esophageal-treatment-pdq" },
          { text: "NCCN Esophageal and EGJ Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "ESMO Clinical Practice Guidelines: Esophageal Cancer ↗", url: "https://www.esmo.org/guidelines/gastrointestinal-cancers/oesophageal-cancer" }
        ]
      }],
      fields: [
        makeS("histology", "Histological Subtype", "adeno", [
          ["adeno", "Adenocarcinoma"],
          ["squamous", "Squamous Cell Carcinoma"]
        ]),
        makeS("tCat", "Depth of Wall Invasion (T)", "T1b", [
          ["Tis", "Tis — High-grade dysplasia / intraepithelial"],
          ["T1a", "T1a — Invades lamina propria or muscularis mucosae"],
          ["T1b", "T1b — Invades submucosa"],
          ["T2", "T2 — Invades muscularis propria"],
          ["T3", "T3 — Invades adventitia"],
          ["T4a", "T4a — Invades pleura, pericardium, azygos vein, diaphragm, or peritoneum"],
          ["T4b", "T4b — Invades aorta, vertebral body, or trachea (unresectable)"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Metastasis in 1 or 2 regional lymph nodes"],
          ["N2", "N2 — Metastasis in 3 to 6 regional lymph nodes"],
          ["N3", "N3 — Metastasis in 7 or more regional lymph nodes"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (including non-regional lymph nodes)"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Multimodal Protocol"],
        rows: [
          { id: "es0_I", cols: ["Stage 0 / I", "Tis, T1a-b N0 M0", "Endoscopic submucosal dissection (ESD for T1a) or upfront transthoracic/transhiatal esophagectomy"] },
          { id: "esII", cols: ["Stage II", "T2 N0 M0 (Adeno) / T2-T3 N0 (SCC)", "Upfront surgery or neoadjuvant chemoradiation (CROSS regimen)"] },
          { id: "esIII", cols: ["Stage III", "T3-T4a N0-N2 M0, or T1-T2 N1-N2", "Neoadjuvant chemoradiotherapy (Carboplatin + Paclitaxel + 41.4 Gy) + esophagectomy + adjuvant Nivolumab (CheckMate 577)"] },
          { id: "esIVA_B", cols: ["Stage IVA / IVB", "T4b Any N, Any T N3 M0, or M1", "Definitive chemoradiation (for T4b) or systemic chemo-immunotherapy (FOLFOX + Nivolumab/Pembrolizumab)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVB (M1)", matchId: "esIVA_B", eq: "Distant metastatic esophageal cancer. HER2 & PD-L1 (CPS) testing indicated." };
        if (v.tCat === "T4b" || v.nCat === "N3") return { value: "Stage IVA", matchId: "esIVA_B", eq: "Unresectable vascular/tracheal invasion or ≥7 regional nodes." };
        if (v.tCat === "T4a" || v.nCat === "N2" || v.nCat === "N1" || v.tCat === "T3") return { value: "Stage III / IVA", matchId: "esIII", eq: "Locally advanced; candidate for CROSS trimodality therapy." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "esII", eq: "Muscularis propria invasion." };
        return { value: "Stage I (T1 N0 M0)", matchId: "es0_I", eq: "Early superficial mucosal/submucosal tumor." };
      }
    },
    {
      id: "stomachGastricCancer",
      cat: "onco_hn_gi",
      type: "class",
      name: "Gastric Carcinoma (Stomach - AJCC 8th)",
      desc: "AJCC 8th staging system for gastric adenocarcinoma based on depth of invasion and 16+ lymph node pathology threshold.",
      organ: "Stomach (Fundus, Body, Antrum, Pylorus)",
      region: "Gastrointestinal Oncology",
      subject: "Gastric Cancer",
      keywords: ["stomach", "gastric cancer", "adenocarcinoma", "d2 lymphadenectomy", "her2", "flot", "ajcc 8th"],
      guidance: "T1a (lamina propria/muscularis mucosae); T1b (submucosa); T2 (muscularis propria); T3 (subserosa); T4a (serosa/visceral peritoneum); T4b (adjacent structures). N1 (1-2 nodes); N2 (3-6 nodes); N3a (7-15 nodes); N3b (≥16 nodes). Adequate staging mandates ≥16 evaluated nodes.",
      literature: [{
        type: "Consensus Reference",
        icon: "📄",
        title: "The 8th Edition of the AJCC Cancer Staging Manual: Stomach",
        citation: "In H, et al. Ann Surg Oncol. 2017;24(13):3801-3809.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28956247/" },
          { text: "NCI Gastric Cancer Treatment PDQ ↗", url: "https://www.cancer.gov/types/stomach/hp/stomach-treatment-pdq" },
          { text: "NCCN Gastric Cancer Practice Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "Japanese Gastric Cancer Association (JGCA) Guidelines ↗", url: "https://www.jgca.jp/" }
        ]
      }],
      fields: [
        makeS("tCat", "Depth of Gastric Wall Invasion (T)", "T1a", [
          ["Tis", "Tis — Carcinoma in situ / intraepithelial"],
          ["T1a", "T1a — Invades lamina propria or muscularis mucosae"],
          ["T1b", "T1b — Invades submucosa"],
          ["T2", "T2 — Invades muscularis propria"],
          ["T3", "T3 — Invades subserosal connective tissue (without serosal breach)"],
          ["T4a", "T4a — Infiltrates serosa (visceral peritoneum)"],
          ["T4b", "T4b — Infiltrates adjacent structures (pancreas, spleen, liver, colon, diaphragm)"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (pN)", "N0", [
          ["N0", "pN0 — No regional lymph node metastasis"],
          ["N1", "pN1 — Metastasis in 1 to 2 regional lymph nodes"],
          ["N2", "pN2 — Metastasis in 3 to 6 regional lymph nodes"],
          ["N3a", "pN3a — Metastasis in 7 to 15 regional lymph nodes"],
          ["N3b", "pN3b — Metastasis in 16 or more regional lymph nodes"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (including positive peritoneal cytology CY1)"]
        ])
      ],
      table: {
        headers: ["Stage", "Grouping", "Clinical Strategy"],
        rows: [
          { id: "gasIA", cols: ["Stage IA", "T1 N0 M0", "Endoscopic resection (ESD) for expanded criteria, or subtotal/total gastrectomy"] },
          { id: "gasIB_II", cols: ["Stage IB / IIA / IIB", "T1-T2 N1, T3 N0, T4a N0", "Perioperative FLOT chemotherapy (4 pre + 4 post cycles) + D2 radical gastrectomy"] },
          { id: "gasIII", cols: ["Stage IIIA / IIIB / IIIC", "T3-T4 N1-N3b M0", "Perioperative FLOT chemotherapy + radical D2 gastrectomy"] },
          { id: "gasIV", cols: ["Stage IV", "Any T Any N M1", "Palliative chemotherapy + Nivolumab (for CPS≥5) or Trastuzumab (if HER2+) or Zolbetuximab (Claudin 18.2+)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV (M1 / CY1)", matchId: "gasIV", eq: "Metastatic gastric cancer (or positive peritoneal cytology CY1)." };
        if (v.nCat === "N3b" || (v.tCat === "T4b" && (v.nCat === "N2" || v.nCat === "N3a"))) {
        return { value: "Stage IIIC", matchId: "gasIII", eq: "High nodal burden (≥16 nodes) or T4b with extensive nodes." };
        }
        if (v.tCat === "T4b" || v.nCat === "N3a" || (v.tCat === "T4a" && v.nCat === "N2") || (v.tCat === "T3" && v.nCat === "N2")) {
        return { value: "Stage IIIB", matchId: "gasIII", eq: "Locally advanced gastric cancer." };
        }
        if (v.tCat === "T4a" || v.nCat === "N2" || (v.tCat === "T3" && v.nCat === "N1") || (v.tCat === "T2" && v.nCat === "N2")) {
        return { value: "Stage IIIA", matchId: "gasIII", eq: "Locally advanced; candidate for perioperative FLOT." };
        }
        if (v.tCat === "T3" || (v.tCat === "T2" && v.nCat === "N1") || (v.tCat === "T1b" && v.nCat === "N2")) {
        return { value: "Stage IIB", matchId: "gasIB_II", eq: "Intermediate resectable gastric carcinoma." };
        }
        if (v.tCat === "T2" || (v.tCat === "T1b" && v.nCat === "N1") || (v.tCat === "T1a" && v.nCat === "N1")) {
        return { value: "Stage IB", matchId: "gasIB_II", eq: "Early resectable gastric carcinoma." };
        }
        return { value: "Stage IA (T1 N0 M0)", matchId: "gasIA", eq: "Early superficial tumor; candidate for ESD or upfront gastrectomy." };
      }
    },
    {
      id: "smallIntestineCarcinoma",
      cat: "onco_hn_gi",
      type: "class",
      name: "Small Intestine Adenocarcinoma (Duodenum, Jejunum, Ileum)",
      desc: "AJCC 8th staging system for adenocarcinomas of the duodenum, jejunum, and ileum.",
      organ: "Duodenum / Jejunum / Ileum",
      region: "Gastrointestinal Oncology",
      subject: "Small Bowel Adenocarcinoma",
      keywords: ["small intestine", "duodenum", "jejunum", "ileum", "whipple", "ajcc 8th"],
      guidance: "T1a (lamina propria); T1b (submucosa); T2 (muscularis propria); T3 (subserosa or non-peritonealized perimuscular tissue ≤2cm); T4 (perforates visceral peritoneum or invades other organs). Duodenal tumors involving pancreas are T4.",
      literature: [{
        type: "AJCC 8th Staging",
        icon: "📄",
        title: "AJCC Cancer Staging Manual 8th Edition: Small Intestine",
        citation: "Amin MB, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "NCI Small Intestine Cancer PDQ ↗", url: "https://www.cancer.gov/types/small-intestine" },
          { text: "NCCN Small Bowel Adenocarcinoma Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "ESMO Clinical Guidelines: Small Intestinal Cancers ↗", url: "https://www.esmo.org/guidelines/" }
        ]
      }],
      fields: [
        makeS("tCat", "Depth of Wall Invasion (T)", "T1", [
          ["T1", "T1 — Invades lamina propria, muscularis mucosae, or submucosa"],
          ["T2", "T2 — Invades muscularis propria"],
          ["T3", "T3 — Invades subserosa or non-peritonealized perimuscular retroperitoneal tissue"],
          ["T4", "T4 — Perforates visceral peritoneum or directly invades other organs/structures (e.g., pancreas)"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Metastasis in 1 or 2 regional lymph nodes"],
          ["N2", "N2 — Metastasis in 3 or more regional lymph nodes"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "TNM Grouping", "Management"],
        rows: [
          { id: "smI", cols: ["Stage I", "T1-T2 N0 M0", "Segmental bowel resection with mesenteric lymphadenectomy (or Whipple for duodenum)"] },
          { id: "smII", cols: ["Stage IIA / IIB", "T3 N0 (IIA) / T4 N0 M0 (IIB)", "Complete en bloc oncologic resection ± adjuvant FOLFOX"] },
          { id: "smIII", cols: ["Stage IIIA / IIIB", "Any T N1 (IIIA) / Any T N2 M0 (IIIB)", "Radical resection + 6 months adjuvant FOLFOX / CAPOX"] },
          { id: "smIV", cols: ["Stage IV", "Any T Any N M1", "Palliative FOLFOX / FOLFIRI + Bevacizumab; checkpoint inhibitor if MSI-H"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV (M1)", matchId: "smIV", eq: "Distant metastatic small bowel adenocarcinoma. Test for MSI-H/dMMR." };
        if (v.nCat === "N2") return { value: "Stage IIIB", matchId: "smIII", eq: "High nodal burden (≥3 regional nodes). Adjuvant chemotherapy indicated." };
        if (v.nCat === "N1") return { value: "Stage IIIA", matchId: "smIII", eq: "Regional nodal metastasis." };
        if (v.tCat === "T4") return { value: "Stage IIB", matchId: "smII", eq: "Visceral serosal perforation or adjacent organ invasion." };
        if (v.tCat === "T3") return { value: "Stage IIA", matchId: "smII", eq: "Subserosal / retroperitoneal invasion." };
        return { value: "Stage I (T1-T2 N0 M0)", matchId: "smI", eq: "Early small bowel tumor confined to wall." };
      }
    },
    {
      id: "appendixCarcinomaAJCC",
      cat: "onco_hn_gi",
      type: "class",
      name: "Appendix: Carcinoma & Goblet Cell Carcinoid / Adenocarcinoma",
      desc: "AJCC 8th staging system for non-neuroendocrine epithelial appendiceal neoplasia and Goblet Cell Adenocarcinoma (GCC).",
      organ: "Appendix",
      region: "Gastrointestinal Oncology",
      subject: "Appendiceal Carcinomas",
      keywords: ["appendix", "goblet cell", "adenocarcinoma", "pseudomyxoma peritonei", "pmp", "hipec", "ajcc 8th"],
      guidance: "Tis includes Low-Grade Appendiceal Mucinous Neoplasm (LAMN) confined to wall. T1 (submucosa); T2 (muscularis); T3 (subserosa/mesoappendix); T4a (peritoneal serosa, PMP); T4b (adjacent organs). M1a (intraperitoneal acellular mucin); M1b (peritoneal metastases with tumor cells); M1c (non-peritoneal distant organs).",
      literature: [{
        type: "AJCC 8th Staging Review",
        icon: "📄",
        title: "The 8th Edition of the AJCC Staging System for Appendiceal Carcinomas",
        citation: "Overman MJ, et al. Ann Surg Oncol. 2018;25(7):1927-1934.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/29679261/" },
          { text: "NCI Adult Appendix Tumors Overview ↗", url: "https://www.cancer.gov/" },
          { text: "NCCN Colon and Appendix Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "PSOGI Consensus on Peritoneal Surface Malignancies ↗", url: "https://www.psogi.com/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Appendiceal Tumor (T)", "T1", [
          ["Tis", "Tis — Carcinoma in situ / LAMN confined to appendiceal wall"],
          ["T1", "T1 — Tumor ≤ 2 cm, invades submucosa"],
          ["T2", "T2 — Invades muscularis propria"],
          ["T3", "T3 — Invades subserosa or mesoappendix"],
          ["T4a", "T4a — Perforates visceral peritoneum (including mucinous implants on appendiceal serosa)"],
          ["T4b", "T4b — Directly invades other adjacent organs/structures"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — Regional nodes negative"],
          ["N1", "N1 — Metastasis in 1 to 3 regional nodes"],
          ["N2", "N2 — Metastasis in 4 or more regional nodes"]
        ]),
        makeS("mCat", "Distant Metastasis & Peritoneal Spread (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1a", "M1a — Intraperitoneal acellular mucin only"],
          ["M1b", "M1b — Intraperitoneal metastasis INCLUDING malignant cells (Pseudomyxoma Peritonei)"],
          ["M1c", "M1c — Extraperitoneal distant metastases (liver, lung, bone)"]
        ])
      ],
      table: {
        headers: ["Stage", "TNM Grouping", "Management"],
        rows: [
          { id: "apI", cols: ["Stage I", "T1-T2 N0 M0", "Appendectomy alone or right hemicolectomy (for Goblet Cell Adenocarcinoma / high grade)"] },
          { id: "apII", cols: ["Stage IIA / IIB / IIC", "T3 (IIA), T4a (IIB), T4b (IIC) N0 M0", "Right hemicolectomy with mesenteric lymphadenectomy"] },
          { id: "apIII", cols: ["Stage III", "Any T N1-N2 M0", "Right hemicolectomy + adjuvant FOLFOX chemotherapy"] },
          { id: "apIVA_C", cols: ["Stage IVA / IVB / IVC", "M1a (IVA), M1b (IVB), M1c (IVC)", "Cytoreductive Surgery (CRS) + Hyperthermic Intraperitoneal Chemotherapy (HIPEC)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1c") return { value: "Stage IVC (Extraperitoneal Mets)", matchId: "apIVA_C", eq: "Systemic chemotherapy (FOLFOX/FOLFIRI + Bevacizumab)." };
        if (v.mCat === "M1b") return { value: "Stage IVB (Pseudomyxoma Peritonei)", matchId: "apIVA_C", eq: "Peritoneal carcinomatosis. Complete cytoreduction (CRS) + HIPEC." };
        if (v.mCat === "M1a") return { value: "Stage IVA (Acellular Mucin)", matchId: "apIVA_C", eq: "Acellular mucin spill; favorable survival with complete surgical cytoreduction." };
        if (v.nCat !== "N0") return { value: "Stage III", matchId: "apIII", eq: "Node-positive appendiceal carcinoma. Adjuvant chemotherapy." };
        if (v.tCat === "T4b") return { value: "Stage IIC", matchId: "apII", eq: "Direct invasion of adjacent organs." };
        if (v.tCat === "T4a") return { value: "Stage IIB", matchId: "apII", eq: "Peritoneal serosal breach." };
        if (v.tCat === "T3") return { value: "Stage IIA", matchId: "apII", eq: "Subserosa / mesoappendix invasion." };
        return { value: "Stage I (T1-T2 N0 M0)", matchId: "apI", eq: "Organ-confined appendiceal neoplasm." };
      }
    },
    {
      id: "colorectalCancerAJCC",
      cat: "onco_hn_gi",
      type: "class",
      name: "Colon and Rectum (Colorectal Carcinoma - AJCC 8th)",
      desc: "Standard TNM classification for adenocarcinoma of the colon and rectum integrating tumor deposits (N1c).",
      organ: "Colon / Rectum",
      region: "Gastrointestinal Oncology",
      subject: "Colorectal Carcinoma",
      keywords: ["colon", "rectum", "colorectal", "tnm", "tumor deposits", "msi-h", "kras", "ajcc 8th"],
      guidance: "T1 (submucosa); T2 (muscularis propria); T3 (subserosa / perirectal fat); T4a (visceral peritoneum); T4b (adjacent organ). N1a (1 node), N1b (2-3 nodes), N1c (tumor deposits without nodes); N2a (4-6 nodes), N2b (≥7 nodes). M1a (1 site), M1b (≥2 sites), M1c (peritoneal).",
      literature: [{
        type: "AJCC 8th Staging Manual",
        icon: "📄",
        title: "The Eighth Edition AJCC Cancer Staging Manual: Colorectal Cancer",
        citation: "Weiser MR. Ann Surg Oncol. 2018;25(6):1454-1455.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/29616422/" },
          { text: "NCI Colon Cancer Treatment PDQ ↗", url: "https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq" },
          { text: "NCCN Colon and Rectal Cancer Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "ESMO Clinical Practice Guidelines: Colorectal Cancer ↗", url: "https://www.esmo.org/guidelines/gastrointestinal-cancers/colorectal-cancer" }
        ]
      }],
      fields: [
        makeS("tCat", "Depth of Wall Invasion (T)", "T1", [
          ["Tis", "Tis — Carcinoma in situ / intramucosal carcinoma"],
          ["T1", "T1 — Invades submucosa"],
          ["T2", "T2 — Invades muscularis propria"],
          ["T3", "T3 — Invades through muscularis into subserosa or non-peritonealized pericolic/perirectal tissues"],
          ["T4a", "T4a — Infiltrates through visceral peritoneum"],
          ["T4b", "T4b — Directly invades or adheres to other adjacent organs/structures"]
        ]),
        makeS("nCat", "Regional Nodes & Tumor Deposits (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1a", "N1a — 1 regional lymph node metastasis"],
          ["N1b", "N1b — 2 to 3 regional lymph nodes metastasis"],
          ["N1c", "N1c — Tumor deposits in subserosa/mesentery without regional lymph node metastasis"],
          ["N2a", "N2a — 4 to 6 regional lymph nodes metastasis"],
          ["N2b", "N2b — 7 or more regional lymph nodes metastasis"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1a", "M1a — Distant metastasis to a single organ (liver, lung, ovary) without peritoneal metastasis"],
          ["M1b", "M1b — Distant metastasis to two or more sites/organs without peritoneal metastasis"],
          ["M1c", "M1c — Distant metastasis to peritoneal surface with or without other organ metastases"]
        ])
      ],
      table: {
        headers: ["Stage Group", "TNM Grouping", "Clinical Strategy"],
        rows: [
          { id: "crcI", cols: ["Stage I", "T1-T2 N0 M0", "Oncologic segmental colectomy with complete mesocolic excision (CME) or Total Mesorectal Excision (TME); no adjuvant chemo"] },
          { id: "crcII", cols: ["Stage IIA – IIC", "T3 (IIA), T4a (IIB), T4b (IIC) N0 M0", "Surgical resection; adjuvant Capecitabine/FOLFOX considered for high-risk features (T4, perforation, <12 nodes)"] },
          { id: "crcIII", cols: ["Stage IIIA – IIIC", "Any T N1-N2 M0", "Surgical resection + 3–6 months adjuvant CAPOX/FOLFOX; check MMR/MSI status"] },
          { id: "crcIV", cols: ["Stage IVA – IVC", "Any T Any N M1a-M1c", "Targeted therapy: FOLFOX/FOLFIRI + anti-EGFR (RAS wild-type) or anti-VEGF; Pembrolizumab for MSI-H"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1c") return { value: "Stage IVC (Peritoneal Mets)", matchId: "crcIV", eq: "Peritoneal carcinomatosis. Evaluate for cytoreductive surgery + HIPEC." };
        if (v.mCat === "M1b") return { value: "Stage IVB", matchId: "crcIV", eq: "Multiple organ metastases. Systemic doublet/triplet chemotherapy + biologic." };
        if (v.mCat === "M1a") return { value: "Stage IVA (Oligometastatic)", matchId: "crcIV", eq: "Single organ metastasis (e.g. resectable liver or lung lesion)." };
        if (v.nCat !== "N0") {
          var isHighN = (v.nCat === "N2b" || (v.tCat.startsWith("T4") && v.nCat.startsWith("N2")));
          return { value: isHighN ? "Stage IIIC" : "Stage IIIA / IIIB", matchId: "crcIII", eq: "Node-positive colorectal cancer. Adjuvant CAPOX (3 mo) or FOLFOX (6 mo)." };
        }
        if (v.tCat === "T4b") return { value: "Stage IIC", matchId: "crcII", eq: "Direct adjacent organ invasion." };
        if (v.tCat === "T4a") return { value: "Stage IIB", matchId: "crcII", eq: "Visceral peritoneal perforation. High risk for recurrence." };
        if (v.tCat === "T3") return { value: "Stage IIA", matchId: "crcII", eq: "Penetrates muscularis into subserosa." };
        if (v.tCat === "Tis") return { value: "Stage 0 (Tis N0 M0)", matchId: "crcI", eq: "Carcinoma in situ." };
        return { value: "Stage I (" + v.tCat + " N0 M0)", matchId: "crcI", eq: "Early organ-confined colon/rectal cancer. Surgery alone curative in >90%." };
      }
    },
    {
      id: "analCanalCarcinoma",
      cat: "onco_hn_gi",
      type: "class",
      name: "Anal Canal & Perianal Skin (Squamous Cell Carcinoma)",
      desc: "AJCC 8th staging for HPV-associated anal canal and perianal carcinoma treated with definitive Nigro chemoradiotherapy.",
      organ: "Anal Canal / Perianal Skin",
      region: "Colorectal / Surgical Oncology",
      subject: "Anal Cancer",
      keywords: ["anal canal", "anal cancer", "nigro protocol", "hpv", "inguinal nodes", "mitomycin", "ajcc 8th"],
      guidance: "T1 ≤2cm; T2 >2 to ≤5cm; T3 >5cm; T4 invades adjacent organs (vagina, urethra, bladder; NOT sphincter or perianal skin). N1a (inguinal, mesorectal, internal iliac); N1b (external iliac); N1c (bilateral inguinal/iliac).",
      literature: [{
        type: "Consensus Guidelines",
        icon: "📄",
        title: "The 8th Edition AJCC Staging System for Anal Cancer",
        citation: "Glynne-Jones R, et al. Colorectal Dis. 2017;19(11):1038-1044.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28833989/" },
          { text: "NCI Adult Anal Cancer Treatment PDQ ↗", url: "https://www.cancer.gov/types/anal/hp/anal-treatment-pdq" },
          { text: "NCCN Anal Carcinoma Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "ESMO-ESSO-ESTRO Anal Cancer Guidelines ↗", url: "https://www.esmo.org/guidelines/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Anal Tumor (T)", "T1", [
          ["Tis", "Tis — High-grade squamous intraepithelial lesion (AIN II-III / Bowen's)"],
          ["T1", "T1 — Tumor ≤ 2 cm in greatest dimension"],
          ["T2", "T2 — Tumor > 2 cm but ≤ 5 cm in greatest dimension"],
          ["T3", "T3 — Tumor > 5 cm in greatest dimension"],
          ["T4", "T4 — Invades adjacent organs: vagina, urethra, bladder (rectal wall or sphincter does NOT count)"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — Regional nodes negative"],
          ["N1a", "N1a — Inguinal, mesorectal, or internal iliac lymph nodes"],
          ["N1b", "N1b — External iliac lymph nodes"],
          ["N1c", "N1c — Bilateral inguinal and/or external/internal iliac nodes"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (liver, lung)"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Treatment Strategy"],
        rows: [
          { id: "anI", cols: ["Stage I", "T1 N0 M0", "Definitive Chemoradiotherapy (Nigro Protocol: 5-FU + Mitomycin C + IMRT)"] },
          { id: "anII", cols: ["Stage IIA / IIB", "T2 N0 (IIA) / T3 N0 M0 (IIB)", "Nigro Chemoradiotherapy (sphincter-sparing definitive intent)"] },
          { id: "anIII", cols: ["Stage IIIA – IIIC", "T4 N0 (IIIA) / T1-T2 N1 (IIIB) / T3-T4 N1 (IIIC)", "Definitive Chemoradiotherapy with simultaneous integrated boost to involved nodes; APR reserved for salvage"] },
          { id: "anIV", cols: ["Stage IV", "Any T Any N M1", "Systemic chemotherapy (Carboplatin + Paclitaxel) ± anti-PD-1 (Retifanlimab / Pembrolizumab)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV (M1)", matchId: "anIV", eq: "Metastatic anal cancer. First-line Carboplatin + Paclitaxel." };
        if (v.nCat.startsWith("N1")) {
          return { value: (v.tCat === "T3" || v.tCat === "T4") ? "Stage IIIC" : "Stage IIIB", matchId: "anIII", eq: "Regional nodal disease. Nigro protocol chemoradiation." };
        }
        if (v.tCat === "T4") return { value: "Stage IIIA (T4 N0 M0)", matchId: "anIII", eq: "Direct invasion into adjacent pelvic organs (vagina, bladder, urethra)." };
        if (v.tCat === "T3") return { value: "Stage IIB (T3 N0 M0)", matchId: "anII", eq: "Primary tumor > 5 cm." };
        if (v.tCat === "T2") return { value: "Stage IIA (T2 N0 M0)", matchId: "anII", eq: "Tumor 2–5 cm." };
        return { value: "Stage I (T1 N0 M0)", matchId: "anI", eq: "Early anal canal carcinoma; highly curable with Nigro regimen." };
      }
    },
    {
      id: "gistTumorRiskStaging",
      cat: "onco_hn_gi",
      type: "class",
      name: "Gastrointestinal Stromal Tumor (GIST - Miettinen / AJCC 8th)",
      desc: "Risk stratifier and TNM staging based on anatomical primary site (gastric vs non-gastric), size, and mitotic rate per 5 mm².",
      organ: "Stomach / Small Bowel / Rectum",
      region: "Gastrointestinal Oncology",
      subject: "Gastrointestinal Stromal Tumors",
      keywords: ["gist", "c-kit", "imatinib", "mitotic count", "cd117", "dog1", "miettinen", "ajcc 8th"],
      guidance: "Mitotic rate cutoff: ≤ 5 per 5 mm² (low) vs > 5 per 5 mm² (high). Non-gastric GISTs (small intestine, rectum) carry much higher risk than gastric GISTs of the same size.",
      literature: [{
        type: "Landmark Risk Classification",
        icon: "📄",
        title: "Gastrointestinal Stromal Tumors: Pathology and Prognosis at Different Sites",
        citation: "Miettinen M, Lasota J. Semin Diagn Pathol. 2006;23(2):70-83.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/17195498/" },
          { text: "NCI Adult GIST Treatment PDQ ↗", url: "https://www.cancer.gov/types/soft-tissue-sarcoma/hp/gist-treatment-pdq" },
          { text: "NCCN GIST Practice Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "ESMO-EURACAN-GENTURIS Clinical Practice Guidelines for GIST ↗", url: "https://www.esmo.org/guidelines/" }
        ]
      }],
      fields: [
        makeS("site", "Anatomical Primary Site", "gastric", [
          ["gastric", "Stomach (Gastric GIST — Favorable site)"],
          ["non_gastric", "Small Intestine, Colon, Rectum, or Mesentery (Unfavorable sites)"]
        ]),
        makeS("size", "Tumor Greatest Dimension", "sz1", [
          ["sz1", "≤ 2.0 cm"],
          ["sz2", "> 2.0 cm to ≤ 5.0 cm"],
          ["sz3", "> 5.0 cm to ≤ 10.0 cm"],
          ["sz4", "> 10.0 cm"]
        ]),
        makeS("mitosis", "Mitotic Index per 5 mm² (approx 50 HPF)", "low", [
          ["low", "≤ 5 mitoses per 5 mm² (Low Mitotic Rate)"],
          ["high", "> 5 mitoses per 5 mm² (High Mitotic Rate)"]
        ]),
        makeS("mets", "Distant Metastasis / Peritoneal Seeding", "M0", [
          ["M0", "M0 — No distant or peritoneal metastases"],
          ["M1", "M1 — Liver metastases or peritoneal seeding present (Stage IV)"]
        ])
      ],
      table: {
        headers: ["Risk Category", "Anatomic Profile", "Adjuvant Imatinib Protocol"],
        rows: [
          { id: "gVeryLow", cols: ["Very Low / None", "Gastric ≤2cm or non-gastric ≤2cm with low mitoses", "Complete surgical resection; observation alone"] },
          { id: "gLow", cols: ["Low Risk", "Gastric 2-5cm low mitoses, non-gastric 2-5cm low mitoses", "Surgical resection with clear margins; surveillance"] },
          { id: "gInt", cols: ["Intermediate Risk", "Gastric 5-10cm low mitoses, or gastric ≤5cm high mitoses", "Surgical resection; consider adjuvant Imatinib"] },
          { id: "gHigh", cols: ["High Risk", ">5cm with high mitoses, >10cm, or non-gastric >5cm", "Adjuvant Imatinib (400 mg daily) for 3 full years (SSGXVIII/AIO trial)"] },
          { id: "gMets", cols: ["Stage IV / Metastatic", "Peritoneal or hepatic metastasis", "Continuous Imatinib; mutational testing (KIT exon 9, 11; PDGFRA D842V)"] }
        ]
      },
      calc: function (v) {
        if (v.mets === "M1") return { value: "Stage IV (Metastatic GIST)", matchId: "gMets", eq: "Metastatic GIST. Mutational testing mandatory (Imatinib first line, Avapritinib for PDGFRA D842V)." };
        var isGastric = v.site === "gastric";
        var isHighMit = v.mitosis === "high";
        var sz = v.size;
        var risk = "Low Risk";
        var match = "gLow";
        if (isHighMit) {
          if (sz !== "sz1") { risk = "High Risk"; match = "gHigh"; }
          else { risk = isGastric ? "Low/Moderate" : "High Risk"; match = isGastric ? "gInt" : "gHigh"; }
        } else {
          if (sz === "sz4") { risk = isGastric ? "Moderate Risk" : "High Risk"; match = isGastric ? "gInt" : "gHigh"; }
          else if (sz === "sz3") { risk = isGastric ? "Low Risk" : "Moderate Risk"; match = isGastric ? "gLow" : "gInt"; }
          else if (sz === "sz1") { risk = "Very Low Risk"; match = "gVeryLow"; }
        }
        return {
          value: risk + " GIST (" + (isGastric ? "Gastric" : "Non-Gastric") + ")",
          matchId: match,
          eq: (risk === "High Risk") ? "High recurrence risk: 3 years of adjuvant Imatinib 400 mg daily indicated." : "Surgical resection with negative pseudocapsule margins."
        };
      }
    },
    {
      id: "giNeuroendocrineTumors",
      cat: "onco_hn_gi",
      type: "class",
      name: "Well-Differentiated NETs (Stomach, Duodenum, Ileum, Appendix, Colorectum, Pancreas)",
      desc: "WHO / ENETS / AJCC 8th staging and grading (Ki-67 / Mitotic Count) for well-differentiated neuroendocrine tumors.",
      organ: "Gastroenteropancreatic Neuroendocrine System",
      region: "Neuroendocrine Oncology",
      subject: "GEP-NET Staging",
      keywords: ["net", "neuroendocrine", "carcinoid", "ki-67", "pancreas net", "enets", "prrt", "ajcc 8th"],
      guidance: "WHO Grade: G1 (Ki-67 <3%, mitoses <2); G2 (Ki-67 3-20%, mitoses 2-20); G3 (Ki-67 >20%, mitoses >20, but well-differentiated morphology). Pancreatic NET T1 ≤2cm; T2 2-4cm; T3 >4cm or duodenum/bile duct; T4 celiac axis or SMA.",
      literature: [{
        type: "ENETS & AJCC Guidelines",
        icon: "📄",
        title: "The 8th Edition AJCC Staging System for Gastroenteropancreatic Neuroendocrine Tumors",
        citation: "Amin MB, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "NCI Pancreatic and Gastrointestinal NETs PDQ ↗", url: "https://www.cancer.gov/types/gi-neuroendocrine-tumors" },
          { text: "ENETS Consensus Guidelines ↗", url: "https://www.enets.org/guidelines/" },
          { text: "NANETS Neuroendocrine Tumor Guidelines ↗", url: "https://nanets.net/" }
        ]
      }],
      fields: [
        makeS("subsite", "GEP-NET Subsite", "pnet", [
          ["stomach", "Stomach (Type 1, 2, or 3)"],
          ["small_bowel", "Duodenum, Ampulla, Jejunum, or Ileum"],
          ["appendix", "Appendix (≤2 cm vs >2 cm)"],
          ["colorectum", "Colon or Rectum"],
          ["pnet", "Pancreas (PanNET)"]
        ]),
        makeS("grade", "WHO 2019 / 2022 Histologic Grade", "g1", [
          ["g1", "Grade 1 (Ki-67 < 3% AND < 2 mitoses/2 mm²)"],
          ["g2", "Grade 2 (Ki-67 3% – 20% OR 2–20 mitoses/2 mm²)"],
          ["g3", "Grade 3 (Ki-67 > 20%, Well-differentiated morphology)"]
        ]),
        makeS("tCat", "Primary Tumor Extent (T)", "T1", [
          ["T1", "T1 — Organ-confined small tumor (e.g., PanNET ≤ 2 cm; bowel invades lamina propria/submucosa ≤ 1 cm)"],
          ["T2", "T2 — PanNET > 2 cm to ≤ 4 cm; or bowel invades muscularis propria"],
          ["T3", "T3 — PanNET > 4 cm or invades duodenum/bile duct; or bowel invades subserosa"],
          ["T4", "T4 — Invades adjacent organs or major vascular encasement (celiac axis, SMA)"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — Negative regional lymph nodes"],
          ["N1", "N1 — Positive regional lymph nodes"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1a", "M1a — Hepatic metastases only"],
          ["M1b", "M1b — Extrahepatic metastasis (lung, bone, peritoneum)"],
          ["M1c", "M1c — Both hepatic and extrahepatic metastases"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Intervention"],
        rows: [
          { id: "netI", cols: ["Stage I", "T1 N0 M0", "Endoscopic resection (for small gastric/rectal NET) or conservative enucleation / partial resection"] },
          { id: "netII", cols: ["Stage II", "T2-T3 N0 M0", "Radical oncologic resection with lymph node clearance"] },
          { id: "netIII", cols: ["Stage III", "T4 N0 or Any T N1 M0", "En bloc resection if resectable; somatostatin analog (Octreotide/Lanreotide) if residual"] },
          { id: "netIV", cols: ["Stage IV", "Any T Any N M1", "Somatostatin analogs (SSA), 177Lu-DOTATATE (PRRT), Everolimus, Sunitinib, or liver debulking"] }
        ]
      },
      calc: function (v) {
        if (v.mCat.startsWith("M1")) return { value: "Stage IV (" + v.mCat + ")", matchId: "netIV", eq: "Metastatic GEP-NET. Somatostatin receptor imaging (68Ga-DOTATATE PET) and SSA / PRRT." };
        if (v.nCat === "N1" || v.tCat === "T4") return { value: "Stage III", matchId: "netIII", eq: "Regional nodal involvement or vascular/adjacent organ invasion." };
        if (v.tCat === "T2" || v.tCat === "T3") return { value: "Stage II", matchId: "netII", eq: "Intermediate size or deep muscular/serosal invasion." };
        return { value: "Stage I (T1 N0 M0 - " + v.grade.toUpperCase() + ")", matchId: "netI", eq: "Localized small neuroendocrine tumor; favorable prognosis." };
      }
    },
    {
      id: "liverHccIccAJCC",
      cat: "onco_hn_gi",
      type: "class",
      name: "Liver: Hepatocellular Carcinoma & Intrahepatic Cholangiocarcinoma",
      desc: "AJCC 8th Edition staging for primary liver malignancies (HCC and iCCA).",
      organ: "Liver / Hepatic Parenchyma",
      region: "Hepatobiliary Oncology",
      subject: "Primary Liver Cancers",
      keywords: ["hcc", "cholangiocarcinoma", "icca", "bclc", "microvascular invasion", "ajcc 8th"],
      guidance: "HCC: T1a (solitary ≤2cm); T1b (solitary >2cm without vascular invasion); T2 (solitary >2cm with vascular invasion OR multiple ≤5cm); T3 (multiple >5cm); T4 (portal vein or hepatic vein invasion).",
      literature: [{
        type: "Hepatology Staging Standard",
        icon: "📄",
        title: "Validation of the AJCC 8th Edition Staging for Hepatocellular Carcinoma",
        citation: "Kamarajah SK, et al. J Surg Oncol. 2019;120(4):657-666.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/31348530/" },
          { text: "NCI Adult Primary Liver Cancer PDQ ↗", url: "https://www.cancer.gov/types/liver/hp/adult-liver-treatment-pdq" },
          { text: "AASLD Guidelines for the Treatment of Hepatocellular Carcinoma ↗", url: "https://www.aasld.org/practice-guidelines" },
          { text: "EASL Clinical Practice Guidelines: Management of HCC ↗", url: "https://easl.eu/publications/clinical-practice-guidelines/" }
        ]
      }],
      fields: [
        makeS("tumorType", "Primary Liver Malignancy", "hcc", [
          ["hcc", "Hepatocellular Carcinoma (HCC)"],
          ["icca", "Intrahepatic Cholangiocarcinoma (iCCA)"]
        ]),
        makeS("tCat", "Tumor Number, Size & Vascular Invasion (T)", "T1a", [
          ["T1a", "T1a — Solitary tumor ≤ 2 cm, with or without vascular invasion"],
          ["T1b", "T1b — Solitary tumor > 2 cm WITHOUT vascular invasion"],
          ["T2", "T2 — Solitary tumor > 2 cm WITH vascular invasion; OR multiple tumors, none > 5 cm"],
          ["T3", "T3 — Multiple tumors, at least one > 5 cm"],
          ["T4", "T4 — Tumor(s) involving major branch of portal or hepatic vein, or perforating visceral peritoneum"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — Regional nodes negative"],
          ["N1", "N1 — Regional lymph node metastasis present (hilar, celiac, caval)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lung, bone)"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Clinical Recommendation"],
        rows: [
          { id: "livIA", cols: ["Stage IA", "T1a N0 M0", "Surgical resection or radiofrequency/microwave ablation (RFA/MWA)"] },
          { id: "livIB", cols: ["Stage IB", "T1b N0 M0", "Partial hepatectomy or orthotopic liver transplantation (within Milan criteria)"] },
          { id: "livII", cols: ["Stage II", "T2 N0 M0", "Liver resection, transplantation (Milan criteria), or TACE/TARE"] },
          { id: "livIII", cols: ["Stage IIIA / IIIB", "T3 (IIIA) / T4 (IIIB) N0 M0", "Locoregional therapy (TACE, Y90) or Atezolizumab + Bevacizumab / Tremelimumab + Durvalumab"] },
          { id: "livIV", cols: ["Stage IVA / IVB", "Any T N1 M0 (IVA) / M1 (IVB)", "First-line dual immunotherapy: Atezolizumab + Bevacizumab or STRIDE regimen"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVB (M1)", matchId: "livIV", eq: "Distant metastatic liver cancer. Systemic immunotherapy first-line." };
        if (v.nCat === "N1") return { value: "Stage IVA (N1)", matchId: "livIV", eq: "Regional lymph node metastasis." };
        if (v.tCat === "T4") return { value: "Stage IIIB (T4 N0 M0)", matchId: "livIII", eq: "Gross vascular macro-invasion (portal vein / hepatic vein branch)." };
        if (v.tCat === "T3") return { value: "Stage IIIA (T3 N0 M0)", matchId: "livIII", eq: "Multiple liver tumors with at least one > 5 cm." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "livII", eq: "Multifocal tumors ≤ 5 cm or solitary with vascular invasion." };
        if (v.tCat === "T1b") return { value: "Stage IB", matchId: "livIB", eq: "Solitary tumor > 2 cm without vascular invasion." };
        return { value: "Stage IA (T1a N0 M0)", matchId: "livIA", eq: "Solitary small liver mass ≤ 2 cm. Highly amenable to ablation or resection." };
      }
    },
    {
      id: "gallbladderCancerAJCC",
      cat: "onco_hn_gi",
      type: "class",
      name: "Gallbladder Carcinoma (AJCC 8th)",
      desc: "Staging based on depth of gallbladder wall infiltration and peritoneal vs hepatic sidedness.",
      organ: "Gallbladder / Cystic Duct",
      region: "Hepatobiliary Oncology",
      subject: "Gallbladder Cancer",
      keywords: ["gallbladder", "cholecystectomy", "peritoneal", "hepatic sidedness", "ajcc 8th"],
      guidance: "T1a (lamina propria); T1b (muscularis); T2a (peritoneal side subserosa); T2b (hepatic side subserosa without liver invasion); T3 (perforates serosa or directly invades liver ≤2cm); T4 (main portal vein/hepatic artery or ≥2 extrahepatic organs).",
      literature: [{
        type: "AJCC 8th Staging Manual",
        icon: "📄",
        title: "Validation of the AJCC 8th Edition Staging System for Gallbladder Cancer",
        citation: "Craig T, et al. HPB (Oxford). 2018;20(11):1018-1025.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/29960783/" },
          { text: "NCI Gallbladder Cancer Treatment PDQ ↗", url: "https://www.cancer.gov/types/gallbladder" },
          { text: "NCCN Hepatobiliary Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "E-AHPBA Gallbladder Guidelines ↗", url: "https://www.eahpba.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Depth of Wall Invasion & Sidedness (T)", "T1a", [
          ["Tis", "Tis — Carcinoma in situ"],
          ["T1a", "T1a — Invades lamina propria"],
          ["T1b", "T1b — Invades muscularis propria"],
          ["T2a", "T2a — Invades perimuscular connective tissue on PERITONEAL side (no serosal breach)"],
          ["T2b", "T2b — Invades perimuscular connective tissue on HEPATIC side (no liver invasion)"],
          ["T3", "T3 — Perforates serosa (visceral peritoneum) AND/OR directly invades liver or 1 adjacent organ"],
          ["T4", "T4 — Invades main portal vein or hepatic artery, or invades 2 or more extrahepatic organs"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Metastasis in 1 to 3 regional lymph nodes (cystic, choledochal, hilar)"],
          ["N2", "N2 — Metastasis in 4 or more regional lymph nodes (peripancreatic, celiac, SMA)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (peritoneal carcinomatosis)"]
        ])
      ],
      table: {
        headers: ["Stage", "TNM Grouping", "Surgical Action"],
        rows: [
          { id: "gbI", cols: ["Stage I", "T1 N0 M0", "Simple cholecystectomy alone is curative for T1a; completion resection advised for T1b"] },
          { id: "gbII", cols: ["Stage IIA / IIB", "T2a (IIA) / T2b (IIB) N0 M0", "Extended cholecystectomy (wedge resection of liver bed IVB/V + portal lymphadenectomy)"] },
          { id: "gbIII", cols: ["Stage IIIA / IIIB", "T3 N0 (IIIA) / T1-T3 N1 M0 (IIIB)", "Radical en bloc cholecystectomy + formal bisegmentectomy IVB/V + lymphadenectomy + adjuvant Capecitabine"] },
          { id: "gbIV", cols: ["Stage IVA / IVB", "T4 N0-N1 (IVA) / Any T N2 or M1 (IVB)", "Gemcitabine + Cisplatin + Durvalumab (TOPAZ-1 regimen)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.nCat === "N2") return { value: "Stage IVB", matchId: "gbIV", eq: "Metastatic gallbladder cancer or ≥4 regional lymph nodes. TOPAZ-1 chemo-immunotherapy." };
        if (v.tCat === "T4") return { value: "Stage IVA", matchId: "gbIV", eq: "Major portal/hepatic artery encasement or multiple adjacent organ invasion." };
        if (v.nCat === "N1") return { value: "Stage IIIB", matchId: "gbIII", eq: "1 to 3 regional lymph nodes involved." };
        if (v.tCat === "T3") return { value: "Stage IIIA", matchId: "gbIII", eq: "Direct liver invasion (≤2cm) or serosal breach." };
        if (v.tCat === "T2b") return { value: "Stage IIB (Hepatic Side)", matchId: "gbII", eq: "Hepatic-sided T2; high risk of occult micro-metastases to liver bed." };
        if (v.tCat === "T2a") return { value: "Stage IIA (Peritoneal Side)", matchId: "gbII", eq: "Peritoneal-sided T2; extended radical resection recommended." };
        return { value: "Stage I (T1 N0 M0)", matchId: "gbI", eq: "Early organ-confined tumor." };
      }
    },
    {
      id: "bileDuctsPerihilarDistal",
      cat: "onco_hn_gi",
      type: "class",
      name: "Bile Ducts (Intrahepatic, Perihilar Klatskin & Distal Extrahepatic)",
      desc: "AJCC 8th Edition staging algorithms distinguishing Perihilar (Klatskin) from Distal Extrahepatic Cholangiocarcinoma.",
      organ: "Perihilar & Distal Bile Ducts",
      region: "Hepatobiliary Surgery",
      subject: "Biliary Tract Carcinomas",
      keywords: ["cholangiocarcinoma", "klatskin", "perihilar", "distal bile duct", "bismuth-corlette", "ajcc 8th"],
      guidance: "Perihilar: T1 confined to duct; T2a beyond wall into fat; T2b into adjacent liver parenchyma; T3 unilateral portal vein/hepatic artery; T4 bilateral portal/hepatic vessels or secondary biliary branches bilaterally. Distal: T1 depth <5mm; T2 depth 5-12mm; T3 depth >12mm; T4 celiac axis, SMA, or hepatic artery.",
      literature: [{
        type: "Biliary Staging Standard",
        icon: "📄",
        title: "The 8th Edition AJCC Staging System for Perihilar and Distal Cholangiocarcinoma",
        citation: "Ruzzenente A, et al. HPB (Oxford). 2018;20(8):729-736.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/29729864/" },
          { text: "NCI Bile Duct Cancer (Cholangiocarcinoma) PDQ ↗", url: "https://www.cancer.gov/types/liver/hp/bile-duct-treatment-pdq" },
          { text: "NCCN Hepatobiliary Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "International Cholangiocarcinoma Research Network (ICRN) ↗", url: "https://cholangiocarcinoma.org/" }
        ]
      }],
      fields: [
        makeS("site", "Bile Duct Primary Site", "perihilar", [
          ["perihilar", "Perihilar Cholangiocarcinoma (Klatskin Tumor)"],
          ["distal", "Distal Extrahepatic Cholangiocarcinoma (Below cystic duct junction)"]
        ]),
        makeS("tCat", "Primary Biliary Tumor Extent (T)", "T1", [
          ["T1", "T1 — Perihilar: confined to duct | Distal: depth of invasion < 5 mm"],
          ["T2", "T2 — Perihilar: invades adipose or liver | Distal: depth of invasion 5 mm to 12 mm"],
          ["T3", "T3 — Perihilar: unilateral vascular branch | Distal: depth of invasion > 12 mm"],
          ["T4", "T4 — Perihilar: main portal vein / bilateral branches | Distal: invades celiac axis, SMA, or common hepatic artery"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — Regional nodes negative"],
          ["N1", "N1 — 1 to 3 regional lymph nodes positive"],
          ["N2", "N2 — 4 or more regional lymph nodes positive"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Definition", "Surgical / Medical Protocol"],
        rows: [
          { id: "bdI", cols: ["Stage I", "T1 N0 M0", "En bloc bile duct resection (Whipple for distal; major hepatectomy for perihilar)"] },
          { id: "bdII", cols: ["Stage II", "T2 N0 M0", "Radical surgical resection with negative margins (R0) + lymphadenectomy"] },
          { id: "bdIII", cols: ["Stage IIIA / IIIB / IIIC", "T3-T4 N0 (IIIA/B) or Any T N1 (IIIC)", "Major hepatectomy with caudate lobectomy (perihilar) or pancreaticoduodenectomy + adjuvant Capecitabine (BILCAP)"] },
          { id: "bdIV", cols: ["Stage IV", "Any T N2 or M1", "Palliative chemotherapy: Gemcitabine + Cisplatin + Durvalumab ± FGFR2/IDH1 inhibitors"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.nCat === "N2") return { value: "Stage IV", matchId: "bdIV", eq: "Metastatic biliary tract cancer or extensive nodal disease (≥4 nodes). Check for FGFR2 fusions / IDH1 mutations." };
        if (v.nCat === "N1" || v.tCat === "T4" || v.tCat === "T3") return { value: "Stage III", matchId: "bdIII", eq: "Vascular invasion or regional nodal spread. Adjuvant Capecitabine (BILCAP regimen)." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "bdII", eq: "Invasion into liver/fat (perihilar) or 5-12mm depth (distal)." };
        return { value: "Stage I (T1 N0 M0)", matchId: "bdI", eq: "Early superficial ductal carcinoma." };
      }
    },
    {
      id: "ampullaOfVaterCarcinoma",
      cat: "onco_hn_gi",
      type: "class",
      name: "Ampulla of Vater Carcinoma (AJCC 8th)",
      desc: "AJCC 8th staging based on depth of invasion into sphincter of Oddi, duodenal wall, and pancreas.",
      organ: "Ampulla of Vater",
      region: "Hepatobiliary / Pancreatic Surgery",
      subject: "Ampullary Carcinoma",
      keywords: ["ampulla", "ampullary", "whipple", "duodenum", "pancreaticoduodenectomy", "ajcc 8th"],
      guidance: "T1a (limited to ampulla/sphincter of Oddi); T1b (extends beyond sphincter into duodenal submucosa); T2 (invades duodenal muscularis propria); T3a (invades pancreas ≤0.5cm); T3b (invades pancreas >0.5cm or peripancreatic tissue); T4 (celiac axis, SMA).",
      literature: [{
        type: "Consensus Reference",
        icon: "📄",
        title: "Validation of the AJCC 8th Edition Staging for Ampullary Carcinoma",
        citation: "Balachandran VP, et al. HPB (Oxford). 2018;20(9):834-842.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/29729865/" },
          { text: "NCI Ampullary Cancer Overview ↗", url: "https://www.cancer.gov/" },
          { text: "NCCN Ampullary Cancer Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "IHPBA International HPB Guidelines ↗", url: "https://www.ihpba.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Depth of Ampullary Tumor Invasion (T)", "T1a", [
          ["T1a", "T1a — Confined to ampulla of Vater or sphincter of Oddi"],
          ["T1b", "T1b — Extends beyond sphincter of Oddi into duodenal submucosa"],
          ["T2", "T2 — Invades muscularis propria of the duodenum"],
          ["T3a", "T3a — Invades pancreas to a depth of ≤ 0.5 cm"],
          ["T3b", "T3b — Invades pancreas > 0.5 cm OR extends into peripancreatic tissue"],
          ["T4", "T4 — Involves celiac axis, superior mesenteric artery, or common hepatic artery"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — Regional nodes negative"],
          ["N1", "N1 — 1 to 3 regional lymph nodes positive"],
          ["N2", "N2 — 4 or more regional lymph nodes positive"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Intervention"],
        rows: [
          { id: "amIA", cols: ["Stage IA", "T1a N0 M0", "Pancreaticoduodenectomy (Whipple) or endoscopic papillectomy in select benign/adenoma"] },
          { id: "amIB", cols: ["Stage IB", "T1b-T2 N0 M0", "Standard pancreaticoduodenectomy (Whipple procedure)"] },
          { id: "amII", cols: ["Stage IIA / IIB", "T3a (IIA) / T3b (IIB) N0 M0", "Pancreaticoduodenectomy with negative margins + adjuvant chemotherapy"] },
          { id: "amIII", cols: ["Stage IIIA / IIIB", "Any T N1 (IIIA) / Any T N2 or T4 Any N (IIIB)", "Whipple + regional lymphadenectomy + adjuvant chemotherapy (Gemcitabine/Capecitabine)"] },
          { id: "amIV", cols: ["Stage IV", "Any T Any N M1", "Palliative chemotherapy (mFOLFIRINOX or Gemcitabine-Cisplatin)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV (M1)", matchId: "amIV", eq: "Metastatic ampullary adenocarcinoma." };
        if (v.tCat === "T4" || v.nCat === "N2") return { value: "Stage IIIB", matchId: "amIII", eq: "Arterial encasement or ≥4 regional lymph nodes." };
        if (v.nCat === "N1") return { value: "Stage IIIA", matchId: "amIII", eq: "1 to 3 regional lymph nodes positive." };
        if (v.tCat === "T3b") return { value: "Stage IIB", matchId: "amII", eq: "Deep pancreatic invasion (>0.5 cm)." };
        if (v.tCat === "T3a") return { value: "Stage IIA", matchId: "amII", eq: "Superficial pancreatic invasion (≤0.5 cm)." };
        if (v.tCat === "T1b" || v.tCat === "T2") return { value: "Stage IB", matchId: "amIB", eq: "Duodenal submucosa or muscularis invasion." };
        return { value: "Stage IA (T1a N0 M0)", matchId: "amIA", eq: "Confined to ampulla/sphincter; 5-year overall survival >65-70%." };
      }
    },
    {
      id: "pancreasAdenocarcinomaAJCC",
      cat: "onco_hn_gi",
      type: "class",
      name: "Exocrine Pancreas (Pancreatic Ductal Adenocarcinoma - PDAC)",
      desc: "AJCC 8th Edition size-based T-classification and clinical resectability criteria.",
      organ: "Pancreas (Head, Body, Tail)",
      region: "Gastrointestinal Oncology",
      subject: "Pancreatic Carcinoma",
      keywords: ["pancreas", "pdac", "whipple", "folfirinox", "sma", "celiac axis", "ajcc 8th"],
      guidance: "T1 ≤2 cm (T1a ≤0.5cm, T1b 0.5-1cm, T1c 1-2cm); T2 >2 to ≤4 cm; T3 >4 cm; T4 celiac axis, SMA, or common hepatic artery (unresectable). N1 (1-3 nodes), N2 (≥4 nodes).",
      literature: [{
        type: "AJCC 8th Staging Landmark",
        icon: "📄",
        title: "Validation of the AJCC 8th Edition Staging for Pancreatic Ductal Adenocarcinoma",
        citation: "Allen PJ, et al. Ann Surg. 2017;265(1):185-191.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/27564755/" },
          { text: "NCI Adult Pancreatic Cancer Treatment PDQ ↗", url: "https://www.cancer.gov/types/pancreatic/hp/pancreatic-treatment-pdq" },
          { text: "NCCN Pancreatic Adenocarcinoma Practice Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "American Pancreatic Association (APA) Guidelines ↗", url: "https://www.american-pancreatic-association.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Pancreatic Tumor Size & Extension (T)", "T1c", [
          ["T1a", "T1a — Tumor ≤ 0.5 cm in greatest dimension"],
          ["T1b", "T1b — Tumor > 0.5 cm but ≤ 1 cm in greatest dimension"],
          ["T1c", "T1c — Tumor > 1 cm but ≤ 2 cm in greatest dimension"],
          ["T2", "T2 — Tumor > 2 cm but ≤ 4 cm in greatest dimension"],
          ["T3", "T3 — Tumor > 4 cm in greatest dimension (confined to pancreas/peripancreatic fat)"],
          ["T4", "T4 — Involves celiac axis, superior mesenteric artery (SMA), or common hepatic artery (locally advanced / unresectable)"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Metastasis in 1 to 3 regional lymph nodes"],
          ["N2", "N2 — Metastasis in 4 or more regional lymph nodes"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (liver, peritoneum, lungs)"]
        ])
      ],
      table: {
        headers: ["Stage Group", "TNM Grouping", "Clinical Pathway"],
        rows: [
          { id: "panIA", cols: ["Stage IA", "T1 N0 M0 (≤ 2 cm)", "Upfront surgical resection (Whipple or distal pancreatectomy) + 6 months adjuvant mFOLFIRINOX"] },
          { id: "panIB", cols: ["Stage IB", "T2 N0 M0 (2–4 cm)", "Upfront surgical resection or neoadjuvant mFOLFIRINOX + adjuvant chemotherapy"] },
          { id: "panII", cols: ["Stage IIA / IIB", "T3 N0 (IIA) / T1-T3 N1 M0 (IIB)", "Neoadjuvant FOLFIRINOX or upfront resection + extended lymphadenectomy + adjuvant mFOLFIRINOX"] },
          { id: "panIII", cols: ["Stage III", "T4 Any N M0, or Any T N2 M0", "Locally advanced: Induction mFOLFIRINOX / Gemcitabine + nab-Paclitaxel ± SBRT"] },
          { id: "panIV", cols: ["Stage IV", "Any T Any N M1", "Palliative chemotherapy: mFOLFIRINOX or Gemcitabine + nab-Paclitaxel; germline BRCA testing for Olaparib"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV (M1)", matchId: "panIV", eq: "Metastatic pancreatic ductal adenocarcinoma. Test for germline BRCA1/2." };
        if (v.tCat === "T4" || v.nCat === "N2") return { value: "Stage III (Locally Advanced / High Nodal)", matchId: "panIII", eq: "Arterial abutment/encasement or ≥4 regional nodes. Neoadjuvant systemic therapy." };
        if (v.nCat === "N1") return { value: "Stage IIB (N1 M0)", matchId: "panII", eq: "1 to 3 regional lymph nodes positive." };
        if (v.tCat === "T3") return { value: "Stage IIA (T3 N0 M0)", matchId: "panII", eq: "Primary tumor > 4 cm." };
        if (v.tCat === "T2") return { value: "Stage IB (T2 N0 M0)", matchId: "panIB", eq: "Primary tumor 2–4 cm." };
        return { value: "Stage IA (" + v.tCat + " N0 M0)", matchId: "panIA", eq: "Small organ-confined pancreatic mass (≤ 2 cm)." };
      }
    },
    // ==============================================================
    // 3. THORAX & RESPIRATORY SITES
    // ==============================================================
    {
      id: "lungCancerTNM",
      cat: "onco",
      type: "class",
      name: "Lung Carcinoma (NSCLC & SCLC - AJCC/IASLC 8th/9th Ed.)",
      desc: "TNM classification and stage grouping for Non-Small Cell Lung Carcinoma (NSCLC) and Small Cell Lung Carcinoma (SCLC).",
      organ: "Lung / Bronchial Tree / Mediastinal Nodes",
      region: "Thoracic Oncology",
      subject: "Thoracic Malignancies",
      keywords: ["lung cancer", "nsclc", "sclc", "iaslc", "tnm", "ajcc 8th", "ajcc 9th", "mediastinum"],
      guidance: "1. T-category is determined by tumor size (cutoff steps: ≤1cm, ≤2cm, ≤3cm, ≤4cm, ≤5cm, ≤7cm, >7cm) and specific invasive features (main bronchus, visceral pleura, chest wall, phrenic nerve, carina, heart).\n2. N-category: N1 (ipsilateral peribronchial/hilar), N2 (ipsilateral mediastinal/subcarinal), N3 (contralateral mediastinal/hilar or supraclavicular).\n3. SCLC is staged both by TNM and Veterans Affairs (VALSG) classification (Limited vs Extensive Stage).",
      literature: [{
        type: "IASLC & AJCC Staging Standard",
        icon: "📄",
        title: "The IASLC Lung Cancer Staging Project: Proposals for Coding T, N, and M in the AJCC/UICC Staging Manual",
        citation: "Goldstraw P, et al. J Thorac Oncol. 2016;11(1):39-51.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/26762738/" },
          { text: "NCI Adult Lung Cancer PDQ ↗", url: "https://www.cancer.gov/types/lung/hp/non-small-cell-lung-treatment-pdq" },
          { text: "IASLC Staging Resources Portal ↗", url: "https://www.iaslc.org/research-education/staging-handbooks-and-resources" },
          { text: "NCCN Non-Small Cell Lung Cancer Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor Extent (T)", "T1b", [
          ["Tis", "Tis — Carcinoma in situ (adenocarcinoma in situ / squamous CIS)"],
          ["T1mi", "T1mi — Minimally invasive adenocarcinoma (≤ 3 cm, invasion ≤ 5 mm)"],
          ["T1a", "T1a — Tumor ≤ 1 cm in greatest dimension"],
          ["T1b", "T1b — Tumor > 1 cm but ≤ 2 cm in greatest dimension"],
          ["T1c", "T1c — Tumor > 2 cm but ≤ 3 cm in greatest dimension"],
          ["T2a", "T2a — Tumor > 3 cm but ≤ 4 cm, or invades visceral pleura, or main bronchus"],
          ["T2b", "T2b — Tumor > 4 cm but ≤ 5 cm in greatest dimension"],
          ["T3", "T3 — Tumor > 5 cm but ≤ 7 cm, separate tumor nodule in same lobe, or invades chest wall/pericardium"],
          ["T4", "T4 — Tumor > 7 cm, separate nodule in different ipsilateral lobe, or invades diaphragm/mediastinum/heart/great vessels/carina"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Metastasis in ipsilateral peribronchial and/or ipsilateral hilar nodes (Stations 10–14)"],
          ["N2", "N2 — Metastasis in ipsilateral mediastinal and/or subcarinal nodes (Stations 1–9)"],
          ["N3", "N3 — Metastasis in contralateral mediastinal/hilar or scalene/supraclavicular nodes"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1a", "M1a — Malignant pleural/pericardial effusion, pleural nodules, or separate nodule in contralateral lobe"],
          ["M1b", "M1b — Single extrathoracic metastasis in a single organ (oligometastatic)"],
          ["M1c", "M1c — Multiple extrathoracic metastases in one or multiple organs"]
        ])
      ],
      table: {
        headers: ["Stage Group", "TNM Grouping", "SCLC VALSG", "Standard Clinical Pathway"],
        rows: [
          { id: "stI", cols: ["Stage I (IA1–IB)", "T1–T2a N0 M0", "Limited Stage", "Surgical lobectomy / segmentectomy + lymph node dissection, or stereotactic body radiation (SBRT)"] },
          { id: "stII", cols: ["Stage II (IIA–IIB)", "T2b N0, T1–T2 N1, T3 N0 M0", "Limited Stage", "Upfront surgical resection followed by adjuvant platinum-doublet chemotherapy ± Osimertinib / Atezolizumab"] },
          { id: "stIII", cols: ["Stage III (IIIA–IIIC)", "T1–T2 N2, T3 N1–N2, T4 N0–N2, Any T N3 M0", "Limited Stage", "Multidisciplinary concurrent chemoradiotherapy followed by Durvalumab consolidation (PACIFIC regimen) or neoadjuvant chemo-IO"] },
          { id: "stIV", cols: ["Stage IV (IVA–IVB)", "Any T Any N M1a–M1c", "Extensive Stage", "Systemic biomarker-directed therapy (EGFR, ALK, ROS1, BRAF, RET, MET, KRAS, PD-L1) or Platinum/Etoposide + anti-PD-L1"] }
        ]
      },
      calc: function (v) {
        var t = v.tCat, n = v.nCat, m = v.mCat;
        if (m === "M1c") return { value: "Stage IVB (M1c)", matchId: "stIV", eq: "Polymetastatic lung cancer. Comprehensive NGS biomarker profiling indicated." };
        if (m === "M1a" || m === "M1b") return { value: "Stage IVA (" + m + ")", matchId: "stIV", eq: "Oligometastatic or intrathoracic disseminated disease (pleural effusion / contralateral nodule)." };
        if (t === "Tis") return { value: "Stage 0 (Tis N0 M0)", matchId: "stI", eq: "Carcinoma in situ / non-invasive pre-malignancy." };
        if (n === "N3") {
          return { value: (t === "T3" || t === "T4") ? "Stage IIIC" : "Stage IIIB", matchId: "stIII", eq: "Locally advanced / inoperable N3 nodal disease. Concurrent definitive chemoradiotherapy." };
        }
        if (n === "N2") {
          return { value: (t === "T3" || t === "T4") ? "Stage IIIB" : "Stage IIIA", matchId: "stIII", eq: "Ipsilateral mediastinal nodal involvement. Multidisciplinary tumor board review." };
        }
        if (n === "N1") {
          return { value: (t === "T3" || t === "T4") ? "Stage IIIA" : "Stage IIB", matchId: "stII", eq: "Hilar/peribronchial node involvement. Candidate for surgical resection + adjuvant therapy." };
        }
        if (t === "T4") return { value: "Stage IIIA (T4 N0 M0)", matchId: "stIII", eq: "Locally advanced primary tumor invading central mediastinal structures." };
        if (t === "T3") return { value: "Stage IIB (T3 N0 M0)", matchId: "stII", eq: "Tumor > 5 cm or chest wall involvement with clear lymph nodes." };
        if (t === "T2b") return { value: "Stage IIA (T2b N0 M0)", matchId: "stII", eq: "Tumor > 4 cm but ≤ 5 cm." };
        if (t === "T2a") return { value: "Stage IB (T2a N0 M0)", matchId: "stI", eq: "Early-stage lung carcinoma (> 3 cm but ≤ 4 cm or visceral pleural invasion)." };
        return { value: "Stage IA (T1 N0 M0)", matchId: "stI", eq: "Early node-negative tumor ≤ 3 cm. High curative resectability / SBRT cure rate." };
      }
    },
    {
      id: "pleuralMesotheliomaTNM",
      cat: "onco",
      type: "class",
      name: "Malignant Pleural Mesothelioma (AJCC 8th/9th Ed.)",
      desc: "IASLC/AJCC staging for diffuse malignant pleural mesothelioma (epithelioid, biphasic, and sarcomatoid histologies).",
      organ: "Pleura (Parietal & Visceral)",
      region: "Thoracic Oncology",
      subject: "Mesothelioma",
      keywords: ["mesothelioma", "pleura", "iaslc", "asbestos", "epithelioid", "sarcomatoid", "ajcc 8th"],
      guidance: "T1 involves ipsilateral pleura with or without visceral pleural invasion. T2 involves visceral pleura with diaphragmatic or lung parenchymal invasion. T3 locally advanced but potentially resectable. T4 unresectable local disease (multifocal chest wall, spine, peritoneum).",
      literature: [{
        type: "Consensus Guidelines",
        icon: "📄",
        title: "The IASLC Mesothelioma Staging Project: Updating the TNM Staging System and Proposals for the 8th Edition",
        citation: "Nowak AK, et al. J Thorac Oncol. 2016;11(12):2112-2119.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/27744001/" },
          { text: "NCI Malignant Mesothelioma PDQ ↗", url: "https://www.cancer.gov/types/mesothelioma" },
          { text: "IASLC Mesothelioma Staging Guide ↗", url: "https://www.iaslc.org/research-education/staging-handbooks-and-resources" },
          { text: "ESMO Clinical Practice Guidelines: Malignant Pleural Mesothelioma ↗", url: "https://www.esmo.org/guidelines/lung-and-chest-tumours/malignant-pleural-mesothelioma" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Pleural Tumor Extent (T)", "T1", [
          ["T1", "T1 — Confined to ipsilateral parietal pleura ± visceral/mediastinal/diaphragmatic involvement"],
          ["T2", "T2 — Involves ipsilateral pleura with confluent visceral pleural invasion, lung parenchyma invasion, or diaphragm muscle invasion"],
          ["T3", "T3 — Locally advanced: endothoracic fascia, mediastinal fat, solitary focus into chest wall, or transmural pericardium"],
          ["T4", "T4 — Unresectable locally: diffuse/multifocal chest wall invasion, ribs, peritoneum, spine, or contralateral pleura"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Metastasis in ipsilateral bronchopulmonary, hilar, or mediastinal lymph nodes (including internal mammary/pericardiac)"],
          ["N2", "N2 — Metastasis in contralateral mediastinal, contralateral internal mammary, or supraclavicular lymph nodes"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant organ or non-regional metastatic spread"]
        ])
      ],
      table: {
        headers: ["Stage", "TNM Grouping", "Therapeutic Protocol"],
        rows: [
          { id: "mI", cols: ["Stage IA / IB", "T1 N0 M0 (IA) / T2-T3 N0 M0 (IB)", "Pleurectomy/decortication (P/D) or extrapleural pneumonectomy (EPP) in highly selected epithelioid histology"] },
          { id: "mII", cols: ["Stage II", "T1-T2 N1 M0", "Multimodal approach: neoadjuvant/adjuvant chemotherapy + macroscopic complete resection (MCR)"] },
          { id: "mIII", cols: ["Stage III (IIIA / IIIB)", "T3 N1 M0 (IIIA) / T1-T3 N2 or T4 Any N M0 (IIIB)", "First-line dual immunotherapy: Nivolumab + Ipilimumab (CheckMate 743) or Cisplatin + Pemetrexed"] },
          { id: "mIV", cols: ["Stage IV", "Any T Any N M1", "Palliative dual immunotherapy / platinum-pemetrexed + palliative radiotherapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV", matchId: "mIV", eq: "Distant metastatic pleural mesothelioma. First-line Nivolumab + Ipilimumab." };
        if (v.nCat === "N2" || v.tCat === "T4") return { value: "Stage IIIB", matchId: "mIII", eq: "Unresectable locoregional disease due to N2 nodes or T4 extension." };
        if (v.tCat === "T3" && v.nCat === "N1") return { value: "Stage IIIA", matchId: "mIII", eq: "Locally advanced resectable disease with ipsilateral nodal spread." };
        if ((v.tCat === "T1" || v.tCat === "T2") && v.nCat === "N1") return { value: "Stage II", matchId: "mII", eq: "Ipsilateral nodal metastasis." };
        if (v.tCat === "T2" || v.tCat === "T3") return { value: "Stage IB", matchId: "mI", eq: "Confluent visceral pleural invasion or localized transmural infiltration without nodal disease." };
        return { value: "Stage IA (T1 N0 M0)", matchId: "mI", eq: "Early localized disease; candidate for macroscopic complete resection." };
      }
    },
    {
      id: "thymomaCarcinomaTNM",
      cat: "onco",
      type: "class",
      name: "Thymic Epithelial Tumors (Thymoma & Thymic Carcinoma - AJCC/ITMIG 8th/9th)",
      desc: "ITMIG / UICC / AJCC TNM staging system for Masaoka-Koga harmonized thymic neoplasms.",
      organ: "Thymus Gland / Anterior Mediastinum",
      region: "Thoracic Oncology",
      subject: "Thymic Malignancies",
      keywords: ["thymoma", "thymic carcinoma", "itmig", "masaoka", "anterior mediastinum", "myasthenia gravis"],
      guidance: "T1 organ-confined (T1a no mediastinal pleura invasion, T1b invades mediastinal pleura). T2 invades pericardium. T3 invades lung, great vessels, phrenic nerve, chest wall. T4 invades aorta, arch vessels, myocardium, trachea, esophagus.",
      literature: [{
        type: "ITMIG & AJCC Staging Consensus",
        icon: "📄",
        title: "The ITMIG/IASLC Thymic Epithelial Tumors Staging Project: Proposals for the 8th Edition of the AJCC/UICC TNM Classification",
        citation: "Detterbeck FC, et al. J Thorac Oncol. 2014;9(9 Suppl 2):S65-S72.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/25398311/" },
          { text: "NCI Thymoma and Thymic Carcinoma PDQ ↗", url: "https://www.cancer.gov/types/thymoma" },
          { text: "ITMIG Consensus Portal ↗", url: "https://itmig.org/" },
          { text: "ESMO Clinical Practice Guidelines for Thymic Tumors ↗", url: "https://www.esmo.org/guidelines/lung-and-chest-tumours/thymic-epithelial-tumors" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Thymic Tumor Extent (T)", "T1a", [
          ["T1a", "T1a — Encapsulated or unencapsulated, may invade mediastinal fat, no mediastinal pleura involvement"],
          ["T1b", "T1b — Direct extension into mediastinal pleura"],
          ["T2", "T2 — Direct invasion into pericardium (partial or full thickness)"],
          ["T3", "T3 — Invades lung, brachiocephalic vein, superior vena cava, phrenic nerve, or chest wall"],
          ["T4", "T4 — Invades aorta, arch vessels, pulmonary artery, myocardium, trachea, or esophagus"]
        ]),
        makeS("nCat", "Regional Mediastinal Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Anterior (perithymic) lymph node metastasis"],
          ["N2", "N2 — Deep intrathoracic or cervical lymph node metastasis"]
        ]),
        makeS("mCat", "Distant Pleural / Pericardial / Visceral Spread (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1a", "M1a — Separate pleural or pericardial nodules (intrathoracic dissemination)"],
          ["M1b", "M1b — Distant organ metastases (pulmonary parenchymal or extrathoracic)"]
        ])
      ],
      table: {
        headers: ["Stage", "TNM Grouping", "Clinical Strategy"],
        rows: [
          { id: "thI", cols: ["Stage I", "T1 N0 M0", "Complete thymectomy with en bloc resection of mediastinal fat; surveillance"] },
          { id: "thII", cols: ["Stage II", "T2 N0 M0", "Total thymectomy + complete pericardial reconstruction ± postoperative radiation (PORT)"] },
          { id: "thIII", cols: ["Stage IIIA / IIIB", "T3 N0 M0 (IIIA) / T4 N0 or T1-T4 N1 M0 (IIIB)", "Neoadjuvant chemotherapy (CAP: Cisplatin, Doxorubicin, Cyclophosphamide) followed by en bloc resection"] },
          { id: "thIV", cols: ["Stage IVA / IVB", "Any T N2 M0 or M1a (IVA) / Any T Any N M1b (IVB)", "Definitive chemotherapy / clinical trial / targeted therapy for thymic carcinoma (Lenvatinib / Sunitinib)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1b") return { value: "Stage IVB (M1b)", matchId: "thIV", eq: "Extrathoracic hematogenous metastasis." };
        if (v.mCat === "M1a" || v.nCat === "N2") return { value: "Stage IVA", matchId: "thIV", eq: "Pleural/pericardial drop metastases or deep cervical/mediastinal nodes." };
        if (v.nCat === "N1" || v.tCat === "T4") return { value: "Stage IIIB", matchId: "thIII", eq: "Anterior mediastinal nodal metastasis or invasion of great vessels/heart." };
        if (v.tCat === "T3") return { value: "Stage IIIA (T3 N0 M0)", matchId: "thIII", eq: "Invasion of lung, phrenic nerve, or SVC." };
        if (v.tCat === "T2") return { value: "Stage II (T2 N0 M0)", matchId: "thII", eq: "Involvement of pericardium." };
        return { value: "Stage I (" + v.tCat + " N0 M0)", matchId: "thI", eq: "Organ-confined/pleural-limited disease with high curative resection rate." };
      }
    },

    // ==============================================================
    // 4. MUSCULOSKELETAL SITES (BONE & SOFT TISSUE SARCOMAS)
    // ==============================================================
    {
      id: "boneSarcomaAppendicular",
      cat: "onco",
      type: "class",
      name: "Bone Sarcoma: Appendicular Skeleton, Trunk, Skull & Facial Bones",
      desc: "AJCC 8th/9th Edition staging for osteosarcoma, chondrosarcoma, and primary bone malignancies outside the pelvis and spine.",
      organ: "Long Bones / Skull / Face / Ribs",
      region: "Orthopedic Oncology",
      subject: "Bone Sarcomas",
      keywords: ["osteosarcoma", "chondrosarcoma", "bone sarcoma", "appendicular", "femur", "tibia", "ajcc"],
      guidance: "T1 ≤ 8 cm; T2 > 8 cm; T3 discontinuous 'skip' lesions in the primary bone site. Histologic Grade (G1 low, G2-G3 high) strongly dictates stage.",
      literature: [{
        type: "Orthopedic Staging Standard",
        icon: "📄",
        title: "The 8th Edition of the AJCC Staging System for Bone Sarcoma",
        citation: "Cates JMM. Am J Surg Pathol. 2017;41(5):e20-e29.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28394812/" },
          { text: "NCI Bone Cancer Health Professional PDQ ↗", url: "https://www.cancer.gov/types/bone" },
          { text: "NCCN Bone Cancer Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "European Musculo-Skeletal Oncology Society (EMSOS) ↗", url: "https://www.emsos.org/" }
        ]
      }],
      fields: [
        makeS("grade", "Histopathologic Grade (G)", "high", [
          ["low", "Low Grade (G1 — well differentiated / low malignant potential)"],
          ["high", "High Grade (G2 – G3 — poorly differentiated / pleomorphic)"]
        ]),
        makeS("tCat", "Primary Bone Tumor Extent (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 8 cm in greatest dimension"],
          ["T2", "T2 — Tumor > 8 cm in greatest dimension"],
          ["T3", "T3 — Discontinuous skip tumors in the primary bone site"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Regional lymph node metastasis present (rare in bone sarcomas; carries adverse prognosis)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1a", "M1a — Distant metastasis to lung only"],
          ["M1b", "M1b — Distant metastasis to bone or other non-pulmonary sites"]
        ])
      ],
      table: {
        headers: ["Stage Group", "TNM / Grade Criteria", "Multimodal Management"],
        rows: [
          { id: "bI", cols: ["Stage IA / IB", "Low Grade, T1-T2 N0 M0", "Limb-sparing wide surgical resection with negative margins; surveillance"] },
          { id: "bII", cols: ["Stage IIA / IIB", "High Grade, T1-T2 N0 M0", "Neoadjuvant multi-agent chemotherapy (MAP: Methotrexate, Doxorubicin, Cisplatin) + limb-sparing surgery"] },
          { id: "bIII", cols: ["Stage III", "High Grade, T3 N0 M0 (Skip metastases)", "Intensive neoadjuvant chemotherapy + radical resection of affected bone compartment"] },
          { id: "bIV", cols: ["Stage IVA / IVB", "M1a (IVA) / N1 or M1b (IVB)", "Chemotherapy + surgical metastasectomy (pulmonary thoracotomy) or palliative targeted therapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1b" || v.nCat === "N1") return { value: "Stage IVB", matchId: "bIV", eq: "Bone/extrapulmonary metastasis or regional nodal spread." };
        if (v.mCat === "M1a") return { value: "Stage IVA (M1a)", matchId: "bIV", eq: "Isolated pulmonary metastases amenable to staged surgical resection." };
        var isHigh = v.grade === "high";
        if (v.tCat === "T3") return { value: isHigh ? "Stage III (High Grade T3 N0 M0)" : "Stage IB (Low Grade T3)", matchId: isHigh ? "bIII" : "bI", eq: "Discontinuous skip lesions in the same bone." };
        if (v.tCat === "T2") return { value: isHigh ? "Stage IIB" : "Stage IB", matchId: isHigh ? "bII" : "bI", eq: "Large primary tumor (>8 cm)." };
        return { value: isHigh ? "Stage IIA" : "Stage IA", matchId: isHigh ? "bII" : "bI", eq: "Tumor ≤ 8 cm." };
      }
    },
    {
      id: "boneSarcomaPelvis",
      cat: "onco",
      type: "class",
      name: "Bone Sarcoma: Pelvis (AJCC 8th/9th Ed.)",
      desc: "Anatomic staging system specifically dedicated to pelvic bone sarcomas.",
      organ: "Pelvic Bones (Ilium, Ischium, Pubis, Sacrum)",
      region: "Orthopedic Oncology",
      subject: "Pelvic Sarcomas",
      keywords: ["pelvic sarcoma", "pelvis", "internal hemipelvectomy", "sacrum", "ilium", "ajcc"],
      guidance: "T1 limited to 1 pelvic segment without extraosseous extension (T1a ≤8cm, T1b >8cm). T2 in 1 segment with extraosseous extension or 2 segments without. T3 in 2 segments with extraosseous extension. T4 in 3 segments, crosses sacroiliac joint, or encases external iliac vessels.",
      literature: [{
        type: "Orthopedic Staging Standard",
        icon: "📄",
        title: "AJCC 8th Edition Staging for Pelvic Bone Sarcomas",
        citation: "Cates JMM. Am J Surg Pathol. 2017;41(5):e20-e29.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28394812/" },
          { text: "NCI Bone Sarcoma Treatment ↗", url: "https://www.cancer.gov/types/bone" },
          { text: "NCCN Musculoskeletal Tumors Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "EMSOS Pelvic Resection Guidelines ↗", url: "https://www.emsos.org/" }
        ]
      }],
      fields: [
        makeS("grade", "Tumor Grade", "high", [
          ["low", "Low Grade (G1)"],
          ["high", "High Grade (G2 – G3)"]
        ]),
        makeS("tCat", "Pelvic Tumor Extent (T)", "T1b", [
          ["T1a", "T1a — Confined to 1 pelvic segment, no extraosseous extension, ≤ 8 cm"],
          ["T1b", "T1b — Confined to 1 pelvic segment, no extraosseous extension, > 8 cm"],
          ["T2", "T2 — Involves 1 pelvic segment with extraosseous extension OR 2 segments without"],
          ["T3", "T3 — Involves 2 pelvic segments with extraosseous extension"],
          ["T4", "T4 — Involves 3 pelvic segments, crosses sacroiliac joint, or encases external iliac vessels"]
        ]),
        makeS("nCat", "Regional Lymph Nodes", "N0", [
          ["N0", "N0 — Regional nodes negative"],
          ["N1", "N1 — Regional nodes positive"]
        ]),
        makeS("mCat", "Distant Metastasis", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lung, non-pelvic bone)"]
        ])
      ],
      table: {
        headers: ["Stage", "Description", "Surgical Protocol"],
        rows: [
          { id: "pI", cols: ["Stage I (IA / IB)", "Low Grade Pelvic Sarcoma", "En bloc internal hemipelvectomy with clear margins"] },
          { id: "pII", cols: ["Stage II (IIA / IIB)", "High Grade, T1 or T2 N0 M0", "Neoadjuvant multi-agent chemotherapy + 3D-planned limb-sparing internal hemipelvectomy"] },
          { id: "pIII", cols: ["Stage III", "High Grade, T3-T4 N0 M0", "Extensive multivisceral resection / hindquarter amputation / carbon ion therapy"] },
          { id: "pIV", cols: ["Stage IV", "N1 or M1", "Palliative chemotherapy / metastasectomy / clinical trials"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.nCat === "N1") return { value: "Stage IV", matchId: "pIV", eq: "Distant metastatic or node-positive pelvic sarcoma." };
        var isHigh = v.grade === "high";
        if (v.tCat === "T3" || v.tCat === "T4") return { value: isHigh ? "Stage III" : "Stage IB", matchId: isHigh ? "pIII" : "pI", eq: "Multi-segment pelvic involvement or neurovascular encasement." };
        if (v.tCat === "T2" || v.tCat === "T1b") return { value: isHigh ? "Stage IIB" : "Stage IB", matchId: isHigh ? "pII" : "pI", eq: "Large or extraosseous pelvic tumor." };
        return { value: isHigh ? "Stage IIA" : "Stage IA", matchId: isHigh ? "pII" : "pI", eq: "Small organ-confined single-segment pelvic lesion." };
      }
    },
    {
      id: "boneSarcomaSpine",
      cat: "onco",
      type: "class",
      name: "Bone Sarcoma: Spine (AJCC 8th/9th Ed.)",
      desc: "Staging dedicated to primary spine sarcomas (chordoma, osteosarcoma, chondrosarcoma, Ewing sarcoma).",
      organ: "Vertebral Column (Cervical, Thoracic, Lumbar)",
      region: "Orthopedic / Spine Oncology",
      subject: "Spine Sarcomas",
      keywords: ["spine", "vertebra", "chordoma", "osteosarcoma", "weinstein-boriani-biagini", "ajcc 8th"],
      guidance: "T1 confined to 1 vertebral segment or 2 adjacent segments; T2 confined to 3 adjacent segments; T3 confined to ≥4 adjacent segments; T4 invades spinal canal or great vessels.",
      literature: [{
        type: "Spine Staging Standard",
        icon: "📄",
        title: "Primary Bone Tumors of the Spine: AJCC 8th Edition Classification and Surgical Planning",
        citation: "Boriani S, et al. Spine (Phila Pa 1976). 2017;42(10):740-748.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/27792122/" },
          { text: "NCI Bone Cancers Overview ↗", url: "https://www.cancer.gov/types/bone" },
          { text: "AOSpine Tumor Knowledge Portal ↗", url: "https://aospine.aofoundation.org/" },
          { text: "NCCN Bone Cancer Practice Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" }
        ]
      }],
      fields: [
        makeS("grade", "Histologic Grade", "high", [
          ["low", "Low Grade (G1 — classical chordoma / low-grade chondrosarcoma)"],
          ["high", "High Grade (G2 – G3 — osteosarcoma / dedifferentiated chordoma / Ewing)"]
        ]),
        makeS("tCat", "Spine Tumor Extent (T)", "T1", [
          ["T1", "T1 — Confined to 1 vertebral segment or 2 adjacent vertebral segments"],
          ["T2", "T2 — Confined to 3 adjacent vertebral segments"],
          ["T3", "T3 — Confined to 4 or more adjacent vertebral segments"],
          ["T4", "T4 — Extension into the spinal canal or encasing great vessels (aorta, vena cava, vertebral artery)"]
        ]),
        makeS("nCat", "Regional Nodes", "N0", [
          ["N0", "N0 — Nodes negative"],
          ["N1", "N1 — Nodes positive"]
        ]),
        makeS("mCat", "Distant Metastasis", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Grade / Extent", "Surgical Intervention"],
        rows: [
          { id: "spI", cols: ["Stage I", "Low Grade, T1-T3 N0 M0", "En bloc spondylectomy with clear margins; particle therapy (proton/carbon ion)"] },
          { id: "spII", cols: ["Stage II", "High Grade, T1-T2 N0 M0", "Neoadjuvant chemotherapy + en bloc total spondylectomy"] },
          { id: "spIII", cols: ["Stage III", "High Grade, T3-T4 N0 M0", "Multidisciplinary decompression + stabilization + high-dose proton beam radiation"] },
          { id: "spIV", cols: ["Stage IV", "N1 or M1", "Palliative stereotactic radiosurgery (SRS) + systemic therapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.nCat === "N1") return { value: "Stage IV", matchId: "spIV", eq: "Metastatic spine sarcoma." };
        var isHigh = v.grade === "high";
        if (v.tCat === "T4" || v.tCat === "T3") return { value: isHigh ? "Stage III" : "Stage IB", matchId: isHigh ? "spIII" : "spI", eq: "Extensive multi-level involvement or canal/vascular encroachment." };
        if (v.tCat === "T2") return { value: isHigh ? "Stage IIB" : "Stage IB", matchId: isHigh ? "spII" : "spI", eq: "3-segment spinal disease." };
        return { value: isHigh ? "Stage IIA" : "Stage IA", matchId: isHigh ? "spII" : "spI", eq: "1–2 segment spinal lesion." };
      }
    },
    {
      id: "stsTrunkExtremities",
      cat: "onco",
      type: "class",
      name: "Soft Tissue Sarcoma: Trunk & Extremities (AJCC 8th/9th Ed.)",
      desc: "Standard 4-tiered TNM staging based on 5 cm, 10 cm, and 15 cm dimension cutoffs and FNCLCC grading.",
      organ: "Skeletal Muscle / Fascia / Subcutaneous Fat",
      region: "Surgical Oncology / Extremities",
      subject: "Soft Tissue Sarcoma",
      keywords: ["soft tissue sarcoma", "extremity", "trunk", "fnclcc", "liposarcoma", "leiomyosarcoma", "ups"],
      guidance: "T1 ≤ 5 cm; T2 > 5 to ≤ 10 cm; T3 > 10 to ≤ 15 cm; T4 > 15 cm. Low Grade (FNCLCC G1) = Stage I; High Grade (G2-G3) = Stage II–III. N1 = Stage IV regardless of T.",
      literature: [{
        type: "AJCC Sarcoma Staging Consensus",
        icon: "📄",
        title: "The American Joint Committee on Cancer: 8th Edition Staging System for Soft Tissue Sarcoma of the Extremities and Trunk",
        citation: "Tanaka K, et al. Ann Surg Oncol. 2019;26(1):120-125.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/30349987/" },
          { text: "NCI Adult Soft Tissue Sarcoma PDQ ↗", url: "https://www.cancer.gov/types/soft-tissue-sarcoma" },
          { text: "ESMO-EURACAN Soft Tissue Sarcoma Guidelines ↗", url: "https://www.esmo.org/guidelines/sarcoma-and-gist/soft-tissue-and-visceral-sarcomas" },
          { text: "NCCN Soft Tissue Sarcoma Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" }
        ]
      }],
      fields: [
        makeS("grade", "FNCLCC Histological Grade", "g2_3", [
          ["g1", "FNCLCC Grade 1 (Low Grade)"],
          ["g2_3", "FNCLCC Grade 2 or 3 (High Grade)"]
        ]),
        makeS("tCat", "Primary Tumor Dimension (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 5 cm in greatest dimension"],
          ["T2", "T2 — Tumor > 5 cm but ≤ 10 cm in greatest dimension"],
          ["T3", "T3 — Tumor > 10 cm but ≤ 15 cm in greatest dimension"],
          ["T4", "T4 — Tumor > 15 cm in greatest dimension"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Regional lymph node metastasis present (Stage IV in AJCC 8th)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (most commonly pulmonary)"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Multimodal Protocol"],
        rows: [
          { id: "stI", cols: ["Stage IA / IB", "Low Grade, T1 (IA) / T2-T4 (IB) N0 M0", "Wide local excision with negative margins (≥ 1 cm or intact fascial plane)"] },
          { id: "stII", cols: ["Stage II", "High Grade, T1 N0 M0", "Wide excision + consider adjuvant radiation therapy"] },
          { id: "stIII", cols: ["Stage IIIA / IIIB", "High Grade, T2 (IIIA) / T3-T4 (IIIB) N0 M0", "Preoperative radiotherapy (50 Gy) + wide limb-sparing excision ± neoadjuvant Doxorubicin/Ifosfamide"] },
          { id: "stIV", cols: ["Stage IV", "Any T N1 M0, or Any T Any N M1", "Systemic chemotherapy (Doxorubicin ± Ifosfamide), Trabectedin, Pazopanib, or metastasectomy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.nCat === "N1") return { value: "Stage IV", matchId: "stIV", eq: "Metastatic or node-positive sarcoma (N1 designated Stage IV in 8th Edition)." };
        var isLow = v.grade === "g1";
        if (isLow) {
          return { value: v.tCat === "T1" ? "Stage IA (Low Grade T1)" : "Stage IB (Low Grade " + v.tCat + ")", matchId: "stI", eq: "Low grade malignancy; wide surgical excision alone is often curative." };
        }
        if (v.tCat === "T3" || v.tCat === "T4") return { value: "Stage IIIB (High Grade " + v.tCat + ")", matchId: "stIII", eq: "High risk for distant recurrence; preoperative radiotherapy strongly advised." };
        if (v.tCat === "T2") return { value: "Stage IIIA (High Grade T2)", matchId: "stIII", eq: "Tumor > 5 cm to ≤ 10 cm, high grade." };
        return { value: "Stage II (High Grade T1)", matchId: "stII", eq: "Small (≤ 5 cm) high-grade soft tissue sarcoma." };
      }
    },
    {
      id: "stsRetroperitoneum",
      cat: "onco",
      type: "class",
      name: "Soft Tissue Sarcoma: Retroperitoneum (AJCC 8th/9th Ed.)",
      desc: "Staging dedicated to retroperitoneal sarcomas (well-differentiated / dedifferentiated liposarcoma, leiomyosarcoma).",
      organ: "Retroperitoneal Space",
      region: "Surgical Oncology / Retroperitoneum",
      subject: "Retroperitoneal Sarcomas",
      keywords: ["retroperitoneum", "liposarcoma", "dedifferentiated", "compartmental resection", "ajcc 8th"],
      guidance: "T1 ≤ 5 cm; T2 > 5 to ≤ 10 cm; T3 > 10 to ≤ 15 cm; T4 > 15 cm. High Grade tumors carry elevated mortality. Complete gross resection with en bloc adjacent organs is standard.",
      literature: [{
        type: "Retroperitoneal Staging Standard",
        icon: "📄",
        title: "Prognostic Validation of the 8th AJCC Staging System for Retroperitoneal Soft Tissue Sarcoma",
        citation: "Gronchi A, et al. Ann Surg. 2017;265(6):1073-1080.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28475510/" },
          { text: "Transatlantic Australasian Retroperitoneal Sarcoma Working Group (TARPSWG) ↗", url: "https://www.tarpswg.org/" },
          { text: "NCI Soft Tissue Sarcoma PDQ ↗", url: "https://www.cancer.gov/types/soft-tissue-sarcoma" },
          { text: "ESMO Soft Tissue Sarcoma Guidelines ↗", url: "https://www.esmo.org/guidelines/" }
        ]
      }],
      fields: [
        makeS("grade", "FNCLCC Histological Grade", "g2_3", [
          ["g1", "FNCLCC Grade 1 (Well-differentiated liposarcoma / low grade)"],
          ["g2_3", "FNCLCC Grade 2 or 3 (Dedifferentiated liposarcoma / leiomyosarcoma / high grade)"]
        ]),
        makeS("tCat", "Primary Retroperitoneal Dimension (T)", "T4", [
          ["T1", "T1 — Tumor ≤ 5 cm in greatest dimension"],
          ["T2", "T2 — Tumor > 5 cm but ≤ 10 cm in greatest dimension"],
          ["T3", "T3 — Tumor > 10 cm but ≤ 15 cm in greatest dimension"],
          ["T4", "T4 — Tumor > 15 cm in greatest dimension (frequent in retroperitoneum)"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — Negative regional lymph nodes"],
          ["N1", "N1 — Positive regional lymph nodes (Stage IV)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (liver, lung, peritoneal implants)"]
        ])
      ],
      table: {
        headers: ["Stage", "Group", "Surgical Approach"],
        rows: [
          { id: "rI", cols: ["Stage IA / IB", "Low Grade T1-T4 N0 M0", "Compartmental complete macroscopic resection (en bloc resection of tumor + kidney/colon if adherent)"] },
          { id: "rII", cols: ["Stage II", "High Grade T1 N0 M0", "Radical compartmental resection"] },
          { id: "rIII", cols: ["Stage IIIA / IIIB", "High Grade T2-T4 N0 M0", "En bloc multi-visceral resection at a high-volume specialized sarcoma center ± clinical trials"] },
          { id: "rIV", cols: ["Stage IV", "Any T N1 M0, or Any T Any N M1", "Palliative chemotherapy (Doxorubicin) / targeted therapy / clinical trials"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.nCat === "N1") return { value: "Stage IV", matchId: "rIV", eq: "Metastatic retroperitoneal sarcoma." };
        var isLow = v.grade === "g1";
        if (isLow) return { value: v.tCat === "T1" ? "Stage IA" : "Stage IB", matchId: "rI", eq: "Low-grade retroperitoneal sarcoma (e.g. well-differentiated liposarcoma)." };
        if (v.tCat === "T3" || v.tCat === "T4") return { value: "Stage IIIB (" + v.tCat + " High Grade)", matchId: "rIII", eq: "Large high-grade retroperitoneal sarcoma." };
        if (v.tCat === "T2") return { value: "Stage IIIA (T2 High Grade)", matchId: "rIII", eq: "High grade, 5–10 cm." };
        return { value: "Stage II", matchId: "rII", eq: "Small high-grade retroperitoneal sarcoma (≤5 cm)." };
      }
    },
    {
      id: "stsVisceralThoracoAbdominal",
      cat: "onco",
      type: "class",
      name: "Soft Tissue Sarcoma: Abdomen & Thoracic Visceral Organs (AJCC 8th/9th)",
      desc: "Staging dedicated to visceral sarcomas arising within thoracic and abdominal parenchymal viscera (excluding GIST).",
      organ: "Stomach / Bowel / Thoracic Viscera",
      region: "Visceral Oncology",
      subject: "Visceral Sarcomas",
      keywords: ["visceral sarcoma", "leiomyosarcoma", "viscera", "gastric sarcoma", "pulmonary sarcoma", "ajcc 8th"],
      guidance: "T1 organ confined (T1a ≤ 5 cm, T1b > 5 cm); T2 invades beyond organ serosa/capsule; T3 invades adjacent organs; T4 multifocal visceral sites.",
      literature: [{
        type: "Visceral Sarcoma Staging",
        icon: "📄",
        title: "AJCC 8th Edition Staging for Visceral Soft Tissue Sarcoma",
        citation: "Amin MB, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "ESMO Clinical Guidelines Visceral Sarcomas ↗", url: "https://www.esmo.org/guidelines/" },
          { text: "NCI Adult Sarcomas Treatment ↗", url: "https://www.cancer.gov/types/soft-tissue-sarcoma" },
          { text: "UICC TNM 9th Edition ↗", url: "https://www.uicc.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Visceral Tumor Infiltration (T)", "T1b", [
          ["T1a", "T1a — Organ-confined visceral tumor ≤ 5 cm"],
          ["T1b", "T1b — Organ-confined visceral tumor > 5 cm"],
          ["T2", "T2 — Extension beyond organ capsule or serosa"],
          ["T3", "T3 — Invades adjacent visceral organs"],
          ["T4", "T4 — Multifocal involvement of more than one organ site"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — Regional nodes negative"],
          ["N1", "N1 — Regional nodes positive"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Management"],
        rows: [
          { id: "vI", cols: ["Stage I", "T1a N0 M0", "Complete organ-preserving or segmental surgical resection"] },
          { id: "vII", cols: ["Stage II", "T1b N0 M0", "Complete radical en bloc organ resection"] },
          { id: "vIII", cols: ["Stage III", "T2-T4 N0 or Any T N1 M0", "En bloc multivisceral resection ± adjuvant chemotherapy"] },
          { id: "vIV", cols: ["Stage IV", "Any T Any N M1", "Palliative chemotherapy / targeted therapies"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV", matchId: "vIV", eq: "Metastatic visceral sarcoma." };
        if (v.nCat === "N1" || v.tCat === "T2" || v.tCat === "T3" || v.tCat === "T4") return { value: "Stage III", matchId: "vIII", eq: "Serosal penetration, adjacent organ invasion, or regional nodes." };
        if (v.tCat === "T1b") return { value: "Stage II", matchId: "vII", eq: "Organ-confined visceral sarcoma > 5 cm." };
        return { value: "Stage I", matchId: "vI", eq: "Organ-confined small visceral sarcoma ≤ 5 cm." };
      }
    },
    {
      id: "stsHeadAndNeck",
      cat: "onco",
      type: "class",
      name: "Soft Tissue Sarcoma: Head & Neck (AJCC 8th/9th Ed.)",
      desc: "Dedicated staging for non-cutaneous head and neck soft tissue sarcomas (excluding rhabdomyosarcoma).",
      organ: "Head & Neck Musculature / Fascial Spaces",
      region: "Head & Neck Surgical Oncology",
      subject: "Head & Neck Sarcoma",
      keywords: ["head and neck sarcoma", "cervical", "parotid", "masticator space", "ajcc 8th"],
      guidance: "T1 ≤ 2 cm; T2 > 2 to ≤ 4 cm; T3 > 4 cm; T4 invades skull base, dura, bone, or neurovascular structures.",
      literature: [{
        type: "Head & Neck Staging",
        icon: "📄",
        title: "Validation of the AJCC 8th Edition Staging for Head and Neck Soft Tissue Sarcoma",
        citation: "Galy-Bernadoy C, et al. Head Neck. 2019;41(1):153-160.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/30537446/" },
          { text: "NCI Head and Neck Cancers ↗", url: "https://www.cancer.gov/types/head-and-neck" },
          { text: "AHNS Head and Neck Sarcoma Section ↗", url: "https://www.ahns.info/" },
          { text: "NCCN Soft Tissue Sarcoma Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" }
        ]
      }],
      fields: [
        makeS("tCat", "Head & Neck Primary Tumor (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 2 cm in greatest dimension"],
          ["T2", "T2 — Tumor > 2 cm but ≤ 4 cm in greatest dimension"],
          ["T3", "T3 — Tumor > 4 cm in greatest dimension"],
          ["T4", "T4 — Invades bone, skull base, dura, carotid artery, or central nervous system"]
        ]),
        makeS("nCat", "Regional Cervical Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Regional lymph node metastasis present (Stage IV)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "TNM Grouping", "Management"],
        rows: [
          { id: "hnI", cols: ["Stage I", "T1 N0 M0 (Low grade)", "Complete surgical resection with negative margins"] },
          { id: "hnII", cols: ["Stage II", "T2 N0 M0 (Low grade) / T1 N0 (High)", "Surgical excision + adjuvant intensity-modulated radiation therapy (IMRT)"] },
          { id: "hnIII", cols: ["Stage III", "T3-T4 N0 M0", "Radical skull base / neck resection + reconstruction + IMRT"] },
          { id: "hnIV", cols: ["Stage IV", "Any T N1 M0, or Any T Any N M1", "Palliative chemotherapy / stereotactic radiation"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.nCat === "N1") return { value: "Stage IV", matchId: "hnIV", eq: "Metastatic or cervical lymph node metastasis." };
        if (v.tCat === "T3" || v.tCat === "T4") return { value: "Stage III", matchId: "hnIII", eq: "Tumor > 4 cm or skull base/carotid invasion." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "hnII", eq: "Tumor 2–4 cm." };
        return { value: "Stage I", matchId: "hnI", eq: "Small head and neck sarcoma (≤ 2 cm)." };
      }
    },
    {
      id: "stsUnusualHistologies",
      cat: "onco",
      type: "class",
      name: "Sarcomas of Unusual Histologies & Sites (Angiosarcoma, ASPS, PEComa)",
      desc: "Histology-driven risk stratifier and staging for specialized sarcomas with distinct metastatic tropisms and targetable pathways.",
      organ: "Vascular Endothelium / Perivascular Epithelioid / Soft Tissue",
      region: "Molecular & Specialized Oncology",
      subject: "Unusual Sarcoma Subtypes",
      keywords: ["angiosarcoma", "asps", "pecoma", "alveolar soft part", "mtor", "anti-angiogenic", "tfe3"],
      guidance: "Angiosarcoma: High hematogenous and lymphatic metastatic propensity (Paclitaxel / anti-VEGF). ASPS: TFE3-ASPSCR1 fusion, brain metastasis tropism, checkpoint/TKI sensitive (Atezolizumab). PEComa: TSC1/TSC2 mutation, responds to mTOR inhibitors (Nab-sirolimus).",
      literature: [{
        type: "Specialized Sarcoma Guidelines",
        icon: "📄",
        title: "Ultra-Rare Sarcomas: A Consensus Paper from the Connective Tissue Oncology Society",
        citation: "Stacchiotti S, et al. Ann Oncol. 2021;32(11):1346-1360.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/34363914/" },
          { text: "NCI Rare Brain & Spine and Soft Tissue Tumors ↗", url: "https://www.cancer.gov/rare-brain-spine-tumor" },
          { text: "Connective Tissue Oncology Society (CTOS) ↗", url: "https://www.ctos.org/" },
          { text: "ESMO Rare Cancers Guidelines ↗", url: "https://www.esmo.org/guidelines/" }
        ]
      }],
      fields: [
        makeS("histology", "Specialized Sarcoma Histology", "angio", [
          ["angio", "Angiosarcoma (Scalp, breast, visceral, radiation-induced)"],
          ["asps", "Alveolar Soft Part Sarcoma (ASPS — TFE3 rearranged)"],
          ["pecoma", "Malignant PEComa (Perivascular epithelioid cell neoplasm)"],
          ["epithelioid_hemangio", "Epithelioid Hemangioendothelioma (EHE — WWTR1-CAMTA1 / YAP1-TFE3)"]
        ]),
        makeS("extent", "Anatomic Extent of Disease", "loc_small", [
          ["loc_small", "Localized primary, size ≤ 5 cm"],
          ["loc_large", "Localized primary, size > 5 cm or deep fascial invasion"],
          ["regional", "Regional nodal involvement (frequent in Angiosarcoma / ASPS)"],
          ["metastatic", "Distant metastatic disease (lungs, brain, bone, liver)"]
        ])
      ],
      table: {
        headers: ["Histology", "Clinical Stage", "Targeted / Systemic Treatment Pathway"],
        rows: [
          { id: "angioProt", cols: ["Angiosarcoma", "Localized / Disseminated", "Radical surgical resection + radiation; weekly Paclitaxel ± anti-VEGF (Bevacizumab) or anti-PD-1"] },
          { id: "aspsProt", cols: ["Alveolar Soft Part Sarcoma", "Localized / Metastatic", "Mandatory baseline brain MRI. Anti-PD-L1 (Atezolizumab - FDA approved) or Cediranib / Cabozantinib"] },
          { id: "pecomaProt", cols: ["Malignant PEComa", "Localized / Advanced", "Complete surgical resection; mTOR inhibitor therapy (Nab-sirolimus / Everolimus) for TSC pathway alteration"] },
          { id: "eheProt", cols: ["Epithelioid Hemangioendothelioma", "Indolent / Metastatic", "Observation if asymptomatic; Trametinib / MEK inhibitors or multi-targeted TKIs (Pazopanib)"] }
        ]
      },
      calc: function (v) {
        var h = v.histology;
        var ext = v.extent;
        var match = h === "asps" ? "aspsProt" : h === "pecoma" ? "pecomaProt" : h === "epithelioid_hemangio" ? "eheProt" : "angioProt";
        var plan = "";
        if (h === "asps") {
          plan = "ASPS: High indolent brain metastasis risk. Atezolizumab (anti-PD-L1) is FDA-approved standard of care.";
        } else if (h === "pecoma") {
          plan = "Malignant PEComa: Screen for TSC1/TSC2 loss. Nab-sirolimus (albumin-bound mTOR inhibitor) is indicated.";
        } else if (h === "angio") {
          plan = "Angiosarcoma: Highly aggressive vascular malignancy. Weekly Paclitaxel or Gemcitabine; evaluate for radiation-induced etiology.";
        } else {
          plan = "EHE: Driven by CAMTA1 or TFE3 fusions. MEK inhibitors or anti-angiogenic TKIs.";
        }
        return {
          value: (h.toUpperCase()) + " — " + (ext === "metastatic" ? "Metastatic" : ext === "regional" ? "Node-Positive" : "Localized"),
          matchId: match,
          eq: plan
        };
      }
    },

    // ==============================================================
    // 5. SKIN CANCERS
    // ==============================================================
    {
      id: "cutaneousMelanomaAJCC",
      cat: "onco",
      type: "class",
      name: "Cutaneous Melanoma (AJCC 8th Ed.)",
      desc: "Pathologic and clinical staging for cutaneous melanoma integrating Breslow thickness, ulceration, and sentinel node micrometastases.",
      organ: "Skin / Dermis / Regional Nodes",
      region: "Dermatologic Oncology",
      subject: "Melanoma",
      keywords: ["melanoma", "breslow", "ulceration", "sentinel lymph node", "slnb", "braf", "ajcc 8th"],
      guidance: "Breslow depth cutoffs: ≤0.8 mm (T1a without ulceration; T1b with ulceration or 0.8–1.0mm); 1.01–2.0 mm (T2); 2.01–4.0 mm (T3); >4.0 mm (T4). Sentinel lymph node biopsy (SLNB) recommended for T1b and higher.",
      literature: [{
        type: "AJCC 8th Staging Standard",
        icon: "📄",
        title: "The 8th Edition of the AJCC Melanoma Staging System",
        citation: "Gershenwald JE, et al. CA Cancer J Clin. 2017;67(6):472-492.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/29028110/" },
          { text: "Aim at Melanoma Staging Tool ↗", url: "https://www.aimatmelanoma.org/melanoma-101/melanoma-staging/" },
          { text: "NCI Melanoma Treatment Health Professional PDQ ↗", url: "https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq" },
          { text: "NCCN Cutaneous Melanoma Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" }
        ]
      }],
      fields: [
        makeS("tCat", "Breslow Thickness & Ulceration (T)", "T1b", [
          ["Tis", "Tis — Melanoma in situ (lentigo maligna / intraepidermal)"],
          ["T1a", "T1a — Breslow < 0.8 mm WITHOUT ulceration"],
          ["T1b", "T1b — Breslow < 0.8 mm WITH ulceration, OR 0.8–1.0 mm with/without ulceration"],
          ["T2a", "T2a — Breslow > 1.0 to 2.0 mm WITHOUT ulceration"],
          ["T2b", "T2b — Breslow > 1.0 to 2.0 mm WITH ulceration"],
          ["T3a", "T3a — Breslow > 2.0 to 4.0 mm WITHOUT ulceration"],
          ["T3b", "T3b — Breslow > 2.0 to 4.0 mm WITH ulceration"],
          ["T4a", "T4a — Breslow > 4.0 mm WITHOUT ulceration"],
          ["T4b", "T4b — Breslow > 4.0 mm WITH ulceration"]
        ]),
        makeS("nCat", "Regional Lymph Nodes & Transit Mets (N)", "N0", [
          ["N0", "N0 — No regional metastases detected"],
          ["N1a", "N1a — 1 clinically occult (sentinel lymph node) positive node"],
          ["N1b", "N1b — 1 clinically detected positive node"],
          ["N1c", "N1c — No regional nodes, but in-transit, satellite, or microsatellite metastases present"],
          ["N2", "N2 — 2 or 3 positive lymph nodes, or in-transit with 1 node"],
          ["N3", "N3 — ≥ 4 positive nodes, matted nodes, or in-transit with ≥ 2 nodes"]
        ]),
        makeS("mCat", "Distant Metastasis & Serum LDH (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1a", "M1a — Distant metastasis to skin, soft tissue, muscle, or non-regional LNs"],
          ["M1b", "M1b — Distant metastasis to lung (with/without M1a sites)"],
          ["M1c", "M1c — Distant metastasis to non-CNS visceral sites (liver, bowel)"],
          ["M1d", "M1d — Distant metastasis to central nervous system (brain)"]
        ])
      ],
      table: {
        headers: ["Stage Group", "TNM Definition", "Clinical Management"],
        rows: [
          { id: "cm0", cols: ["Stage 0", "Tis N0 M0", "Wide local excision with 5 mm margin"] },
          { id: "cmI", cols: ["Stage IA / IB", "T1a-T2a N0 M0", "Wide local excision (1 cm margin for T1; 1–2 cm for T2) ± SLNB for T1b-T2a"] },
          { id: "cmII", cols: ["Stage IIA – IIC", "T2b-T4b N0 M0", "Wide local excision (2 cm margin) + SLNB; consider adjuvant Pembrolizumab or Nivolumab for IIB/IIC"] },
          { id: "cmIII", cols: ["Stage IIIA – IIID", "Any T N1-N3 M0", "Complete therapeutic lymph node dissection (if macroscopic); adjuvant Nivolumab/Pembrolizumab or Dabrafenib+Trametinib (BRAF V600)"] },
          { id: "cmIV", cols: ["Stage IV", "Any T Any N M1", "Dual checkpoint blockade (Nivolumab + Ipilimumab or Nivolumab + Relatlimab) or BRAF/MEK targeted therapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat !== "M0") return { value: "Stage IV (" + v.mCat + ")", matchId: "cmIV", eq: "Metastatic melanoma. Test for BRAF V600E/K mutation stat." };
        if (v.nCat !== "N0") return { value: "Stage III (Regional Nodal / In-Transit)", matchId: "cmIII", eq: "Regional metastatic disease. Adjuvant PD-1 inhibitor or BRAF/MEK inhibitors indicated." };
        if (v.tCat === "Tis") return { value: "Stage 0 (Melanoma in situ)", matchId: "cm0", eq: "Intraepidermal non-invasive melanoma." };
        if (v.tCat === "T1a") return { value: "Stage IA", matchId: "cmI", eq: "Low risk superficial melanoma. 1 cm margin excision; SLNB generally not required." };
        if (v.tCat === "T1b" || v.tCat === "T2a") return { value: "Stage IB", matchId: "cmI", eq: "Intermediate risk. Wide excision + Sentinel Lymph Node Biopsy recommended." };
        if (v.tCat === "T2b" || v.tCat === "T3a") return { value: "Stage IIA", matchId: "cmII", eq: "Moderately thick melanoma." };
        if (v.tCat === "T3b" || v.tCat === "T4a") return { value: "Stage IIB", matchId: "cmII", eq: "Thick / ulcerated melanoma. Adjuvant anti-PD-1 indicated." };
        return { value: "Stage IIC (T4b N0 M0)", matchId: "cmII", eq: "Ulcerated thick melanoma (>4 mm). High recurrence risk; adjuvant systemic immunotherapy." };
      }
    },
    {
      id: "merkelCellCarcinoma",
      cat: "onco",
      type: "class",
      name: "Merkel Cell Carcinoma of the Skin (AJCC 8th Ed.)",
      desc: "Staging for primary cutaneous neuroendocrine (Merkel cell) carcinoma associated with Merkel cell polyomavirus (MCPyV) or UV damage.",
      organ: "Skin / Neuroendocrine Cells",
      region: "Dermatologic Oncology",
      subject: "Merkel Cell Carcinoma",
      keywords: ["merkel cell", "mcc", "neuroendocrine skin", "avelumab", "polyomavirus", "slnb", "ajcc 8th"],
      guidance: "T1 ≤ 2 cm; T2 > 2 to ≤ 5 cm; T3 > 5 cm; T4 invades fascia, muscle, cartilage, or bone. Highly lymphotropic; routine SLNB is mandatory.",
      literature: [{
        type: "AJCC 8th Staging",
        icon: "📄",
        title: "The 8th Edition of the AJCC Cancer Staging Manual: Merkel Cell Carcinoma",
        citation: "Harms KL, et al. Ann Surg Oncol. 2017;24(10):2827-2835.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28801826/" },
          { text: "Merkelcell.org Clinical Staging Guide ↗", url: "https://merkelcell.org/" },
          { text: "NCI Merkel Cell Carcinoma PDQ ↗", url: "https://www.cancer.gov/types/skin/hp/merkel-cell-treatment-pdq" },
          { text: "NCCN Merkel Cell Carcinoma Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary MCC Tumor (T)", "T1", [
          ["Tis", "Tis — In situ Merkel cell carcinoma"],
          ["T1", "T1 — Maximum clinical/pathologic dimension ≤ 2 cm"],
          ["T2", "T2 — Maximum dimension > 2 cm but ≤ 5 cm"],
          ["T3", "T3 — Maximum dimension > 5 cm"],
          ["T4", "T4 — Invades deep fascia, muscle, cartilage, or bone"]
        ]),
        makeS("nCat", "Regional Nodes & In-Transit (N)", "N0", [
          ["N0", "cN0 / pN0 — Regional lymph nodes clinically and pathologically negative"],
          ["N1a", "pN1a — Clinically occult microscopic nodal metastasis (found on SLNB)"],
          ["N1b", "cN1b / pN1b — Macroscopic / clinically detected regional node metastasis"],
          ["N2", "N2 — In-transit metastases without nodal disease, or with nodal metastases"],
          ["N3", "N3 — Bulky ulcerated or matted lymph nodes"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1a", "M1a — Distant skin, subcutaneous tissue, or non-regional LNs"],
          ["M1b", "M1b — Lung metastasis"],
          ["M1c", "M1c — Visceral or bone metastases"]
        ])
      ],
      table: {
        headers: ["Stage Group", "TNM Criteria", "Therapeutic Protocol"],
        rows: [
          { id: "mcI", cols: ["Stage I", "T1 pN0 M0", "Wide local excision (1–2 cm margins) + SLNB + postoperative radiotherapy to primary bed"] },
          { id: "mcIIA", cols: ["Stage IIA", "T2-T3 pN0 M0", "Wide local excision + SLNB + adjuvant radiotherapy"] },
          { id: "mcIIB", cols: ["Stage IIB", "T4 pN0 M0", "Extensive surgical excision + regional nodal and bed adjuvant radiation"] },
          { id: "mcIII", cols: ["Stage IIIA / IIIB", "Any T N1-N3 M0", "Complete lymph node dissection + nodal basin radiotherapy ± adjuvant Avelumab / Pembrolizumab"] },
          { id: "mcIV", cols: ["Stage IV", "Any T Any N M1", "Anti-PD-L1 / PD-1 immunotherapy (Avelumab is FDA-approved first line)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat !== "M0") return { value: "Stage IV", matchId: "mcIV", eq: "Metastatic Merkel cell carcinoma. Avelumab / Pembrolizumab preferred first-line." };
        if (v.nCat !== "N0") return { value: "Stage III", matchId: "mcIII", eq: "Regional nodal or in-transit involvement. High recurrence risk; radiation + immunotherapy." };
        if (v.tCat === "T4") return { value: "Stage IIB", matchId: "mcIIB", eq: "Invasion into deep muscle/fascia/bone." };
        if (v.tCat === "T2" || v.tCat === "T3") return { value: "Stage IIA", matchId: "mcIIA", eq: "Large primary lesion (> 2 cm) with negative sentinel node." };
        return { value: "Stage I (T1 N0 M0)", matchId: "mcI", eq: "Primary ≤ 2 cm with confirmed negative sentinel lymph node." };
      }
    },
    {
      id: "nonMelanomaSkinCarcinoma",
      cat: "onco",
      type: "class",
      name: "Non-Melanoma Skin Carcinoma (Trunk & Extremities - AJCC 8th)",
      desc: "Cutaneous Squamous Cell Carcinoma (cSCC) and basal cell carcinoma of trunk and extremities (excluding H&N, eyelid, vulva, penis).",
      organ: "Skin / Keratinocytes",
      region: "Dermatologic Oncology",
      subject: "Cutaneous Squamous Cell Carcinoma",
      keywords: ["cscc", "cutaneous squamous", "bcc", "keratinocyte", "high risk", "cemiplimab"],
      guidance: "T1 ≤ 2 cm; T2 > 2 to ≤ 4 cm; T3 > 4 cm or minor bone erosion or perineural invasion (≥0.1mm) or deep invasion (>6mm / beyond subQ fat); T4 gross cortical bone or axial skeleton invasion.",
      literature: [{
        type: "AJCC 8th Dermatology Staging",
        icon: "📄",
        title: "Cutaneous Squamous Cell Carcinoma: AJCC 8th Edition Staging Manual",
        citation: "Farberg AS, et al. J Clin Aesthet Dermatol. 2018;11(8):44-47.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/30214667/" },
          { text: "Skin Cancer Foundation Medical Resources ↗", url: "https://www.skincancer.org/" },
          { text: "NCI Nonmelanoma Skin Cancer PDQ ↗", url: "https://www.cancer.gov/types/skin/hp/skin-treatment-pdq" },
          { text: "NCCN Squamous Cell Skin Cancer Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Cutaneous Tumor (T)", "T1", [
          ["Tis", "Tis — Bowen's disease / squamous cell carcinoma in situ"],
          ["T1", "T1 — Tumor ≤ 2 cm in greatest dimension, no high-risk features"],
          ["T2", "T2 — Tumor > 2 cm but ≤ 4 cm in greatest dimension"],
          ["T3", "T3 — Tumor > 4 cm, OR minor cortical bone erosion, perineural invasion ≥0.1mm, or deep invasion (>6mm)"],
          ["T4", "T4 — Gross cortical bone, axial skeletal invasion, or skull base/axial perineural involvement"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Single ipsilateral node ≤ 3 cm, no extranodal extension (ENE)"],
          ["N2", "N2 — Single node >3cm, or multiple nodes, or bilateral nodes without ENE"],
          ["N3", "N3 — Regional node with Extranodal Extension (ENE) present"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Definition", "Therapeutic Action"],
        rows: [
          { id: "sc0", cols: ["Stage 0", "Tis N0 M0", "Cryotherapy, 5-FU, Imiquimod, or conservative surgical excision"] },
          { id: "scI", cols: ["Stage I", "T1 N0 M0", "Standard surgical excision with 4–6 mm clear margins or Mohs micrographic surgery"] },
          { id: "scII", cols: ["Stage II", "T2 N0 M0", "Wide local excision with margin control; consider baseline staging ultrasound"] },
          { id: "scIII", cols: ["Stage III", "T3 N0 or T1-T3 N1 M0", "Wide excision + regional lymphadenectomy + adjuvant radiotherapy"] },
          { id: "scIV", cols: ["Stage IV", "T4, N2-N3, or M1", "Cemiplimab (anti-PD-1) or Pembrolizumab systemic immunotherapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.tCat === "T4" || v.nCat === "N2" || v.nCat === "N3") return { value: "Stage IV", matchId: "scIV", eq: "Advanced / metastatic cutaneous SCC. Cemiplimab is standard first-line therapy." };
        if (v.nCat === "N1" || v.tCat === "T3") return { value: "Stage III", matchId: "scIII", eq: "High-risk cSCC with deep/perineural invasion or regional node metastasis." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "scII", eq: "Tumor > 2 cm but ≤ 4 cm." };
        if (v.tCat === "T1") return { value: "Stage I", matchId: "scI", eq: "Low-risk localized cutaneous carcinoma." };
        return { value: "Stage 0", matchId: "sc0", eq: "In situ carcinoma (Bowen disease)." };
      }
    },
    // ==============================================================
    // 1. BREAST CARCINOMA
    // ==============================================================
    {
      id: "breastCancerTNM",
      cat: "onco",
      type: "class",
      name: "Breast Carcinoma Staging (AJCC 8th/9th Ed.)",
      desc: "Anatomic and clinical prognostic TNM classification for invasive breast carcinomas (ductal, lobular, variants, and inflammatory).",
      organ: "Breast / Regional Lymphatics",
      region: "Surgical Oncology / Breast",
      subject: "Breast Carcinoma Staging",
      keywords: ["breast cancer", "tnm", "ajcc", "ductal", "lobular", "inflammatory breast cancer"],
      guidance: "1. T-category is determined by the maximum microscopic dimension of invasive carcinoma (excluding in situ component).\n2. T4d denotes inflammatory breast carcinoma (erythema, edema, peau d'orange over ≥1/3 of the breast).\n3. N-category reflects ipsilateral movable axillary (N1), matted/fixed axillary or internal mammary (N2), and infraclavicular/supraclavicular (N3) nodes.",
      literature: [{
        type: "Consensus Guidelines & Staging Manual",
        icon: "📄",
        title: "AJCC Cancer Staging Manual, 8th Edition: Breast Cancer",
        citation: "Giuliano AE, et al. Ann Surg Oncol. 2018;25(7):1783-1785.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/29671134/" },
          { text: "NCI PDQ Adult Breast Treatment ↗", url: "https://www.cancer.gov/types/breast/hp/breast-treatment-pdq" },
          { text: "NCCN Clinical Practice Guidelines in Oncology ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "AJCC Breast Protocol Resources ↗", url: "https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor (T)", "T1", [
          ["Tis", "Tis — Carcinoma in situ (DCIS)"],
          ["T1", "T1 — Tumor ≤ 20 mm in greatest dimension (T1mi, T1a, T1b, T1c)"],
          ["T2", "T2 — Tumor > 20 mm but ≤ 50 mm in greatest dimension"],
          ["T3", "T3 — Tumor > 50 mm in greatest dimension"],
          ["T4", "T4a-c — Direct extension to chest wall or skin ulceration/nodules"],
          ["T4d", "T4d — Inflammatory breast carcinoma (diffuse erythema/edema over ≥1/3 breast)"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Micrometastases or metastases in 1–3 ipsilateral movable axillary LNs"],
          ["N2", "N2 — Metastases in 4–9 axillary LNs or matted/fixed; or clinically detected internal mammary LNs"],
          ["N3", "N3 — Metastases in ≥10 axillary LNs, infraclavicular (level III), or supraclavicular LNs"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No clinical or radiographic evidence of distant metastases"],
          ["M1", "M1 — Distant organ or non-regional nodal metastases present (bone, lung, liver, brain)"]
        ])
      ],
      table: {
        headers: ["Stage Group", "TNM Criteria", "Therapeutic Pathway"],
        rows: [
          { id: "st0", cols: ["Stage 0", "Tis N0 M0", "Breast conserving surgery or mastectomy; endocrine risk reduction"] },
          { id: "stI", cols: ["Stage I (IA/IB)", "T1 N0 M0 / T0-1 N1mi M0", "Upfront lumpectomy + SLNB; adjuvant systemic/radiation therapy"] },
          { id: "stII", cols: ["Stage II (IIA/IIB)", "T2 N0, T1-2 N1, T3 N0 M0", "Multidisciplinary approach; neoadjuvant chemotherapy or upfront resection"] },
          { id: "stIII", cols: ["Stage III (IIIA-IIIC)", "Any T N2-3, T4 Any N, T3 N1 M0", "Neoadjuvant systemic therapy followed by modified radical mastectomy and PMRT"] },
          { id: "stIV", cols: ["Stage IV", "Any T Any N M1", "Palliative systemic therapy (endocrine, CDK4/6i, anti-HER2, chemo, IO)"] }
        ]
      },
      calc: function (v) {
        var t = v.tCat, n = v.nCat, m = v.mCat;
        if (m === "M1") return { value: "Stage IV", matchId: "stIV", eq: "Metastatic breast carcinoma. Systemic biological therapy tailored to ER/PR/HER2 status." };
        if (t === "Tis" && n === "N0") return { value: "Stage 0 (Tis N0 M0)", matchId: "st0", eq: "Non-invasive in situ carcinoma." };
        if (n === "N3" || t === "T4" || t === "T4d" || (t === "T3" && (n === "N1" || n === "N2")) || (n === "N2")) {
          return { value: "Stage III (Locally Advanced)", matchId: "stIII", eq: "Locally advanced / inflammatory breast cancer. Requires neoadjuvant chemotherapy before surgery." };
        }
        if ((t === "T2" && n === "N0") || (t === "T1" && n === "N1") || (t === "T2" && n === "N1") || (t === "T3" && n === "N0")) {
          return { value: "Stage II", matchId: "stII", eq: "Early invasive carcinoma with moderate locoregional burden." };
        }
        return { value: "Stage I (T1 N0 M0)", matchId: "stI", eq: "Early node-negative invasive carcinoma; high 5-year overall survival (>98%)." };
      }
    },

    // ==============================================================
    // 2. GYNECOLOGICAL SITES (FIGO / UICC TNM)
    // ==============================================================
    {
      id: "vulvaCancerFIGO",
      cat: "onco",
      type: "class",
      name: "Vulvar Carcinoma (FIGO 2021 / TNM)",
      desc: "FIGO 2021 staging for squamous cell carcinoma and variants of the vulva.",
      organ: "Vulva / Inguinal Lymph Nodes",
      region: "Gynecologic Oncology",
      subject: "Vulvar Malignancies",
      keywords: ["vulva", "figo 2021", "inguinofemoral", "vulvar cancer", "tnm"],
      guidance: "Stage I is strictly confined to the vulva (IA ≤2cm and invasion ≤1mm; IB >2cm or invasion >1mm). Stage II invades adjacent lower perineal structures. Stage III indicates regional nodal spread.",
      literature: [{
        type: "International Staging Revision",
        icon: "📄",
        title: "Revised FIGO staging for carcinoma of the vulva: 2021 update",
        citation: "Oonk MHM, et al. Int J Gynaecol Obstet. 2021;155(Suppl 1):7-18.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/34669203/" },
          { text: "FIGO Cancer Report ↗", url: "https://www.figo.org/cancer-report-2021" },
          { text: "National Cancer Institute Vulva Summary ↗", url: "https://www.cancer.gov/types/vulvar" },
          { text: "SGO Clinical Practice Statements ↗", url: "https://www.sgo.org/resources/" }
        ]
      }],
      fields: [
        makeS("tumor", "Local Primary Tumor Extent", "IA", [
          ["IA", "Stage IA — Confined to vulva/perineum, size ≤ 2 cm AND stromal invasion ≤ 1.0 mm"],
          ["IB", "Stage IB — Confined to vulva/perineum, size > 2 cm OR stromal invasion > 1.0 mm"],
          ["II", "Stage II — Extension to lower 1/3 urethra, lower 1/3 vagina, or anus (nodes negative)"],
          ["upper", "Extension to upper 2/3 urethra, bladder mucosa, rectal mucosa, or pelvic bone fixed"]
        ]),
        makeS("nodes", "Inguinofemoral Lymph Node Status", "N0", [
          ["N0", "Negative regional lymph nodes"],
          ["N1a", "1 or 2 lymph node metastases, both < 5 mm"],
          ["N1b", "1 lymph node metastasis ≥ 5 mm"],
          ["N2a", "≥ 3 lymph node metastases, all < 5 mm"],
          ["N2b", "≥ 2 lymph node metastases, each ≥ 5 mm"],
          ["N2c", "Extracapsular nodal extension (ECE) present"],
          ["N3", "Fixed or ulcerated regional nodal metastases"]
        ]),
        makeS("distant", "Distant Metastases (M)", "M0", [
          ["M0", "No distant metastasis"],
          ["M1", "Distant metastasis present (including pelvic nodes or distant organs)"]
        ])
      ],
      table: {
        headers: ["FIGO 2021 Stage", "Anatomic Spread", "Clinical Management"],
        rows: [
          { id: "fI", cols: ["Stage I (IA / IB)", "Confined to vulva/perineum, N0", "Wide local excision / radical partial vulvectomy ± sentinel lymph node biopsy"] },
          { id: "fII", cols: ["Stage II", "Adjacent lower perineal extension, N0", "Radical excision + inguinofemoral lymphadenectomy"] },
          { id: "fIII", cols: ["Stage III (IIIA / IIIB / IIIC)", "Regional nodal metastases without ECE (IIIA/B) or with ECE (IIIC)", "Radical vulvectomy with bilateral groin dissection; adjuvant chemoradiation"] },
          { id: "fIV", cols: ["Stage IV (IVA / IVB)", "Fixed to bone, upper mucosa, ulcerated nodes (IVA), or M1 (IVB)", "Definitive chemoradiation or palliative systemic therapy"] }
        ]
      },
      calc: function (v) {
        if (v.distant === "M1") return { value: "FIGO Stage IVB", matchId: "fIV", eq: "Distant metastatic vulvar carcinoma. Systemic therapy indicated." };
        if (v.nodes === "N3" || v.tumor === "upper") return { value: "FIGO Stage IVA", matchId: "fIV", eq: "Locally ultra-advanced or fixed/ulcerated regional nodes." };
        if (v.nodes === "N2c") return { value: "FIGO Stage IIIC", matchId: "fIII", eq: "Nodal disease with extracapsular extension. Adjuvant external beam radiotherapy indicated." };
        if (v.nodes === "N2a" || v.nodes === "N2b") return { value: "FIGO Stage IIIB", matchId: "fIII", eq: "Multiple or large (≥5mm) inguinofemoral metastases." };
        if (v.nodes === "N1a" || v.nodes === "N1b") return { value: "FIGO Stage IIIA", matchId: "fIII", eq: "Limited inguinofemoral nodal metastasis." };
        if (v.tumor === "II") return { value: "FIGO Stage II", matchId: "fII", eq: "Involvement of adjacent lower perineal structures with clear nodes." };
        return { value: "FIGO Stage " + v.tumor, matchId: "fI", eq: "Confined to vulva. Primary surgical management." };
      }
    },
    {
      id: "vaginaCancerFIGO",
      cat: "onco",
      type: "class",
      name: "Vaginal Carcinoma (FIGO / TNM)",
      desc: "Staging for primary carcinomas arising in the vagina (not secondary to cervical/vulvar spread).",
      organ: "Vagina / Pelvic & Inguinal Nodes",
      region: "Gynecologic Oncology",
      subject: "Vaginal Malignancies",
      keywords: ["vagina", "figo", "vaginal carcinoma", "paracolpium", "pelvic wall"],
      guidance: "Tumors must have their epicenter strictly in the vagina without primary cervical or vulvar involvement.",
      literature: [{
        type: "Standard FIGO Staging",
        icon: "📄",
        title: "Cancer of the vagina: 2021 update",
        citation: "Adams TS, et al. Int J Gynaecol Obstet. 2021;155(Suppl 1):19-27.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/34669204/" },
          { text: "FIGO Official Portal ↗", url: "https://www.figo.org/" },
          { text: "NCI Vaginal Cancer Health Professional PDQ ↗", url: "https://www.cancer.gov/types/vaginal" },
          { text: "ESGO Guidelines for Vaginal Cancer ↗", url: "https://www.esgo.org/guidelines/" }
        ]
      }],
      fields: [
        makeS("extent", "Primary Tumor Extent", "I", [
          ["I", "Stage I — Tumor confined strictly to vaginal mucosa and wall"],
          ["II", "Stage II — Tumor invades paravaginal tissue (paracolpium) but not to pelvic sidewall"],
          ["III_wall", "Stage III (sidewall) — Tumor extends to pelvic sidewall and/or causes hydronephrosis"],
          ["IVA", "Stage IVA — Tumor invades mucosa of bladder or rectum and/or direct extension beyond true pelvis"]
        ]),
        makeS("nodes", "Nodal Status", "N0", [
          ["N0", "No regional lymph node metastasis"],
          ["N1", "Pelvic or inguinofemoral (for lower 1/3) lymph node metastasis"]
        ]),
        makeS("mets", "Distant Metastasis", "M0", [
          ["M0", "No distant metastasis"],
          ["M1", "Distant metastasis present (Stage IVB)"]
        ])
      ],
      table: {
        headers: ["Stage", "Anatomic Description", "Management"],
        rows: [
          { id: "sI", cols: ["Stage I", "Confined to vaginal wall", "Surgical resection or interstitial brachytherapy"] },
          { id: "sII", cols: ["Stage II", "Involves paracolpium", "Definitive external beam radiation + brachytherapy"] },
          { id: "sIII", cols: ["Stage III", "Pelvic sidewall invasion or positive regional nodes", "Definitive concurrent chemoradiotherapy"] },
          { id: "sIV", cols: ["Stage IV (IVA / IVB)", "Bladder/rectal mucosa invasion or distant metastases", "Palliative chemotherapy or pelvic exenteration"] }
        ]
      },
      calc: function (v) {
        if (v.mets === "M1") return { value: "Stage IVB (M1)", matchId: "sIV", eq: "Distant metastatic vaginal cancer." };
        if (v.extent === "IVA") return { value: "Stage IVA", matchId: "sIV", eq: "Invasion into mucosal lining of bladder or rectum." };
        if (v.extent === "III_wall" || v.nodes === "N1") return { value: "Stage III", matchId: "sIII", eq: "Locally advanced vaginal carcinoma or regional nodal disease." };
        if (v.extent === "II") return { value: "Stage II", matchId: "sII", eq: "Paravaginal extension into perivaginal stroma." };
        return { value: "Stage I", matchId: "sI", eq: "Organ-confined vaginal tumor." };
      }
    },
    {
      id: "cervixCancerFIGO",
      cat: "onco",
      type: "class",
      name: "Cervix Uteri Carcinoma (FIGO 2018 / 2021)",
      desc: "Comprehensive staging incorporating imaging and pathologic nodal status (Stage IIIC1/IIIC2).",
      organ: "Uterine Cervix / Pelvic & Para-aortic Nodes",
      region: "Gynecologic Oncology",
      subject: "Cervical Cancer",
      keywords: ["cervix", "figo 2018", "iiic1", "iiic2", "stromal invasion", "chemoradiation"],
      guidance: "Stage IA is microscopic only (<5mm depth). IB is divided by 2 cm and 4 cm thresholds. Any pelvic node involvement = IIIC1; para-aortic nodes = IIIC2.",
      literature: [{
        type: "FIGO Staging Classification",
        icon: "📄",
        title: "Revised FIGO staging for carcinoma of the cervix uteri",
        citation: "Bhatla N, et al. Int J Gynaecol Obstet. 2019;145(1):129-135.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/30656710/" },
          { text: "FIGO Cervical Cancer Guidelines ↗", url: "https://www.figo.org/guidelines-cervical-cancer" },
          { text: "NCI Cervical Cancer Treatment Summary ↗", url: "https://www.cancer.gov/types/cervical" },
          { text: "AJR Cervical Staging Review ↗", url: "https://ajronline.org/doi/10.2214/AJR.19.21819" }
        ]
      }],
      fields: [
        makeS("local", "Local Extent of Invasive Tumor", "IB1", [
          ["IA1", "Stage IA1 — Stromal invasion < 3.0 mm depth (microscopic)"],
          ["IA2", "Stage IA2 — Stromal invasion ≥ 3.0 mm and < 5.0 mm depth"],
          ["IB1", "Stage IB1 — Stromal invasion ≥ 5.0 mm and < 2.0 cm greatest dimension"],
          ["IB2", "Stage IB2 — Tumor ≥ 2.0 cm and < 4.0 cm in greatest dimension"],
          ["IB3", "Stage IB3 — Tumor ≥ 4.0 cm in greatest dimension"],
          ["IIA1", "Stage IIA1 — Involves upper 2/3 vagina, no parametrial invasion, < 4.0 cm"],
          ["IIA2", "Stage IIA2 — Involves upper 2/3 vagina, no parametrial invasion, ≥ 4.0 cm"],
          ["IIB", "Stage IIB — Parametrial involvement (not extending to pelvic sidewall)"],
          ["IIIA", "Stage IIIA — Involves lower 1/3 vagina (no pelvic sidewall)"],
          ["IIIB", "Stage IIIB — Extends to pelvic sidewall and/or hydronephrosis/nonfunctioning kidney"],
          ["IVA", "Stage IVA — Invades mucosa of bladder or rectum or expands beyond true pelvis"]
        ]),
        makeS("nodes", "Lymph Node Status (Imaging / Pathology)", "N0", [
          ["N0", "Negative pelvic and para-aortic lymph nodes"],
          ["IIIC1", "Pelvic lymph node metastasis (Stage IIIC1)"],
          ["IIIC2", "Para-aortic lymph node metastasis (Stage IIIC2)"]
        ]),
        makeS("mCat", "Distant Metastasis", "M0", [
          ["M0", "No distant metastasis"],
          ["M1", "Distant metastasis present (lungs, liver, bones, supraclavicular nodes)"]
        ])
      ],
      table: {
        headers: ["FIGO Stage", "Clinical Entity", "Standard Recommendation"],
        rows: [
          { id: "stEarly", cols: ["Stage IA1 – IB2", "Early localized disease", "Cone biopsy, simple hysterectomy, or radical hysterectomy + pelvic lymphadenectomy"] },
          { id: "stLocAdv", cols: ["Stage IB3 – IVA", "Locally advanced cervical carcinoma", "Definitive concurrent platinum-based chemoradiotherapy + image-guided brachytherapy"] },
          { id: "stNodal", cols: ["Stage IIIC1 / IIIC2", "Nodal disease (pelvic / para-aortic)", "Extended-field chemoradiotherapy + brachytherapy"] },
          { id: "stIVB", cols: ["Stage IVB", "Distant metastatic disease", "Systemic chemotherapy + Bevacizumab + Pembrolizumab (anti-PD-1)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "FIGO Stage IVB", matchId: "stIVB", eq: "Distant metastatic cervical cancer." };
        if (v.nodes === "IIIC2") return { value: "FIGO Stage IIIC2", matchId: "stNodal", eq: "Para-aortic lymph node involvement (imaging or biopsy confirmed)." };
        if (v.nodes === "IIIC1") return { value: "FIGO Stage IIIC1", matchId: "stNodal", eq: "Pelvic lymph node involvement; supersedes T1-T3 primary stages." };
        if (v.local === "IVA") return { value: "FIGO Stage IVA", matchId: "stLocAdv", eq: "Direct spread to mucosal lining of bladder or bowel." };
        var isEarly = ["IA1", "IA2", "IB1", "IB2", "IIA1"].indexOf(v.local) >= 0;
        return { value: "FIGO Stage " + v.local, matchId: isEarly ? "stEarly" : "stLocAdv", eq: isEarly ? "Surgical candidate pathway." : "Concurrent chemoradiation candidate." };
      }
    },
    {
      id: "endometrialCancerFIGO",
      cat: "onco",
      type: "class",
      name: "Corpus Uteri – Endometrial Carcinoma (FIGO 2023)",
      desc: "Updated FIGO 2023 staging integrating histologic aggressive variants, LVSI, and molecular subgroups (POLE, MMRd, p53abn).",
      organ: "Uterine Corpus / Endometrium",
      region: "Gynecologic Oncology",
      subject: "Endometrial Carcinoma",
      keywords: ["endometrial", "figo 2023", "corpus uteri", "lvsi", "p53", "pole", "mmrd"],
      guidance: "Incorporates substantial LVSI, non-aggressive vs aggressive histologic subtypes (serous, clear cell, carcinosarcoma), and molecular markers.",
      literature: [{
        type: "FIGO 2023 Staging Standard",
        icon: "📄",
        title: "FIGO staging of endometrial cancer: 2023",
        citation: "Berek JS, et al. Int J Gynaecol Obstet. 2023;162(2):383-394.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/37337359/" },
          { text: "ResearchGate FIGO 2023 Review ↗", url: "https://www.researchgate.net/publication/388100848_New_FIGO_2023_Staging_System_of_Endometrial_Cancer_An_Updated_Review_on_a_Current_Hot_Topic" },
          { text: "NCCN Guidelines Endometrial Carcinoma ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "ESGO-ESTRO-ESP Endometrial Guidelines ↗", url: "https://www.esgo.org/guidelines/" }
        ]
      }],
      fields: [
        makeS("stage", "FIGO 2023 Anatomic/Pathologic Category", "IA1", [
          ["IA1", "Stage IA1 — Non-aggressive histology confined to endometrium/polyp"],
          ["IA2", "Stage IA2 — Non-aggressive histology with <50% myometrial invasion, no/focal LVSI"],
          ["IA3", "Stage IA3 — Low-grade endometrioid confined to uterus and 1 ovary"],
          ["IB", "Stage IB — Non-aggressive histology with ≥50% myometrial invasion, no/focal LVSI"],
          ["IC", "Stage IC — Aggressive histology (serous/clear cell/carcinosarcoma) confined to endometrium"],
          ["IIA", "Stage IIA — Cervical stromal invasion of non-aggressive histology"],
          ["IIB", "Stage IIB — Substantial/extensive LVSI of non-aggressive histology"],
          ["IIC", "Stage IIC — Aggressive histology with any myometrial invasion"],
          ["IIIA", "Stage IIIA — Involves uterine serosa, adnexa (metastasis), or both"],
          ["IIIB", "Stage IIIB — Vaginal and/or parametrial involvement"],
          ["IIIC1", "Stage IIIC1 — Pelvic lymph node metastases"],
          ["IIIC2", "Stage IIIC2 — Para-aortic lymph node metastases"],
          ["IVA", "Stage IVA — Invades bladder mucosa or rectal mucosa"],
          ["IVB", "Stage IVB — Distant peritoneal carcinomatosis or distant organ metastases"]
        ]),
        makeS("molecular", "Molecular Classification Modifier", "none", [
          ["none", "Not tested / Standard NSMP"],
          ["pole", "POLEmut (Ultramutated) — Favourable prognosis; downstage early tumors"],
          ["mmrd", "MMRd (Mismatch Repair Deficient) — Potential candidate for checkpoint inhibitors"],
          ["p53abn", "p53abn (Abnormal/mutated p53) — Aggressive biology; upstages stage I/II to IICmp53abn"]
        ])
      ],
      table: {
        headers: ["FIGO 2023", "Molecular Modifier", "Clinical Impact"],
        rows: [
          { id: "eI", cols: ["Stage I", "POLEmut = Excellent prognosis", "Total hysterectomy with bilateral salpingo-oophorectomy (TH/BSO) ± sentinel node biopsy"] },
          { id: "eII", cols: ["Stage II (Cervical / LVSI / Aggressive)", "p53abn = High recurrence risk", "Adjuvant vaginal cuff brachytherapy or pelvic radiotherapy"] },
          { id: "eIII", cols: ["Stage III (Adnexal / Nodal IIIC)", "MMRd = High immunotherapy response", "Surgical debulking + systemic chemotherapy + external radiation"] },
          { id: "eIV", cols: ["Stage IV (Mucosal IVA / Distant IVB)", "PD-1 Inhibitors indicated for MMRd", "Carboplatin + Paclitaxel + Pembrolizumab/Dostarlimab"] }
        ]
      },
      calc: function (v) {
        var st = v.stage;
        var mol = v.molecular;
        var note = mol === "p53abn" ? " [Note: p53abn conveys high risk]" : mol === "pole" ? " [Note: POLEmut conveys excellent outcome]" : "";
        var match = st.startsWith("IV") ? "eIV" : st.startsWith("III") ? "eIII" : st.startsWith("II") ? "eII" : "eI";
        return { value: "FIGO 2023 " + st + note, matchId: match, eq: "Standard FIGO 2023 classification integrating pathology, LVSI, and genomics." };
      }
    },
    {
      id: "uterineSarcomaFIGO",
      cat: "onco",
      type: "class",
      name: "Corpus Uteri – Uterine Sarcoma (LMS, ESS, Adenosarcoma)",
      desc: "Dedicated FIGO / UICC TNM staging system for Leiomyosarcoma and Endometrial Stromal Sarcoma.",
      organ: "Uterine Myometrium / Stroma",
      region: "Gynecologic Oncology",
      subject: "Uterine Sarcomas",
      keywords: ["uterine sarcoma", "leiomyosarcoma", "ess", "adenosarcoma", "figo"],
      guidance: "Leiomyosarcomas and endometrial stromal sarcomas have a dedicated staging system separate from carcinosarcomas (which are staged as epithelial endometrial carcinomas).",
      literature: [{
        type: "FIGO Staging Reference",
        icon: "📄",
        title: "FIGO staging for uterine sarcomas",
        citation: "Prat J. Int J Gynaecol Obstet. 2009;104(3):177-178.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/19217637/" },
          { text: "NCI Uterine Sarcoma Treatment Summary ↗", url: "https://www.cancer.gov/types/uterine/hp/uterine-sarcoma-treatment-pdq" },
          { text: "ESMO-EURACAN Sarcoma Guidelines ↗", url: "https://www.esmo.org/guidelines/" },
          { text: "AJCC Uterine Sarcoma Protocol ↗", url: "https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/" }
        ]
      }],
      fields: [
        makeS("tumor", "Primary Sarcoma Extent (LMS / ESS)", "IA", [
          ["IA", "Stage IA — Tumor limited to uterus ≤ 5 cm in greatest dimension"],
          ["IB", "Stage IB — Tumor limited to uterus > 5 cm in greatest dimension"],
          ["II", "Stage II — Tumor extends to the pelvis (adnexal or parametrial)"],
          ["IIIA", "Stage IIIA — Tumor invades abdominal tissues (1 site)"],
          ["IIIB", "Stage IIIB — More than 1 site of intra-abdominal tissue invasion"],
          ["IIIC", "Stage IIIC — Metastasis to regional (pelvic and/or para-aortic) lymph nodes"],
          ["IVA", "Stage IVA — Invades bladder mucosa or rectal mucosa"],
          ["IVB", "Stage IVB — Distant metastasis (lungs, liver, bone)"]
        ])
      ],
      table: {
        headers: ["Sarcoma Stage", "Tumor Extent", "Prognosis & Action"],
        rows: [
          { id: "sI", cols: ["Stage I (IA / IB)", "Organ-confined (≤5cm vs >5cm)", "Total hysterectomy; lymphadenectomy omitted in LMS unless grossly abnormal"] },
          { id: "sII", cols: ["Stage II", "Pelvic extension", "Complete surgical resection; high recurrence risk"] },
          { id: "sIII", cols: ["Stage III (IIIA-C)", "Abdominal extension or positive regional nodes", "Debulking + consideration of adjuvant chemotherapy (e.g., Doxorubicin)"] },
          { id: "sIV", cols: ["Stage IV (IVA / IVB)", "Mucosal or distant metastatic spread", "Palliative chemotherapy / Gemcitabine-Docetaxel"] }
        ]
      },
      calc: function (v) {
        var t = v.tumor;
        var match = t.startsWith("IV") ? "sIV" : t.startsWith("III") ? "sIII" : t.startsWith("II") ? "sII" : "sI";
        return { value: "Uterine Sarcoma: FIGO Stage " + t, matchId: match, eq: "Standard histological staging for LMS and Endometrial Stromal Sarcoma." };
      }
    },
    {
      id: "ovaryCancerFIGO",
      cat: "onco",
      type: "class",
      name: "Ovary, Fallopian Tube & Primary Peritoneal Carcinoma",
      desc: "Harmonized FIGO / TNM staging system for epithelial ovarian, tubal, and peritoneal malignancies.",
      organ: "Ovary / Fallopian Tube / Peritoneum",
      region: "Gynecologic Oncology",
      subject: "Ovarian Malignancies",
      keywords: ["ovary", "fallopian tube", "peritoneal", "figo", "capsule", "carcinomatosis", "iiic"],
      guidance: "Stage I confined to ovaries/tubes. Stage II pelvic extension below pelvic brim. Stage III peritoneal metastasis outside pelvis and/or retroperitoneal lymph nodes. Stage IV distant metastasis.",
      literature: [{
        type: "FIGO Staging Classification",
        icon: "📄",
        title: "Staging classification for cancer of the ovary, fallopian tube, and peritoneum",
        citation: "Prat J; FIGO Committee on Gynecologic Oncology. Int J Gynaecol Obstet. 2014;124(1):1-5.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/24229970/" },
          { text: "Scribd FIGO Ovarian Staging ↗", url: "https://www.scribd.com/document/720648610/All-FIGO-staging-of-cancer-2022-Copy" },
          { text: "NCI Ovarian Cancer Health Professional Treatment ↗", url: "https://www.cancer.gov/types/ovarian" },
          { text: "ESGO-ESMO Consensus Conference Recommendations on Ovarian Cancer ↗", url: "https://www.esmo.org/guidelines/" }
        ]
      }],
      fields: [
        makeS("extent", "Anatomic Tumor Extent", "IA", [
          ["IA", "Stage IA — 1 ovary/tube, capsule intact, no tumor on surface, ascites negative"],
          ["IB", "Stage IB — Both ovaries/tubes, capsules intact, no tumor on surface, ascites negative"],
          ["IC1", "Stage IC1 — Surgical spill intraoperatively"],
          ["IC2", "Stage IC2 — Capsule ruptured before surgery or tumor on ovarian/tubal surface"],
          ["IC3", "Stage IC3 — Malignant cells in ascites or peritoneal washings"],
          ["IIA", "Stage IIA — Extension/implants on uterus, fallopian tubes, or ovaries"],
          ["IIB", "Stage IIB — Extension to other pelvic intraperitoneal tissues below pelvic brim"],
          ["IIIA1", "Stage IIIA1 — Positive retroperitoneal lymph nodes only (IIIA1i ≤10mm, IIIA1ii >10mm)"],
          ["IIIA2", "Stage IIIA2 — Microscopic extrapelvic peritoneal involvement ± retroperitoneal nodes"],
          ["IIIB", "Stage IIIB — Macroscopic peritoneal metastasis outside pelvis ≤ 2 cm in dimension"],
          ["IIIC", "Stage IIIC — Macroscopic peritoneal metastasis outside pelvis > 2 cm (includes liver/spleen capsule)"],
          ["IVA", "Stage IVA — Pleural effusion with positive cytology"],
          ["IVB", "Stage IVB — Parenchymal liver/splenic metastases; extra-abdominal organ or inguinal nodes"]
        ])
      ],
      table: {
        headers: ["FIGO Stage", "Disease Spread", "Surgical & Systemic Protocol"],
        rows: [
          { id: "oI", cols: ["Stage I (IA – IC)", "Confined to ovaries/fallopian tubes", "Complete staging laparotomy; adjuvant carboplatin/paclitaxel for high-risk (IC/G3)"] },
          { id: "oII", cols: ["Stage II (IIA – IIB)", "Pelvic extension below brim", "Maximal cytoreductive surgery + adjuvant systemic chemotherapy"] },
          { id: "oIII", cols: ["Stage III (IIIA – IIIC)", "Abdominal peritoneal carcinomatosis / retroperitoneal nodes", "Primary debulking surgery (PDS) or Neoadjuvant Chemo (NACT) with Interval Debulking (IDS)"] },
          { id: "oIV", cols: ["Stage IV (IVA – IVB)", "Malignant pleural effusion / distant organ metastases", "Systemic chemotherapy + Bevacizumab; PARP inhibitor maintenance if BRCAmut / HRD+"] }
        ]
      },
      calc: function (v) {
        var e = v.extent;
        var match = e.startsWith("IV") ? "oIV" : e.startsWith("III") ? "oIII" : e.startsWith("II") ? "oII" : "oI";
        return { value: "FIGO Stage " + e, matchId: match, eq: "Cornerstone of prognostic evaluation and cytoreductive planning." };
      }
    },
    {
      id: "gtdChoriocarcinoma",
      cat: "onco",
      type: "class",
      name: "Gestational Trophoblastic Neoplasia (FIGO / WHO)",
      desc: "Anatomic FIGO stage combined with WHO Prognostic Scoring System to stratify low- vs high-risk GTN.",
      organ: "Placenta / Uterus / Trophoblast",
      region: "Gynecologic Oncology",
      subject: "Gestational Trophoblastic Disease",
      keywords: ["gtd", "gtn", "choriocarcinoma", "molar", "who risk score", "methotrexate"],
      guidance: "FIGO Stage I (uterus), II (genital structures), III (lungs), IV (other distant sites like brain/liver). Score ≤6 is low-risk (single agent MTX); ≥7 is high-risk (EMA-CO multi-agent regimen).",
      literature: [{
        type: "FIGO Oncology Report",
        icon: "📄",
        title: "Gestational trophoblastic disease: 2021 update",
        citation: "Ngan HYS, et al. Int J Gynaecol Obstet. 2021;155(Suppl 1):86-93.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/34669200/" },
          { text: "PMC GTD Review ↗", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12236286/" },
          { text: "NCI Gestational Trophoblastic Disease PDQ ↗", url: "https://www.cancer.gov/types/gestational-trophoblastic" },
          { text: "Charing Cross Hospital GTD Centre Guidance ↗", url: "https://www.hmole-chorio.org.uk/" }
        ]
      }],
      fields: [
        makeS("stage", "FIGO Anatomic Stage", "I", [
          ["I", "Stage I — Disease strictly confined to the uterine corpus"],
          ["II", "Stage II — Extends to other genital structures (vagina, ovary, broad ligament)"],
          ["III", "Stage III — Metastasis to the lungs (with or without genital involvement)"],
          ["IV", "Stage IV — All other distant metastatic sites (brain, liver, gastrointestinal)"]
        ]),
        makeN("whoScore", "WHO Prognostic Score (0 to 24 points based on age, hCG, antecedent pregnancy, interval, site/number of mets, failed chemo)", 3, { min: 0, max: 24, step: 1 })
      ],
      table: {
        headers: ["Risk Category", "WHO Score", "First-Line Chemotherapy"],
        rows: [
          { id: "low", cols: ["Low Risk GTN", "Score 0 – 6", "Single-agent chemotherapy (Methotrexate with Folinic Acid or Actinomycin D)"] },
          { id: "high", cols: ["High Risk GTN", "Score ≥ 7", "Multi-agent chemotherapy (EMA-CO: Etoposide, Methotrexate, Actinomycin D, Cyclophosphamide, Vincristine)"] }
        ]
      },
      calc: function (v) {
        var s = +v.whoScore;
        var match = s >= 7 ? "high" : "low";
        var risk = s >= 7 ? "HIGH-RISK GTN (WHO ≥ 7)" : "LOW-RISK GTN (WHO ≤ 6)";
        return {
          value: "FIGO Stage " + v.stage + " : " + risk + " (Score " + s + ")",
          matchId: match,
          eq: s >= 7 ? "Initiate multi-agent EMA-CO protocol stat to prevent resistant relapse." : "Single-agent Methotrexate monotherapy curative in >90%."
        };
      }
    },

    // ==============================================================
    // 3. GENITOURINARY SITES
    // ==============================================================
    {
      id: "penisCarcinomaTNM",
      cat: "onco",
      type: "class",
      name: "Penile Carcinoma (AJCC 8th/9th Ed.)",
      desc: "TNM classification for squamous cell carcinoma of the penis.",
      organ: "Penis / Inguinal Lymph Nodes",
      region: "Urologic Oncology",
      subject: "Penile Cancer",
      keywords: ["penis", "penile carcinoma", "corpus cavernosum", "spongiosum", "inguinal nodes"],
      guidance: "T1a lacks LVSI and is low grade; T1b has LVSI or is high grade. T2 invades corpus spongiosum; T3 invades corpus cavernosum; T4 invades adjacent structures.",
      literature: [{
        type: "Consensus Guidelines",
        icon: "📄",
        title: "Penile Cancer: ESMO Clinical Practice Guidelines",
        citation: "Hakenberg OW, et al. Ann Oncol. 2020;31(5):585-599.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/32247641/" },
          { text: "BAUS Guidelines for Penile Cancer ↗", url: "https://www.baus.org.uk/trainees/penile_cancer.aspx" },
          { text: "NCCN Penile Cancer Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "EAU Guidelines on Penile Cancer ↗", url: "https://uroweb.org/guidelines/penile-cancer" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor (T)", "T1a", [
          ["Tis", "Tis / Ta — Non-invasive verrucous or carcinoma in situ"],
          ["T1a", "T1a — Invades subepithelial connective tissue, NO lymphovascular invasion (LVSI), NOT poorly differentiated"],
          ["T1b", "T1b — Invades subepithelial connective tissue WITH LVSI or high-grade (G3)"],
          ["T2", "T2 — Tumor invades corpus spongiosum (with or without urethral invasion)"],
          ["T3", "T3 — Tumor invades corpus cavernosum (with or without urethral invasion)"],
          ["T4", "T4 — Tumor invades adjacent structures (scrotum, prostate, pubic bone)"]
        ]),
        makeS("nCat", "Regional Inguinal Nodes (pN)", "N0", [
          ["N0", "pN0 — No regional lymph node metastasis"],
          ["N1", "pN1 — Metastasis in 1 or 2 inguinal lymph nodes, unilateral"],
          ["N2", "pN2 — Metastasis in ≥3 unilateral inguinal nodes or bilateral inguinal nodes"],
          ["N3", "pN3 — Extranodal extension (ECE) or pelvic lymph node metastases"]
        ]),
        makeS("mCat", "Distant Metastases (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage Group", "TNM Grouping", "Clinical Strategy"],
        rows: [
          { id: "pI", cols: ["Stage I", "T1a N0 M0", "Organ-sparing surgery (glansectomy / laser / wide excision); surveillance"] },
          { id: "pIIA", cols: ["Stage IIA", "T1b / T2 N0 M0", "Partial penectomy; dynamic sentinel lymph node biopsy or modified ILND"] },
          { id: "pIIB", cols: ["Stage IIB", "T3 N0 M0", "Partial or total penectomy; invasive nodal staging"] },
          { id: "pIII", cols: ["Stage IIIA / IIIB", "T1-3 N1-2 M0", "Radical inguinal lymph node dissection (ILND); adjuvant chemoradiation"] },
          { id: "pIV", cols: ["Stage IV", "T4 Any N, Any T N3, or M1", "Neoadjuvant TIP chemotherapy (Paclitaxel, Ifosfamide, Cisplatin)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.tCat === "T4" || v.nCat === "N3") return { value: "Stage IV", matchId: "pIV", eq: "Advanced / metastatic disease. Systemic therapy + consolidate surgery." };
        if (v.nCat === "N1" || v.nCat === "N2") return { value: "Stage III", matchId: "pIII", eq: "Regional lymph node metastases." };
        if (v.tCat === "T3") return { value: "Stage IIB (T3 N0 M0)", matchId: "pIIB", eq: "Corpus cavernosum invasion." };
        if (v.tCat === "T1b" || v.tCat === "T2") return { value: "Stage IIA (T1b-T2 N0 M0)", matchId: "pIIA", eq: "Corpus spongiosum invasion or adverse histopathological features." };
        return { value: "Stage I (T1a N0 M0)", matchId: "pI", eq: "Low risk superficial penile carcinoma." };
      }
    },
    {
      id: "prostateCancerAJCC",
      cat: "onco",
      type: "class",
      name: "Prostate Carcinoma (AJCC 8th/9th Prognostic)",
      desc: "Combines Anatomic T-category, Baseline PSA level, and ISUP Prognostic Grade Group (Gleason score).",
      organ: "Prostate Gland",
      region: "Urologic Oncology",
      subject: "Prostate Carcinoma",
      keywords: ["prostate", "psa", "gleason", "grade group", "isup", "ajcc", "drem"],
      guidance: "Prognostic Grouping requires integration of T category, PSA level, and ISUP Grade Group (1 to 5).",
      literature: [{
        type: "Prostate Staging Standard",
        icon: "📄",
        title: "The 8th edition of the AJCC cancer staging manual: Prostate cancer",
        citation: "Buyyounouski MK, et al. Photodiagnosis Photodyn Ther / CA Cancer J Clin. 2017;67(3):245-253.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28225968/" },
          { text: "MDPI Diagnostic Knowledge Graph Review ↗", url: "https://www.mdpi.com/2075-4418/15/19/2474" },
          { text: "NCCN Prostate Cancer Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" },
          { text: "EAU Guidelines on Prostate Cancer ↗", url: "https://uroweb.org/guidelines/prostate-cancer" }
        ]
      }],
      fields: [
        makeS("tCat", "Clinical T Category (cT)", "cT1", [
          ["cT1", "cT1 — Clinically inapparent tumor not palpable or visible on imaging"],
          ["cT2a", "cT2a — Palpable tumor involves half of one lobe or less"],
          ["cT2b_c", "cT2b-c — Palpable tumor involves more than half of one lobe or both lobes"],
          ["cT3", "cT3 — Extraprostatic extension (cT3a) or seminal vesicle invasion (cT3b)"],
          ["cT4", "cT4 — Tumor is fixed or invades adjacent structures (rectum, bladder, pelvic wall)"]
        ]),
        makeN("psa", "Serum PSA Level (ng/mL)", 6.5, { min: 0.1, max: 2000, step: 0.1 }),
        makeS("gg", "ISUP Prognostic Grade Group (Gleason)", "1", [
          ["1", "Grade Group 1 (Gleason score ≤ 6)"],
          ["2", "Grade Group 2 (Gleason score 3 + 4 = 7)"],
          ["3", "Grade Group 3 (Gleason score 4 + 3 = 7)"],
          ["4", "Grade Group 4 (Gleason score 4 + 4 = 8, 3 + 5 = 8, 5 + 3 = 8)"],
          ["5", "Grade Group 5 (Gleason score 9 or 10)"]
        ]),
        makeS("nodesMets", "Nodal and Distant Status", "N0M0", [
          ["N0M0", "N0 M0 — No regional nodal or distant metastases"],
          ["N1", "N1 M0 — Regional lymph node metastasis present (Stage IVA)"],
          ["M1", "M1 — Distant bone, visceral, or extra-pelvic nodal metastasis (Stage IVB)"]
        ])
      ],
      table: {
        headers: ["Prognostic Stage Group", "Risk Stratification", "Management Options"],
        rows: [
          { id: "prI", cols: ["Stage I", "cT1-2a, PSA < 10, GG 1", "Active surveillance protocol preferred; radical prostatectomy or radiation"] },
          { id: "prIIA", cols: ["Stage IIA", "cT1-2a, PSA 10–20, GG 1 OR cT2b-c, GG 1", "Radical prostatectomy + pelvic lymphadenectomy or EBRT"] },
          { id: "prIIB", cols: ["Stage IIB", "cT1-2, PSA < 20, GG 2", "Radical prostatectomy or EBRT ± short-term ADT"] },
          { id: "prIIC", cols: ["Stage IIC", "cT1-2, PSA < 20, GG 3–4", "EBRT + ADT or Radical Prostatectomy + extended PLND"] },
          { id: "prIIIA_C", cols: ["Stage IIIA – IIIC", "PSA ≥ 20, GG 5, or cT3-4", "EBRT + long-term ADT (18–36 mo) ± second-generation AR pathway inhibitor"] },
          { id: "prIV", cols: ["Stage IVA / IVB", "N1 (IVA) or M1 (IVB)", "Systemic ADT + ARPI (Abiraterone / Enzalutamide) ± Docetaxel chemotherapy"] }
        ]
      },
      calc: function (v) {
        if (v.nodesMets === "M1") return { value: "Prognostic Stage IVB (M1)", matchId: "prIV", eq: "Metastatic prostate cancer. Doublet or triplet systemic therapy." };
        if (v.nodesMets === "N1") return { value: "Prognostic Stage IVA (N1)", matchId: "prIV", eq: "Pelvic lymph node metastasis." };
        var p = +v.psa, g = +v.gg, t = v.tCat;
        if (t === "cT4") return { value: "Prognostic Stage IIIC (cT4)", matchId: "prIIIA_C", eq: "Locally ultra-advanced tumor invading pelvic organs." };
        if (g === 5) return { value: "Prognostic Stage IIIC (Grade Group 5)", matchId: "prIIIA_C", eq: "Very high-grade disease." };
        if (t === "cT4" || g === 5) return { value: "Prognostic Stage IIIC", matchId: "prIIIA_C", eq: "Very high-grade disease or adjacent organ invasion." };
        if (t === "cT3" || g === 4) return { value: "Prognostic Stage IIIB", matchId: "prIIIA_C", eq: "High risk: extraprostatic extension or Grade Group 4." };
        if (p >= 20) return { value: "Prognostic Stage IIIA (PSA ≥ 20)", matchId: "prIIIA_C", eq: "High risk by biochemical marker." };
        if (g === 3) return { value: "Prognostic Stage IIC (GG 3)", matchId: "prIIC", eq: "Intermediate-to-high risk." };
        if (g === 2) return { value: "Prognostic Stage IIB (GG 2)", matchId: "prIIB", eq: "Favourable intermediate risk." };
        if (p >= 10 || t === "cT2b_c") return { value: "Prognostic Stage IIA", matchId: "prIIA", eq: "Intermediate risk." };
        return { value: "Prognostic Stage I", matchId: "prI", eq: "Low risk disease candidate for active surveillance." };
      }
    },
    {
      id: "testisCancerPTNMS",
      cat: "onco",
      type: "class",
      name: "Testicular Germ Cell Tumors (pTNMS Staging)",
      desc: "Pathological pTNMS staging incorporating post-orchiectomy nadir serum tumor markers (AFP, hCG, LDH: S0–S3).",
      organ: "Testis / Retroperitoneum",
      region: "Urologic Oncology",
      subject: "Testicular Cancer",
      keywords: ["testis", "ptnms", "seminoma", "nonseminoma", "afp", "hcg", "ldh", "s0", "s1", "s2", "s3"],
      guidance: "pT is staged pathologically post-orchiectomy. Markers: S0 (normal), S1 (LDH <1.5x N, hCG <5000, AFP <1000), S2 (LDH 1.5–10x, hCG 5000–50000, AFP 1000–10000), S3 (LDH >10x N, hCG >50000, or AFP >10000).",
      literature: [{
        type: "TNM Staging System",
        icon: "📄",
        title: "The 8th edition of the AJCC Cancer Staging Manual: Testicular cancer",
        citation: "Amin MB, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "NCI Testicular Cancer Health Professional Treatment ↗", url: "https://www.cancer.gov/types/testicular" },
          { text: "EAU Guidelines on Testicular Cancer ↗", url: "https://uroweb.org/guidelines/testicular-cancer" },
          { text: "UICC TNM 9th Edition Portal ↗", url: "https://www.uicc.org/resources/tnm" }
        ]
      }],
      fields: [
        makeS("pT", "Pathologic Primary Tumor (pT)", "pT1", [
          ["pTis", "pTis — Intratubular germ cell neoplasia (GCNIS)"],
          ["pT1", "pT1 — Limited to testis and epididymis without lymphovascular invasion (LVSI)"],
          ["pT2", "pT2 — Limited to testis/epididymis WITH LVSI, or invades tunica vaginalis"],
          ["pT3", "pT3 — Invades spermatic cord with or without LVSI"],
          ["pT4", "pT4 — Invades scrotum with or without LVSI"]
        ]),
        makeS("N", "Clinical/Pathologic Regional Nodes", "N0", [
          ["N0", "N0 — No regional retroperitoneal lymph node metastasis"],
          ["N1", "N1 — Lymph node mass ≤ 2 cm (or ≤ 5 positive nodes)"],
          ["N2", "N2 — Lymph node mass > 2 cm but ≤ 5 cm (or > 5 positive nodes)"],
          ["N3", "N3 — Lymph node mass > 5 cm in greatest dimension"]
        ]),
        makeS("M", "Distant Metastases (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1a", "M1a — Non-regional nodal or pulmonary metastases"],
          ["M1b", "M1b — Non-pulmonary visceral metastases (liver, bone, brain)"]
        ]),
        makeS("S", "Serum Marker Nadir Post-Orchiectomy (S)", "S0", [
          ["S0", "S0 — Marker levels within normal limits"],
          ["S1", "S1 — LDH < 1.5x N AND hCG < 5,000 mIU/mL AND AFP < 1,000 ng/mL"],
          ["S2", "S2 — LDH 1.5–10x N OR hCG 5,000–50,000 mIU/mL OR AFP 1,000–10,000 ng/mL"],
          ["S3", "S3 — LDH > 10x N OR hCG > 50,000 mIU/mL OR AFP > 10,000 ng/mL"]
        ])
      ],
      table: {
        headers: ["pTNMS Stage Group", "Definition", "Therapeutic Protocol"],
        rows: [
          { id: "t0_I", cols: ["Stage 0 / I (IA / IB / IS)", "pT1-4 N0 M0 (IS has persistent S1-3)", "Active surveillance or 1 cycle adjuvant BEP / RPLND (non-seminoma)"] },
          { id: "tII", cols: ["Stage II (IIA / IIB / IIC)", "Any pT N1-3 M0 S0-1", "Chemotherapy (3x BEP or 4x EP) or primary nerve-sparing RPLND"] },
          { id: "tIII", cols: ["Stage III (IIIA / IIIB / IIIC)", "M1a (IIIA), S2 (IIIB), M1b or S3 (IIIC)", "Standard 3–4 cycles BEP chemotherapy according to IGCCCG risk category"] }
        ]
      },
      calc: function (v) {
        if (v.M === "M1b" || v.S === "S3") return { value: "Stage IIIC (High Marker / Visceral Mets)", matchId: "tIII", eq: "Poor/intermediate prognosis group. Intensive BEP/VIP chemotherapy." };
        if (v.S === "S2" || (v.M === "M1a" && (v.S === "S1" || v.S === "S0"))) return { value: "Stage IIIB", matchId: "tIII", eq: "Advanced metastatic disease." };
        if (v.M === "M1a" && v.S === "S0") return { value: "Stage IIIA", matchId: "tIII", eq: "Pulmonary or non-regional lymphatic metastases with normal markers." };
        if (v.N !== "N0") return { value: "Stage II", matchId: "tII", eq: "Retroperitoneal lymph node involvement." };
        if (v.S !== "S0") return { value: "Stage IS (pT1-4 N0 M0 with persistent S1-3)", matchId: "t0_I", eq: "Occult active metastatic disease. Do not treat as localized disease." };
        if (v.pT === "pT1") return { value: "Stage IA (pT1 N0 M0 S0)", matchId: "t0_I", eq: "Localized low-risk germ cell tumor." };
        return { value: "Stage IB (" + v.pT + " N0 M0 S0)", matchId: "t0_I", eq: "Localized disease with adverse local tumor features (LVSI / vascular invasion)." };
      }
    },
    {
      id: "kidneyRccAJCC",
      cat: "onco",
      type: "class",
      name: "Kidney – Renal Cell Carcinoma (AJCC 8th/9th Ed.)",
      desc: "TNM classification for primary Renal Cell Carcinoma (clear cell, papillary, chromophobe).",
      organ: "Kidney / Vena Cava",
      region: "Urologic Oncology",
      subject: "Renal Cell Carcinoma",
      keywords: ["kidney", "rcc", "renal cell carcinoma", "renal vein", "gerota", "vena cava"],
      guidance: "T1 ≤7 cm (T1a ≤4cm, T1b >4 to ≤7cm). T2 >7 cm (T2a >7 to ≤10cm, T2b >10cm). T3 involves major veins or perinephric tissue within Gerota's fascia. T4 invades beyond Gerota's fascia.",
      literature: [{
        type: "AJCC Staging Standard",
        icon: "📄",
        title: "Renal cell carcinoma: Diagnosis and staging",
        citation: "Ng CS, et al. AJR Am J Roentgenol. 2008;191(4):1220-1232.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/18806167/" },
          { text: "AJR Full Article ↗", url: "https://ajronline.org/doi/10.2214/AJR.07.3568" },
          { text: "NCI Renal Cell Cancer Health Professional Summary ↗", url: "https://www.cancer.gov/types/kidney" },
          { text: "EAU Guidelines on Renal Cell Carcinoma ↗", url: "https://uroweb.org/guidelines/renal-cell-carcinoma" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor Extent (T)", "T1a", [
          ["T1a", "T1a — Tumor ≤ 4 cm, organ confined"],
          ["T1b", "T1b — Tumor > 4 cm but ≤ 7 cm, organ confined"],
          ["T2a", "T2a — Tumor > 7 cm but ≤ 10 cm, organ confined"],
          ["T2b", "T2b — Tumor > 10 cm, organ confined"],
          ["T3a", "T3a — Extends into renal vein/branches, or perirenal/sinus fat (within Gerota's fascia)"],
          ["T3b", "T3b — Extends grossly into vena cava BELOW the diaphragm"],
          ["T3c", "T3c — Extends into vena cava ABOVE the diaphragm or invades wall of vena cava"],
          ["T4", "T4 — Invades beyond Gerota's fascia (including ipsilateral adrenal gland)"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Metastasis in regional lymph node(s)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lung, bone, liver, brain)"]
        ])
      ],
      table: {
        headers: ["Stage", "TNM Grouping", "Management"],
        rows: [
          { id: "rI", cols: ["Stage I", "T1 N0 M0", "Partial nephrectomy (nephron-sparing) or radical nephrectomy"] },
          { id: "rII", cols: ["Stage II", "T2 N0 M0", "Radical nephrectomy; surveillance"] },
          { id: "rIII", cols: ["Stage III", "T3 Any N0 M0, or T1-T3 N1 M0", "Radical nephrectomy + caval thrombectomy if needed; consider adjuvant Pembrolizumab"] },
          { id: "rIV", cols: ["Stage IV", "T4 Any N M0, or Any T Any N M1", "Cytoreductive nephrectomy in selected patients + IO/TKI combination therapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.tCat === "T4") return { value: "Stage IV", matchId: "rIV", eq: "Metastatic or ultra-locally advanced RCC. First-line dual IO (Ipi/Nivo) or IO-TKI (Pembro/Axi or Lenv/Pembro)." };
        if (v.nCat === "N1" || v.tCat.startsWith("T3")) return { value: "Stage III", matchId: "rIII", eq: "Locally advanced disease involving renal veins, sinus fat, or regional lymphatics." };
        if (v.tCat.startsWith("T2")) return { value: "Stage II", matchId: "rII", eq: "Large organ-confined RCC (>7 cm)." };
        return { value: "Stage I", matchId: "rI", eq: "Organ-confined small renal mass. Nephron-sparing resection favoured." };
      }
    },
    {
      id: "renalPelvisUreterTNM",
      cat: "onco",
      type: "class",
      name: "Renal Pelvis and Ureter Urothelial Carcinoma",
      desc: "AJCC 8th Edition staging for upper tract urothelial carcinoma (UTUC).",
      organ: "Renal Pelvis / Ureter",
      region: "Urologic Oncology",
      subject: "Upper Tract Urothelial Carcinoma",
      keywords: ["renal pelvis", "ureter", "utuc", "urothelial", "nephroureterectomy"],
      guidance: "T1 invades subepithelial connective tissue; T2 invades muscularis propria; T3 invades peripelvic/periureteric fat or renal parenchyma; T4 invades adjacent organs.",
      literature: [{
        type: "EAU Guidelines",
        icon: "📘",
        title: "European Association of Urology Guidelines on Upper Urinary Tract Urothelial Carcinoma",
        citation: "Rouprêt M, et al. Eur Urol. 2021;79(1):62-79.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/32958315/" },
          { text: "EAU Guidelines UTUC Portal ↗", url: "https://uroweb.org/guidelines/upper-urinary-tract-urothelial-cell-carcinoma" },
          { text: "NCI Transitional Cell Cancer PDQ ↗", url: "https://www.cancer.gov/types/kidney/hp/transitional-cell-treatment-pdq" },
          { text: "AJCC Cancer Staging Resources ↗", url: "https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor Extent (T)", "Ta", [
          ["Ta", "Ta / Tis — Non-invasive papillary carcinoma or CIS"],
          ["T1", "T1 — Invades subepithelial connective tissue (lamina propria)"],
          ["T2", "T2 — Invades muscularis propria"],
          ["T3", "T3 — (Pelvis) invades renal parenchyma/peripelvic fat; (Ureter) invades periureteric fat"],
          ["T4", "T4 — Invades adjacent organs or through the kidney into perinephric fat"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Single lymph node metastasis ≤ 2 cm"],
          ["N2", "N2 — Single node > 2 cm or multiple lymph nodes"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage Group", "Criteria", "Intervention"],
        rows: [
          { id: "u0", cols: ["Stage 0a / 0is", "Ta / Tis N0 M0", "Endourological ablation (low grade) or radical nephroureterectomy"] },
          { id: "uI", cols: ["Stage I", "T1 N0 M0", "Radical nephroureterectomy with bladder cuff excision"] },
          { id: "uII", cols: ["Stage II", "T2 N0 M0", "Radical nephroureterectomy + template lymphadenectomy"] },
          { id: "uIII", cols: ["Stage III", "T3 N0 M0", "Neoadjuvant/adjuvant platinum-based chemotherapy + RNU"] },
          { id: "uIV", cols: ["Stage IV", "T4 Any N, Any T N1-2, or M1", "Systemic chemotherapy / Enfortumab vedotin / Pembrolizumab"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.tCat === "T4" || v.nCat !== "N0") return { value: "Stage IV", matchId: "uIV", eq: "Advanced / nodal / metastatic UTUC." };
        if (v.tCat === "T3") return { value: "Stage III", matchId: "uIII", eq: "Locally invasive through muscularis into fat/parenchyma." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "uII", eq: "Muscularis propria invasion." };
        if (v.tCat === "T1") return { value: "Stage I", matchId: "uI", eq: "Subepithelial invasion." };
        return { value: "Stage 0a / 0is", matchId: "u0", eq: "Non-invasive superficial urothelial lesion." };
      }
    },
    {
      id: "bladderCancerTNM",
      cat: "onco",
      type: "class",
      name: "Urinary Bladder Carcinoma (AJCC 8th/9th Ed.)",
      desc: "Staging distinguishing non-muscle invasive bladder cancer (NMIBC) from muscle-invasive bladder cancer (MIBC).",
      organ: "Urinary Bladder / Detrusor",
      region: "Urologic Oncology",
      subject: "Bladder Cancer",
      keywords: ["bladder", "urothelial", "nmibc", "mibc", "detrusor", "cystectomy", "bcg"],
      guidance: "Ta/T1/Tis are non-muscle invasive. T2 breaches the detrusor muscle. T3 invades perivesical tissue. T4 invades prostatic stroma, uterus, vagina, or pelvic wall.",
      literature: [{
        type: "Bladder Guidelines",
        icon: "📄",
        title: "EAU Guidelines on Muscle-invasive and Metastatic Bladder Cancer",
        citation: "Witjes JA, et al. Eur Urol. 2021;79(1):82-104.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/33199126/" },
          { text: "EAU Muscle-invasive Bladder Guidelines ↗", url: "https://uroweb.org/guidelines/muscle-invasive-and-metastatic-bladder-cancer" },
          { text: "NCI Bladder Cancer Health Professional PDQ ↗", url: "https://www.cancer.gov/types/bladder" },
          { text: "NCCN Bladder Cancer Guidelines ↗", url: "https://www.nccn.org/guidelines/category_1" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor Extent (T)", "Ta", [
          ["Ta", "Ta — Non-invasive papillary urothelial carcinoma"],
          ["Tis", "Tis — Carcinoma in situ ('flat tumor')"],
          ["T1", "T1 — Invades subepithelial connective tissue (lamina propria)"],
          ["T2a", "T2a — Invades superficial muscle (inner half of detrusor)"],
          ["T2b", "T2b — Invades deep muscle (outer half of detrusor)"],
          ["T3a_b", "T3 — Invades perivesical tissue (microscopically or macroscopically)"],
          ["T4a", "T4a — Invades prostatic stroma, seminal vesicles, uterus, or vagina"],
          ["T4b", "T4b — Invades pelvic wall or abdominal wall"]
        ]),
        makeS("nCat", "Regional Pelvic Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Single lymph node metastasis in true pelvis (hypogastric, obturator, external iliac, presacral)"],
          ["N2", "N2 — Multiple regional lymph nodes in true pelvis"],
          ["N3", "N3 — Metastasis in common iliac lymph nodes"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1a", "M1a — Non-regional distant lymph nodes (outside common iliacs)"],
          ["M1b", "M1b — Non-lymph node distant metastases (lungs, liver, bone)"]
        ])
      ],
      table: {
        headers: ["Stage Group", "TNM Grouping", "Clinical Strategy"],
        rows: [
          { id: "b0", cols: ["Stage 0a / 0is", "Ta / Tis N0 M0", "TURBT + intravesical chemo/BCG immunotherapy"] },
          { id: "bI", cols: ["Stage I", "T1 N0 M0", "Complete TURBT + induction/maintenance intravesical BCG"] },
          { id: "bII", cols: ["Stage II", "T2a-b N0 M0", "Neoadjuvant Cisplatin-based chemotherapy + Radical Cystectomy"] },
          { id: "bIII", cols: ["Stage III (IIIA / IIIB)", "T3-4a N0, or Any T N1-3 M0", "Neoadjuvant chemotherapy + Radical Cystectomy + extended PLND"] },
          { id: "bIV", cols: ["Stage IV (IVA / IVB)", "T4b Any N M0, or M1", "EV-Pembro (Enfortumab vedotin + Pembrolizumab) or Gem/Cis"] }
        ]
      },
      calc: function (v) {
        if (v.mCat.startsWith("M1") || v.tCat === "T4b") return { value: "Stage IVB / IVA", matchId: "bIV", eq: "Metastatic or pelvic wall fixed bladder cancer." };
        if (v.nCat !== "N0" || v.tCat === "T4a" || v.tCat === "T3a_b") return { value: "Stage III (Locally Advanced / MIBC)", matchId: "bIII", eq: "Muscle-invasive bladder cancer with extravesical extension or regional nodal spread." };
        if (v.tCat.startsWith("T2")) return { value: "Stage II (MIBC)", matchId: "bII", eq: "Muscle-invasive bladder cancer (detrusor positive). Neoadjuvant chemotherapy candidate." };
        if (v.tCat === "T1") return { value: "Stage I (NMIBC)", matchId: "bI", eq: "High-grade non-muscle invasive bladder cancer." };
        return { value: "Stage " + (v.tCat === "Tis" ? "0is" : "0a"), matchId: "b0", eq: "Non-muscle invasive superficial lesion." };
      }
    },
    {
      id: "urethraCancerTNM",
      cat: "onco",
      type: "class",
      name: "Urethral Carcinoma (AJCC 8th/9th Ed.)",
      desc: "Staging for male and female primary carcinomas of the urethra.",
      organ: "Urethra / Inguinal & Pelvic Nodes",
      region: "Urologic Oncology",
      subject: "Urethral Cancer",
      keywords: ["urethra", "urethral carcinoma", "corpus spongiosum", "anterior", "posterior"],
      guidance: "Prognosis differs markedly between anterior (distal) and posterior (proximal) urethral tumors.",
      literature: [{
        type: "AJCC Guidelines",
        icon: "📄",
        title: "AJCC Cancer Staging Manual: Urethra",
        citation: "Amin MB, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "EAU Primary Urethral Carcinoma Guidelines ↗", url: "https://uroweb.org/guidelines/primary-urethral-carcinoma" },
          { text: "NCI Urethral Cancer PDQ ↗", url: "https://www.cancer.gov/types/urethral" },
          { text: "UICC TNM Staging Classification ↗", url: "https://www.uicc.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor Extent (T)", "T1", [
          ["Ta_Tis", "Ta / Tis — Non-invasive papillary or in situ carcinoma"],
          ["T1", "T1 — Invades subepithelial connective tissue"],
          ["T2", "T2 — Invades corpus spongiosum, periurethral muscle, or anterior vagina"],
          ["T3", "T3 — Invades corpus cavernosum or bladder neck"],
          ["T4", "T4 — Invades adjacent organs (rectum, prostate, pelvic wall)"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Single regional lymph node metastasis"],
          ["N2", "N2 — Multiple regional lymph node metastases"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Intervention"],
        rows: [
          { id: "ur0", cols: ["Stage 0", "Ta/Tis N0 M0", "Local transurethral resection or laser ablation"] },
          { id: "urI", cols: ["Stage I", "T1 N0 M0", "Distal urethrectomy or wide local excision"] },
          { id: "urII", cols: ["Stage II", "T2 N0 M0", "Partial or complete urethrectomy ± radiation"] },
          { id: "urIII", cols: ["Stage III", "T3 N0 or T1-3 N1 M0", "Multimodal therapy: neoadjuvant chemoradiation + anterior exenteration"] },
          { id: "urIV", cols: ["Stage IV", "T4 Any N, N2, or M1", "Systemic chemotherapy / palliative therapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.tCat === "T4" || v.nCat === "N2") return { value: "Stage IV", matchId: "urIV", eq: "Locally advanced or metastatic urethral cancer." };
        if (v.tCat === "T3" || v.nCat === "N1") return { value: "Stage III", matchId: "urIII", eq: "Invasive into periurethral cavernous tissue or regional lymph nodes." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "urII", eq: "Invasive into periurethral muscle or spongiosum." };
        if (v.tCat === "T1") return { value: "Stage I", matchId: "urI", eq: "Subepithelial invasion." };
        return { value: "Stage 0", matchId: "ur0", eq: "Non-invasive urethral disease." };
      }
    },
    {
      id: "adrenalCortexCarcinoma",
      cat: "onco",
      type: "class",
      name: "Adrenal Cortex Carcinoma (ENSAT / AJCC 8th)",
      desc: "European Network for the Study of Adrenal Tumours (ENSAT) and AJCC 8th Edition staging for ACC.",
      organ: "Adrenal Cortex",
      region: "Endocrine Oncology",
      subject: "Adrenocortical Carcinoma",
      keywords: ["adrenal cortex", "acc", "ensat", "mitotane", "adrenocortical carcinoma"],
      guidance: "Stage I ≤5 cm, Stage II >5 cm (both organ-confined). Stage III infiltration into surrounding tissue or regional nodes. Stage IV distant metastasis.",
      literature: [{
        type: "ENSAT Staging System",
        icon: "📄",
        title: "Comparison of the ENSAT and AJCC staging systems for adrenocortical carcinoma",
        citation: "Fassnacht M, et al. Lancet Oncol. 2009;10(9):881-889.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/19647481/" },
          { text: "HealthTree Adrenal Cancer Stages ↗", url: "https://healthtree.org/guides/what-is-adrenal-cancer/adrenal-cancer-stages" },
          { text: "NCI Adrenocortical Carcinoma PDQ ↗", url: "https://www.cancer.gov/types/adrenocortical" },
          { text: "ESMO-EURACAN Guidelines for Adrenal Cancer ↗", url: "https://www.esmo.org/guidelines/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 5 cm, no extra-adrenal invasion"],
          ["T2", "T2 — Tumor > 5 cm, no extra-adrenal invasion"],
          ["T3", "T3 — Tumor of any size with local invasion into periadrenal soft tissue"],
          ["T4", "T4 — Tumor invades adjacent organs (kidney, diaphragm, pancreas, spleen, liver) or vena cava"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Regional lymph node metastasis present"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lung, liver, bone, peritoneum)"]
        ])
      ],
      table: {
        headers: ["ENSAT / AJCC Stage", "Extent of Disease", "Clinical Management"],
        rows: [
          { id: "aI", cols: ["Stage I", "T1 N0 M0 (≤ 5 cm)", "Complete open adrenalectomy with en bloc resection of periadrenal fat"] },
          { id: "aII", cols: ["Stage II", "T2 N0 M0 (> 5 cm)", "Open radical adrenalectomy; adjuvant Mitotane considered if high Ki-67"] },
          { id: "aIII", cols: ["Stage III", "T1-2 N1 M0, or T3-T4 N0-1 M0", "Radical en bloc resection + adjuvant Mitotane + radiation"] },
          { id: "aIV", cols: ["Stage IV", "Any T Any N M1", "EDP-M chemotherapy (Etoposide, Doxorubicin, Cisplatin + Mitotane)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV (M1)", matchId: "aIV", eq: "Metastatic adrenocortical carcinoma. EDP-Mitotane systemic regimen." };
        if (v.nCat === "N1" || v.tCat === "T3" || v.tCat === "T4") return { value: "Stage III (Locally Advanced / Nodal)", matchId: "aIII", eq: "High recurrence risk; adjuvant Mitotane strongly indicated." };
        if (v.tCat === "T2") return { value: "Stage II (T2 N0 M0)", matchId: "aII", eq: "Large organ-confined adrenal tumor (>5 cm)." };
        return { value: "Stage I (T1 N0 M0)", matchId: "aI", eq: "Small organ-confined adrenal carcinoma (≤5 cm)." };
      }
    },
    {
      id: "pheoParagangliomaTNM",
      cat: "onco",
      type: "class",
      name: "Adrenal Pheochromocytoma & Paraganglioma (PPGL)",
      desc: "AJCC 8th Edition TNM staging system acknowledging that all PPGLs have metastatic potential.",
      organ: "Adrenal Medulla / Sympathetic Chain",
      region: "Endocrine Oncology",
      subject: "Pheochromocytoma and Paraganglioma",
      keywords: ["pheochromocytoma", "paraganglioma", "ppgl", "catecholamines", "sdhb", "ajcc 8th"],
      guidance: "WHO eliminates 'benign vs malignant' dichotomy; all PPGLs carry malignant potential. Staging is based on size, capsular invasion, nodal spread, and distant metastases.",
      literature: [{
        type: "Endocrine Staging Study",
        icon: "📄",
        title: "TNM Staging and Overall Survival in Patients With Pheochromocytoma and Sympathetic Paraganglioma",
        citation: "Jimenez C, et al. J Clin Endocrinol Metab. 2023;108(5):1132-1142.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/36433823/" },
          { text: "MDPI Cancers PPGL Management ↗", url: "https://www.mdpi.com/2072-6694/17/6/1029" },
          { text: "NCI Pheochromocytoma and Paraganglioma PDQ ↗", url: "https://www.cancer.gov/types/pheochromocytoma" },
          { text: "Endocrine Society Clinical Practice Guidelines ↗", url: "https://www.endocrine.org/clinical-guidelines" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor Extent (T)", "T1", [
          ["T1", "T1 — Pheo < 5 cm in greatest dimension, no extra-adrenal invasion"],
          ["T2", "T2 — Pheo ≥ 5 cm OR Sympathetic Paraganglioma of any size without invasion"],
          ["T3", "T3 — Tumor of any size with invasion into surrounding tissues (periadrenal fat, kidney)"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Regional lymph node metastasis present"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1a", "M1a — Distant metastasis to bone only"],
          ["M1b", "M1b — Distant metastasis to distant lymph nodes or viscera (liver, lung)"],
          ["M1c", "M1c — Bone AND visceral distant metastases"]
        ])
      ],
      table: {
        headers: ["AJCC 8th Stage", "Criteria", "Clinical Recommendation"],
        rows: [
          { id: "phI", cols: ["Stage I", "T1 N0 M0", "Alpha-blockade (phenoxybenzamine) followed by laparoscopic/open resection"] },
          { id: "phII", cols: ["Stage II", "T2 N0 M0", "Complete surgical resection; germline genetic panel (SDHB, RET, VHL)"] },
          { id: "phIII", cols: ["Stage III", "T3 N0 M0, or T1-3 N1 M0", "Surgical debulking; close lifetime surveillance"] },
          { id: "phIV", cols: ["Stage IV", "Any T Any N M1 (M1a, M1b, M1c)", "131I-MIBG therapy, PRRT (177Lu-DOTATATE), or CVD chemotherapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat.startsWith("M1")) return { value: "Stage IV (" + v.mCat + ")", matchId: "phIV", eq: "Metastatic PPGL. Perform DOTATATE PET/CT and genetic screening." };
        if (v.nCat === "N1" || v.tCat === "T3") return { value: "Stage III", matchId: "phIII", eq: "Locally invasive or lymph node-positive PPGL." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "phII", eq: "Large pheochromocytoma (≥5 cm) or extra-adrenal sympathetic paraganglioma." };
        return { value: "Stage I", matchId: "phI", eq: "Small organ-confined pheochromocytoma (<5 cm)." };
      }
    },

    // ==============================================================
    // 4. OPHTHALMIC SITES
    // ==============================================================
    {
      id: "eyelidCarcinomaTNM",
      cat: "onco",
      type: "class",
      name: "Carcinoma of the Eyelid (AJCC 8th/9th Ed.)",
      desc: "Staging for sebaceous carcinoma, squamous cell, and basal cell carcinomas of the eyelid.",
      organ: "Eyelid / Ocular Adnexa",
      region: "Ophthalmic Oncology",
      subject: "Eyelid Carcinoma",
      keywords: ["eyelid", "sebaceous carcinoma", "squamous eyelid", "basal cell eyelid", "ajcc"],
      guidance: "T-classification is heavily driven by size (≤5mm, >5mm to ≤10mm, >10mm to ≤20mm, >20mm) and invasion of ocular/orbital structures.",
      literature: [{
        type: "Ophthalmic Staging",
        icon: "📄",
        title: "AJCC 8th Edition: Eyelid carcinoma",
        citation: "Esmaeli B, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "American Academy of Ophthalmology EyeWiki Eyelid ↗", url: "https://eyewiki.aao.org/Eyelid_Malignancies" },
          { text: "NCI Eyelid Tumor Staging ↗", url: "https://www.cancer.gov/" },
          { text: "UICC TNM 9th Edition Classification ↗", url: "https://www.uicc.org/resources/tnm" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Eyelid Tumor (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 5 mm in greatest dimension, not invading tarsal plate or eyelid margin"],
          ["T2a", "T2a — Tumor > 5 mm but ≤ 10 mm, or invades tarsal plate/eyelid margin"],
          ["T2b", "T2b — Tumor > 10 mm but ≤ 20 mm in greatest dimension"],
          ["T3a", "T3a — Tumor > 20 mm, or extensive full-thickness eyelid defect"],
          ["T3b", "T3b — Invades ocular or intra-orbital structures"],
          ["T4", "T4 — Tumor invades bone of the orbit or intracranial extension"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Preauricular, submandibular, or cervical lymph node metastasis"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage Group", "Criteria", "Intervention"],
        rows: [
          { id: "eI", cols: ["Stage I", "T1 N0 M0", "Mohs micrographic surgery or wide local excision"] },
          { id: "eII", cols: ["Stage II", "T2-T3a N0 M0", "Complete excision with margin control + eyelid reconstruction"] },
          { id: "eIII", cols: ["Stage III", "T3b-T4 N0 or Any T N1 M0", "Orbital exenteration / adjuvant radiation / Cemiplimab (for CSCC)"] },
          { id: "eIV", cols: ["Stage IV", "Any T Any N M1", "Systemic targeted therapy or immunotherapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV", matchId: "eIV", eq: "Distant metastatic eyelid carcinoma." };
        if (v.nCat === "N1" || v.tCat === "T3b" || v.tCat === "T4") return { value: "Stage III", matchId: "eIII", eq: "Orbital invasion or regional lymph node spread." };
        if (v.tCat === "T2a" || v.tCat === "T2b" || v.tCat === "T3a") return { value: "Stage II", matchId: "eII", eq: "Larger eyelid lesion requiring complex reconstruction." };
        return { value: "Stage I", matchId: "eI", eq: "Small superficial eyelid tumor." };
      }
    },
    {
      id: "conjunctivaCarcinomaTNM",
      cat: "onco",
      type: "class",
      name: "Carcinoma of the Conjunctiva (AJCC 8th/9th Ed.)",
      desc: "Staging for conjunctival squamous cell carcinoma (ocular surface squamous neoplasia - OSSN).",
      organ: "Conjunctiva / Ocular Surface",
      region: "Ophthalmic Oncology",
      subject: "Conjunctival Carcinoma",
      keywords: ["conjunctiva", "ossn", "squamous", "cornea", "limbus"],
      guidance: "T1 bulbar conjunctiva; T2 palpebral/forniceal/caruncle; T3 invades cornea or intraocular structures; T4 invades orbit/brain.",
      literature: [{
        type: "Ophthalmic Guidelines",
        icon: "📄",
        title: "AJCC 8th Edition: Conjunctival carcinoma",
        citation: "Coupland SE, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "AAO EyeWiki OSSN Guidelines ↗", url: "https://eyewiki.aao.org/Ocular_Surface_Squamous_Neoplasia" },
          { text: "NCI Eye Cancers Portal ↗", url: "https://www.cancer.gov/" },
          { text: "UICC TNM 9th Edition ↗", url: "https://www.uicc.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Conjunctival Tumor (T)", "T1", [
          ["Tis", "Tis — Conjunctival intraepithelial neoplasia (CIN)"],
          ["T1", "T1 — Bulbar conjunctiva without corneal invasion"],
          ["T2", "T2 — Involves palpebral conjunctiva, fornix, or caruncle"],
          ["T3", "T3 — Invades cornea, intraocular structures, or sclera"],
          ["T4", "T4 — Invades orbit, bony orbit walls, paranasal sinuses, or brain"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional nodal spread"],
          ["N1", "N1 — Regional lymph node metastasis (preauricular/submandibular)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Description", "Intervention"],
        rows: [
          { id: "c0", cols: ["Stage 0", "Tis N0 M0", "Topical chemotherapy (Mitomycin C, 5-FU, or Interferon-alpha 2b)"] },
          { id: "cI", cols: ["Stage I", "T1 N0 M0", "No-touch wide local surgical excision + cryotherapy + amniotic membrane graft"] },
          { id: "cII", cols: ["Stage II", "T2 N0 M0", "Complete excision with wide margins"] },
          { id: "cIII", cols: ["Stage III", "T3 N0 M0, or Any T N1 M0", "Extensive resection, scleral patch, or modified orbital exenteration"] },
          { id: "cIV", cols: ["Stage IV", "T4 Any N M0, or M1", "Orbital exenteration, systemic chemotherapy / Cemiplimab"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.tCat === "T4") return { value: "Stage IV", matchId: "cIV", eq: "Advanced orbital or metastatic disease." };
        if (v.nCat === "N1" || v.tCat === "T3") return { value: "Stage III", matchId: "cIII", eq: "Invasive into sclera/cornea or lymph nodes." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "cII", eq: "Non-bulbar conjunctival involvement." };
        if (v.tCat === "T1") return { value: "Stage I", matchId: "cI", eq: "Confined to bulbar conjunctiva." };
        return { value: "Stage 0", matchId: "c0", eq: "Intraepithelial neoplasia (CIN)." };
      }
    },
    {
      id: "conjunctivaMelanomaTNM",
      cat: "onco",
      type: "class",
      name: "Malignant Melanoma of the Conjunctiva (AJCC 8th/9th)",
      desc: "Staging for conjunctival melanoma, incorporating quadrant involvement and caruncular origin.",
      organ: "Conjunctiva / Melanocytes",
      region: "Ophthalmic Oncology",
      subject: "Conjunctival Melanoma",
      keywords: ["conjunctiva", "melanoma", "caruncle", "braf", "ajcc"],
      guidance: "Bulbar vs non-bulbar (palpebral, fornix, plica, caruncle) locations markedly alter recurrence and mortality.",
      literature: [{
        type: "Ophthalmic Melanoma Guidelines",
        icon: "📄",
        title: "The 8th edition AJCC staging system for conjunctival melanoma",
        citation: "Mallone F, et al. Cancers (Basel). 2021;13(19):4783.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/34638269/" },
          { text: "AAO EyeWiki Conjunctival Melanoma ↗", url: "https://eyewiki.aao.org/Conjunctival_Melanoma" },
          { text: "NCI Melanoma Health Professional Portal ↗", url: "https://www.cancer.gov/" },
          { text: "MDPI Cancers Conjunctival Melanoma Review ↗", url: "https://www.mdpi.com/2072-6694/13/19/4783" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Conjunctival Melanoma (T)", "T1a", [
          ["T1a", "T1a — Bulbar conjunctiva, ≤ 1 quadrant involvement"],
          ["T1b", "T1b — Bulbar conjunctiva, > 1 and ≤ 2 quadrants"],
          ["T1c", "T1c — Bulbar conjunctiva, > 2 quadrants"],
          ["T2a", "T2a — Non-bulbar conjunctiva (palpebral/fornix/plica), not involving caruncle"],
          ["T2b", "T2b — Involves the caruncle"],
          ["T3", "T3 — Invades the eye (sclera, anterior chamber)"],
          ["T4", "T4 — Invades orbit or brain"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional nodal metastasis"],
          ["N1", "N1 — Regional lymph node metastasis (preauricular, cervical)"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lung, liver, brain)"]
        ])
      ],
      table: {
        headers: ["Stage", "Features", "Management"],
        rows: [
          { id: "cmI", cols: ["Stage I", "T1 N0 M0 (Bulbar)", "Wide excision with 'no-touch' technique + cryotherapy + topical Mitomycin C"] },
          { id: "cmII", cols: ["Stage II", "T2 N0 M0 (Non-bulbar / Caruncle)", "Complete surgical resection; sentinel lymph node biopsy (SLNB) considered"] },
          { id: "cmIII", cols: ["Stage III", "T3 N0 or Any T N1 M0", "Extensive local surgery / plaque brachytherapy / regional lymphadenectomy"] },
          { id: "cmIV", cols: ["Stage IV", "T4 Any N or Any M1", "Immune checkpoint inhibitors (Nivolumab/Ipilimumab) or BRAF/MEK inhibitors"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.tCat === "T4") return { value: "Stage IV", matchId: "cmIV", eq: "Metastatic or orbital extension. Molecular testing for BRAF V600E required." };
        if (v.nCat === "N1" || v.tCat === "T3") return { value: "Stage III", matchId: "cmIII", eq: "Invasive into globe or regional lymph nodes." };
        if (v.tCat.startsWith("T2")) return { value: "Stage II", matchId: "cmII", eq: "Non-bulbar or caruncular conjunctival melanoma." };
        return { value: "Stage I", matchId: "cmI", eq: "Bulbar conjunctival melanoma." };
      }
    },
    {
      id: "uvealMelanomaAJCC",
      cat: "onco",
      type: "class",
      name: "Malignant Melanoma of the Uvea (Iris, Ciliary Body & Choroid)",
      desc: "AJCC 8th Edition anatomic staging for intraocular uveal melanoma based on largest basal diameter, thickness, and ciliary body involvement.",
      organ: "Eye / Uveal Tract (Choroid, Ciliary Body, Iris)",
      region: "Ophthalmic Oncology",
      subject: "Uveal Melanoma",
      keywords: ["uvea", "uveal melanoma", "choroid", "ciliary body", "iris", "plaque brachytherapy"],
      guidance: "Tumor Size Categories (1 to 4) are defined by a 2D matrix of thickness and basal diameter. Ciliary body involvement upstages T.",
      literature: [{
        type: "Ophthalmic Oncology Standard",
        icon: "📄",
        title: "Validation of the 8th edition of the AJCC staging system for uveal melanoma",
        citation: "Shields CL, et al. JAMA Ophthalmol. 2017;135(9):966-973.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28817743/" },
          { text: "AAO EyeWiki Uveal Melanoma ↗", url: "https://eyewiki.aao.org/Uveal_Melanoma" },
          { text: "NCI Intraocular Melanoma PDQ ↗", url: "https://www.cancer.gov/types/eye/hp/intraocular-melanoma-treatment-pdq" },
          { text: "UICC TNM Classification Portal ↗", url: "https://www.uicc.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Uveal Tumor Category (T)", "T1a", [
          ["T1a", "T1a — Size Category 1, Choroid only (small, thickness ≤ 3mm, basal diameter ≤ 9mm)"],
          ["T2a", "T2a — Size Category 2, Choroid only (medium, thickness 3.1–8mm, diameter 9.1–15mm)"],
          ["T3a", "T3a — Size Category 3, Choroid only (large)"],
          ["T4a", "T4a — Size Category 4, Choroid only (very large, diameter > 18mm or thickness > 15mm)"],
          ["ciliary", "T2b-T4b — Any size category WITH CILIARY BODY involvement"],
          ["extraocular", "T1e-T4e — Any size category WITH EXTRAOCULAR EXTENSION ≤ 5mm or > 5mm"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Regional lymph node metastasis present"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (most commonly liver: M1a ≤3cm, M1b 3.1–8cm, M1c >8cm)"]
        ])
      ],
      table: {
        headers: ["Stage Group", "Tumor Characteristics", "Ocular Therapy"],
        rows: [
          { id: "uI", cols: ["Stage I", "T1a N0 M0", "I-125 / Ru-106 plaque brachytherapy or proton beam radiotherapy"] },
          { id: "uII", cols: ["Stage II (IIA / IIB)", "T2a, T3a, or T1b-c N0 M0", "Plaque radiotherapy or enucleation"] },
          { id: "uIII", cols: ["Stage III (IIIA / IIIB / IIIC)", "T4, or extraocular extension, or N1", "Enucleation or plaque brachytherapy + systemic surveillance"] },
          { id: "uIV", cols: ["Stage IV", "Any T Any N M1", "Tebentafusp (for HLA-A*02:01-positive) or liver-directed therapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV", matchId: "uIV", eq: "Metastatic uveal melanoma. Test for HLA-A*02:01 for Tebentafusp immunotherapy." };
        if (v.nCat === "N1" || v.tCat === "extraocular" || v.tCat === "T4a") return { value: "Stage III", matchId: "uIII", eq: "High risk uveal melanoma with extraocular spread or regional nodes." };
        if (v.tCat === "T2a" || v.tCat === "T3a" || v.tCat === "ciliary") return { value: "Stage II", matchId: "uII", eq: "Medium-to-large choroidal melanoma or ciliary body involvement." };
        return { value: "Stage I (T1a N0 M0)", matchId: "uI", eq: "Small choroidal melanoma suitable for eye-preserving plaque radiotherapy." };
      }
    },
    {
      id: "retinoblastomaAJCC",
      cat: "onco",
      type: "class",
      name: "Retinoblastoma (AJCC 8th Clinical / Pathologic)",
      desc: "Clinical (cTNM) and Pathological (pTNM) staging for pediatric retinoblastoma.",
      organ: "Retina / Optic Nerve",
      region: "Pediatric & Ophthalmic Oncology",
      subject: "Retinoblastoma",
      keywords: ["retinoblastoma", "leukocoria", "optic nerve", "rb1", "intra-arterial chemotherapy"],
      guidance: "cT1 intraretinal; cT2 with retinal detachment/vitreous seedings; cT3 advanced intraocular; cT4 extraocular (optic nerve or orbital).",
      literature: [{
        type: "Pediatric Ophthalmic Standard",
        icon: "📄",
        title: "The 8th edition of the AJCC Cancer Staging Manual: Retinoblastoma",
        citation: "Mallipatna A, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "AAO EyeWiki Retinoblastoma ↗", url: "https://eyewiki.aao.org/Retinoblastoma" },
          { text: "NCI Retinoblastoma Health Professional Treatment ↗", url: "https://www.cancer.gov/types/retinoblastoma" },
          { text: "UICC Paediatric Tumour Staging ↗", url: "https://www.uicc.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Clinical Tumor Extent (cT)", "cT1", [
          ["cT1", "cT1 — Tumor confined to retina without subretinal or vitreous seeds"],
          ["cT2", "cT2 — Tumor with subretinal fluid, subretinal seeds, or vitreous seeds"],
          ["cT3", "cT3 — Advanced intraocular disease (glaucoma, buphthalmos, anterior chamber invasion)"],
          ["cT4", "cT4 — Extraocular tumor (invades optic nerve to margin, sclera, orbit)"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Preauricular or cervical lymph node metastasis"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (CNS, bone marrow, bone)"]
        ])
      ],
      table: {
        headers: ["Stage Group", "Clinical Criteria", "Management Modality"],
        rows: [
          { id: "rbI", cols: ["Stage I", "cT1 N0 M0", "Intra-arterial chemotherapy (Melphalan), focal laser photocoagulation / cryo"] },
          { id: "rbII", cols: ["Stage II", "cT2-cT3 N0 M0", "Intra-arterial chemotherapy or systemic chemoreduction + local salvage; enucleation if diffuse seeds"] },
          { id: "rbIII", cols: ["Stage III", "cT4 N0 or Any T N1 M0", "Primary enucleation + adjuvant systemic chemotherapy + orbital radiotherapy"] },
          { id: "rbIV", cols: ["Stage IV", "Any T Any N M1", "High-dose chemotherapy with autologous stem cell rescue (HDCT/ASCR)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV", matchId: "rbIV", eq: "Distant metastatic / leptomeningeal retinoblastoma." };
        if (v.nCat === "N1" || v.tCat === "cT4") return { value: "Stage III", matchId: "rbIII", eq: "Extraocular extension or regional nodal involvement." };
        if (v.tCat === "cT2" || v.tCat === "cT3") return { value: "Stage II", matchId: "rbII", eq: "Advanced intraocular retinoblastoma with vitreous seeding." };
        return { value: "Stage I", matchId: "rbI", eq: "Intraretinal disease; excellent eye-salvage potential." };
      }
    },
    {
      id: "lacrimalGlandCarcinoma",
      cat: "onco",
      type: "class",
      name: "Carcinoma of the Lacrimal Gland (AJCC 8th/9th Ed.)",
      desc: "Staging for adenoid cystic carcinoma and epithelial carcinomas of the lacrimal gland.",
      organ: "Lacrimal Gland / Orbit",
      region: "Ophthalmic Oncology",
      subject: "Lacrimal Gland Carcinoma",
      keywords: ["lacrimal gland", "adenoid cystic", "orbit", "periosteum", "ajcc"],
      guidance: "T1 ≤2 cm; T2 >2 cm confined to orbit; T3 invades periosteum of lacrimal fossa; T4 invades orbital bone, sinuses, or brain.",
      literature: [{
        type: "Ophthalmic Oncology Staging",
        icon: "📄",
        title: "AJCC 8th edition staging system for lacrimal gland carcinoma",
        citation: "von Holstein SL, et al. Ophthalmology. 2017;124(12):1800-1808.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28739198/" },
          { text: "AAO EyeWiki Lacrimal Tumors ↗", url: "https://eyewiki.aao.org/Epithelial_Tumors_of_the_Lacrimal_Gland" },
          { text: "NCI Ocular Adnexa Neoplasms ↗", url: "https://www.cancer.gov/" },
          { text: "UICC TNM 9th Edition Classification ↗", url: "https://www.uicc.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Lacrimal Gland Tumor (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 2 cm in greatest dimension, confined to lacrimal gland"],
          ["T2", "T2 — Tumor > 2 cm in greatest dimension, confined to lacrimal gland"],
          ["T3", "T3 — Invades periosteum of the lacrimal fossa (bony wall intact)"],
          ["T4a", "T4a — Invades through periosteum into orbital bone"],
          ["T4b", "T4b — Invades brain, cavernous sinus, or dura mater"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Regional lymph node metastasis present"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lung, bone)"]
        ])
      ],
      table: {
        headers: ["Stage", "Anatomic Extent", "Clinical Protocol"],
        rows: [
          { id: "lgI", cols: ["Stage I", "T1 N0 M0", "Intact tumor excision via lateral orbitotomy"] },
          { id: "lgII", cols: ["Stage II", "T2 N0 M0", "Excision with margin control + postoperative proton/photon radiation"] },
          { id: "lgIII", cols: ["Stage III", "T3 N0 M0, or Any T N1 M0", "Cranio-orbital resection or exenteration + intra-arterial cytoreductive chemotherapy"] },
          { id: "lgIV", cols: ["Stage IV", "T4 Any N M0, or M1", "Chemoradiotherapy / palliative systemic therapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.tCat.startsWith("T4")) return { value: "Stage IV", matchId: "lgIV", eq: "Bony orbital wall invasion or distant metastasis." };
        if (v.nCat === "N1" || v.tCat === "T3") return { value: "Stage III", matchId: "lgIII", eq: "Periosteal infiltration or regional lymph nodes." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "lgII", eq: "Tumor > 2 cm confined to gland." };
        return { value: "Stage I", matchId: "lgI", eq: "Small tumor ≤ 2 cm confined to lacrimal fossa." };
      }
    },
    {
      id: "orbitalSarcomaTNM",
      cat: "onco",
      type: "class",
      name: "Orbital Sarcoma (AJCC 8th/9th Ed.)",
      desc: "Staging for soft tissue sarcomas arising primarily in the orbit (excluding rhabdomyosarcoma).",
      organ: "Orbit / Periorbital Soft Tissue",
      region: "Ophthalmic Oncology",
      subject: "Orbital Sarcomas",
      keywords: ["orbital sarcoma", "soft tissue sarcoma", "orbit", "exenteration", "ajcc"],
      guidance: "T1 ≤2 cm; T2 >2 cm confined to orbit; T3 invades periorbita/bone; T4 invades brain or sinus.",
      literature: [{
        type: "Ophthalmic Sarcoma Guidelines",
        icon: "📄",
        title: "AJCC Cancer Staging Manual: Sarcoma of the orbit",
        citation: "Amin MB, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "AAO EyeWiki Orbital Tumors ↗", url: "https://eyewiki.aao.org/Orbital_Tumors" },
          { text: "NCI Adult Soft Tissue Sarcoma PDQ ↗", url: "https://www.cancer.gov/types/soft-tissue-sarcoma" },
          { text: "UICC TNM 9th Edition ↗", url: "https://www.uicc.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Orbital Sarcoma (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 2 cm in greatest dimension, confined to orbit"],
          ["T2", "T2 — Tumor > 2 cm in greatest dimension, confined to orbit"],
          ["T3", "T3 — Invades bony orbit or periorbita"],
          ["T4", "T4 — Invades adjacent structures (paranasal sinuses, intracranial)"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Regional lymph node metastasis present"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present"]
        ])
      ],
      table: {
        headers: ["Stage", "Extent", "Action"],
        rows: [
          { id: "osI", cols: ["Stage I", "T1 N0 M0 (Low grade)", "Complete surgical excision with clear margins"] },
          { id: "osII", cols: ["Stage II", "T2 N0 M0 (Low grade)", "Wide local excision + adjuvant radiation"] },
          { id: "osIII", cols: ["Stage III", "T3 N0, High Grade, or N1", "Orbital exenteration + radiotherapy ± chemotherapy"] },
          { id: "osIV", cols: ["Stage IV", "T4 Any N, or M1", "Palliative chemotherapy / radiotherapy"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1" || v.tCat === "T4") return { value: "Stage IV", matchId: "osIV", eq: "Invasion into intracranial spaces or distant metastases." };
        if (v.nCat === "N1" || v.tCat === "T3") return { value: "Stage III", matchId: "osIII", eq: "Bony invasion or regional nodal spread." };
        if (v.tCat === "T2") return { value: "Stage II", matchId: "osII", eq: "Tumor > 2 cm within the orbit." };
        return { value: "Stage I", matchId: "osI", eq: "Small orbital sarcoma ≤ 2 cm." };
      }
    },

    // ==============================================================
    // 5. ENDOCRINE SITES
    // ==============================================================
    {
      id: "thyroidDifferentiatedAJCC",
      cat: "onco",
      type: "class",
      name: "Thyroid – Differentiated & Poorly Differentiated (AJCC 8th)",
      desc: "Staging for Papillary, Follicular, Oncocytic (Hürthle cell), and Poorly Differentiated Thyroid Carcinomas using age cutoff of 55.",
      organ: "Thyroid Gland",
      region: "Endocrine Oncology",
      subject: "Thyroid Carcinoma",
      keywords: ["thyroid", "papillary", "follicular", "hurthle", "oncocytic", "ajcc 8th", "rai"],
      guidance: "Age cutoff is strictly 55 years. In patients < 55 years, Stage I is Any T Any N M0; Stage II is Any T Any N M1. No Stage III or IV exists in patients < 55.",
      literature: [{
        type: "ATA Guidelines & AJCC 8th",
        icon: "📄",
        title: "2015 American Thyroid Association Management Guidelines and AJCC 8th Edition Updates",
        citation: "Haugen BR, et al. Thyroid. 2016;26(1):1-133.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/26462967/" },
          { text: "RestartMed Staging Calculator ↗", url: "https://www.restartmed.com/thyroid-cancer-staging-calculator/" },
          { text: "NCI Thyroid Cancer Health Professional PDQ ↗", url: "https://www.cancer.gov/types/thyroid" },
          { text: "American Head and Neck Society Staging Tools ↗", url: "https://www.ahns.info/" }
        ]
      }],
      fields: [
        makeN("age", "Patient Age at Diagnosis (years)", 52, { min: 1, max: 110, step: 1 }),
        makeS("tCat", "Primary Tumor Extent (T)", "T1a", [
          ["T1a", "T1a — Tumor ≤ 1 cm, limited to thyroid"],
          ["T1b", "T1b — Tumor > 1 cm but ≤ 2 cm, limited to thyroid"],
          ["T2", "T2 — Tumor > 2 cm but ≤ 4 cm, limited to thyroid"],
          ["T3a", "T3a — Tumor > 4 cm, limited to thyroid"],
          ["T3b", "T3b — Gross extrathyroidal extension invading strap muscles only"],
          ["T4a", "T4a — Extrathyroidal extension into larynx, trachea, esophagus, or recurrent laryngeal nerve"],
          ["T4b", "T4b — Extrathyroidal extension into prevertebral fascia or encasing carotid artery/mediastinal vessels"]
        ]),
        makeS("nCat", "Regional Cervical Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1a", "N1a — Metastases to Level VI or VII (pretracheal, paratracheal, prelaryngeal)"],
          ["N1b", "N1b — Metastases to unilateral, bilateral, or contralateral lateral neck (Levels I-V) or retropharyngeal"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lungs, bones)"]
        ])
      ],
      table: {
        headers: ["Age Group", "Stage", "Criteria", "Prognosis"],
        rows: [
          { id: "youngI", cols: ["Age < 55", "Stage I", "Any T Any N M0", "> 99% 10-year overall survival; lobectomy or total thyroidectomy"] },
          { id: "youngII", cols: ["Age < 55", "Stage II", "Any T Any N M1", "Metastatic differentiated disease; RAI therapy (131I)"] },
          { id: "oldI", cols: ["Age ≥ 55", "Stage I", "T1-T2 N0 M0", "Excellent prognosis; thyroidectomy ± RAI ablation"] },
          { id: "oldII", cols: ["Age ≥ 55", "Stage II", "T1-T2 N1, or T3a-b Any N M0", "Intermediate risk; total thyroidectomy + central neck dissection + RAI"] },
          { id: "oldIII_IV", cols: ["Age ≥ 55", "Stage III / IVA / IVB / IVC", "T4a (III), T4b (IVA), or M1 (IVB/IVC)", "Advanced disease requiring multimodality therapy ± Tyrosine Kinase Inhibitors (Lenvatinib/Sorafenib)"] }
        ]
      },
      calc: function (v) {
        var age = +v.age;
        if (age < 55) {
          if (v.mCat === "M1") return { value: "Stage II (< 55 yo with M1)", matchId: "youngII", eq: "Distant metastases in patient < 55 years old." };
          return { value: "Stage I (< 55 yo with M0)", matchId: "youngI", eq: "Under age 55, all non-metastatic differentiated thyroid cancers are Stage I." };
        }
        if (v.mCat === "M1") return { value: "Stage IVB (M1)", matchId: "oldIII_IV", eq: "Distant metastatic disease in patient ≥ 55 years." };
        if (v.tCat === "T4b") return { value: "Stage IVA (T4b)", matchId: "oldIII_IV", eq: "Unresectable local invasion into prevertebral fascia or carotid encasement." };
        if (v.tCat === "T4a") return { value: "Stage III (T4a)", matchId: "oldIII_IV", eq: "Gross invasion of aerodigestive tract or recurrent laryngeal nerve." };
        if (v.tCat.startsWith("T3") || v.nCat.startsWith("N1")) return { value: "Stage II", matchId: "oldII", eq: "Involvement of strap muscles, large tumor (>4cm), or cervical nodal spread." };
        return { value: "Stage I (T1-2 N0 M0)", matchId: "oldI", eq: "Organ-confined differentiated thyroid carcinoma." };
      }
    },
    {
      id: "thyroidAnaplasticAJCC",
      cat: "onco",
      type: "class",
      name: "Thyroid – Anaplastic Carcinoma (AJCC 8th)",
      desc: "All anaplastic thyroid carcinomas are classified as Stage IV (IVA, IVB, IVC) due to their aggressive biology.",
      organ: "Thyroid Gland",
      region: "Endocrine Oncology",
      subject: "Anaplastic Thyroid Cancer",
      keywords: ["anaplastic", "thyroid", "stage iv", "braf", "dabrafenib", "trametinib"],
      guidance: "Stage IVA (confined to thyroid), Stage IVB (gross extrathyroidal extension or regional nodes), Stage IVC (distant metastases). Check BRAF V600E urgently.",
      literature: [{
        type: "ATA Anaplastic Guidelines",
        icon: "📄",
        title: "2021 American Thyroid Association Guidelines for Management of Patients with Anaplastic Thyroid Cancer",
        citation: "Bible KC, et al. Thyroid. 2021;31(3):337-386.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/33272897/" },
          { text: "NCI Anaplastic Thyroid PDQ ↗", url: "https://www.cancer.gov/types/thyroid" },
          { text: "RestartMed Staging Reference ↗", url: "https://www.restartmed.com/thyroid-cancer-staging-calculator/" },
          { text: "UICC TNM 9th Edition ↗", url: "https://www.uicc.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Tumor Extent (T)", "T1_3a", [
          ["T1_3a", "T1-T3a — Confined entirely to the thyroid gland"],
          ["T3b_4", "T3b-T4 — Gross extrathyroidal extension (strap muscles, trachea, larynx, esophagus, vessels)"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — Negative regional lymph nodes"],
          ["N1", "N1 — Regional lymph node metastasis present"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lung, bone, brain)"]
        ])
      ],
      table: {
        headers: ["Stage", "Definition", "Immediate Clinical Protocol"],
        rows: [
          { id: "anIVA", cols: ["Stage IVA", "T1-T3a N0 M0", "Emergent radical surgical resection followed by definitive chemoradiation"] },
          { id: "anIVB", cols: ["Stage IVB", "T3b-T4 Any N M0, or Any T N1 M0", "Urgent airway assessment; BRAF V600E testing; Dabrafenib + Trametinib if mutated"] },
          { id: "anIVC", cols: ["Stage IVC", "Any T Any N M1", "Palliative targeted therapy (anti-BRAF, checkpoint inhibitor) or palliative radiation"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVC (M1)", matchId: "anIVC", eq: "Metastatic anaplastic thyroid carcinoma. Initiate urgent molecular targeted therapy." };
        if (v.tCat === "T3b_4" || v.nCat === "N1") return { value: "Stage IVB", matchId: "anIVB", eq: "Locally advanced / node-positive anaplastic cancer." };
        return { value: "Stage IVA", matchId: "anIVA", eq: "Intrathyroidal anaplastic carcinoma. Urgent multidisciplinary resection." };
      }
    },
    {
      id: "thyroidMedullaryAJCC",
      cat: "onco",
      type: "class",
      name: "Thyroid – Medullary Carcinoma (MTC - AJCC 8th)",
      desc: "Staging for neuroendocrine calcitonin-secreting Medullary Thyroid Carcinoma.",
      organ: "Thyroid Gland / C-cells",
      region: "Endocrine Oncology",
      subject: "Medullary Thyroid Cancer",
      keywords: ["medullary thyroid", "mtc", "calcitonin", "cea", "ret", "ajcc 8th"],
      guidance: "Derived from neuroendocrine parafollicular C-cells. Does not uptake radioiodine. Germline RET genetic testing is mandatory.",
      literature: [{
        type: "ATA MTC Guidelines",
        icon: "📄",
        title: "Revised American Thyroid Association Guidelines for the Management of Medullary Thyroid Carcinoma",
        citation: "Wells SA Jr, et al. Thyroid. 2015;25(6):567-610.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/25810047/" },
          { text: "NCI Medullary Thyroid Carcinoma PDQ ↗", url: "https://www.cancer.gov/types/thyroid" },
          { text: "RestartMed Staging Calculator ↗", url: "https://www.restartmed.com/thyroid-cancer-staging-calculator/" },
          { text: "UICC TNM 9th Edition ↗", url: "https://www.uicc.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Tumor Extent (T)", "T1", [
          ["T1", "T1 — Tumor ≤ 2 cm, limited to thyroid"],
          ["T2", "T2 — Tumor > 2 cm but ≤ 4 cm, limited to thyroid"],
          ["T3", "T3 — Tumor > 4 cm or with extension into strap muscles"],
          ["T4a", "T4a — Invades larynx, trachea, esophagus, or recurrent laryngeal nerve"],
          ["T4b", "T4b — Invades prevertebral fascia or encases carotid artery/mediastinal vessels"]
        ]),
        makeS("nCat", "Regional Lymph Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1a", "N1a — Metastasis in Level VI or VII (central neck)"],
          ["N1b", "N1b — Metastasis in lateral neck (Levels I-V) or retropharyngeal"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (liver, lung, bone)"]
        ])
      ],
      table: {
        headers: ["Stage Group", "Criteria", "Intervention"],
        rows: [
          { id: "mI", cols: ["Stage I", "T1 N0 M0", "Total thyroidectomy + bilateral central neck dissection"] },
          { id: "mII", cols: ["Stage II", "T2-T3 N0 M0", "Total thyroidectomy + central and ipsilateral lateral neck dissection"] },
          { id: "mIII", cols: ["Stage III", "T1-T3 N1a M0", "Total thyroidectomy + extensive compartment neck dissection"] },
          { id: "mIVA_B", cols: ["Stage IVA / IVB", "T4 or N1b M0", "Locally aggressive resection ± external beam radiotherapy"] },
          { id: "mIVC", cols: ["Stage IVC", "Any T Any N M1", "RET inhibitors (Selpercatinib, Pralsetinib) or Cabozantinib/Vandetanib"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IVC (M1)", matchId: "mIVC", eq: "Distant metastatic medullary thyroid cancer. Order RET mutation testing." };
        if (v.tCat === "T4b") return { value: "Stage IVB", matchId: "mIVA_B", eq: "Unresectable prevertebral or vascular encasement." };
        if (v.tCat === "T4a" || v.nCat === "N1b") return { value: "Stage IVA", matchId: "mIVA_B", eq: "Invasion into aerodigestive tract or lateral neck nodes." };
        if (v.nCat === "N1a") return { value: "Stage III", matchId: "mIII", eq: "Central neck lymph node metastasis." };
        if (v.tCat === "T2" || v.tCat === "T3") return { value: "Stage II", matchId: "mII", eq: "Tumor > 2 cm or strap muscle involvement." };
        return { value: "Stage I", matchId: "mI", eq: "Small organ-confined medullary carcinoma." };
      }
    },
    {
      id: "parathyroidCarcinomaTNM",
      cat: "onco",
      type: "class",
      name: "Parathyroid Gland Carcinoma (AJCC 8th/9th Ed.)",
      desc: "Staging for rare parathyroid carcinomas causing hyperparathyroidism and severe hypercalcemia.",
      organ: "Parathyroid Glands",
      region: "Endocrine Oncology",
      subject: "Parathyroid Carcinoma",
      keywords: ["parathyroid", "hyperparathyroidism", "hypercalcemia", "pth", "ajcc"],
      guidance: "T1 organ-confined; T2 soft tissue invasion; T3 thyroid invasion; T4 major structures (trachea, esophagus, carotid).",
      literature: [{
        type: "Endocrine Cancer Guidelines",
        icon: "📄",
        title: "AJCC 8th Edition Staging for Parathyroid Carcinoma",
        citation: "Perrier ND, et al. AJCC Cancer Staging Manual. 8th ed. 2017.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/28097561/" },
          { text: "NCI Parathyroid Cancer Health Professional PDQ ↗", url: "https://www.cancer.gov/types/parathyroid" },
          { text: "American Association of Endocrine Surgeons Guidelines ↗", url: "https://www.endocrinesurgery.org/" },
          { text: "UICC TNM 9th Edition ↗", url: "https://www.uicc.org/" }
        ]
      }],
      fields: [
        makeS("tCat", "Primary Parathyroid Tumor (T)", "T1", [
          ["T1", "T1 — Tumor confined to the parathyroid gland without soft tissue invasion"],
          ["T2", "T2 — Infiltrates adjacent soft tissue/strap muscles"],
          ["T3", "T3 — Invades into the thyroid gland"],
          ["T4", "T4 — Invades trachea, esophagus, recurrent laryngeal nerve, or carotid sheath"]
        ]),
        makeS("nCat", "Regional Nodes (N)", "N0", [
          ["N0", "N0 — No regional lymph node metastasis"],
          ["N1", "N1 — Regional lymph node metastasis present"]
        ]),
        makeS("mCat", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lung, bone, liver)"]
        ])
      ],
      table: {
        headers: ["Stage", "Criteria", "Management"],
        rows: [
          { id: "ptI", cols: ["Stage I", "T1 N0 M0", "En bloc resection with ipsilateral thyroid lobectomy without capsular breach"] },
          { id: "ptII", cols: ["Stage II", "T2-T3 N0 M0", "Complete en bloc resection + central lymph node clearance"] },
          { id: "ptIII", cols: ["Stage III", "T4 N0 or Any T N1 M0", "Extensive compartmental surgical resection"] },
          { id: "ptIV", cols: ["Stage IV", "Any T Any N M1", "Control of refractory hypercalcemia (Cinacalcet, bisphosphonates, Denosumab)"] }
        ]
      },
      calc: function (v) {
        if (v.mCat === "M1") return { value: "Stage IV", matchId: "ptIV", eq: "Metastatic parathyroid carcinoma. Medical control of malignant hypercalcemia is paramount." };
        if (v.nCat === "N1" || v.tCat === "T4") return { value: "Stage III", matchId: "ptIII", eq: "Locally aggressive or node-positive parathyroid cancer." };
        if (v.tCat === "T2" || v.tCat === "T3") return { value: "Stage II", matchId: "ptII", eq: "Invasion into surrounding strap muscles or thyroid." };
        return { value: "Stage I", matchId: "ptI", eq: "Organ-confined parathyroid carcinoma." };
      }
    },

    // ==============================================================
    // 6. PEDIATRIC TUMORS WITH DEDICATED TNM SYSTEMS
    // ==============================================================
    {
      id: "neuroblastomaINRGSS",
      cat: "onco",
      type: "class",
      name: "Neuroblastoma (INRGSS & TNM Staging)",
      desc: "International Neuroblastoma Risk Group Staging System (INRGSS) based on Image-Defined Risk Factors (IDRFs).",
      organ: "Adrenal Gland / Sympathetic Ganglia",
      region: "Pediatric Oncology",
      subject: "Neuroblastoma",
      keywords: ["neuroblastoma", "inrgss", "idrf", "mycn", "stage m", "stage ms"],
      guidance: "L1: Localized without IDRFs; L2: Localized with ≥1 IDRF; M: Distant metastases; MS: Metastases limited to skin, liver, and/or bone marrow (<10%) in children <18 months.",
      literature: [{
        type: "INRG Consensus",
        icon: "📄",
        title: "The International Neuroblastoma Risk Group (INRG) staging system: an INRG Task Force report",
        citation: "Monclair T, et al. J Clin Oncol. 2009;27(2):298-303.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/19047290/" },
          { text: "NCI Neuroblastoma Treatment PDQ ↗", url: "https://www.cancer.gov/types/neuroblastoma" },
          { text: "HL7 mCODE Neuroblastoma Profile ↗", url: "https://hl7.org/fhir/us/mcode/2024May/artifacts.html" },
          { text: "COG Pediatric Oncology Protocol ↗", url: "https://childrensoncologygroup.org/" }
        ]
      }],
      fields: [
        makeS("stage", "INRGSS Stage Category", "L1", [
          ["L1", "Stage L1 — Localized tumor not involving vital structures; NO Image-Defined Risk Factors (IDRFs)"],
          ["L2", "Stage L2 — Locoregional tumor with ≥ 1 Image-Defined Risk Factor (IDRF) present"],
          ["M", "Stage M — Distant metastatic disease (except stage MS)"],
          ["MS", "Stage MS — Metastases confined to skin, liver, and/or bone marrow (<10%) in infant < 18 months"]
        ]),
        makeS("mycn", "MYCN Amplification Status", "nonamp", [
          ["nonamp", "MYCN Non-amplified"],
          ["amp", "MYCN Amplified (High Risk biological feature)"]
        ])
      ],
      table: {
        headers: ["INRGSS Stage", "Biology", "Risk Category & Action"],
        rows: [
          { id: "nbL1", cols: ["Stage L1", "Usually non-amplified", "Low Risk: Complete surgical resection alone; organ-sparing"] },
          { id: "nbL2", cols: ["Stage L2", "Without MYCN amplification", "Intermediate Risk: Moderate chemotherapy to reduce IDRFs followed by resection"] },
          { id: "nbMS", cols: ["Stage MS", "Age < 18 months, non-amplified", "Very Low / Low Risk: Observation or low-dose chemotherapy (high spontaneous regression)"] },
          { id: "nbHigh", cols: ["Stage M or MYCN Amp", "Any stage with MYCN amplification", "HIGH RISK: Intensive induction chemo + tandem ASCT + radiation + Dinutuximab (anti-GD2)"] }
        ]
      },
      calc: function (v) {
        var s = v.stage;
        var isAmp = v.mycn === "amp";
        if (isAmp || s === "M") {
          return { value: "High-Risk Neuroblastoma (" + s + ", MYCN " + (isAmp ? "Amp" : "Non-amp") + ")", matchId: "nbHigh", eq: "High-risk protocol: multi-agent chemo, surgical consolidation, stem cell transplant, Dinutuximab." };
        }
        if (s === "MS") return { value: "Stage MS (Special Infant Category)", matchId: "nbMS", eq: "Favourable biology; spontaneous regression common." };
        if (s === "L2") return { value: "Stage L2 (Locally Invasive with IDRFs)", matchId: "nbL2", eq: "Image-Defined Risk Factors present. Neoadjuvant chemotherapy." };
        return { value: "Stage L1 (Low Risk Localized)", matchId: "nbL1", eq: "Resection without adjuvant therapy in majority of patients." };
      }
    },
    {
      id: "wilmsTumorStaging",
      cat: "onco",
      type: "class",
      name: "Nephroblastoma / Wilms Tumor (COG / SIOP / TNM)",
      desc: "Clinicopathologic staging for pediatric nephroblastoma (Children's Oncology Group / SIOP criteria).",
      organ: "Kidney / Renal Vein",
      region: "Pediatric Oncology",
      subject: "Wilms Tumor",
      keywords: ["wilms", "nephroblastoma", "cog", "siop", "pediatric kidney", "blastema"],
      guidance: "Stage I (confined to kidney, capsule intact); Stage II (penetrates capsule but completely resected); Stage III (residual non-hematogenous tumor in abdomen/nodes); Stage IV (hematogenous mets to lung/liver); Stage V (bilateral renal involvement at diagnosis).",
      literature: [{
        type: "Pediatric Renal Tumor Standard",
        icon: "📄",
        title: "Renal tumors of childhood: First report of the Children's Oncology Group staging guidelines",
        citation: "Ehrlich PF, et al. J Clin Oncol. 2007;25(4):392-398.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/17264335/" },
          { text: "NCI Wilms Tumor Treatment PDQ ↗", url: "https://www.cancer.gov/types/kidney/hp/wilms-treatment-pdq" },
          { text: "HL7 mCODE Pediatric Oncology Staging ↗", url: "https://hl7.org/fhir/us/mcode/2024May/artifacts.html" },
          { text: "SIOP Renal Tumour Study Group Portal ↗", url: "https://siop-online.org/" }
        ]
      }],
      fields: [
        makeS("stage", "Wilms Tumor Staging Group", "I", [
          ["I", "Stage I — Tumor limited to kidney and completely resected; capsule intact; no rupture"],
          ["II", "Stage II — Extends beyond kidney (capsule or renal vessels) but completely resected with clear margins"],
          ["III", "Stage III — Residual non-hematogenous tumor in abdomen (spill, positive nodes, positive margins, peritoneal implants)"],
          ["IV", "Stage IV — Hematogenous distant metastases (lung, liver, bone, brain) or distant nodes"],
          ["V", "Stage V — Bilateral renal involvement at initial diagnosis"]
        ]),
        makeS("histology", "Histological Subtype", "fav", [
          ["fav", "Favourable Histology (classic triphasic: blastemal, stromal, epithelial)"],
          ["unfav", "Focal Anaplasia (Unfavourable)"],
          ["diffuse_unfav", "Diffuse Anaplasia (High Risk)"]
        ])
      ],
      table: {
        headers: ["Stage", "Anatomic Spread", "Standard COG Chemotherapy"],
        rows: [
          { id: "wI_II", cols: ["Stage I – II (Favourable)", "Completely resected without residual", "Regimen EE-4A (Dactinomycin + Vincristine)"] },
          { id: "wIII", cols: ["Stage III (Favourable)", "Abdominal residual / positive nodes", "Regimen DD-4A (Doxorubicin, Dactinomycin, Vincristine) + Flank radiation"] },
          { id: "wIV", cols: ["Stage IV", "Hematogenous metastases (pulmonary)", "Three-drug chemotherapy + Whole Lung Radiotherapy (WLR)"] },
          { id: "wV", cols: ["Stage V", "Bilateral renal involvement", "Preoperative chemotherapy to preserve nephrons followed by nephron-sparing surgery"] }
        ]
      },
      calc: function (v) {
        var s = v.stage;
        var h = v.histology;
        var note = h === "diffuse_unfav" ? " [Adverse: Diffuse Anaplasia]" : "";
        var match = s === "V" ? "wV" : s === "IV" ? "wIV" : s === "III" ? "wIII" : "wI_II";
        return { value: "Wilms Tumor: Stage " + s + note, matchId: match, eq: "COG treatment assignment based on stage and anaplasia." };
      }
    },
    {
      id: "rhabdomyosarcomaPediatric",
      cat: "onco",
      type: "class",
      name: "Pediatric Rhabdomyosarcoma (TNM / Clinical Group)",
      desc: "Intergroup Rhabdomyosarcoma Study Group (IRSG / COG) pretreatment TNM staging combined with surgical Clinical Group.",
      organ: "Skeletal Muscle / Soft Tissue",
      region: "Pediatric Oncology",
      subject: "Rhabdomyosarcoma",
      keywords: ["rhabdomyosarcoma", "rms", "embryonal", "alveolar", "foxo1", "irsg", "clinical group"],
      guidance: "Favourable sites: orbit, head/neck (non-parameningeal), genitourinary non-bladder/prostate. Unfavourable sites: parameningeal, bladder, prostate, extremities, trunk.",
      literature: [{
        type: "Pediatric Sarcoma Standard",
        icon: "📄",
        title: "Risk-based treatment for childhood rhabdomyosarcoma: Children's Oncology Group report",
        citation: "Raney RB, et al. J Clin Oncol. 2001;19(12):3091-3102.",
        links: [
          { text: "PubMed Record ↗", url: "https://pubmed.ncbi.nlm.nih.gov/11408506/" },
          { text: "NCI Childhood Rhabdomyosarcoma Treatment PDQ ↗", url: "https://www.cancer.gov/types/soft-tissue-sarcoma/hp/rhabdomyosarcoma-treatment-pdq" },
          { text: "HL7 mCODE Rhabdomyosarcoma Profile ↗", url: "https://hl7.org/fhir/us/mcode/2024May/artifacts.html" },
          { text: "Children's Oncology Group Soft Tissue Committee ↗", url: "https://childrensoncologygroup.org/" }
        ]
      }],
      fields: [
        makeS("site", "Primary Anatomic Site", "fav", [
          ["fav", "Favourable site (Orbit, non-parameningeal head & neck, GU non-bladder/prostate, biliary)"],
          ["unfav", "Unfavourable site (Parameningeal, bladder, prostate, extremities, retroperitoneum, trunk)"]
        ]),
        makeS("size", "Tumor Size & Nodal Status", "a_N0", [
          ["a_N0", "Size ≤ 5 cm (a), Regional nodes negative (N0)"],
          ["b_N0", "Size > 5 cm (b), Regional nodes negative (N0)"],
          ["any_N1", "Any size with Regional nodes POSITIVE (N1)"]
        ]),
        makeS("mets", "Distant Metastasis (M)", "M0", [
          ["M0", "M0 — No distant metastasis"],
          ["M1", "M1 — Distant metastasis present (lung, bone marrow, bone)"]
        ]),
        makeS("group", "IRSG Post-Surgical Clinical Group", "I", [
          ["I", "Group I — Localized tumor, completely resected (clear margins)"],
          ["II", "Group II — Gross resection with microscopic residual or positive nodes completely excised"],
          ["III", "Group III — Incomplete resection with gross residual disease or biopsy only"],
          ["IV", "Group IV — Distant metastatic disease at diagnosis"]
        ])
      ],
      table: {
        headers: ["Pretreatment Stage", "Risk Stratification", "Therapeutic Protocol"],
        rows: [
          { id: "rmsLow", cols: ["Stage 1 (Fav site, M0)", "Low Risk", "Chemotherapy (VAC / VA: Vincristine, Dactinomycin ± Cyclophosphamide) ± Radiation"] },
          { id: "rmsInt", cols: ["Stage 2 / 3 (Unfav site, M0)", "Intermediate Risk", "Intensive VAC Chemotherapy + local radiotherapy (41.4–50.4 Gy)"] },
          { id: "rmsHigh", cols: ["Stage 4 (M1 / Group IV)", "High Risk", "Intensive multi-agent systemic chemotherapy + local consolidation"] }
        ]
      },
      calc: function (v) {
        if (v.mets === "M1" || v.group === "IV") {
          return { value: "Stage 4 / Group IV (High Risk)", matchId: "rmsHigh", eq: "High-risk metastatic rhabdomyosarcoma." };
        }
        var isFav = v.site === "fav";
        var isN1 = v.size === "any_N1";
        var isBig = v.size === "b_N0";
        var stage = isFav ? "Stage 1" : (!isN1 && !isBig ? "Stage 2" : "Stage 3");
        var risk = isFav && v.group !== "III" ? "Low Risk" : "Intermediate Risk";
        var match = risk === "Low Risk" ? "rmsLow" : "rmsInt";
        return {
          value: stage + " (Group " + v.group + " : " + risk + ")",
          matchId: match,
          eq: "COG Risk Assignment guides systemic chemotherapy intensity and local radiation dosing."
        };
      }
    }
  ];

  // ==============================================================
  // REGISTRATION INTO GLOBAL MEMORY (DOM COLLISION-PROOF)
  // ==============================================================
  try {
    if (!Array.isArray(window.categories)) {
      window.categories = [];
    }
    if (!Array.isArray(window.tools)) {
      window.tools = [];
    }

    var catExists = false;
    for (var i = 0; i < window.categories.length; i++) {
      if (window.categories[i] && window.categories[i].id === oncoCategory.id) {
        catExists = true;
        break;
      }
    }
    if (!catExists) {
      window.categories.push(oncoCategory);
    }

    oncoTools.forEach(function (tool) {
      var existingIdx = -1;
      for (var j = 0; j < window.tools.length; j++) {
        if (window.tools[j] && window.tools[j].id === tool.id) {
          existingIdx = j;
          break;
        }
      }
      if (existingIdx >= 0) {
        window.tools[existingIdx] = tool;
      } else {
        window.tools.push(tool);
      }
    });

    if (typeof window.SYNONYM_MAP === "object" && window.SYNONYM_MAP !== null) {
      window.SYNONYM_MAP["onco"] = ["onco", "oncology", "cancer", "staging", "tnm", "figo", "ajcc", "tumor"];
      window.SYNONYM_MAP["breast"] = ["breast", "breast cancer", "ductal", "lobular", "inflammatory breast", "tnm"];
      window.SYNONYM_MAP["gynecology"] = ["vulva", "vagina", "cervix", "endometrium", "sarcoma", "ovary", "gtd", "choriocarcinoma", "figo"];
      window.SYNONYM_MAP["genitourinary"] = ["penis", "prostate", "testis", "kidney", "renal pelvis", "ureter", "bladder", "urethra", "adrenal", "pheochromocytoma", "paraganglioma"];
      window.SYNONYM_MAP["ophthalmic"] = ["eyelid", "conjunctiva", "uvea", "choroid", "retinoblastoma", "lacrimal", "orbit sarcoma"];
      window.SYNONYM_MAP["endocrine"] = ["thyroid", "papillary", "follicular", "anaplastic", "medullary", "parathyroid"];
      window.SYNONYM_MAP["pediatric"] = ["neuroblastoma", "wilms", "nephroblastoma", "rhabdomyosarcoma", "inrgss", "irsg"];
      window.SYNONYM_MAP["onco"] = ["onco", "oncology", "cancer", "staging", "tnm", "figo", "ajcc", "tumor"];
      window.SYNONYM_MAP["thorax"] = ["lung", "nsclc", "sclc", "mesothelioma", "thymoma", "thymic carcinoma", "pleura"];
      window.SYNONYM_MAP["sarcoma"] = ["osteosarcoma", "chondrosarcoma", "pelvis", "spine", "soft tissue sarcoma", "retroperitoneum", "angiosarcoma", "asps", "pecoma"];
      window.SYNONYM_MAP["skin"] = ["melanoma", "merkel cell", "squamous", "cscc", "bcc", "cutaneous", "breslow"];
      window.SYNONYM_MAP["head_neck"] = ["oral cavity", "lip", "tongue", "oropharynx", "hpv", "p16", "nasopharynx", "larynx", "glottis", "sinonasal", "parotid", "salivary", "cervical node", "unknown primary", "mucosal melanoma"];
      window.SYNONYM_MAP["digestive"] = ["esophagus", "egj", "stomach", "gastric", "small intestine", "duodenum", "appendix", "colon", "rectum", "colorectal", "anal", "gist", "net", "liver", "hcc", "cholangiocarcinoma", "gallbladder", "bile duct", "ampulla", "pancreas"];
    }

    if (typeof window.renderHome === "function") {
      window.renderHome();
    }
  } catch (err) {
    console.error("Critical error registering Oncology Staging tools:", err);
  }
})();
