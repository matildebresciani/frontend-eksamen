//varianter: primary (gennemsigtigt, rød border), CTA/secondary (rød knap), tertiary (grå)
//primary: til log-in og opret event i header
//CTA/secondary: bruges til log-in og opret eller bekræfte ting rundt på siden
//tertiary: til at gemme klade

//husk at lave en loading animation/tekst på knapperne

//ved brug af knap i forms skal type være "submit"
import { motion } from "motion/react";

const Button = ({
  children,
  variant = "transparent",
  onClick,
  type = "button",
  loading = false,
  loadingText,
}) => {
  const variants = {
    tertiary: "bg-white border-text-light hover:bg-text-light hover:text-white",
    transparent:
      "border-primary-red text-primary-red bg-[rgba(255,255,255,0.8)] hover:bg-[var(--color-primary-red-hover2)] hover:border-[var(--color-primary-red-hover2)] hover:text-white",
    transparent_w_icon:
      "flex items-center gap-2 border-primary-red text-primary-red hover:bg-[var(--color-primary-red-hover2)] hover:border-[var(--color-primary-red-hover2)] hover:text-white",
    CTA: "border-primary-red bg-primary-red text-white hover:bg-[var(--color-primary-red-hover2)] hover:border-[var(--color-primary-red-hover2)] hover:text-white",
    black:
      "flex justify-between items-center w-full font-medium text-white px-3 py-2 rounded-md bg-black border-2 text-left hover:bg-[var(--color-text-p)]",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`px-4 py-1 border-2 rounded font-medium text-md font-(family-name:--font-work-sans) ${variants[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => console.log("hover started!")}
    >
      {loading ? loadingText : children}
    </motion.button>
  );
};

export default Button;
