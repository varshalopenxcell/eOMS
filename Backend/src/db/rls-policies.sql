-- Enable row level security for tenant isolation

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;

-- Organizations can be read by any authenticated member of that organization
CREATE POLICY org_member_select ON organizations
  USING (EXISTS (
    SELECT 1
    FROM organization_memberships
    WHERE organization_memberships.organization_id = organizations.id
      AND organization_memberships.user_id = auth.uid()::text
  ));

CREATE POLICY org_member_insert ON organizations
  WITH CHECK (FALSE);

-- Users table can be accessed only via service role or specific user
CREATE POLICY user_self_select ON users
  USING (auth.uid()::text = id OR current_setting('request.jwt.claims.user_id', true) = id);

CREATE POLICY user_self_insert ON users
  WITH CHECK (auth.uid()::text = id);

-- Organization memberships enforcement
CREATE POLICY membership_select ON organization_memberships
  USING (user_id = auth.uid()::text);

CREATE POLICY membership_insert ON organization_memberships
  WITH CHECK (user_id = auth.uid()::text);

-- Plans are public data for the application
CREATE POLICY plans_select ON plans
  USING (true);

-- Subscriptions restricted to organization membership
CREATE POLICY subscriptions_select ON subscriptions
  USING (EXISTS (
    SELECT 1
    FROM organization_memberships
    WHERE organization_memberships.organization_id = subscriptions.organization_id
      AND organization_memberships.user_id = auth.uid()::text
  ));

CREATE POLICY subscriptions_insert ON subscriptions
  WITH CHECK (EXISTS (
    SELECT 1
    FROM organization_memberships
    WHERE organization_memberships.organization_id = subscriptions.organization_id
      AND organization_memberships.user_id = auth.uid()::text
  ));

-- Feature flags restricted to organization membership
CREATE POLICY feature_flags_select ON feature_flags
  USING (EXISTS (
    SELECT 1
    FROM organization_memberships
    WHERE organization_memberships.organization_id = feature_flags.organization_id
      AND organization_memberships.user_id = auth.uid()::text
  ));

CREATE POLICY feature_flags_insert ON feature_flags
  WITH CHECK (EXISTS (
    SELECT 1
    FROM organization_memberships
    WHERE organization_memberships.organization_id = feature_flags.organization_id
      AND organization_memberships.user_id = auth.uid()::text
  ));

-- Audit logs restricted to membership
CREATE POLICY audit_logs_select ON audit_logs
  USING (EXISTS (
    SELECT 1
    FROM organization_memberships
    WHERE organization_memberships.organization_id = audit_logs.organization_id
      AND organization_memberships.user_id = auth.uid()::text
  ));

CREATE POLICY audit_logs_insert ON audit_logs
  WITH CHECK (EXISTS (
    SELECT 1
    FROM organization_memberships
    WHERE organization_memberships.organization_id = audit_logs.organization_id
      AND organization_memberships.user_id = auth.uid()::text
  ));

-- Core entity policies
CREATE POLICY orders_select ON orders
  USING (EXISTS (
    SELECT 1
    FROM organization_memberships
    WHERE organization_memberships.organization_id = orders.organization_id
      AND organization_memberships.user_id = auth.uid()::text
  ));

CREATE POLICY customers_select ON customers
  USING (EXISTS (
    SELECT 1
    FROM organization_memberships
    WHERE organization_memberships.organization_id = customers.organization_id
      AND organization_memberships.user_id = auth.uid()::text
  ));

CREATE POLICY products_select ON products
  USING (EXISTS (
    SELECT 1
    FROM organization_memberships
    WHERE organization_memberships.organization_id = products.organization_id
      AND organization_memberships.user_id = auth.uid()::text
  ));

CREATE POLICY warehouses_select ON warehouses
  USING (EXISTS (
    SELECT 1
    FROM organization_memberships
    WHERE organization_memberships.organization_id = warehouses.organization_id
      AND organization_memberships.user_id = auth.uid()::text
  ));
