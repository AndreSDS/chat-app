export interface ButtonProps {
  label: string;
}

/** Primary UI component for user interaction */
export const Button = ({ label }: ButtonProps) => {
  return (
    <button className="px-5 py-5 bg-blue-800 text-white text-2xl">
      {label}
    </button>
  );
};
