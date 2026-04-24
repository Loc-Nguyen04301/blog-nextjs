"use client";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider, FormControl, FormLabel, Stack, styled } from "@mui/material";
import MuiCard from "@mui/material/Card";
import { SitemarkIcon } from "@/assets/icons/SiteMarkIcon";
import ForgotPassword from "@/components/ForgotPassword";
import FacebookColorIcon from "@/assets/icons/FacebookColorIcon";
import { GoogleColorIcon } from "@/assets/icons/GoogleColorIcon";
import AuthService from "@/services/AuthService";
import { useAlertStore } from "@/zustand/stores/alert-store";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/utils/authTokens";
import { useTranslation } from "react-i18next";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const SignInComponent = () => {
  const { addError } = useAlertStore((state) => state);
  const router = useRouter();
  const { t } = useTranslation();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ✅ luôn đặt ở đầu

    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);

    try {
      await AuthService.login({
        email: data.get("email") as string,
        password: data.get("password") as string,
      });

      // ✅ redirect sang sign-in
      router.push("/");
    } catch (error: any) {
      console.log({ error });
      addError(error.response.data.message);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage(t("auth.emailError", "Vui lòng nhập email hợp lệ."));
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(t("auth.passwordError", "Mật khẩu phải có ít nhất 6 ký tự."));
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      router.replace("/"); // redirect về home
    }
  }, [router]);

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <SitemarkIcon />
        <Typography component="h1" variant="h4" sx={{ width: "100%" }}>
          {t("auth.signIn", "Đăng nhập")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email" sx={{ fontSize: 14 }}>
              {t("auth.email", "Email")}
            </FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder={t("auth.emailPlaceholder", "your@email.com")}
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password" sx={{ fontSize: 14 }}>
              {t("auth.password", "Mật khẩu")}
            </FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              id="password"
              type="password"
              name="password"
              placeholder="••••••"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "success" : "primary"}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t("auth.rememberMe", "Ghi nhớ đăng nhập")}
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
            color="primary"
            sx={{
              color: "white",
              textTransform: "unset",
            }}
          >
            {t("auth.signIn", "Đăng nhập")}
          </Button>
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            {t("auth.forgotPassword", "Quên mật khẩu?")}
          </Link>
        </Box>
        <Divider>{t("auth.or", "hoặc")}</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Google")}
            startIcon={<GoogleColorIcon />}
            sx={{
              color: "black",
            }}
          >
            {t("auth.signInWithGoogle", "Đăng nhập với Google")}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Facebook")}
            startIcon={<FacebookColorIcon />}
            sx={{
              color: "black",
            }}
          >
            {t("auth.signInWithFacebook", "Đăng nhập với Facebook")}
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            {t("auth.noAccount", "Chưa có tài khoản?")}
            <Link
              href="/sign-up"
              variant="body2"
              sx={{ alignSelf: "center", ml: 1 }}
            >
              {t("auth.signUp", "Đăng ký")}
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  );
};

export default SignInComponent;
