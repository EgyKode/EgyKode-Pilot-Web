import { 
  WorkloadItem, 
  ArchitectureCandidate, 
  CostCategoryItem, 
  GeneratedFileItem, 
  ValidationItem,
  BlockerItem 
} from '../types/pilot';

export const REPOSITORY_WORKLOADS: Record<string, WorkloadItem[]> = {
  'shop-microservices': [
    {
      id: 'auth-service',
      name: 'auth-service',
      type: 'API / Authentication Gateway',
      runtime: 'Python 3.12 (FastAPI)',
      rps: '45 RPS / replica',
      status: 'confirmed',
      entrypoint: 'uvicorn auth.main:app --host 0.0.0.0 --port 8000',
      evidence: {
        file: 'services/auth/main.py',
        line: 14,
        match: 'app = FastAPI(title="AuthService", version="2.1.0")'
      },
      dependencies: ['PostgreSQL (User Store)', 'Redis (Session Tokens)', 'AWS KMS (JWT Signing)'],
      specs: {
        cpu: '0.5 vCPU',
        memory: '1024 MB',
        port: 8000,
        scaling: '2 - 6 replicas (CPU > 70%)'
      }
    },
    {
      id: 'frontend',
      name: 'web-frontend',
      type: 'Single Page Application (Edge CDN)',
      runtime: 'TypeScript / React 18 + Vite',
      rps: 'Edge Cached (Global Distribution)',
      status: 'confirmed',
      entrypoint: 'vite build -> /dist static assets',
      evidence: {
        file: 'frontend/package.json',
        line: 8,
        match: '"build": "tsc && vite build"'
      },
      dependencies: ['CloudFront CDN', 'S3 Bucket (Origin)', 'ACM TLS Certificate'],
      specs: {
        cpu: 'Serverless Edge',
        memory: 'N/A (Static Assets)',
        port: 443,
        scaling: 'Infinite Edge concurrency'
      }
    },
    {
      id: 'roadmap-service',
      name: 'roadmap-service',
      type: 'Core Business Service & Event Consumer',
      runtime: 'Java 21 (Spring Boot 3.2)',
      rps: '140 RPS / replica',
      status: 'confirmed',
      entrypoint: 'java -jar /app/roadmap-service.jar',
      evidence: {
        file: 'backend/pom.xml',
        line: 32,
        match: '<artifactId>spring-boot-starter-web</artifactId>'
      },
      dependencies: ['PostgreSQL (Primary DB)', 'Apache Kafka (Event Stream)', 'AWS S3 (Asset Attachments)'],
      specs: {
        cpu: '1.0 vCPU',
        memory: '2048 MB',
        port: 8080,
        scaling: '2 - 10 replicas (RPS > 120)'
      }
    }
  ]
};

