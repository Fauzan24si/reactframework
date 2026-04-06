import { createRoot } from "react-dom/client";
import "./tailwind.css";
import frameworkData from "./framework.json";
import FrameworkList from "./FrameworkList";
import FrameworkListsearchFilter from "./FrameworkListSearchFilter";

createRoot(document.getElementById("root")).render(
  <div>
    <FrameworkListsearchFilter />
  </div>
);