import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner, Loader, CategoryCard } from "../../../components";
import { getVideoCategories } from "../videos/videoSlice";

const Home = () => {
  const { categories, isLoading } = useSelector((store) => store.video);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoCategories());
  }, [dispatch]);
  return (
    <div>
      <Banner />
      <h2 className="padding-sm">Categories</h2>
      <div className="flex-center padding-sm category-card">
        {isLoading ? (
          <Loader />
        ) : (
          categories.map((l) => (
            <CategoryCard
              key={l.categoryName}
              image={l.image}
              title={l.categoryName}
            />
          ))
        )}
      </div>
    </div>
  );
};
export { Home };
