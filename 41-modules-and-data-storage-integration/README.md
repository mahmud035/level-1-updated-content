# Modules and Data Storage Integration

This repository demonstrates how to integrate JavaScript modules with local storage and session storage in a practical and scalable way. The code provided focuses on handling the addition of items to a shopping cart using TypeScript, interacting with local storage for data persistence.

- **Live Site URL**: [Shopping Cart](https://41-shopping-cart-batch-09.netlify.app/)

## Features

- **Modular JavaScript**: Demonstrates how to use ES6 modules (`import`/`export`) to organize code efficiently.
- **Local Storage Integration**: Functions that store and retrieve shopping cart data from the browser's local storage, ensuring data persistence across sessions.
- **Shopping Cart Functionality**:
  - Add items to the cart.
  - Update the quantity of an item if it already exists in the cart.
  - Store the cart data in local storage for persistence.

## Code Breakdown

### Core Functions

1. **`handleAddToCart(bottle: IBottle)`**

   - Adds items to the shopping cart and updates their quantities.
   - Retrieves cart data from local storage.
   - Updates the cart in local storage after each change.

2. **`retrieveCart()`**

   - Loads the cart from local storage when needed.

3. **`storeCart(cart)`**
   - Saves the updated cart back to local storage to persist the data.

### Local Storage & Session Storage

- Local storage is used for persisting shopping cart data across multiple sessions.
- Session storage can be used for temporary data storage, but the current focus is on persistent shopping cart data.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/mahmud035/Level-1-Updated-Content

   cd 41. Modules and Data Storage Integration
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
3. To run the project, use the following command:
   ```bash
   npm run dev
   ```
   This will start the development server and allow you to interact with the modules and data storage examples.

## Project Structure

The project is organized as follows:

```Level-1-Updated-Content/
├── 41. Modules and Data Storage Integration/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Bottle/
│   │   │   │   ├── BottleList.tsx
│   │   │   │   ├── Bottle.tsx
│   │   │   ├── Watch/
│   │   │   │   ├── WatchList.tsx
│   │   │   │   ├── Watch.tsx
│   │   ├── hooks/
│   │   │   ├── useFetchData.ts
│   │   ├── types/
│   │   │   ├── index.ts
│   │   ├── utils/
│   │   │   ├── index.ts
│   │   ├── App.tsx
│   ├── README.md
│   ├── package.json
│   └── ...
```

- **src/components**: Contains reusable React components such as _Bottle_ and _Watch_ components.

- **src/hooks**: Custom hooks for handling data fetching and other logic.

- **src/types**: TypeScript types and interfaces.

- **src/utils**: Utility functions for managing local storage and other tasks.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes. Ensure that your code adheres to the project’s coding standards and includes necessary tests.
