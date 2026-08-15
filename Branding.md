# Sagani — Implementation Specification

> **Tagline:** With Sagani, makakasiguro ka sa iyong ani.
>
> **Hackathon constraint:** 2-hour AI-driven build
>
> **Core product:** Climate and water decision-support for farmers. Sagani converts weather, water, and crop information into predictive risk alerts and actionable recommendations.

---

## 1. Product Definition

### Problem

Farmers receive broad weather and climate information, but it does not directly answer the farm-level questions that matter:

- Should I plant now or wait?
- Should I irrigate today?
- Is a dry spell approaching?
- Is there enough water for the coming days?
- What should I do to reduce risk to my crop?

### Solution

Sagani combines:

1. Weather and climate data
2. Farm and crop information
3. Water availability
4. AI reasoning

to produce:

**Prediction → Risk → Recommendation → Action**

### MVP Goal

The MVP must demonstrate one complete loop:

> Farmer enters farm/crop information → Sagani analyzes current and forecast conditions → AI identifies a climate/water risk → Sagani provides an actionable recommendation.

The MVP should prioritize a convincing end-to-end experience over complex infrastructure.

---

# 2. Core Features

## 2.1 Early Risk Forecasts

**Purpose:** Predict upcoming climate and water risks before they affect the crop.

Display:

- Current weather
- Temperature
- Rainfall probability
- Rainfall forecast
- Dry-spell risk
- Heat risk
- Water availability
- Overall climate risk

Example:

```text
CLIMATE RISK

Moderate

Rain probability     18%
Dry-spell risk       High
Temperature          32°C
Water availability   62%

AI Recommendation

Delay planting by 5–7 days and conserve available
water until rainfall conditions improve.
```

The AI should explain the recommendation using the available evidence.

---

## 2.2 Farmer Crop Insights

**Purpose:** Translate climate information into crop-specific recommendations.

Example:

```text
CORN

Crop stage:
Vegetative

Current condition:
Healthy

Upcoming risk:
Dry spell in 4 days

AI Recommendation:
Increase water availability before the dry period
and monitor crop stress during the next observation.
```

Potential insights:

- Planting window
- Irrigation timing
- Heat stress
- Water stress
- Expected rainfall impact
- Crop-specific climate risk

---

## 2.3 Water Management

**Purpose:** Help farmers use available water efficiently.

Display:

```text
WATER MANAGEMENT

Reservoir
████████████░ 82%

Today's allocation
1,240 L

Recommended
1,050 L

Potential saving
190 L
```

Show irrigation zones:

```text
Zone A    Healthy
Zone B    Needs water
Zone C    Healthy
Zone D    Critical
```

Possible actions:

- Adjust irrigation
- View water allocation
- Prioritize irrigation zones
- View recommended water usage

For the hackathon, these controls may operate on simulated data.

---

# 3. AI Architecture

The AI should be used as a decision-support layer, not as an autonomous agricultural authority.

```text
Weather Data
     +
Water Data
     +
Farm Data
     +
Crop Data
     ↓
Feature Processing
     ↓
AI Risk Analysis
     ↓
Risk Classification
     ↓
Actionable Recommendation
```

The AI receives structured information rather than being asked to independently interpret arbitrary data.

Example input:

```json
{
  "crop": "corn",
  "growth_stage": "vegetative",
  "temperature": 32,
  "rain_probability": 18,
  "rainfall_anomaly": -24,
  "water_availability": 62,
  "soil_moisture": "low"
}
```

Example output:

```json
{
  "risk_level": "high",
  "risk_score": 84,
  "primary_risk": "water_stress",
  "confidence": 0.87,
  "recommendation": "Conserve available water and prioritize irrigation for the most vulnerable crop zones.",
  "evidence": [
    "Rainfall is below the expected level.",
    "Water availability is declining.",
    "Soil moisture is low."
  ]
}
```

### Important AI constraint