export const ARCHITECTURE_CANDIDATES: ArchitectureCandidate[] = [
  {
    id: 'cost',
    name: 'Cost-Optimized Topology',
    tagline: 'Minimalist container deployment for lean traffic and predictable budgets.',
    recommended: false,
    monthlyCost: 82,
    availability: '99.9% (Single-AZ with auto-restart)',
    scalability: 'Auto-scales up to 250 req/sec',
    performance: '< 85ms p95 latency',
    complexity: 'Very Low (Single control plane, serverless components)',
    security: 'Standard IAM role isolation, KMS encryption at rest',
    computeType: 'AWS ECS Fargate (Spot-assisted savings)',
    databaseType: 'Amazon RDS PostgreSQL (db.t4g.micro, Single-AZ)',
    caching: 'In-memory container cache (No external Redis cluster)',
    ingress: 'AWS Application Load Balancer + AWS WAF Essentials',
    whyExplanation: {
      workloadFit: 'Fits all 3 discovered workloads comfortably under low-to-medium load profiles.',
      requirementsAlignment: 'Satisfies basic 99.9% uptime SLA without provisioning idle standby resources.',
      budgetReasoning: 'Cuts infrastructure spend by ~21% by deferring dedicated ElastiCache and Multi-AZ DB.',
      operationalComplexity: 'Requires virtually zero day-2 cluster maintenance.',
      alternativesRejected: [
        'Rejected EKS: $73/mo base control plane fee alone consumes 90% of budget before computing workloads.',
        'Rejected EC2 self-managed: High operational burden for patch management, security scanning, and AMI baking.'
      ]
    }
  },
  {
    id: 'balanced',
    name: 'Balanced Production Architecture',
    tagline: 'Enterprise-grade Multi-AZ resiliency with strict budget boundary alignment.',
    recommended: true,
    monthlyCost: 104,
    availability: '99.95% (Dual-AZ Active-Active failover)',
    scalability: 'Auto-scales up to 800 req/sec dynamically',
    performance: '< 28ms p95 latency (Redis session caching)',
    complexity: 'Low-Medium (Managed services, declarative IaC)',
    security: 'Strict least-privilege IAM, VPC private subnets, TLS 1.3 only',
    computeType: 'AWS ECS Fargate (Dual-AZ redundant tasks)',
    databaseType: 'Amazon RDS PostgreSQL Multi-AZ',
    caching: 'Amazon ElastiCache Serverless (Redis compatible)',
    ingress: 'AWS ALB + CloudFront Global CDN + WAF Managed Rules',
    whyExplanation: {
      workloadFit: 'Directly mirrors the workloads and runtime contracts the scan found.',
      requirementsAlignment: 'Exceeds the $150 budget requirement ($104.32/mo) while delivering 99.95% Multi-AZ SLA.',
      budgetReasoning: 'Right-sized compute allocation with zero over-provisioning and serverless scaling bounds.',
      operationalComplexity: 'Managed services handle automated patching, backups, snapshot replication, and failover.',
      alternativesRejected: [
        'Rejected Single-AZ RDS: Fails disaster recovery requirement (< 1h RPO / RTO during AZ outage).',
        'Rejected Kubernetes: Adds unwarranted cognitive overhead for a 3-service polyglot architecture.'
      ]
    }
  },
  {
    id: 'perf',
    name: 'High-Performance & High-Availability',
    tagline: 'Maximum throughput and sub-10ms response times for mission-critical scale.',
    recommended: false,
    monthlyCost: 143,
    availability: '99.99% (Triple-AZ + Global Accelerator)',
    scalability: 'Scales seamlessly beyond 2,500 req/sec',
    performance: '< 12ms p95 latency (Global Edge acceleration)',
    complexity: 'Medium (Multi-AZ read replicas, custom tuning)',
    security: 'Shield Advanced protection, mTLS between services, Secrets rotation',
    computeType: 'Dedicated ECS Fargate with Provisioned Concurrency',
    databaseType: 'RDS PostgreSQL Multi-AZ with a read replica',
    caching: 'ElastiCache Redis Cluster (Multi-AZ with Auto-Failover)',
    ingress: 'AWS Global Accelerator + CloudFront + Managed DDoS Rules',
    whyExplanation: {
      workloadFit: 'Optimized for high-concurrency bursts and heavy event stream processing.',
      requirementsAlignment: 'Exceeds 99.99% availability targets; stays strictly within the $150 budget cap.',
      budgetReasoning: 'Maximizes performance yield per dollar by deploying provisioned caching tiers.',
      operationalComplexity: 'Adds a cache tier and a read replica for burst traffic.',
      alternativesRejected: [
        'Rejected Multi-Region Active-Active: Overkill for current 10k user threshold, multiplies cloud cost by 2.4×.'
      ]
    }
  }
];

