def generate_intelligent_architecture(
    project_name: str,
    description: str,
    domain: str,
    expected_users: str,
    budget: str,
    required_features: list,
    preferred_cloud: str = "AWS",
    security_requirements: str = "Standard"
) -> dict:
    """
    Generates a deterministic yet domain-tailored software architecture when Gemini API is unavailable.
    """
    domain_lower = domain.lower()
    features_str = ", ".join(required_features) if isinstance(required_features, list) else str(required_features)

    # Tailor based on scale and domain
    if "fintech" in domain_lower or "banking" in domain_lower or "crypto" in domain_lower:
        arch_style = "Event-Driven Microservices with CQRS"
        fe_tech = "React.js with TypeScript & Tailwind CSS"
        fe_desc = "Type-safe dynamic Web UI with atomic component hierarchy and instant real-time feedback."
        be_tech = "FastAPI (Python) + Go Microservices"
        be_desc = "Asynchronous, high-throughput microservices architecture with gRPC internal communication."
        db_tech = "PostgreSQL (Primary relational) + Redis (Session/Caching)"
        db_desc = "ACID compliant transactional ledger with Redis cluster for high-speed balance caching."
        auth_tech = "OAuth 2.0 / OIDC with Auth0 + MFA"
        auth_desc = "Bank-grade authentication with biometric / OTP step-up verification and JWT key rotation."
        cloud_tech = "AWS (EKS, Aurora PostgreSQL, ElastiCache, WAF)"
        cloud_desc = "PCI-DSS compliant multi-AZ Kubernetes deployment with cloudfront edge security."
    elif "e-commerce" in domain_lower or "retail" in domain_lower or "marketplace" in domain_lower:
        arch_style = "Modular Monolith with Serverless Edge Extensions"
        fe_tech = "Next.js (React) + Tailwind CSS"
        fe_desc = "Server-side rendering (SSR) and Incremental Static Regeneration (ISR) for ultra-fast SEO page speeds."
        be_tech = "Node.js (NestJS) / Python FastAPI"
        be_desc = "Modular event-driven architecture utilizing asynchronous queues for order fulfillment."
        db_tech = "PostgreSQL + Elasticsearch + Redis"
        db_desc = "Relational data model for orders/inventory, Elasticsearch for fuzzy product discovery, and Redis for carts."
        auth_tech = "Clerk / Supabase Auth + JWT"
        auth_desc = "Seamless social logins, customer session persistence, and RBAC for merchant dashboards."
        cloud_tech = "Vercel (Frontend Edge) + AWS ECS / RDS (Backend)"
        cloud_desc = "Global CDN edge rendering paired with containerized auto-scaling backend API instances."
    elif "ai" in domain_lower or "ml" in domain_lower or "analytics" in domain_lower:
        arch_style = "Asynchronous Data Processing & Microservices Pipeline"
        fe_tech = "React.js + Tailwind CSS + Recharts"
        fe_desc = "Interactive dashboard rich with streaming telemetry, model execution indicators, and analytical charts."
        be_tech = "FastAPI (Python) + Celery / Ray Worker Nodes"
        be_desc = "Native Python API server directly integrating PyTorch/HuggingFace runtime with distributed background tasks."
        db_tech = "PostgreSQL (pgvector) + Pinecone Vector Database"
        db_desc = "Hybrid storage for structured metadata and high-dimensional vector embedding similarity search."
        auth_tech = "OAuth2 JWT with Scoped API Tokens"
        auth_desc = "Granular API key management with rate limiting per user tier and role permissions."
        cloud_tech = "Google Cloud Platform (GKE, Cloud Run, Vertex AI, Cloud Storage)"
        cloud_desc = "NVIDIA GPU accelerated worker pods with scalable auto-scaling API gateway."
    else:
        arch_style = "Layered Clean Architecture (API-First Monolith)"
        fe_tech = "React.js + Tailwind CSS + Axios"
        fe_desc = "Responsive Single Page Application with clean modular component state management."
        be_tech = "FastAPI (Python)"
        be_desc = "High-performance async REST API structured into Service, Controller, and Repository layers."
        db_tech = "PostgreSQL / SQLite (Development)"
        db_desc = "Robust relational schema with indexed query capabilities and automated database migrations."
        auth_tech = "JWT (JSON Web Tokens) with Password Hashing (Bcrypt)"
        auth_desc = "Secure token-based auth with HTTP-only cookies and access/refresh token rotation."
        cloud_tech = preferred_cloud if preferred_cloud != "Any" else "AWS EC2 / Render / Docker containers"
        cloud_desc = "Containerized application deployment with Automated Docker Compose setup."

    mermaid_code = f"""graph TD
    Client["Client (Browser / Mobile UI)"] -->|HTTPS / WSS| CDN["CDN / API Gateway"]
    CDN --> FE["Frontend: {fe_tech.split('+')[0].strip()}"]
    FE -->|REST / GraphQL| BE["Backend: {be_tech.split('+')[0].strip()}"]
    BE --> DB[("Database: {db_tech.split('+')[0].strip()}")]
    BE --> Auth["Auth Engine: {auth_tech.split('+')[0].strip()}"]
    BE --> Queue["Async Task Queue / Cache"]
    Queue --> Cloud["Deployment: {cloud_tech.split('(')[0].strip()}"]
"""

    return {
        "summary": f"{project_name} is best executed using a {arch_style} pattern. This approach balances developer velocity, operational stability for expected scale ({expected_users}), and security compliance for the {domain} domain.",
        "architecture_style": arch_style,
        "frontend": {
            "name": fe_tech,
            "category": "Frontend Framework",
            "description": fe_desc,
            "reasons": [
                f"Optimized for high-performance UI rendering suited for {domain}.",
                "Rich ecosystem of UI component libraries and seamless API integration capabilities.",
                "Excellent developer experience with fast refresh and modular maintainability."
            ]
        },
        "backend": {
            "name": be_tech,
            "category": "Backend Framework",
            "description": be_desc,
            "reasons": [
                f"Supports asynchronous concurrency needed for features like: {features_str[:60]}...",
                "Self-documenting API OpenAPI/Swagger specifications out of the box.",
                "High request-per-second capability with minimal resource footprint."
            ]
        },
        "database": {
            "name": db_tech,
            "category": "Database & Caching Engine",
            "description": db_desc,
            "reasons": [
                "Guarantees data integrity and schema consistency across core domain models.",
                f"Handles query complexity efficiently for expected load ({expected_users}).",
                "Proven reliability with horizontal/vertical scaling pathways."
            ]
        },
        "authentication": {
            "name": auth_tech,
            "category": "Identity & Security",
            "description": auth_desc,
            "reasons": [
                "Industry-standard security protocol eliminating custom crypto implementation risks.",
                "Enables seamless SSO and multi-factor authentication extensions.",
                f"Complies with required security posture ({security_requirements})."
            ]
        },
        "deployment": {
            "name": cloud_tech,
            "category": "Cloud & Infrastructure",
            "description": cloud_desc,
            "reasons": [
                f"Aligns with target budget allocation ({budget}).",
                "Provides automated continuous integration and seamless zero-downtime rolling updates.",
                "Offers high availability, managed backups, and DDoS protection."
            ]
        },
        "justifications": [
            {
                "topic": "Why this Architecture Pattern?",
                "content": f"The {arch_style} decouples domain responsibilities, preventing bottlenecks when scaling to {expected_users} while enabling fast iteration during early deployment phases."
            },
            {
                "topic": "Cost & Performance Optimization",
                "content": f"Selected components utilize managed cloud services and performant asynchronous runtimes to minimize server compute cost within the {budget} budget threshold."
            },
            {
                "topic": "Security & Compliance Standard",
                "content": f"Security is enforced at every tier using {auth_tech} and strict data encryption standards tailored to {security_requirements}."
            }
        ],
        "timeline": [
            {
                "phase": "Phase 1: Architecture & Foundation",
                "duration": "2 - 3 Weeks",
                "milestones": [
                    "Database schema design & migrations",
                    "API specification & mock endpoints",
                    "DevOps pipeline setup & environment provisioning"
                ]
            },
            {
                "phase": "Phase 2: Core Feature Implementation",
                "duration": "4 - 6 Weeks",
                "milestones": [
                    f"Build key features: {features_str}",
                    "Integrate authentication & role permissions",
                    "Develop frontend design system & dynamic pages"
                ]
            },
            {
                "phase": "Phase 3: Testing, Security & Hardening",
                "duration": "2 Weeks",
                "milestones": [
                    "End-to-end integration testing",
                    "Security audit & vulnerability scanning",
                    "Load testing & performance tuning for peak user traffic"
                ]
            },
            {
                "phase": "Phase 4: Staging & Production Launch",
                "duration": "1 - 2 Weeks",
                "milestones": [
                    "User Acceptance Testing (UAT)",
                    "Production domain & SSL deployment",
                    "Monitoring, logging, and error tracking setup"
                ]
            }
        ],
        "risk_analysis": [
            {
                "risk": "Database Bottleneck during Peak Traffic Spikes",
                "impact": "High",
                "probability": "Medium",
                "mitigation": "Implement Redis caching layer for read-heavy endpoints and database read-replicas."
            },
            {
                "risk": "Third-party Integration Latency & API Rate Limits",
                "impact": "Medium",
                "probability": "High",
                "mitigation": "Wrap external service calls in retry handlers with exponential backoff and circuit breakers."
            },
            {
                "risk": "Scope Creep and Timeline Slippage",
                "impact": "Medium",
                "probability": "Medium",
                "mitigation": "Prioritize core MVP features in initial sprint cycles and enforce strict change management."
            },
            {
                "risk": "Security Exposure or Token Compromise",
                "impact": "High",
                "probability": "Low",
                "mitigation": "Enforce HTTPS-only, short-lived JWT access tokens, and automatic CORS header validation."
            }
        ],
        "diagram_mermaid": mermaid_code,
        "ai_generated": False
    }
