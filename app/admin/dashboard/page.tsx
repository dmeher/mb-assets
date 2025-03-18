import { Link } from "@heroui/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col justify-start items-center h-screen px-6">
      <div>Admin Dashboard!</div>
      <div>
        <Link href="/admin/products">Product Catalog</Link>
      </div>
    </div>
  );
}
