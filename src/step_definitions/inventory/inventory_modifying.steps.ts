import { Given, Then, When, world } from "@cucumber/cucumber";
import { ICustomWorld } from "../../utils/custom_world";
import { expect } from "@playwright/test";

let customWorld: ICustomWorld = world;

Given(
  "I log in to the inventory page with username {string} and password {string}",
  async function (username: string, password: string) {
    const page = customWorld.page;

    if (page) {
      await page.goto("/");
      await page.waitForLoadState("domcontentloaded");

      await page.getByPlaceholder("Username").fill(username);
      await page.getByPlaceholder("Password").fill(password);
      await page
        .getByRole("button", {
          name: "Login",
        })
        .click();
    }
  }
);

When('I add the first {int} items to the cart', async function (goods:number) {
  // When('I add the first {float} items to the cart', async function (float) {
    // Write code here that turns the phrase above into concrete actions
    const inventoryItems = customWorld?.page?.locator(
        'div[class="inventory_item"]'
      );
      expect(inventoryItems).not.toBeNull();
  
      const count = (await inventoryItems?.count()) ?? 0;
      for (let i = 0; i < goods; i++) {
        const currentItem = inventoryItems?.nth(i);
        const nextItem = inventoryItems?.nth(i + 1);
  
        expect(currentItem).not.toBeNull();
        await currentItem?.getByRole("button").click()
      }      
      
  });

  When('I remove {int} items from the cart, starting with the first item displayed', async function (goods:number) {
    // When('I remove {float} items from the cart, starting with the first item displayed', async function (float) {
      // Write code here that turns the phrase above into concrete actions
      const page = customWorld.page;

      if (page) {
          await page.locator('a[class=shopping_cart_link]').click();
      
  
      let inventoryItems = page?.locator('div.cart_list div.cart_item');
      
      const count = (await inventoryItems?.count()) ?? 0;
      console.log("--COUNT", count);
      console.log("good",goods)
      expect(count).toBeGreaterThanOrEqual(goods);
      for (let i = 0; i < goods; i++) {
          const currentItem = inventoryItems?.nth(0);
    
          expect(currentItem).not.toBeNull();
          const removeButton = await currentItem?.getByRole('button').click(); // Select the button inside the current item
      }
    }
  }

);
Then('I should see {int} items in the cart', async function (int) {
  // Then('I should see {float} items in the cart', async function (float) {
    // Write code here that turns the phrase above into concrete actions
    const page = customWorld.page;
    if (page) {
      const left = page.locator('span[data-test="shopping-cart-badge"]')
      const cartItemCount=await left.textContent()
      console.log("left",cartItemCount)
      expect(parseInt(cartItemCount ?? '0')).toBe(int);
    }
    // return 'pending';
  });


  Then('I should see a {string} button for the remaining items', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    // return 'pending';
    const page = customWorld.page;

    if (page) {
      const leftButton= page.locator(':text-is("Remove")');
      const cartItem=await leftButton.textContent()
      console.log("left buttonsssssssssssssss",cartItem) 
      expect(cartItem).toBe(string);
    }

    // return 'pending';
  });

    