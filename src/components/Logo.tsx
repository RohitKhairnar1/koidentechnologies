/**
 * Koiden logo using the official supplied SVG icon
 * with the existing Koiden wordmark.
 */
export function Logo({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "light";
  className?: string;
}) {
  const isLight = variant === "light";

  const inkFill = isLight ? "#FFFFFF" : "#0B1B2B";
  const greenFill = isLight ? "#2FA079" : "#1E7A5E";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* Official Koiden logo */}
      <span className="flex h-8 w-8 flex-none items-center justify-center overflow-hidden">
        <img
          src="/images/icon.svg"
          alt=""
          className="h-8 w-8 object-contain"
          aria-hidden="true"
        />
      </span>

      {/* Existing Koiden wordmark — unchanged */}
      <span className="text-[20px] font-semibold lowercase tracking-tight">
        <span style={{ color: inkFill }}>koi</span>
        <span style={{ color: greenFill }}>den</span>
      </span>
    </span>
  );
}