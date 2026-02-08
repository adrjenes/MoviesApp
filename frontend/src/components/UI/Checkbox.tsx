export default function Checkbox(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      type="checkbox"
      className="
        h-4 w-4
        accent-[rgb(242,91,44)]
      "
    />
  );
}