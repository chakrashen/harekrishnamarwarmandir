---
name: booking-system
description: 'Build booking forms and backend flow in Next.js with Tailwind CSS, including validation, API submission, storage, WhatsApp confirmation, and success/error UX. Use for darshan booking, event booking, appointment booking, and reminder notifications.'
argument-hint: 'Describe booking type, data fields, storage target, and WhatsApp provider.'
user-invocable: true
---

# Booking System

## Outcome
Create a production-ready booking workflow with:
- Responsive Tailwind form UI
- Input validation for name, phone, and date
- Backend API logic with async/await and error handling
- Data persistence through API or database
- WhatsApp notification trigger after successful booking
- Clear success and failure states for users

## When To Use
Use this skill when you need:
- Darshan or temple visit slot booking
- Event registration with confirmations
- Reminder message automation through WhatsApp API
- Reusable booking components in Next.js App Router projects

## Required Inputs
Collect these before coding:
1. Booking type: darshan, event, seva, consultation, or general
2. Fields required: default is name, phone, date (plus optional notes)
3. Persistence target: database table or external API endpoint
4. WhatsApp provider details: API base URL, auth key/token, template format
5. Success behavior: inline message, redirect page, or modal confirmation

## Workflow
1. Build UI component
- Create a reusable booking form component with Tailwind.
- Include fields: name, phone, date.
- Add mobile-first spacing, labels, helper text, and submit button states.

2. Add client validation
- Validate required fields.
- Validate phone using configured rule (for India: 10 digits unless country code is required).
- Validate date is present and not invalid.
- Block submit if validation fails and show field-level errors.

3. Create API route
- Create Next.js App Router API route (for example: app/api/booking/route.js).
- Accept JSON payload with name, phone, date, and metadata.
- Re-validate all fields on server side.
- Return structured responses: success boolean, message, and optional booking id.

4. Persist booking data
- Store booking in selected target.
- Save created_at and status (for example: pending or confirmed).
- Use try/catch with clear error logging and safe user-facing errors.

5. Trigger WhatsApp notification
- Call external WhatsApp API after successful booking persistence.
- Use async/await and check response status.
- If WhatsApp fails, keep booking record and return partial success message.
- Log provider error details safely (no secret leakage).

6. Render success UI
- Show confirmation with booking reference when available.
- Offer next action: view events, book another, or contact support.
- Keep button disabled while request is in flight.

## Decision Logic
1. If WhatsApp is mandatory:
- Mark booking failed when messaging fails.
- Return retry action to user.

2. If WhatsApp is optional:
- Mark booking as confirmed even if messaging fails.
- Return confirmation plus "notification pending" note.

3. If direct DB access is not allowed from route:
- Forward to secure internal API/service layer.
- Normalize response before returning to UI.

## Quality Checks
1. Form works on mobile and desktop.
2. All fields have labels and accessible error text.
3. Client and server validations match.
4. API returns predictable JSON shape for success and error.
5. WhatsApp call is isolated in a helper for reuse/testing.
6. Sensitive keys are read from environment variables only.
7. Loading, success, and failure states are visible and non-blocking.

## Suggested Output Structure
1. Reusable form component in app route segment or components folder
2. API route for booking submission
3. WhatsApp helper module for provider integration
4. Optional success page or confirmation panel

## Example Prompts
- Build a darshan booking flow with name, phone, date, and WhatsApp confirmation.
- Create event booking with validation, Supabase storage, and GreenTick notification.
- Add a booking form that saves data and sends reminder messages via WhatsApp API.
