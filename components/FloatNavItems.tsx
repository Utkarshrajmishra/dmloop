type FloatNavProps={
    icon:React.ReactElement,
    label:String,
    isActive:boolean,
}
const FloatNavItem = ({ icon, label, isActive }: FloatNavProps) => (
  <form action="/">
    <button
      type="submit"
      className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-colors duration-200 ${
        isActive
          ? "bg-neutral-900 text-white"
          : "text-neutral-400 hover:text-white hover:bg-neutral-900"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  </form>
);

export default FloatNavItem