Never present the AI as guaranteeing crop outcomes.

Use language such as:

- "Potential risk"
- "Recommended action"
- "AI assessment"
- "Requires field validation"

Avoid:

- "Guaranteed prediction"
- "AI confirms the crop is diseased"
- "AI guarantees your harvest"

---

# 4. Recommended Technology Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

## Backend

- Next.js API routes / server actions
- Supabase
- PostgreSQL

## AI

Use an LLM API for:

- risk interpretation
- recommendation generation
- farmer-friendly explanations
- multilingual advisory text

## Weather

Use a weather API for:

- current conditions
- forecast
- rainfall probability
- temperature

For the 2-hour MVP, use one reliable weather provider rather than integrating multiple sources.

## Maps

Use Mapbox if farm location visualization is required.

---

# 5. Database

Keep the database intentionally small.

## `farms`

| Field | Type |
|---|---|
| id | UUID |
| name | text |
| crop | text |
| area_hectares | numeric |
| latitude | numeric |
| longitude | numeric |
| water_capacity | numeric |
| created_at | timestamp |

## `farm_observations`

| Field | Type |
|---|---|
| id | UUID |
| farm_id | UUID |
| observation_date | timestamp |
| temperature | numeric |
| rainfall | numeric |
| rainfall_anomaly | numeric |
| soil_moisture | numeric |
| water_level | numeric |

## `farm_assessments`

| Field | Type |
|---|---|
| id | UUID |
| farm_id | UUID |
| risk_level | text |
| risk_score | numeric |
| primary_risk | text |
| confidence | numeric |
| recommendation | text |
| evidence | jsonb |
| created_at | timestamp |

---

# 6. API

Keep the API surface minimal.

## Get Farm

```http
GET /api/farms/:id
```

Returns farm information and recent observations.

## Get Dashboard

```http
GET /api/dashboard
```

Returns:

- farm count
- risk distribution
- current conditions
- water status
- priority farms

## Generate Assessment

```http
POST /api/assessments
```

Example body:

```json
{
  "farmId": "farm-id"
}
```

Returns:

```json
{
  "riskLevel": "high",
  "riskScore": 84,
  "primaryRisk": "water_stress",
  "confidence": 0.87,
  "recommendation": "Prioritize irrigation for the affected zone.",
  "evidence": []
}
```

---

# 7. Data Strategy for the 2-Hour Hackathon

Do **not** attempt to build a complete satellite-processing pipeline during the event.

The MVP should use prepared or simplified environmental indicators.

Example:

```text
Farm 001
Crop: Corn
NDVI change: +4%
Rainfall anomaly: +8%
Water availability: 91%
Risk: Low

Farm 002
Crop: Corn
NDVI change: -22%
Rainfall anomaly: -19%
Water availability: 58%
Risk: Moderate

Farm 003
Crop: Corn
NDVI change: -31%
Rainfall anomaly: -27%
Water availability: 41%
Risk: High
```

This allows the product to demonstrate the intelligence workflow without spending the entire hackathon on data engineering.

The architecture should remain extensible so that real satellite-derived indicators can replace the demo data later.

---

# 8. Landing Page

The landing page should be **image-led, agricultural, modern, and trustworthy**.

Avoid making it look like a generic AI SaaS landing page.

## Section Order

1. Navbar
2. Hero
3. Problem
4. How Sagani Works
5. Core Features
6. Product Dashboard Preview
7. Farmer Insights
8. Why Sagani
9. Final CTA
10. Footer

---

# 9. Hero

Use a **full-width background agricultural image**.

Recommended imagery:

- Bukidnon farmland
- crop fields
- farmer working in a field
- mountain/farm landscape
- sunrise over agricultural land

Apply a subtle dark green gradient overlay for readability.

### Copy

> **Know what's coming. Protect what you grow.**

> Sagani turns weather, water, and crop data into timely insights—helping farmers make better decisions before climate risks affect their harvest.

