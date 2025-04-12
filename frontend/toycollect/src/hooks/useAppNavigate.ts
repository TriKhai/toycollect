// src/hooks/useCustomNavigate.ts
import { useNavigate } from "react-router-dom";

let globalNavigate: ReturnType<typeof useNavigate>;

export const setGlobalNavigate = (navigate: ReturnType<typeof useNavigate>) => {
  globalNavigate = navigate;
};

export const navigate = (path: string) => {
  if (globalNavigate) {
    globalNavigate(path);
  } else {
    console.error("Navigate chưa được khởi tạo!");
  }
};
