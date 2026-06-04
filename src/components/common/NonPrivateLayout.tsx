import * as React from "react";
import { Navigate, Outlet } from "react-router";
import { Box, AppBar, Toolbar, Divider, Link } from "@mui/material";

import { useAuth } from "./AuthContext";
import retroImg from "../../assets/RetroLogo.png";

const NonPrivateLayout: React.FC = () => {
  const { token } = useAuth();
  return token ? (
    <Navigate to="/markets" replace />
  ) : (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="static"
        sx={{
          flexBasis: "64px",
          maxHeight: "64px",
          background:
            "radial-gradient(circle at bottom left, #fb8300 0%, #fb7300 50%, #040100 100%)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            background: `url(${retroImg}) left center / auto 100% no-repeat`,
          }}
        >
          <Link href="https://autom8.racingdata.net" color="#040100">
            AutoM8
          </Link>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ mx: 3, bgcolor: "#040100", width: 2 }}
          />
          <Link href="https://bvol.racingdata.net" color="#040100">
            Bvol
          </Link>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ mx: 3, bgcolor: "#040100", width: 2 }}
          />
          <Link href="https://racingdata.net" color="#040100">
            Data
          </Link>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ mx: 3, bgcolor: "#040100", width: 2 }}
          />
          <Link href="https://beep.racingdata.net" color="#040100">
            BEEP
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: "#e0e0e0",
          padding: 2,
          overflow: "auto",
          flexBasis: "calc(100vh - 64px)",
          maxHeight: "calc(100vh - 64px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default NonPrivateLayout;