export const COST_ITEMS: CostCategoryItem[] = [
  {
    category: 'Compute',
    serviceName: 'AWS ECS Fargate (Dual-AZ)',
    baseCost: 48.00,
    scale5xCost: 144.00,
    description: 'vCPU and memory allocations for auth-service and roadmap-service containers'
  },
  {
    category: 'Database',
    serviceName: 'Amazon RDS PostgreSQL',
    baseCost: 29.40,
    scale5xCost: 58.80,
    description: 'Multi-AZ storage, automated snapshot retention, 0.5 - 2.0 ACU scaling'
  },
  {
    category: 'Storage',
    serviceName: 'Amazon S3 + CloudFront Storage',
    baseCost: 8.92,
    scale5xCost: 22.40,
    description: 'Frontend static asset hosting, media attachments, and lifecycle tiering'
  },
  {
    category: 'Networking',
    serviceName: 'Application Load Balancer & Data Transfer',
    baseCost: 6.00,
    scale5xCost: 18.20,
    description: 'ALB hourly charge + cross-AZ egress bandwidth between microservices'
  },
  {
    category: 'Observability',
    serviceName: 'CloudWatch Logs & Metrics Retention',
    baseCost: 5.50,
    scale5xCost: 12.00,
    description: 'Container stdout ingestion, 14-day retention, custom alarm metrics'
  },
  {
    category: 'Events & Queue',
    serviceName: 'Amazon SQS / EventBridge Bus',
    baseCost: 6.50,
    scale5xCost: 16.50,
    description: 'Asynchronous event decoupling for roadmap notifications and background jobs'
  }
];

export const GENERATED_FILES: GeneratedFileItem[] = [
  {
    path: 'terraform/main.tf',
    language: 'hcl',
    badge: 'IaC Root',
    content: `# Generated by EgyKode Pilot — The Intelligent Cloud DevOps Compiler
# Architecture: Balanced Production (Dual-AZ ECS Fargate + RDS PostgreSQL)
# Budget Constraint: $150.00/mo | Estimated Monthly: $104.32/mo

terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.30"
    }
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      ManagedBy   = "EgyKode-Pilot"
      Environment = "production"
      Project     = "shop-microservices"
    }
  }
}

module "vpc" {
  source             = "./modules/vpc"
  cidr_block         = "10.0.0.0/16"
  availability_zones = ["us-east-1a", "us-east-1b"]
  enable_nat_gateway = true
  single_nat_gateway = true # Optimized for budget constraint
}

module "ecs_cluster" {
  source       = "./modules/ecs"
  vpc_id       = module.vpc.vpc_id
  subnet_ids   = module.vpc.private_subnets
  cluster_name = "shop-prod-cluster"
}`
  },
  {
    path: 'terraform/ecs_services.tf',
    language: 'hcl',
    badge: 'Workloads',
    content: `# Workload 1: auth-service (Python FastAPI)
resource "aws_ecs_task_definition" "auth_service" {
  family                   = "auth-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.auth_task.arn

  container_definitions = jsonencode([
    {
      name      = "auth-service"
      image     = "\${aws_ecr_repository.auth.repository_url}:latest"
      essential = true
      portMappings = [{
        containerPort = 8000
        hostPort      = 8000
      }]
      environment = [
        { name = "ENVIRONMENT", value = "production" },
        { name = "DB_HOST", value = aws_db_instance.this.address }
      ]
      secrets = [
        { name = "JWT_SECRET", valueFrom = aws_secretsmanager_secret.jwt_secret.arn }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/shop/auth-service"
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "auth"
        }
      }
    }
  ])
}`
  },
  {
    path: 'kubernetes/deployment.yaml',
    language: 'yaml',
    badge: 'K8s Spec',
    content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: roadmap-service
  namespace: production
  labels:
    app.kubernetes.io/name: roadmap-service
    app.kubernetes.io/part-of: shop-microservices
    app.kubernetes.io/managed-by: egykode-pilot
spec:
  replicas: 2
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: roadmap-service
  template:
    metadata:
      labels:
        app: roadmap-service
    spec:
      containers:
      - name: roadmap-service
        image: ghcr.io/egykode/roadmap-service:2.1.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: 500m
            memory: 1024Mi
          limits:
            cpu: 1000m
            memory: 2048Mi
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 20
          periodSeconds: 10`
  },
  {
    path: '.github/workflows/pipeline.yml',
    language: 'yaml',
    badge: 'CI/CD Engine',
    content: `name: Production Deployment Pipeline
on:
  push:
    branches: [ main ]

permissions:
  id-token: write
  contents: read

jobs:
  validate:
    name: Pilot Deterministic Validation
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate Terraform Syntax & Plan
        run: terraform fmt -check && terraform validate
      - name: Container Security Audit
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'config'
          exit-code: '1'
          severity: 'CRITICAL,HIGH'

  deploy:
    needs: validate
    name: Deliver to AWS ECS Dual-AZ
    runs-on: ubuntu-latest
    steps:
      - name: Configure AWS Credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/PilotDeploymentRole
          aws-region: us-east-1`
  },
  {
    path: 'security/iam-least-privilege.json',
    language: 'json',
    badge: 'IAM Security',
    content: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowSpecificS3BucketOnly",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::shop-microservices-assets-prod/*"
    },
    {
      "Sid": "DenyUnencryptedTraffic",
      "Effect": "Deny",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::shop-microservices-assets-prod/*",
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}`
  }
];

