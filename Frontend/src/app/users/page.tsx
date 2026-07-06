import { ShieldCheck, Users, UserCheck, Clock, Plus } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';

const roleTone = {
  Owner: 'primary',
  Admin: 'info',
  Manager: 'warning',
  Member: 'neutral',
  Viewer: 'neutral'
} as const;

type Role = keyof typeof roleTone;

const users: { name: string; email: string; role: Role; status: 'Active' | 'Invited' | 'Suspended'; lastActive: string; initials: string }[] = [
  { name: 'John Doe', email: 'john@eoms.demo', role: 'Owner', status: 'Active', lastActive: 'Online now', initials: 'JD' },
  { name: 'Ava Thompson', email: 'ava.thompson@eoms.demo', role: 'Admin', status: 'Active', lastActive: '12 min ago', initials: 'AT' },
  { name: 'Marcus Chen', email: 'marcus.chen@eoms.demo', role: 'Manager', status: 'Active', lastActive: '2h ago', initials: 'MC' },
  { name: 'Priya Sharma', email: 'priya.sharma@eoms.demo', role: 'Member', status: 'Active', lastActive: 'Yesterday', initials: 'PS' },
  { name: 'Diego Alvarez', email: 'diego.alvarez@eoms.demo', role: 'Member', status: 'Invited', lastActive: 'Pending', initials: 'DA' },
  { name: 'Sarah Kim', email: 'sarah.kim@eoms.demo', role: 'Viewer', status: 'Suspended', lastActive: '3 weeks ago', initials: 'SK' }
];

const statusTone = {
  Active: 'success',
  Invited: 'warning',
  Suspended: 'danger'
} as const;

export default function UsersPage() {
  return (
    <Shell
      title="Users & Roles"
      description="Invite teammates and manage role-based access controls."
      toolbar={
        <Button size="md">
          <Plus className="h-4 w-4" />
          Invite user
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard icon={Users} label="Total users" value="24" delta="+3" hint="this month" tone="brand" />
        <StatCard icon={UserCheck} label="Active" value="21" hint="87.5%" tone="success" />
        <StatCard icon={Clock} label="Pending invites" value="2" hint="awaiting acceptance" tone="warning" />
        <StatCard icon={ShieldCheck} label="Roles configured" value="5" hint="with permissions" tone="info" />
      </div>

      <Card>
        <CardHeader>
          <div>
            <h2 className="text-base font-semibold text-fg">Team members</h2>
            <p className="mt-0.5 text-xs text-subtle">Role-based access across the organization</p>
          </div>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                  <th className="pb-3 pr-4">User</th>
                  <th className="pb-3 pr-4">Role</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Last active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {users.map((u) => (
                  <tr key={u.email}>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                          {u.initials}
                        </span>
                        <div>
                          <p className="font-medium text-fg">{u.name}</p>
                          <p className="text-xs text-faint">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge tone={roleTone[u.role]}>{u.role}</Badge>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge tone={statusTone[u.status]} dot>
                        {u.status}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-subtle">{u.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </Shell>
  );
}
