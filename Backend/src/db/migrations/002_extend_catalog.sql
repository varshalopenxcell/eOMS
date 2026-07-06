-- Migration 002: extend customers/products/orders to match the app UI.
--
-- Run this ONCE in the Supabase SQL editor (Dashboard → SQL Editor → New query),
-- or via any tool with the database password. It only ADDS columns and is safe to
-- re-run (all statements are idempotent).

-- Customers: contact + CRM fields used by the customer forms/detail page.
alter table public.customers add column if not exists phone   text;
alter table public.customers add column if not exists company text;
alter table public.customers add column if not exists notes   text;

-- Products: pricing + description used by the catalog/product detail page.
alter table public.products add column if not exists price_cents integer not null default 0;
alter table public.products add column if not exists description text;

-- Orders: line items are stored inline as JSONB in the shape the UI uses:
--   [{ "id": "...", "name": "...", "quantity": 1, "priceCents": 0 }]
alter table public.orders add column if not exists items jsonb not null default '[]'::jsonb;