> **With Sagani, makakasiguro ka sa iyong ani.**

Buttons:

- **Get Started**
- **See How It Works**

### Hero animation

Use Framer Motion:

- Background image: subtle scale from `1.05` to `1`
- Headline: fade + upward movement
- Description: staggered fade + upward movement
- CTA: delayed fade + upward movement

Keep the animation subtle.

---

# 10. Problem Section

Use another wide agricultural/environmental image as a banner.

Possible imagery:

- dry farmland
- farmer inspecting crops
- irrigation
- heavy rain
- drought conditions

Overlay three problems:

### Uncertain Weather

Broad forecasts do not always tell farmers what action to take.

### Limited Water

Water needs to be managed before shortages become emergencies.

### Reactive Decisions

By the time visible crop damage appears, the opportunity to prevent it may already be gone.

Closing statement:

> **Sagani turns climate information into farm-level action.**

---

# 11. How Sagani Works

Use a clean non-image section.

Show:

```text
DATA
  ↓
AI
  ↓
PREDICTION
  ↓
ACTION
```

Three or four steps:

### 01 — Monitor

Sagani gathers weather, water, and crop information.

### 02 — Predict

AI identifies upcoming climate and water risks.

### 03 — Understand

Sagani explains what the risk means for the crop.

### 04 — Act

Farmers receive a practical recommendation.

Use Framer Motion to reveal each step sequentially.

---

# 12. Feature Section

Use three image-led feature cards.

## Early Risk Forecasts

**Know the risk before it reaches your field.**

Use weather/rain imagery.

Show:

- rainfall probability
- drought risk
- heat risk
- water shortage
- planting window

## Crop Insights

**Know what your crop needs, when it needs it.**

Use farmer/crop imagery.

Show:

- crop condition
- crop stage
- climate risk
- upcoming stress
- AI recommendation

## Water Management

**Use every drop where it matters.**

Use irrigation/water imagery.

Show:

- reservoir level
- daily allocation
- recommended usage
- irrigation zones
- potential savings

---

# 13. Dashboard Preview

This is the main product showcase.

Do not use a background image here.

Display a realistic Sagani dashboard:

```text
SAGANI DASHBOARD

Today's Conditions
29°C
Partly Cloudy

Rain Probability
72%

Water Availability
78%

Crop Health
91%

Climate Risk
Moderate
```

Add an AI recommendation:

> **Rain is expected within the next 24 hours. Delay irrigation and conserve available water.**

The dashboard should be the strongest UI element on the landing page.

---

# 14. Farmer Insights

Use a **full-width farmer/crop image**.

Overlay a realistic farmer-facing advisory.

Example:

> 🌧️ **May malakas na ulan sa susunod na 24 oras.**

> Inirerekomenda ni Sagani na ipagpaliban muna ang pagdidilig upang makatipid sa tubig.

Then optionally show the English explanation:

> Heavy rainfall is expected within the next 24 hours. Sagani recommends delaying irrigation to conserve water.

This demonstrates that the system converts technical information into understandable advice.

---

# 15. Why Sagani

Use three principles.

### Predictive

> **Know the risk before it becomes a loss.**

### Farm-specific

> **Turn broad climate data into farm-level insights.**

### Actionable

> **Turn predictions into decisions.**

Supporting statement:

> **Data tells you what is happening. Sagani tells you what to do next.**

---

# 16. Final CTA

Use a **full-background harvest/farm image**.

Overlay:

> **Protect your next harvest.**

> Start making smarter decisions with Sagani.

Button:

**Get Started →**

Then:

> **With Sagani, makakasiguro ka sa iyong ani.**

---

# 17. Visual Design System

## Colors

### Primary

```text
Sagani Green    #1F6B45
Field Green     #3F8F5F
Rain Blue       #2878A8
Harvest Gold    #D9A441
Soil Dark       #17251E
Mist            #F3F7F4
Earth           #E6ECE7
```

