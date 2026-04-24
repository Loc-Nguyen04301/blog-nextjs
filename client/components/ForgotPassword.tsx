"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleClose();
        },
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle>{t("auth.resetPassword", "Đặt lại mật khẩu")}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          {t("auth.resetPasswordDesc", "Nhập địa chỉ email của tài khoản, chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.")}
        </DialogContentText>
        <OutlinedInput
          id="email"
          name="email"
          autoFocus
          required
          placeholder={t("auth.emailAddressPlaceholder", "Địa chỉ email")}
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>{t("auth.cancel", "Hủy")}</Button>
        <Button variant="contained" type="submit" sx={{ color: "white" }}>
          {t("auth.continue", "Tiếp tục")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
