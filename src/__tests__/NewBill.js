/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store.js";
import router from "../app/Router.js";
import { ROUTES_PATH } from "../constants/routes.js";

jest.mock("../app/store", () => mockStore);

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then mail icon should be highlighted", async () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
      const root = document.createElement("div");
      root.setAttribute("id", "root");
      document.body.append(root);
      router();
      window.onNavigate(ROUTES_PATH.NewBill);
      await waitFor(() => screen.getByTestId("icon-mail"));
      const Icon = screen.getByTestId("icon-mail");
      expect(Icon).toHaveClass("active-icon");
    });
  });
});

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
      const root = document.createElement("div");
      root.setAttribute("id", "root");
      document.body.append(root);
      router();
    });

    test("Then I should be able to choose an expense from a list", () => {
      userEvent.selectOptions(screen.getByTestId("expense-type"), [
        screen.getByText("Services en ligne"),
      ]);
      expect(screen.getByTestId("expense-type").value).toMatch(
        "Services en ligne"
      );
    });

    test("Then a user can fill up the form", () => {
      userEvent.type(screen.getByTestId("expense-name"), "Manual Test");
      expect(screen.getByTestId("expense-name").value).toMatch("Manual Test");

      userEvent.type(screen.getByTestId("amount"), "10");
      expect(screen.getByTestId("amount").value).toMatch("10");

      //to debug
      userEvent.type(screen.getByTestId("datepicker"), "");
      expect(screen.getByTestId("datepicker").value).toMatch("");

      userEvent.type(screen.getByTestId("vat"), "01");
      expect(screen.getByTestId("vat").value).toMatch("01");

      userEvent.type(screen.getByTestId("pct"), "15");
      expect(screen.getByTestId("pct").value).toMatch("15");

      userEvent.type(
        screen.getByTestId("commentary"),
        "some text with Commentry and Numbers 10"
      );
      expect(screen.getByTestId("commentary").value).toMatch(
        "some text with Commentry and Numbers 10"
      );
    });

    test("Then user should be able to upload a file", () => {
      const mockBill = new NewBill({
        document,
        onNavigate,
        store: mockStore,
        localStorage: window.localStorage,
      });
      const handleChangeFile = jest.fn(mockBill.handleChangeFile);
      const input = screen.getByTestId("file");
      const filePng = new File(["test"], "test.png", { type: "image/png" });
      input.addEventListener("change", handleChangeFile);
      userEvent.upload(input, filePng);
      expect(handleChangeFile).toHaveBeenCalled();
    });

    test("When uploading an error should appear if the format is wrong and the submit button should be disabled", () => {
      const mockBill = new NewBill({
        document,
        onNavigate,
        store: mockStore,
        localStorage: window.localStorage,
      });
      const handleChangeFile = jest.fn(mockBill.handleChangeFile);
      const input = screen.getByTestId("file");
      input.addEventListener("change", handleChangeFile);
      fireEvent.change(input, {
        target: {
          files: [new File(["test"], "test.pdf", { type: "document/pdf" })],
        },
      });
      expect(handleChangeFile).toHaveBeenCalled();
      expect(screen.getByTestId("error")).toBeVisible();
      expect(screen.getByText("Envoyer")).toBeDisabled();
    });

    test("if correct the form should be submitted", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      userEvent.selectOptions(screen.getByTestId("expense-type"), [
        screen.getByText("Services en ligne"),
      ]);
      userEvent.type(screen.getByTestId("expense-name"), "Manual Test");
      userEvent.type(screen.getByTestId("amount"), "10");
      userEvent.type(screen.getByTestId("datepicker"), "2020-05-24");
      userEvent.type(screen.getByTestId("vat"), "01");
      userEvent.type(screen.getByTestId("pct"), "15");
      userEvent.type(
        screen.getByTestId("commentary"),
        "some text with Commentry and Numbers 10"
      );
      const filePng = new File(["test"], "test.png", { type: "image/png" });
      userEvent.upload(screen.getByTestId("file"), filePng);

      const handleSubmit = jest.fn(NewBill.handleSubmit);
      const button = screen.getByText("Envoyer");
      button.addEventListener("click", handleSubmit);
      userEvent.click(button);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Should fill the form with mock data from a JSON file (fake API call)", () => {
      jest.spyOn(mockStore, "bills");
      const mockBill = new NewBill({
        document,
        onNavigate,
        store: mockStore,
        localStorage: window.localStorage,
      });
      const handleSubmit = jest.fn(mockBill.handleSubmit);
      const form = screen.getByTestId("form-new-bill");
      form.addEventListener("submit", handleSubmit);
      fireEvent.submit(form);
      expect(mockStore.bills).toHaveBeenCalled();
    });
  });
});
