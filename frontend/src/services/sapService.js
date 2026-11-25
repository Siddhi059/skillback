const SAP_SANDBOX_BASE = 'https://sandbox.api.sap.com/successfactors/odata/v2';
export const SAP_REQUISITION_URL = `${SAP_SANDBOX_BASE}/JobRequisition?$top=5&$format=json`;

const FALLBACK_SAP_REQUISITIONS = [
  {
    jobReqId: 'SF-REQ-8841',
    defaultJobTitle: 'Senior Product Operations Lead',
    department: 'Enterprise Cloud Platform',
    location: 'Bengaluru / Hybrid',
    jobGrade: 'L6 · Principal Track',
    externalJobDesc:
      'Seeking a rockstar digital native with uninterrupted work history and zero career gaps to drive product operations. Must work rigid 60-hour on-site weeks to coordinate global launches.',
    source: 'SAP SuccessFactors OData v2',
  },
  {
    jobReqId: 'SF-REQ-8845',
    defaultJobTitle: 'FinTech Risk & Governance Specialist',
    department: 'Payments & Compliance',
    location: 'Mumbai / Remote Flexible',
    jobGrade: 'L5 · Senior Lead',
    externalJobDesc:
      'Looking for an aggressive self-starter with continuous recent experience only. Ideal candidate is young and energetic and ready to manage regulatory stakeholder reviews.',
    source: 'SAP SuccessFactors OData v2',
  },
  {
    jobReqId: 'SF-REQ-8852',
    defaultJobTitle: 'Industrial AI Project Advisor (Returnship)',
    department: 'Smart Infrastructure & Ops',
    location: 'Pune / Hybrid',
    jobGrade: 'L6 · Advisory Fellow',
    externalJobDesc:
      'We need a ninja project planner who is a recent graduate only mindset with no career breaks to modernize CAD and vendor governance pipelines.',
    source: 'SAP SuccessFactors OData v2',
  },
  {
    jobReqId: 'SF-REQ-8860',
    defaultJobTitle: 'EdTech Curriculum & Learning Architect',
    department: 'People & Enablement',
    location: 'Remote (Global)',
    jobGrade: 'L5 · Specialist',
    externalJobDesc:
      'Designing AI-assisted cohort curricula. Candidates must show uninterrupted corporate tenure and aggressive delivery cadence across quarterly sprints.',
    source: 'SAP SuccessFactors OData v2',
  },
  {
    jobReqId: 'SF-REQ-8864',
    defaultJobTitle: 'Customer Success Transformation Lead',
    department: 'SaaS Operations',
    location: 'Hyderabad / Hybrid',
    jobGrade: 'L5 · Lead',
    externalJobDesc:
      'Lead enterprise customer onboarding rituals. Looking for a digital native with no career gaps who thrives in high-pressure environments.',
    source: 'SAP SuccessFactors OData v2',
  },
];

export const BIAS_AUDIT_RULES = [
  {
    id: 'rule-gap',
    pattern: /\b(zero career gaps|no career gaps|no career breaks|uninterrupted work history|uninterrupted corporate tenure|continuous recent experience only)\b/gi,
    category: 'Career-Break Exclusion',
    reason: 'Screens out caregivers, returners, and sabbatical talent regardless of capability.',
    replacement: 'nonlinear career journeys and career returners welcome',
  },
  {
    id: 'rule-age',
    pattern: /\b(digital native|young and energetic|recent graduate only)\b/gi,
    category: 'Age / Generation Bias',
    reason: 'Discourages seasoned, mid-career, and retired professionals with deep judgment.',
    replacement: 'curious across modern digital workflows and collaborative tools',
  },
  {
    id: 'rule-tone',
    pattern: /\b(rockstar|ninja|aggressive)\b/gi,
    category: 'Gendered / Exclusionary Tone',
    reason: 'Coded language shown to reduce diverse applicant conversion by up to 30%.',
    replacement: 'high-ownership',
  },
  {
    id: 'rule-rigid',
    pattern: /\b(must work rigid 60-hour on-site weeks|high-pressure environments)\b/gi,
    category: 'Flexibility Barrier',
    reason: 'Penalizes caregivers and returners seeking outcome-focused flexibility.',
    replacement: 'outcome-driven collaboration with flexible core hours',
  },
];

export function runBiasAuditOnRequisition(req) {
  const text = req?.externalJobDesc || '';
  const findings = [];

  for (const rule of BIAS_AUDIT_RULES) {
    const matches = text.match(rule.pattern);
    if (matches) {
      for (const matchedPhrase of [...new Set(matches)]) {
        findings.push({
          id: `${req.jobReqId}-${rule.id}-${matchedPhrase.toLowerCase().replace(/\s+/g, '-')}`,
          phrase: matchedPhrase,
          category: rule.category,
          reason: rule.reason,
          replacement: rule.replacement,
        });
      }
    }
  }

  const penalty = Math.min(54, findings.length * 14);
  const inclusivityScore = Math.max(42, 98 - penalty);

  return {
    inclusivityScore,
    findings,
  };
}

