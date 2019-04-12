# nypr-ads

An addon to simplify connecting NYPR web clients to our Google Publisher Ads / Doubleclick For Publishers account.

[Read the docs here.](http://nypublicradio.github.io/nypr-ads/docs)

## Development

Development requires nodejs 6+.
```sh
brew install nvm
nvm install --lts
nvm use --lts
```

Install dependencies.
```sh
npm install
```

Build and run ember.
_Note: To use your system's global ember simply type `ember`_
```sh
./node_modules/.bin/ember build
./node_modules/.bin/ember serve
```

## Tests

Tests require `google-chrome` and `chromedriver`.
```sh
brew cask install google-chrome
brew cask install chromedriver
```

Execute tests.
```sh
./node_modules/.bin/ember test
```
