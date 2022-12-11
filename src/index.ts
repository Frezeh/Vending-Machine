type ReduceReturnType = Record<string, number>;

type arguments = {
  name: string;
  quantity: number;
  price: number;
  slot: string;
};

class VendingMachine {
  coins: number[];
  product: {
    [key: string]: arguments[];
  };

  constructor() {
    this.coins = [
      0.05, 0.05, 0.1, 0.1, 0.25, 0.25, 0.5, 0.5, 1, 1, 2, 2, 5, 5, 10, 10, 20,
      20, 50, 50, 100, 100,
    ];
    this.product = {
      A1: [
        {
          slot: "A1",
          name: "Cookies",
          quantity: 10,
          price: 1,
        },
      ],
      A2: [
        {
          slot: "A2",
          name: "Candy",
          quantity: 10,
          price: 5,
        },
      ],
      A3: [
        {
          slot: "A3",
          name: "Chips",
          quantity: 10,
          price: 0.5,
        },
      ],
      A4: [
        {
          slot: "A4",
          name: "Pepsi",
          quantity: 10,
          price: 0.50,
        },
      ],
      A5: [
        {
          slot: "A5",
          name: "Milk",
          quantity: 10,
          price: 10,
        },
      ],
      A6: [
        {
          slot: "A5",
          name: "Cocacola",
          quantity: 10,
          price: 0.25,
        },
      ],
    };
  }

  adjustPrice(productSlot: string, price: number) {
    //set the price for a product slot
    this.product[productSlot].forEach((product) => {
      product.price = price;
    });

    return this.product[productSlot];
  }

  adjustQuantity(productSlot: string, quantity: number) {
    //adjust the number of items available for a product slot
    this.product[productSlot].forEach((product) => {
      product.quantity = quantity;
    });

    return this.product[productSlot];
  }

  totalAmount(amount: number[] = []) {
    const output = amount.reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    return output;
  }

  totalCoins() {
    //get the amount of change currently in the machine for each type of coin
    const output = this.coins.reduce<ReduceReturnType>((acc, cur) => {
      if (!acc[cur]) acc[cur] = 1;
      else acc[cur]++;

      return acc;
    }, {});

    return { coinType: output, totalAmount: this.totalAmount(this.coins) };
  }

  validateCoinType(money: number[]) {
    let result = money.every(
      (coin) =>
        coin === 0.05 ||
        coin === 0.1 ||
        coin === 0.25 ||
        coin === 0.5 ||
        coin === 1 ||
        coin === 2 ||
        coin === 5 ||
        coin === 10 ||
        coin === 20 ||
        coin === 50 ||
        coin === 100
    );

    return result;
  }

  countProducts() {
    const product = Object.keys(this.product);

    let totalItemCount = 0;

    const count = product.reduce<ReduceReturnType>((acc, cur) => {
      let items = this.product[cur][0];

      if (items) totalItemCount += items.quantity;
      acc[cur] = items.quantity;

      return acc;
    }, {});

    return {
      totalItemCount,
      individualItemCount: count,
    };
  }

  addChange(amount: number[] = []) {
    let result;

    //validate coin type
    if (this.validateCoinType(amount)) {
      let total = [...this.coins, ...amount];
      this.coins = total;
      result = this.coins;
    } else {
      result = "Invalid coin type";
    }

    return result;
  }

  giveChange(remainingChange: number, userChange: number[], changeIndex: number[]): unknown {
    //changeIndex is used to store the index of the change so they can be eventually debited from the machine
    //userChange is used to store the user change

    //if change is 0
    if (remainingChange == 0) return [];

    if (this.coins.includes(remainingChange)) {
      changeIndex.push(this.coins.indexOf(remainingChange));
      userChange.push(remainingChange);

      //if change calculation is complete debit change from machine
      if (remainingChange === Math.min(...userChange)) {
        this.coins = this.coins.filter((value, i) => !changeIndex.includes(i))
      }
      return { status: "Successful", userChange };
    }

    for (let index = 0; index < this.coins.length; index++) {
      if (this.coins[index] < remainingChange) {
        userChange.push(this.coins[index]);
        changeIndex.push(this.coins.indexOf(this.coins[index]));
        
        return this.giveChange(remainingChange - this.coins[index], userChange, changeIndex);
      }
    }
  }

  purchase(slot: string, money: number[]) {
    let result;

    const product = Object.keys(this.product);

    //validate coin type
    if (this.validateCoinType(money)) {
      //add user coins to coins in the machine
      let total = [...this.coins, ...money];
      this.coins = total.sort((a, b) => b - a);

      product.forEach((item) => {
        const individualProduct = this.product[item][0];

        //sell if user has enough money, and it is possible for the the machine to give exact change
        if (
          individualProduct?.slot === slot &&
          this.totalAmount(money) >= individualProduct.price &&
          this.totalAmount(this.coins) >= this.totalAmount(money)
        ) {
          // sell if product is available
          if (individualProduct.quantity > 0) {
            //update product quantity
            individualProduct.quantity--;
            //give change
            result = this.giveChange(
              this.totalAmount(money) - individualProduct.price,
              [], []
            );
          } else {
            result = `${individualProduct.name} is out of stock`;
          }
        }
      });
    }

    return result;
  }
}

export const machine = new VendingMachine();
