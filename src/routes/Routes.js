import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/Spinner";
// import ErrorPage from "../pages/ErrorPage";

const StreamerList = lazy(() => import("../pages/StreamerList"));
const StreamerSubmissionForm = lazy(() =>
  import("../pages/StreamerSubmissionForm")
);

const MyRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <StreamerSubmissionForm />
            </Suspense>
          }
        />
        <Route
          path="streamer_list"
          element={
            <Suspense fallback={<Spinner />}>
              <StreamerList />
            </Suspense>
          }
        />
        {/* <Route
          path="*"
          element={
            <Suspense fallback={<Spinner />}>
              <ErrorPage />
            </Suspense>
          }
        /> */}
      </Routes>
    </div>
  );
};

export default MyRoutes;
