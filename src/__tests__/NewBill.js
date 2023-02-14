/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then I should be able to fill the form", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
    })
    it.todo('Should authorise the upload a file in PNG,JPEG or JPG')
    it.todo('Should permit the upload if the form is correct')
    it.todo('Should make a POST test')
  })
})


