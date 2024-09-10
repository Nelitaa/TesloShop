export const revalidate = 0;

import { getPaginatedOrders } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function UsersPage() {
  const { ok, orders = [] } = await getPaginatedOrders();
  if (!ok) {
    redirect('/auth/login');
  }
  return (
    <>
      <Title title="List of Users" />
      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}