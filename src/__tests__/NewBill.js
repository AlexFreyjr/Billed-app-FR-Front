/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
/*     test("Then I should be able to choose an expense from a list", () => {

      const html = NewBillUI()
      document.body.innerHTML = html
      const expenseList = screen.getByLabelText('Type de dépense').length
      expect(expenseList).toEqual(6)
    }) 
    test("Then the mail icon in vertical layout should be highlighted", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const mailIcon = screen.getByTestId('icon-mail')
      expect(mailIcon).toHaveClass("active-icon")
    })*/
    test("Then I should be able to input data", () => {
  
        const html = NewBillUI()
        document.body.innerHTML = html
        expect(screen.getByTestId('expense-type')).toBeTruthy()
        expect(screen.getByTestId('amount')).toBeTruthy()
        expect(screen.getByTestId('datepicker')).toBeTruthy()
        expect(screen.getByTestId('vat')).toBeTruthy()
        expect(screen.getByTestId('pct')).toBeTruthy()
        expect(screen.getByTestId('commentary')).toBeTruthy()
      })

    it.todo('Should emulate a user using the form')
    it.todo('Should fill the form with mock data from a JSON file (fake API call)')
    it.todo('Should test if the newbill icon is highlighted')
    it.todo('Should authorise the upload a file in PNG,JPEG or JPG')
  })
})


