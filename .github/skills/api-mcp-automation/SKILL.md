---
name: api-mcp-automation
description: "Use API MCP to connect external APIs for workflow automation, especially WhatsApp notifications and booking automation. Use when building send-message routes, webhook integrations, booking confirmation pipelines, and API-driven operational tasks."
argument-hint: "Provide API provider, endpoint, auth method, payload format, and desired automation flow."
user-invocable: true
---

# API MCP Automation

## Outcome
Create API-powered automations with:
- Reliable API request and response handling
- WhatsApp message flows for confirmation and reminders
- Booking automation triggers and status updates
- Clear failure handling and retry strategy
- Secure secret management and traceable logs

## When To Use
Use this skill when you need:
- WhatsApp API calls after booking or donation
- Booking automation from form submission to confirmation
- Event reminders and broadcast notifications
- Third-party API integration via MCP-driven workflows

## Required Inputs
1. Provider: GreenTick, Meta WhatsApp API, or other API vendor
2. Trigger event: booking created, payment success, event reminder schedule
3. Payload: phone, template id, message variables, metadata
4. Auth model: API key, bearer token, signed webhook
5. Expected SLA: immediate send, delayed retry, queue-based delivery

## Workflow
1. Define automation flow
- Identify trigger point and required output action.
- Map sequence: create booking -> call API -> update status -> notify UI.
- Define fallback behavior for provider failure.

2. Create API integration contract
- Define request and response schema.
- Validate required fields before outbound API call.
- Keep provider-specific mapping isolated in helper layer.

3. Implement route and helper
- Add Next.js API route for trigger handling.
- Use async/await with structured try/catch blocks.
- Implement provider helper for sending WhatsApp requests.

4. Add booking automation logic
- On booking success, trigger confirmation message.
- Save messaging status (sent, failed, retrying).
- Trigger reminder workflows for upcoming events or visits.

5. Handle errors and retries
- Return user-safe errors while logging provider details securely.
- Retry transient failures with backoff.
- Avoid duplicate message sends via idempotency keys.

6. Secure and verify
- Store credentials only in environment variables.
- Validate webhook signatures when receiving callbacks.
- Verify end-to-end with test numbers and staging templates.

## Decision Logic
1. If API provider is unstable:
- Use queued retries and deferred delivery status updates.

2. If booking flow is mission critical:
- Confirm booking persistence first, then send message asynchronously.

3. If provider has strict rate limits:
- Batch non-urgent notifications and throttle sends.

## Quality Checks
1. API requests are validated before send.
2. Secrets never appear in logs or client responses.
3. Booking action is not lost if messaging fails.
4. Retry strategy prevents duplicate sends.
5. Status tracking is visible for operations.
6. User receives clear confirmation state in UI.

## Deliverables
1. API route and provider helper blueprint
2. Booking-to-message automation flow map
3. Error, retry, and idempotency strategy
4. Integration checklist for production rollout

## Example Prompts
- Use /api-mcp-automation to send WhatsApp confirmation after darshan booking.
- Use /api-mcp-automation to connect booking events to GreenTick API with retries.
- Use /api-mcp-automation to implement reminder automation for upcoming temple events.
