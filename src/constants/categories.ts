/* Copyright © 2025 HornsApp. All rights reserved. */

/**
 * Admin label: event looks showable but some data sounds wrong / doubtful.
 * Agent raises a hand after sync. Hidden from client feeds until you remove the tag.
 */
export const IN_REVIEW_CATEGORY_KEY = 'IN_REVIEW'

/**
 * Admin label (agent-managed): incomplete (venue/ticketing TBA) but has a calendar day —
 * shown to clients as Announced. Next sync fills data, drops tag → Confirmed.
 */
export const FOLLOW_UP_CATEGORY_KEY = 'FOLLOW_UP'

/** Category keys excluded from mobile list feeds (`/event`, `/concert`). */
export const CLIENT_HIDDEN_CATEGORY_KEYS = [IN_REVIEW_CATEGORY_KEY] as const

/**
 * Ops / workflow labels — not content genres. Skip when building home category
 * sections (so clients never get a “FOLLOW_UP” / “IN_REVIEW” row).
 */
export const OPS_CATEGORY_KEYS = [
    IN_REVIEW_CATEGORY_KEY,
    FOLLOW_UP_CATEGORY_KEY,
] as const
