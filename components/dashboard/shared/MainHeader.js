import Breadcrumb from "@/components/ui/Breadcrumbs";
import Title from "@/components/ui/Title";

export default function MainHeader({ title, children ,name}) {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row justify-between mb-2 gap-1">
      <div>
        <Breadcrumb customName = {name} />
        <Title>{title}</Title>
      </div>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}
