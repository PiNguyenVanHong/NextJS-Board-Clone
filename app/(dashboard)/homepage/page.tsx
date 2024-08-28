"use client";

import { useOrganization } from "@clerk/nextjs";

import { BoardList } from "@/components/board-list";
import { EmptyOrg } from "@/components/empty/empty-org";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  }
}

const DashboardPage = ({
  searchParams,
}: DashboardPageProps) => {
  const { organization } = useOrganization();

  return ( 
    <div className="flex-1 h-[calc(100%_-_80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={searchParams}
        />
      )}
    </div>
   );
}
 
export default DashboardPage;