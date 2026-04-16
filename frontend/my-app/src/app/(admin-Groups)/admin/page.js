import DashboardCards from "@/components/admin/DashboardCards";
import {
  FiDollarSign,
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Balance",
      value: "$54,321.65",
      icon: FiDollarSign,
    },
    {
      title: "Total Invoices",
      value: "520",
      icon: FiFileText,
    },
    {
      title: "Paid Invoices",
      value: "210",
      icon: FiCheckCircle,
    },
    {
      title: "Unpaid Invoices",
      value: "65",
      icon: FiAlertCircle,
    },
  ];

  return (
    <div>
      <DashboardCards stats={stats} />
    </div>
  );
}



