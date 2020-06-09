import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ResetPassword from "./ResetPassword";

describe("ResetPassword", () => {
  const mockCurrentPassword = "oldPassword9";
  const mockNewPassword = "newPassword10@";
  const mockNonMatchingNewPassword = "newPassword11&";

  it("should match the snapshot", () => {
    const { container } = render(<ResetPassword />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("the submit button should only be enabled when the form is valid", () => {
    render(<ResetPassword />);

    const currentPassword = screen.getByLabelText("Current Password");
    const newPassword = screen.getByLabelText("New Password");
    const retypePassword = screen.getByLabelText("Retype Password");
    const submitButton = screen.getByRole("button");

    expect(submitButton).toBeDisabled();

    fireEvent.change(currentPassword, {
      target: { value: mockCurrentPassword }
    });
    expect(currentPassword.value).toEqual(mockCurrentPassword);

    fireEvent.change(newPassword, {
      target: { value: mockNewPassword }
    });
    expect(newPassword.value).toEqual(mockNewPassword);

    fireEvent.change(retypePassword, {
      target: { value: mockNewPassword }
    });
    expect(retypePassword.value).toEqual(mockNewPassword);

    // Everything is valid, button should be enabled now.
    expect(submitButton).toBeEnabled();

    fireEvent.change(retypePassword, {
      target: { value: mockNonMatchingNewPassword }
    });
    expect(retypePassword.value).toEqual(mockNonMatchingNewPassword);

    // New passwords are no longer matching. Submit button should be disabled.
    expect(submitButton).toBeDisabled();
  });
});