### Semantic Colors

```text
Safe            #3E8E5B
Watch           #D9A441
Warning         #D47732
Critical        #C84B4B
Water           #2878A8
```

## Design Rules

- Light overall interface
- White cards on a soft `#F3F7F4` background
- Deep green for primary actions
- Blue reserved primarily for water/climate
- Gold reserved for harvest/highlight states
- Red/orange reserved for warnings
- Large photographic banners
- Rounded but not overly playful cards
- Strong typography hierarchy
- Generous whitespace
- Avoid excessive gradients
- Avoid excessive glassmorphism
- Avoid generic neon AI aesthetics

---

# 18. Image Direction

Images should communicate real agricultural context.

Prioritize:

1. Bukidnon landscapes
2. Philippine farmers
3. Corn/crops
4. Irrigation
5. Rain/weather
6. Harvest
7. Agricultural water management

Use images as **storytelling elements**, not decoration.

For background banners:

- Use high-resolution landscape images
- Apply a gradient overlay when text is placed over the image
- Maintain strong text contrast
- Prefer images with natural negative space for text placement

For feature cards:

- Use crop/farmer/water imagery
- Keep image treatment consistent
- Avoid mixing unrelated stock photography styles

---

# 19. Animation System

Use **Framer Motion**.

Animation philosophy:

> Premium, smooth, subtle, purposeful.

Do not make every element animate independently.

## Standard reveal

```text
Initial:
opacity: 0
y: 24

Animate:
opacity: 1
y: 0
```

Recommended duration:

```text
0.5s – 0.7s
```

Recommended easing:

```text
easeOut
```

## Staggered cards

```text
Card 1: 0ms
Card 2: 100ms
Card 3: 200ms
```

## Hero

```text
Background:
scale 1.05 → 1

Headline:
fade + y 24 → 0

Description:
fade + y 24 → 0

CTA:
fade + y 24 → 0
```

## Image hover

Use subtle effects:

```text
scale: 1 → 1.03
```

Avoid aggressive transformations.

## Reduced motion

Respect user accessibility preferences with Framer Motion's reduced-motion support.

---

# 20. Suggested Component Structure

```text
app/
├── page.tsx
├── layout.tsx
└── api/
    ├── dashboard/
    │   └── route.ts
    ├── farms/
    │   └── [id]/
    │       └── route.ts
    └── assessments/
        └── route.ts

components/
├── landing/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ProblemBanner.tsx
│   ├── HowItWorks.tsx
│   ├── FeatureSection.tsx
│   ├── DashboardPreview.tsx
│   ├── FarmerInsights.tsx
│   ├── WhySagani.tsx
│   ├── FinalCTA.tsx
│   └── Footer.tsx
│
├── dashboard/
│   ├── StatCard.tsx
│   ├── RiskCard.tsx
│   ├── WaterStatus.tsx
│   ├── CropInsight.tsx
│   └── Recommendation.tsx
│
└── ui/
    ├── Button.tsx
    ├── Card.tsx
    └── Badge.tsx

lib/
├── ai.ts
├── weather.ts
├── risk.ts
├── water.ts
└── supabase.ts

types/
└── sagani.ts
```

---

# 21. Two-Hour Execution Plan

## 0:00–0:15 — Foundation

- Create Next.js project
- Install Tailwind and Framer Motion
- Configure fonts
- Establish Sagani colors
- Create Supabase tables
- Seed demo data

## 0:15–0:45 — Core Product

Build:

- Dashboard
- Farm data
- Weather data
- Risk indicators
- Water status

## 0:45–1:10 — AI

Implement:

- AI assessment endpoint
- Risk classification
- Recommendation generation
- Evidence/explanation
- Farmer-friendly output

## 1:10–1:40 — Landing Page

Build:

- Hero
- Problem banner
- How it works
- Feature section
- Dashboard preview
- Farmer insights
- CTA

