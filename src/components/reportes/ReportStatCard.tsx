interface ReportStatCardProps {
  title: string;
  value: number;
  color: string;
}

export const ReportStatCard = ({ title, value, color }: ReportStatCardProps) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <p className={`text-xs font-bold tracking-wider ${color} mb-2`}>{title}</p>
    <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
  </div>
);