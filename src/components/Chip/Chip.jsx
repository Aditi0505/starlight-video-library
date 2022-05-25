const Chip = ({ category, matchCategory, handleClick }) => {
  return (
    <div
      onClick={() => handleClick(category)}
      className={
        category === matchCategory
          ? "chip-selected text-center ft-bolder"
          : category === "All" && !matchCategory
          ? "chip-selected text-center ft-bolder"
          : "chip text-center ft-bolder"
      }
    >
      <span>{category}</span>
    </div>
  );
};
export { Chip };
