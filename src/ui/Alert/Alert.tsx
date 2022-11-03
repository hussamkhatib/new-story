import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// Only Error is required at the momemnt. Other severity levels are less likely to be used, implemented it later if needed.
function Alert(props: Props) {
  const { children } = props;
  return (
    <div className="p-4 flex flex-col items-center bg-red-100">
      <ExclamationCircleIcon className="w-10 h-10 text-red-700" aria-hidden />
      <div className="pt-2">{children}</div>
    </div>
  );
}
export default Alert;
