/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store.js";
import router from "../app/Router.js";

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    /*     test("Then I should be able to choose an expense from a list", () => {

      const html = NewBillUI()
      document.body.innerHTML = html
      const expenseList = screen.getByLabelText('Type de dépense').length
      expect(expenseList).toEqual(6)
    }) */
    test("Then the mail icon in vertical layout should be highlighted", async () => {
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

      const html = NewBillUI();
      document.body.innerHTML = html;

      await waitFor(() => screen.getByTestId("icon-window"));
      const mailIcon = screen.getByTestId("icon-mail");
      expect(mailIcon).toHaveClass("active-icon");
    });

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

    test("Then a user can fill up the form", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;

      //user can use the dropdown menu
      //expect(depenseType).toHaveValue('Transports');

      screen.getByTestId("expense-name").value = "Manual Test";
      expect(screen.getByTestId("expense-name")).toHaveValue("Manual Test");

      screen.getByTestId("amount").value = "10";
      expect(screen.getByTestId("amount")).toHaveValue(parseInt("10"));

      screen.getByTestId("datepicker").value = "01/01/2015";
      expect(screen.getByTestId("datepicker")).toHaveValue("01/01/2015");

      screen.getByTestId("vat").value = "01";
      expect(screen.getByTestId("vat")).toHaveValue(parseInt("01"));

      screen.getByTestId("pct").value = "15";
      expect(screen.getByTestId("pct")).toHaveValue(parseInt("15"));

      screen.getByTestId("commentary").value =
        "some text with Commentry and Numbers 10";
      expect(screen.getByTestId("commentary")).toHaveValue(
        "some text with Commentry and Numbers 10"
      );
    });
    test("Then user should only be able to upload a file in PNG,JPEG or JPG", () => {
      //click on the upload button
      //add a dummy file

      expect(screen.getByText("Envoyer")).toBeDisabled();
    });
    it.todo(
      "Should fill the form with mock data from a JSON file (fake API call)"
    );
  });
});
