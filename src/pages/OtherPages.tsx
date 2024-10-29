import { useLocation } from "react-router-dom";

const OtherPages = () => {
  const location = useLocation();

  return (
    <div className="no-content">
      <h3>There is no content for {location.pathname.substring(1)}</h3>
    </div>
  );
};

export default OtherPages;
