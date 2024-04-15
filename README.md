## 🌐 Description

- [Extended docs](https://docs.digital-alchemy.app/Grocy)
- [Discord](https://discord.gg/JkZ35Gv97Y)

> See https://grocy.info/
>
> Grocy is a web-based self-hosted groceries & household management solution for your home.

## 🧭 Functionality

API adapters for the Grocy application. Contains basic adapters for:

- `Battery`
- `Chores`
- `Objects`
- `Recipe`
- `Stock`
- `System`
- `Tasks`
- `User`

There are also special workflows for extracting data from userfields as objects for relevant items.

## 🚧 Project State

Adapters aren't yet fully built out yet. Current feature set for the project aims to provide monitoring and updates for `chores`, `batteries`, and `tasks`.
A specialized aggregator service will poll Grocy for changes, and will gather information about the current "to do" list

The code base is maintained as a side project. If you need more functionality than what exists now, or want to contribute, please open an issue or reach out on discord
