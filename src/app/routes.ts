import { createBrowserRouter } from "react-router";
import { CityOverview } from "./pages/CityOverview";
import { QueuePage } from "./pages/QueuePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CityOverview,
  },
  {
    path: "/queue/:locationId",
    Component: QueuePage,
  },
]);