# MisterCrypto 🤑

A digital wallet for holding your bitcoins and sending (paying) them to your contacts.

<img src="https://res.cloudinary.com/dzvebcsrp/image/upload/v1616350388/crypto1_p64grm.png" alt="alt text" title="Homepage-Desktop view">
<img src="https://res.cloudinary.com/dzvebcsrp/image/upload/v1616350438/crypto2_x00whw.png" alt="alt text" title="Contacts page">
<img src="https://res.cloudinary.com/dzvebcsrp/image/upload/v1616350471/crypto3_gqca2k.png" alt="alt text" width="200px" title="Mobile view">

## Quick Start

### Clone
* Clone this repo to your local machine using ```git clone https://github.com/mili12321/misterCrypto.git```

### Setup
> Install the project dependencies and packages

```bash
$ npm install
```

> Get and set API key

You will need to get an API key from here: `https://min-api.cryptocompare.com/`
To set up your API key go to \src\app\services\bitcoin.service.ts 

> Start JSON Server

```bash
$ json-server --watch db.json --id=_id
```
> Run the app in a development mode

```bash
$ ng serve --open
```
> Navigate to

```bash
$ http://localhost:4200/
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
