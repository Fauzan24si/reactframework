import { createRoot } from "react-dom/client";
import "./tailwind.css";
import FrameworkListsearchFilter from "./FrameworkListSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";

createRoot(document.getElementById("root")).render(
  <div>
    <FrameworkListsearchFilter />
    <ResponsiveDesign />
  </div>
);