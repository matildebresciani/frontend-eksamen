//varianter: primary (gennemsigtigt, rød border), CTA/secondary (rød knap), tertiary (grå)
//primary: til log-in og opret event i header
//CTA/secondary: bruges til log-in og opret eller bekræfte ting rundt på siden
//tertiary: til at gemme klade

//husk at lave en loading animation/tekst på knapperne

//ved brug af knap i forms skal type være "submit"

const Button = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  loading = false,
  loadingText,
}) => {
  const variants = {
    primary:
      "bg-transparent border-primary-red text-primary-red hover:bg-primary-red hover:text-white",
    CTA: "bg-primary-red border-primary-red text-white hover:bg-black hover:border-black hover:text-white",
    tertiary: "bg-white border-text-light hover:bg-text-light hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-2 px-4 py-2 w-fit font-medium rounded-xs ${variants[variant]}`}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;
