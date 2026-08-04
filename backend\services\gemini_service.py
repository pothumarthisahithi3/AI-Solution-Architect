import json
import logging
from config import GEMINI_API_KEY
from services.mock_service import generate_intelligent_architecture

logger = logging.getLogger("gemini_service")

def analyze_project_with_gemini(
    project_name: str,
    description: str,
    domain: str,
    expected_users: str,
    budget: str,
    required_features: list,
    preferred_cloud: str = "Any",
    security_requirements: str = "Standard"
) -> dict:
    """
    Invokes Google Gemini API to analyze software project requirements and generate a comprehensive architecture recommendation.
    Falls back gracefully to intelligent local generator if API key is missing or call fails.
    """
    if not GEMINI_API_KEY:
        logger.info("No GEMINI_API_KEY found in environment. Using intelligent fallback service.")
        return generate_intelligent_architecture(
            project_name, description, domain, expected_users, budget, required_features, preferred_cloud, security_requirements
        )

    prompt = f"""
You are an expert Principal Solutions Architect. Analyze the following software project requirements and produce a detailed, industry-standard technology stack and architectural recommendation in strict JSON format.

PROJECT DETAILS:
- Project Name: {project_name}
- Domain / Industry: {domain}
- Description: {description}
- Target Scale / Expected Users: {expected_users}
- Budget Level: {budget}
- Key Features: {', '.join(required_features) if isinstance(required_features, list) else str(required_features)}
- Cloud Preference: {preferred_cloud}
- Security Requirements: {security_requirements}

Respond STRICTLY with valid JSON. Do not include markdown code block formatting like ```json ... ``` unless required. Return raw JSON matching this structure:

{{
  "summary": "Executive summary paragraph explaining the recommendation",
  "architecture_style": "e.g., Event-Driven Microservices / Serverless SPA / Clean Monolith",
  "frontend": {{
    "name": "Technology Name (e.g., React.js with TypeScript & Tailwind CSS)",
    "category": "Frontend Framework",
    "description": "Short explanation of frontend implementation approach",
    "reasons": ["Reason 1", "Reason 2", "Reason 3"]
  }},
  "backend": {{
    "name": "Technology Name (e.g., FastAPI (Python) / Node.js)",
    "category": "Backend Framework",
    "description": "Short explanation of backend API & service architecture",
    "reasons": ["Reason 1", "Reason 2", "Reason 3"]
  }},
  "database": {{
    "name": "Technology Name (e.g., PostgreSQL + Redis)",
    "category": "Database Recommendation",
    "description": "Short explanation of data persistence and caching strategy",
    "reasons": ["Reason 1", "Reason 2", "Reason 3"]
  }},
  "authentication": {{
    "name": "Technology Name (e.g., OAuth 2.0 / Auth0 / Supabase Auth)",
    "category": "Authentication Method",
    "description": "Short explanation of auth flow & identity provider",
    "reasons": ["Reason 1", "Reason 2", "Reason 3"]
  }},
  "deployment": {{
    "name": "Technology Name (e.g., AWS EKS / Vercel + AWS ECS)",
    "category": "Cloud Deployment",
    "description": "Short explanation of cloud infrastructure & CI/CD",
    "reasons": ["Reason 1", "Reason 2", "Reason 3"]
  }},
  "justifications": [
    {{
      "topic": "Topic Name (e.g., Architecture Selection Rationale)",
      "content": "Detailed justification paragraph"
    }},
    {{
      "topic": "Topic Name (e.g., Scaling & Performance Strategy)",
      "content": "Detailed justification paragraph"
    }},
    {{
      "topic": "Topic Name (e.g., Cost & Security Alignment)",
      "content": "Detailed justification paragraph"
    }}
  ],
  "timeline": [
    {{
      "phase": "Phase 1: Foundation & Setup",
      "duration": "2 Weeks",
      "milestones": ["Milestone 1", "Milestone 2"]
    }},
    {{
      "phase": "Phase 2: Core Development",
      "duration": "4 Weeks",
      "milestones": ["Milestone 1", "Milestone 2"]
    }},
    {{
      "phase": "Phase 3: Integration & Testing",
      "duration": "2 Weeks",
      "milestones": ["Milestone 1", "Milestone 2"]
    }},
    {{
      "phase": "Phase 4: Deployment & Launch",
      "duration": "1 Week",
      "milestones": ["Milestone 1", "Milestone 2"]
    }}
  ],
  "risk_analysis": [
    {{
      "risk": "Risk description 1",
      "impact": "High / Medium / Low",
      "probability": "High / Medium / Low",
      "mitigation": "Mitigation strategy"
    }},
    {{
      "risk": "Risk description 2",
      "impact": "High / Medium / Low",
      "probability": "High / Medium / Low",
      "mitigation": "Mitigation strategy"
    }}
  ],
  "diagram_mermaid": "graph TD\\n  Client --> FE[Frontend]\\n  FE --> BE[Backend API]\\n  BE --> DB[(Database)]\\n  BE --> Auth[Auth Service]"
}}
"""

    try:
        # Try importing google.genai SDK
        try:
            from google import genai
            from google.genai import types
            
            client = genai.Client(api_key=GEMINI_API_KEY)
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.2,
                )
            )
            raw_text = response.text
        except Exception as e1:
            logger.info(f"genai Client call failed/unsupported: {e1}. Trying google.generativeai...")
            import google.generativeai as genai_legacy
            genai_legacy.configure(api_key=GEMINI_API_KEY)
            model = genai_legacy.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(prompt)
            raw_text = response.text

        # Clean JSON markdown fences if present
        cleaned_text = raw_text.strip()
        if cleaned_text.startswith("```json"):
            cleaned_text = cleaned_text[7:]
        if cleaned_text.startswith("```"):
            cleaned_text = cleaned_text[3:]
        if cleaned_text.endswith("```"):
            cleaned_text = cleaned_text[:-3]
        cleaned_text = cleaned_text.strip()

        result = json.loads(cleaned_text)
        result["ai_generated"] = True
        return result

    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}. Falling back to intelligent mock generator.")
        fallback = generate_intelligent_architecture(
            project_name, description, domain, expected_users, budget, required_features, preferred_cloud, security_requirements
        )
        fallback["summary"] += f" (Note: Local analysis fallback triggered: {str(e)[:50]})"
        return fallback