export const VALIDATION_PIPELINE: ValidationItem[] = [
  {
    id: 'tf-valid',
    target: 'Terraform Engine',
    category: 'IaC Syntax & Provider Graph',
    passed: true,
    message: 'Configuration is syntactically valid with 0 orphan references.',
    details: 'Provider constraints ~> 5.30 validated against HashiCorp registry.'
  },
  {
    id: 'k8s-valid',
    target: 'Kubernetes Spec',
    category: 'Schema & Security Standards',
    passed: true,
    message: 'Compliant with Kubernetes v1.29 baseline security profiles.',
    details: 'Disallows root privilege escalation, defines explicit memory limits.'
  },
  {
    id: 'docker-valid',
    target: 'Container Integrity',
    category: 'Multi-stage Dockerfiles',
    passed: true,
    message: 'Non-root user directive verified across all 3 workload containers.',
    details: 'Verified USER 10001 in auth-service and roadmap-service containers.'
  },
  {
    id: 'security-valid',
    target: 'IAM & Network Perimeter',
    category: 'Least-Privilege Evaluation',
    passed: true,
    message: '0 wildcard (*) actions detected on IAM policies.',
    details: 'Security groups restrict database port 5432 to ECS task security group only.'
  },
  {
    id: 'crossfile-valid',
    target: 'Cross-File Consistency',
    category: 'Symbol Reference Checking',
    passed: true,
    message: '100% of environment variables correspond to declared secret vaults.',
    details: 'Verified JWT_SECRET, DB_HOST, and AWS_REGION across all config files.'
  },
  {
    id: 'secrets-valid',
    target: 'Credential Leak Detection',
    category: 'Deterministic Scanner',
    passed: true,
    message: '0 hardcoded passwords, API keys, or private certificates committed.',
    details: 'The scan found no committed .env secrets.'
  },
  {
    id: 'arch-valid',
    target: 'Architecture Correspondence',
    category: 'Requirements Invariant Check',
    passed: true,
    message: 'Generated resources match exactly the approved Canonical Blueprint.',
    details: 'Dual-AZ Fargate + RDS matches the reviewed $104.32/mo budget.'
  }
];

export const BLOCKER_SCENARIOS: BlockerItem[] = [
  {
    id: 'runtime-command',
    title: 'Confirm production startup command for roadmap-service',
    category: 'runtime',
    severity: 'blocking',
    description: 'Pilot identified Java 21 Spring Boot but located two candidate startup scripts. Which entrypoint should be compiled into the container spec?',
    options: [
      'java -jar /app/roadmap-service.jar --spring.profiles.active=production',
      'java -XX:+UseG1GC -XX:MaxRAMPercentage=75.0 -jar /app/roadmap-service.jar',
      'mvn spring-boot:run -Pprod'
    ],
    resolved: false
  },
  {
    id: 'aws-region',
    title: 'Confirm primary AWS deployment region',
    category: 'config',
    severity: 'blocking',
    description: 'Business requirements specified low latency for North American users. Please confirm target region for resource provisioning.',
    options: [
      'us-east-1 (N. Virginia — Lowest pricing, max services)',
      'us-west-2 (Oregon — Alternative low carbon tier)',
      'eu-central-1 (Frankfurt — Strict EU GDPR compliance)'
    ],
    resolved: false
  }
];
