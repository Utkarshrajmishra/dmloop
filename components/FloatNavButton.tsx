type FloatNavButtonProps={
    size:String,
    isActive:boolean,
    onClick: ()=>void
}

const FloatNavButton = ({ size, isActive, onClick }: FloatNavButtonProps) => (
    <form action={onClick}>
  <button
    type="submit"
    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
      isActive
        ? "bg-neutral-700 text-white"
        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
    }`}
  >
    <span className="text-sm font-medium">{size}</span>
  </button>
  </form>
);

export default FloatNavButton
