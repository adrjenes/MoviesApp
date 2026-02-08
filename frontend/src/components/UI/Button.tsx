export default function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="
        flex items-center justify-center
        px-2 h-[36px]
        rounded-[5px]
        bg-[rgb(242,91,44)]
        border border-[rgb(242,91,44)]
        text-white text-[13px] font-bold 
        transition-colors duration-200
        hover:bg-[rgb(33,29,84)]
        hover:border-[rgb(242,91,44)]
      "
    />
  );
}