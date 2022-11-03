import { FC, useState } from "react";
import { Switch } from "@headlessui/react";

interface Props {
  isEnabledInitially?: boolean;
  Lable: string;
  action: (enabled: boolean) => void;
}
const MySwitch: FC<Props> = ({ isEnabledInitially, Lable, action }) => {
  const [enabled, setEnabled] = useState(isEnabledInitially || false);

  const handleOnChange = (checked: boolean) => {
    action(checked);
    setEnabled(checked);
  };
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="mr-4">{Lable}</Switch.Label>
        <Switch
          checked={enabled}
          onChange={handleOnChange}
          className={`${
            enabled ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

export default MySwitch;
