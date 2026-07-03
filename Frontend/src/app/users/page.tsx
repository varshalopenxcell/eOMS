import { ShieldCheck } from 'lucide-react';
import { PagePlaceholder } from '@/components/ui/PagePlaceholder';

export default function UsersPage() {
  return (
    <PagePlaceholder
      title="Users & Roles"
      description="Invite teammates and manage role-based access controls."
      icon={ShieldCheck}
      emptyTitle="Invite your team"
      emptyDescription="Add teammates, assign granular roles, and enforce least-privilege access across every organization."
      actionLabel="Invite user"
    />
  );
}