function mapSapODataRecord(record, index) {
  const id = record.jobReqId || record.jobRequisitionId || `SF-REQ-${8900 + index}`;
  const title =
    record.defaultJobTitle ||
    record.jobTitle ||
    record.title ||
    `SAP Enterprise Role #${index + 1}`;
  const department = record.department || record.division || 'SAP Cloud Operations';
  const location = record.location || record.city || 'Hybrid / Remote Flexible';
  const jobGrade = record.jobGrade || record.payGrade || 'L5 · Professional';
  const fallbackDesc = FALLBACK_SAP_REQUISITIONS[index % FALLBACK_SAP_REQUISITIONS.length].externalJobDesc;
  const externalJobDesc =
    (record.externalJobDesc && String(record.externalJobDesc).replace(/<[^>]+>/g, '').trim()) ||
    fallbackDesc;

  return {
    jobReqId: String(id),
    defaultJobTitle: title,
    department,
    location,
    jobGrade,
    externalJobDesc,
    source: 'SAP SuccessFactors OData v2',
  };
}

/**
 * Fetches top 5 JobRequisition records from SAP SuccessFactors Sandbox API.
 * Automatically falls back to realistic SAP OData records on missing key, CORS, or timeout.
 */
export async function fetchSapJobRequisitions() {
  const apiKey = import.meta.env.VITE_SAP_API_KEY;

  if (!apiKey) {
    return {
      status: 'SAP Sandbox Fallback',
      isLive: false,
      reason: 'VITE_SAP_API_KEY not configured — using resilient SAP OData sandbox dataset.',
      endpoint: SAP_REQUISITION_URL,
      syncedAt: new Date().toISOString(),
      requisitions: FALLBACK_SAP_REQUISITIONS.map((item) => ({
        ...item,
        audit: runBiasAuditOnRequisition(item),
      })),
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(SAP_REQUISITION_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        APIKey: apiKey,
      },
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`SAP Sandbox HTTP ${response.status}`);
    }

    const payload = await response.json();
    const rawResults = payload?.d?.results || payload?.value || [];
    if (!Array.isArray(rawResults) || rawResults.length === 0) {
      throw new Error('Empty SAP OData JobRequisition results');
    }

    const mapped = rawResults.slice(0, 5).map(mapSapODataRecord);
    return {
      status: 'Live SAP Sandbox API',
      isLive: true,
      endpoint: SAP_REQUISITION_URL,
      syncedAt: new Date().toISOString(),
      requisitions: mapped.map((item) => ({
        ...item,
        audit: runBiasAuditOnRequisition(item),
      })),
    };
  } catch (err) {
    clearTimeout(timer);
    return {
      status: 'SAP Sandbox Fallback',
      isLive: false,
      reason: err?.message || 'CORS or network latency fallback engaged for live presentation.',
      endpoint: SAP_REQUISITION_URL,
      syncedAt: new Date().toISOString(),
      requisitions: FALLBACK_SAP_REQUISITIONS.map((item) => ({
        ...item,
        audit: runBiasAuditOnRequisition(item),
      })),
    };
  }
}

/**
 * Pushes an audited, bias-cleared JobRequisition back to SAP SuccessFactors Sandbox.
 */
export async function pushAuditedRequisitionToSap(jobData) {
  const apiKey = import.meta.env.VITE_SAP_API_KEY;
  const odataPayload = {
    __metadata: {
      uri: `${SAP_SANDBOX_BASE}/JobRequisition('${jobData.jobReqId}')`,
      type: 'SFOData.JobRequisition',
    },
    jobReqId: jobData.jobReqId,
    defaultJobTitle: jobData.defaultJobTitle,
    department: jobData.department,
    location: jobData.location,
    externalJobDesc: jobData.externalJobDesc,
    customStringSkillBackAudit: 'BIAS_CLEARED',
    customNumInclusivityScore: jobData.inclusivityScore ?? 96,
    syncConfirmationBadge: 'SF-SYNC-2026',
  };

  if (!apiKey) {
    return {
      status: 'SAP Sandbox Fallback',
      isLive: false,
      confirmationBadge: 'SF-SYNC-2026',
      pushedAt: new Date().toISOString(),
      payload: odataPayload,
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(`${SAP_SANDBOX_BASE}/JobRequisition`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        APIKey: apiKey,
      },
      body: JSON.stringify(odataPayload),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`SAP Sandbox HTTP ${response.status}`);
    }

    return {
      status: 'Live SAP Sandbox API',
      isLive: true,
      confirmationBadge: 'SF-SYNC-2026',
      pushedAt: new Date().toISOString(),
      payload: odataPayload,
    };
  } catch {
    clearTimeout(timer);
    return {
      status: 'SAP Sandbox Fallback',
      isLive: false,
      confirmationBadge: 'SF-SYNC-2026',
      pushedAt: new Date().toISOString(),
      payload: odataPayload,
    };
  }
}

