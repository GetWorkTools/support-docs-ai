"use client";

import { memo, useEffect } from "react";

export default memo(function () {
  useEffect(() => {
    window.location.href = "/home";
  });

  return null;
});
