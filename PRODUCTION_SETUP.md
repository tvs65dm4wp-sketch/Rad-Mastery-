# Rad Mastery — The 1% · V12 Release Candidate

## Connected services

- Netlify project: `superb-bublanina-aec11b`
- Supabase: connected for Auth, database, progress, single-session tracking, forum, and private Notes Help storage.
- Stripe: connected in **sandbox/test mode** with $11.99/month and $59.99 lifetime products/payment links.
- Netlify Forms: enabled.

## Owner preview

Deploy this build, then open `/test-access.html`. Enter the owner code provided separately in ChatGPT. The code is verified by a Netlify Function and is not stored in the website source.

## Payments

The browser sends authenticated users to Stripe-hosted Checkout. The link includes the signed-in Supabase user ID as `client_reference_id` and prefills the account email. Stripe sends payment/subscription events to `/api/stripe-webhook`. The webhook signature is verified, then a token-protected Supabase RPC updates the user's entitlement.

Sandbox webhook and required Netlify function environment variables are already configured for the connected Netlify project.

### Before accepting real money

Do **not** simply change `STRIPE_MODE` to live. Create live Stripe products/payment links and a live webhook endpoint, then replace the two browser payment links and the webhook signing secret in Netlify. Run one low-risk live purchase test before launch.

## Access control

`dashboard.html` starts in a blocked state. Access is granted only when either:

1. the protected owner preview has been unlocked in that browser, or
2. the user is signed in and Supabase reports an active `monthly`, `lifetime`, or `owner` entitlement.

Supabase tracks one active session token per user. A newer login replaces the previous active session, and the older browser is signed out when it next checks.

## Community / Notes Help

Notes Help accepts JPG, PNG, WEBP, and PDF up to 10 MB. The bucket is private. The UI requires a no-PHI confirmation, and database/storage RLS is enabled.

## Media

Six core lessons include H.264 video, AAC narration audio, English VTT captions, narration transcripts, and real/technical visuals. X-ray tube/production, kVp/mAs, and ALARA also include simplified teaching diagrams/animations.

## Final launch checklist

1. Upload this V12 folder to the existing Netlify project.
2. Open `/test-access.html` and test every dashboard section in Owner Preview.
3. Test a fresh Supabase sign-up, confirmation, sign-in, and second-device login replacement.
4. Exit Owner Preview and test both Stripe sandbox checkout options using Stripe test payment details.
5. Confirm the paid test account receives premium entitlement after checkout.
6. Test Notes Help image/PDF upload with a non-clinical sample.
7. Test forum post, reply, Helpful, Save, Solved, and Report.
8. Test on iPhone and desktop.
9. Only after all checks pass, configure Stripe live-mode products/webhook.
