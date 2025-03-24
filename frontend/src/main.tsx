import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteDetail from "./pages/NoteDetail.tsx";
import LayoutWithHeader from "./layouts/LayoutWithHeader.tsx";
import Notes from "./pages/Notes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/notes-app-nestjs">
      <Routes>
        <Route element={<LayoutWithHeader />}>
          <Route path="/" element={<Notes />} />
          <Route path="archived" element={<Notes isArchivedNotes={true} />} />
        </Route>

        <Route path="notes/:id" element={<NoteDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
