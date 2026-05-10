import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoaderIcon
        className="animate-spin size-10"
        style={{ color: "#B5004A" }}
      />
    </div>
  );
};

export default PageLoader;
