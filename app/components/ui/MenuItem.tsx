"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  variant?: "default" | "danger";
}

function MenuItem({
  onClick,
  label,
  icon,
  disabled = false,
  variant = "default",
}: MenuItemProps) {
  const variantStyles = {
    default:
      "text-gray-700 hover:bg-gray-50 focus:bg-gray-100",
    danger:
      "text-red-600 hover:bg-red-50 focus:bg-red-100",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full px-4 py-3 text-left text-sm font-medium
        flex items-center gap-3
        transition-all duration-150 ease-in-out
        ${variantStyles[variant]}
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer active:scale-[0.98]"
        }
        first:rounded-t-lg last:rounded-b-lg
        focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-inset
      `}
      role="menuitem"
      tabIndex={0}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="flex-1">{label}</span>
    </button>
  );
}

export default MenuItem;
