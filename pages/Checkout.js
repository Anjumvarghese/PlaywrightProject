class Checkout{
    constructor(page){
        this.page=page;
        this.name=page.locator("#name");
        this.country=page.locator("#country");
        this.city=page.locator("#city");
        this.creditcard=page.locator("#card");
        this.month=page.locator("#month");
        this.year=page.locator("#year");
        this.placeOrderBtn = page.getByRole('button', {name:'Place Order'});
        this.purchaseBtn = page.getByRole('button', {name:'Purchase'});
    }
    async purchaseProduct(name,country,city,creditcard,month,year){
        await this.placeOrderBtn.click()
        await this.page.locator('#orderModal').waitFor({state:'visible'});
        await this.name.fill(name);
        await this.country.fill(country);
        await this.city.fill(city);
        await this.creditcard.fill(creditcard);
        await this.month.fill(month);
        await this.year.fill(year);
        await this.purchaseBtn.click();

    }
}
module.exports= Checkout;