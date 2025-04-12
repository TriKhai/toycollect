import { JobProps } from "./JobProps";

export const Job: React.FC<JobProps> = ({ title, icon, bgClass }: JobProps) => {
  return (
    <div className={`${bgClass} p-4 flex flex-col items-center justify-center aspect-square rounded-lg`}>
        {icon}
      <p className="pt-2">{title}</p>
    </div>
  );
};
