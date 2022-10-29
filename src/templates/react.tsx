import { ComponentMeta } from "@storybook/react";
import COMPONENT_NAME from ".";

export default {
  title: "COMPONENT_NAME",
  component: COMPONENT_NAME,
} as ComponentMeta<typeof COMPONENT_NAME>;

export const Default = () => <COMPONENT_NAME />;
