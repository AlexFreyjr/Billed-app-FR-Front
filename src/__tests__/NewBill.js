/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store.js";
import router from "../app/Router.js";

jest.mock("../app/store", () => mockStore);

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then input should be there", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      expect(screen.getByTestId("expense-type")).toBeTruthy();
      expect(screen.getByTestId("amount")).toBeTruthy();
      expect(screen.getByTestId("datepicker")).toBeTruthy();
      expect(screen.getByTestId("vat")).toBeTruthy();
      expect(screen.getByTestId("pct")).toBeTruthy();
      expect(screen.getByTestId("commentary")).toBeTruthy();
    });
  });
});

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then I should be able to choose an expense from a list", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      userEvent.selectOptions(screen.getByTestId("expense-type"), [
        screen.getByText("Services en ligne"),
      ]);
      expect(screen.getByTestId("expense-type").value).toMatch(
        "Services en ligne"
      );
    });

    test("Then a user can fill up the form", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;

      userEvent.type(screen.getByTestId("expense-name"), "Manual Test");
      expect(screen.getByTestId("expense-name").value).toMatch("Manual Test");

      userEvent.type(screen.getByTestId("amount"), "10");
      expect(screen.getByTestId("amount").value).toMatch("10");

      userEvent.type(screen.getByTestId("datepicker"), "01012015");
      expect(screen.getByTestId("datepicker").value).toMatch("01/01/2015");

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
      const filePng = new File(["test"], "test.png", { type: "image/png" });
      userEvent.upload(screen.getByTestId("file"), filePng);
      expect(screen.getByText("Envoyer")).toBeEnabled();
    });

    test("An error should appear if the format is wrong", () => {
      const filePdf = new File(["test"], "test.pdf", { type: "document/pdf" });
      userEvent.upload(screen.getByTestId("file"), filePdf);
      expect(screen.getByTestId("error")).toBeVisible();
    });

    test("the form should be submitted", () => {
      const newBill = new NewBill();
      expect(newBill).not.toThrow("error");
    });
    it.todo("then a new line should appear in the bill page");
  });
});

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    it.todo(
      "Should fill the form with mock data from a JSON file (fake API call)"
      //use store to get the data
      //add value to the matching input
      //check file
      //submit
    );
    //mail icon test case (does not depend on Newbill page)
    /*     test("Then the mail icon in vertical layout should be highlighted", async () => {
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
      window.onNavigate(ROUTES_PATH.Bills);

      await waitFor(() => screen.getByTestId("icon-mail"));
      const mailIcon = screen.getByTestId("icon-mail");
      expect(mailIcon).toHaveClass("active-icon");
    }); */
  });
});
