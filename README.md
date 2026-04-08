# Alamo Square House — License Agreement

A web application for the Alamo Square House co-living space in San Francisco. Residents can review and electronically sign the license agreement online.

## Product Requirements

### Overview

Alamo Square House is a premium co-living space for founders and builders in the Alamo Square neighborhood of San Francisco. This application provides a digital license agreement that residents can read, agree to, and sign electronically — replacing the need for paper agreements.

### Core Features

#### 1. License Agreement Display
- Full license agreement rendered from Markdown
- Scrollable container for reading the complete document
- Dark-themed UI matching the property brand
- Sections covering: grant of license, furnished items, house rules, bedroom rules, coworking space rules, payment methods, and more

#### 2. Electronic Signing Form
Residents complete the following fields to sign:
- **Full Name** — legal name for the agreement
- **Email Address** — primary contact
- **Phone Number** — secondary contact
- **Monthly License Fee** — selectable: $2,500/mo, $3,000/mo, or a custom amount
- **Agreement Checkbox** — explicit acknowledgment that this is a license (not a lease) and does not create a landlord-tenant relationship

#### 3. Data Storage & Audit Trail
All signed agreements are stored in Supabase with:
- Name, email, phone, monthly amount
- Agreement version (for tracking changes to terms)
- IP address and user agent (audit trail)
- Timestamp of signing

### License Agreement Scope

**Included Benefits:**
- Furnished private bedroom (bed, desk, closet/dresser, lighting, sheets, down comforter, memory foam pillows)
- High-speed internet (1 Gbps fiber backhaul + WiFi 7)
- On-site coworking space access
- Shared common areas, kitchen, and laundry
- Weekly or bi-weekly cleaning service
- Coffee, toilet paper, and cleaning supplies
- Startup consulting and advisory services
- Community events and programming
- Outdoor backyard space
- Garage and street parking (first-come, first-served)
- Right to report maintenance and roommate issues

**Resident Restrictions:**
- No outside furniture (beds, desks, chairs, couches)
- Permitted personal items: monitors, lights, file cabinet, safe, bathroom items
- Bedroom: do not remove mattress/pillow protectors; space heaters discouraged
- Coworking: shoes off, clean up, clear desks, no parties, 10-person group limit (except Sundays)

**Accepted Payment Methods:**
- USDC (cryptocurrency)
- Venmo
- Cash App
- Stripe

### Technical Architecture

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Backend | Server Actions (React 19 `useActionState`) |
| Database | Supabase (PostgreSQL + Row Level Security) |
| Markdown | react-markdown + remark-gfm |
| Hosting | Vercel |

### Key Files

```
src/
  app/
    license/
      page.tsx        # Server component — reads markdown, renders page
      actions.ts       # Server action — validates form, inserts to Supabase
    page.tsx           # Root redirect to /license
  components/
    LicenseContent.tsx # Markdown renderer (client component)
    LicenseSignForm.tsx # Signing form with useActionState (client component)
  lib/
    supabase.ts        # Supabase client factory
public/
  license-agreement.md # The full license agreement text
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public API key |

### Database Schema

**Table: `license_agreements`**

| Column | Type | Description |
|--------|------|-------------|
| `id` | bigint (identity) | Primary key |
| `created_at` | timestamptz | Auto-set on insert |
| `name` | text | Resident's full name |
| `email` | text | Email address |
| `phone` | text | Phone number |
| `monthly_amount` | integer | Monthly fee in USD |
| `agreement_version` | text | Version of the agreement signed (default: "1.0") |
| `ip_address` | text | Signing IP for audit |
| `user_agent` | text | Browser user agent for audit |

Row Level Security: insert-only for anonymous users (no read/update/delete).

### Future Considerations

- PDF generation of the signed agreement for download
- Email confirmation sent to the resident upon signing
- Admin dashboard to view all signed agreements
- Digital payment integration (Stripe checkout, USDC wallet connect)
- Maintenance and roommate issue reporting portal
