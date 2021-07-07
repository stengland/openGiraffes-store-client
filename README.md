![logo](images/icon.png)

## openGiraffes Store

An alternative app store by free developers for free devices.

## TODO List

-   [ ] Upgrade app
-   [ ] Upgrade self

## Contributing

### Setup

first install the dependencies

```sh
npm install
```

### Packaging

This only works on linux(and maybe osx) at the moment

```sh
npm run package
```

The resulting package can be found in the build folder.

### Formatting

This project uses code formatting. Make sure to run the formatter before commiting, otherwise the CI will be sad 😢.

```sh
# check it
npm run formatting:test
# run the formatter
npm run formatting:fix
```

### ADB

```sh
adb forward tcp:6000 localfilesystem:/data/local/debugger-socket
```
