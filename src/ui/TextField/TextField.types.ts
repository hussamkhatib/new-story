export type TextFieldRef = HTMLInputElement;

export default interface Props {
  id: string;
  label: string;
  type?: string;
  fullWidth?: boolean;
  className?: string;
}