Use real image assets and Framer Motion throughout.

## 1:40–1:55 — Polish

- Responsive layout
- Animation tuning
- Loading states
- Error states
- Typography
- Image overlays
- Mobile checks

## 1:55–2:00 — Demo Preparation

Prepare one deterministic demo scenario:

> A corn farmer is approaching a dry period with declining water availability.

Demonstrate:

1. Current conditions
2. AI prediction
3. Risk explanation
4. Crop insight
5. Water recommendation
6. Action

---

# 22. Demo Scenario

Use one simple story instead of demonstrating every feature.

### Starting Situation

```text
Farmer:
Corn

Farm size:
1.5 hectares

Water availability:
58%

Forecast:
Low rainfall for the next 5 days

Temperature:
32°C

Soil moisture:
Low
```

### Sagani

```text
CLIMATE RISK
HIGH

Primary concern:
Water stress

Confidence:
87%
```

### AI Explanation

```text
Rainfall is expected to remain below normal
while soil moisture and available water are already
declining.

The crop may experience water stress during the
next several days.
```

### Recommendation

```text
RECOMMENDED ACTION

Prioritize irrigation for the most vulnerable zone
and conserve available water until rainfall improves.
```

### Farmer-facing version

```text
🌤️ Paunti-unting natutuyo ang lupa at mababa ang
inaasahang ulan sa susunod na limang araw.

💧 Inirerekomenda ni Sagani na unahin ang pagdidilig
sa pinaka-nangangailangang bahagi ng iyong taniman.
```

This gives the judges a complete story from **data → AI → decision → action**.

---

# 23. Scope Control

### Must Have

- [x] Sagani branding
- [x] Landing page
- [x] Framer Motion animations
- [x] Full-background image banners
- [x] Agricultural imagery
- [x] Weather information
- [x] Crop information
- [x] Water status
- [x] AI risk assessment
- [x] AI recommendation
- [x] Dashboard
- [x] One complete demo scenario

### Nice to Have

- [ ] Map
- [ ] Multiple farms
- [ ] Filipino/Cebuano advisory
- [ ] Irrigation controls
- [ ] Historical charts
- [ ] Notification system

### Do Not Build During the 2-Hour MVP

- [ ] Custom ML model training
- [ ] Real-time satellite image processing
- [ ] Sentinel-1/Sentinel-2 data fusion
- [ ] Automated field-boundary detection
- [ ] Full farmer authentication
- [ ] Payment system
- [ ] Full farm management system
- [ ] Production-grade agricultural prediction model

---

# 24. Product Positioning

Sagani should not be presented as:

> "An AI that predicts the weather."

It should be presented as:

> **"An AI-powered climate decision-support system that turns weather, water, and crop data into actions farmers can take before climate risks become losses."**

The core value proposition:

> **Data tells you what is happening. Sagani tells you what to do next.**

---

# 25. Hackathon Pitch

### One-liner

> **Sagani helps farmers act before climate risks become crop losses by turning weather, water, and crop data into actionable AI-powered insights.**

### Short pitch

> Farmers don't just need to know whether it will rain. They need to know what that forecast means for their crops, their water, and their next decision.
>
> Sagani combines climate, water, and crop information with AI to predict farm-level risks and translate them into practical recommendations.
>
> **With Sagani, makakasiguro ka sa iyong ani.**

---

# 26. Success Criteria

The MVP succeeds if a judge can understand the following within 30 seconds:

1. **Who:** Farmers
2. **Problem:** Climate uncertainty makes farm decisions difficult
3. **Solution:** Sagani predicts risks and provides actionable recommendations
4. **AI:** AI interprets multiple signals and explains the recommendation
5. **Value:** Earlier decisions can reduce water waste and protect crops
6. **Business:** The system can be offered to farmers, cooperatives, agribusinesses, and agricultural organizations

The demo should end with:

> **"We don't replace the farmer's decision. We give them a better moment to make it."**