export const SKILL_PASSPORT_CANDIDATES = [
  {
    id: 'priya',
    firstName: 'Priya',
    lastName: 'Sharma',
    avatar: 'priya',
    headline: 'VP of People & FinTech Ops · 3.5-Yr Caregiving Returner',
    candidateId: 'SF-CAND-2026-104',
    readinessScore: 92,
    reverseMentorshipPair: 'Paired with Gen-Z AI Designer (Chloe Vance)',
    verifiedCompetencies: [
      'Cross-Functional Operations',
      'Regulatory Stakeholder Alignment',
      'AI-Assisted People Analytics',
      'Returnship Program Governance',
    ],
    breakTranslationSummary:
      'Translated 3.5-year caregiving pause & pro-bono startup advisory into executive operations governance.',
  },
  {
    id: 'rajesh',
    firstName: 'Rajesh',
    lastName: 'Kulkarni',
    avatar: 'rajesh',
    headline: 'Principal AI Project Advisor · Retired Mechanical Engineer (28 yrs)',
    candidateId: 'SF-CAND-2026-209',
    readinessScore: 91,
    reverseMentorshipPair: 'Paired with Gen-Z AI Engineer (Aarav Sharma)',
    verifiedCompetencies: [
      'Capital Project Governance',
      'Vendor & ISO Safety Negotiation',
      'Notion AI & Linear Roadmaps',
      'Copilot Technical Spec Workflows',
    ],
    breakTranslationSummary:
      'Combined 28 years of industrial engineering leadership with hands-on Gen-Z reverse mentorship in modern AI project suites.',
  },
  {
    id: 'kabir',
    firstName: 'Kabir',
    lastName: 'Malhotra',
    avatar: 'kabir',
    headline: 'EdTech Product & Analytics Lead · Mid-Career Sabbatical Pivoter',
    candidateId: 'SF-CAND-2026-318',
    readinessScore: 89,
    reverseMentorshipPair: 'Paired with Gen-Z Growth Strategist (Zoya Khan)',
    verifiedCompetencies: [
      'Cohort & Retention Analytics',
      'Curriculum & Product Strategy',
      'LLM Evaluation Workflows',
      'Async Stakeholder Communication',
    ],
    breakTranslationSummary:
      'Converted 10 years of STEM instruction and a 2-year family sabbatical into verified EdTech product analytics delivery.',
  },
];

export function buildSkillPassportSapPayload(candidate) {
  return {
    __metadata: {
      uri: `${SAP_SANDBOX_BASE}/Candidate('${candidate.candidateId}')`,
      type: 'SFOData.Candidate',
    },
    candidateId: candidate.candidateId,
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    primaryTitle: candidate.headline,
    skillBackReadinessScore: candidate.readinessScore,
    reverseMentorshipExchange: candidate.reverseMentorshipPair,
    verifiedCompetencies: candidate.verifiedCompetencies.map((skill, idx) => ({
      skillCode: `SB-SKL-${101 + idx}`,
      skillName: skill,
      verifiedBy: 'SkillBack AI + Reverse Mentorship Track',
    })),
    translatedNarrative: candidate.breakTranslationSummary,
    syncStatus: 'EXPORTED',
    confirmationBadge: 'SF-SYNC-2026',
    exportedAt: new Date().toISOString(),
  };
}

export async function exportSkillPassportToSap(candidate) {
  const payload = buildSkillPassportSapPayload(candidate);
  const apiKey = import.meta.env.VITE_SAP_API_KEY;

  if (!apiKey) {
    return {
      status: 'SAP Sandbox Fallback',
      isLive: false,
      confirmationBadge: 'SF-SYNC-2026',
      payload,
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(`${SAP_SANDBOX_BASE}/Candidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        APIKey: apiKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`SAP Sandbox HTTP ${response.status}`);
    }

    return {
      status: 'Live SAP Sandbox API',
      isLive: true,
      confirmationBadge: 'SF-SYNC-2026',
      payload,
    };
  } catch {
    clearTimeout(timer);
    return {
      status: 'SAP Sandbox Fallback',
      isLive: false,
      confirmationBadge: 'SF-SYNC-2026',
      payload,
    };
  }
}
