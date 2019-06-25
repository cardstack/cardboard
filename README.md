# Card Board

Live version here: https://staging-cardboard.stack.cards/

We are using this GitHub repo as our content data source. Feel free to peruse: https://github.com/cardstack/cardboard-data

![4 Edges](https://user-images.githubusercontent.com/61075/54470192-3eff1f00-477a-11e9-8d1b-e02ecca32268.png)

![Document Library](https://user-images.githubusercontent.com/61075/54470193-4292a600-477a-11e9-9567-d014c08e36da.png)

![Narrative Experience](https://user-images.githubusercontent.com/61075/54470196-458d9680-477a-11e9-9a79-fe416511d500.png)


## Prerequisites

* docker
* node.js (version 8 or greater)


## Installation

* `git clone <repository-url>` this repository
* `cd cardboard`
* `yarn install` (we use Yarn workspaces, so use Yarn and not NPM)


## Running

There are docker container(s) that are prerequisites for running the portfolio app. You can start and stop them with:

    yarn start-prereqs
    yarn stop-prereqs

**`yarn start-prereqs` will bind the PostgreSQL running in the Docker container to port 5432 which is the standard Postgres port. That might conflict with a local PostgreSQL you might have running, which would actually be used by the Cardstack hub in that case as opposed to the one running in the Docker container.**

Once the prerequisites are running, you can run both the Hub and the Ember CLI development server like this:

    yarn start

Alternatively, you can run the Hub and Ember CLI separately with:

    yarn start-hub
    yarn start-ember

### Environment Variables:

#### `HUB_ENVIRONMENT`
The `HUB_ENVIRONMENT` environment variable is used to tell the Cardstack hub which environment it is running within. The possible values are `development`, `test`, and `production`. Generally the `development` environment is used for doing development on your local machine. The `test` environment is used for running the automated tests. The `production` environment is used for running a hosted application. If this environment variable is not specified, then the `HUB_ENVIRONMENT=development` is assumed.

#### `GIT_REPO`
Use the environment variable `GIT_REPO` to specify the git data source SSH URL. Note that this is only used when `HUB_ENVIRONMENT=production` is also specified. If this variable is not used, then the ephemeral data source will be used instead.

#### `GIT_PRIVATE_KEY`
Use the environment variable `GIT_PRIVATE_KEY` to specify the private key for the SSH user used in the `GIT_REPO` environment variable. Note that this value will have newlines within it. Please see https://github.com/cardstack/cardstack/blob/master/packages/git/README.md for more details around specifying this environment variable.

#### `GIT_BRANCH_PREFIX`
Use the environment variable `GIT_BRANCH_PREFIX` when you wish to use a branch other than `master` for your git data source. The value of `GIT_BRANCH_PREFIX` will be prepended to the string `master` when deriving the name of the branch to use for reading and writing documents to the git data source.

#### `S3_IMAGE_BUCKET`
Use the environment variable `S3_IMAGE_BUCKET` to specify the name of the S3 bucket to store image binary data.

#### `S3_IMAGE_UPLOAD_ACCESS_KEY_ID`
Use the environment variable `S3_IMAGE_UPLOAD_ACCESS_KEY_ID` to specify the AWS access key that can be used to write into the configured S3 bucket for image binary data.

#### `S3_IMAGE_UPLOAD_SECRET_ACCESS_KEY`
Use the environment variable `S3_IMAGE_UPLOAD_SECRET_ACCESS_KEY ` to specify the AWS secret key that can be used to write into the configured S3 bucket for image binary data.

#### `LOG_LEVELS`
Use the environment variable `LOG_LEVELS` to adjust the logging on the Cardstack hub process. More information around how to use this can be found here: https://github.com/cardstack/logger

#### Postgres
The standard Postgres environment variables `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, etc are supported. You can control the postgres instance that the Cardstack hub uses by setting these environment variables.

## Data Sources

The Cardstack Hub can connected to many different types of data sources. Some data sources are read-only (like the Ethereum data source, Crypto Compare data source, and the asset history data sources in the Card Folio project https://github.com/cardstack/portfolio) and others are writable for holding content types that are controlled by the hub, including articles and "boards" (groups of articles) that are used in this project. The way we have arranged our writable data sources for the Card Board project is to use an "ephemeral" data source when the Card Board application is running with `HUB_ENVIRONMENT=development` environment variable and to use a git data source when the Portfolio application is running with the `HUB_ENVIRONMENT=production` environment variable. By default, cardstack applications run with the `HUB_ENVIRONMENT=development` environment variable.

### Ephemeral Data Source
The ephemeral data source is a hub data source that is most often used for testing or for running in a local development environment. This data source persists documents only for as long as the cardstack hub backend is running. When the cardstack hub backend is restarted, the documents contained in the ephemeral datastore is erased--hence the term "ephemeral". By default this is the data source that the Portfolio application uses when run in your local development environment, as it requires no special setup to use, and it resets to its initial state when you restart the hub (which makes it wonderful for testing). The ephemeral data source uses what we call "seeds" to initialize its initial state. It is these seeds that we use for setting up the initial articles, boards, and images in the local development environment.

#### Binary Content
The cardstack hub can handle binary blob files like images as well. When the cardstack hub is running in a local development environment, the binary images are stored in the ephemeral datasource, which allows for very simple setup and automated testing. When the cardstack hub is running in production mode, we use S3 as the datasource for binary files. 

#### Seeds
The `cardboard/cardstack/seeds/` folder holds modules whose evaluated `module.exports` are arrays of resources that are created as "seed" models when the Cardstack hub starts up for the ephemeral data source (when `HUB_ENVIRONMENT=development` environment variable is set). The `cardboard/cardstack/sample-data.js` contains the articles and "community" board (that lives at the index route) that are used in the development environment. We construct the models using a `@cardstack/test-support/jsonapi-factory` factory. The factory ensures that the underlying JSON:API structures are valid, do not contain cycles, and are emitted in a manner where the resource relationships are created in the correct order (as a Directed Acyclic Graph) so that resources that are dependencies for other resources are created first. The JSONAPIFactory adheres precisely to the JSON:API specification https://jsonapi.org/. The factory allows us to create resources that have attributes and relationships as defined in the specification. Additionally, the module that loads the image seeds is located at `cardboard/cardstack/load-images.js`, which is responsible for seeding all the binary data.


### Git Data Source
The git data source is used when the `HUB_ENVIRONMENT=production` environment variable is set. In this scenario, the hub will write and read boards, articles, image metadata, themes, and category content types from the configured git repository. This repository can be a git repository that is hosted by GitHub or another git hosting provider, or a git repository that is hosted privately in the VPC that the Cardstack Hub is running from. 

To use a git data source, in addition to specifying the `HUB_ENVIRONMENT=production` environment variable, you will also need to specify the SSH URL of the git repo in the `GIT_REPO` environment var (e.g. `GIT_REPO=git@github.com:cardstack/cardboard-data.git`), and you will need to specify the private key for the user in the SSH URL of the git repo in the `GIT_PRIVATE_KEY` environment variable. (Due to the need to preserve line breaks in the private key, this may be a little tricky, see https://github.com/cardstack/cardstack/blob/master/packages/git/README.md for more details). The hub will use the `master` branch of the specified repo to read and write content. If you want to have the hub use a different branch, you can specify `GIT_BRANCH_PREFIX` environment variable for a prefix to apply to the `master` branch, e.g. `GIT_BRANCH_PREFIX=staging-` will cause the hub to read and write content to the `staging-master` branch instead.

Documents that reside in a git data source leverage the JSON:API specification (https://jsonapi.org), live in the `master` branch of the repository (which can be changed using the `GIT_BRANCH_PREFIX` environment variable), underneath within the `contents/` folder. Within the `contents/` folder is a folder for each content type that originates from the git data source. Within the content type folder each document's file name is the ID of the document (with a `.json` file extension). Each document's file contents is a JSON:API document without the `type` and `id` properties, as we derive the type and ID of the document from the folder and file name of the document.

We have open sourced the git data source that we use to host our app running at: https://staging-cardboard.stack.cards/. You can find the git data source at: https://github.com/cardstack/cardboard-data/blob/master/README.md


## Testing

Testing needs the same prereqs as running.

    yarn lint
    yarn test

You can run the tests interactively via

    yarn test -s

## Viewing the Hub database

Note that the database has lots of whitespace padding within columns, so it is useful to use a client like [Postico](https://eggerapps.at/postico/) to view the data, or do `SELECT` for specific columns.
Otherwise, the tables might appear empty.

```sh
yarn start-hub
docker exec -it cardstack-pg psql -U postgres pgsearch_cardboard_development
SELECT id from documents;
```

## Creating Cards

You create a new card by running the generator in the `portfolio/` directory of the project:
```
$ ember g card name_of_your_card
```

(you'll need to add a `tests/dummy/app/styles` folder to the newly added card--sorry)

## Upgrading Card Dependencies

Note that currently bad things can happen the `@cardstack/*` dependencies get out of sync between the various cards. When upgrading `@cardstack/*` dependencies make sure to use `yarn upgrade-interactive --latest --scope @cardstack` (or whatever patten is appropriate) in order to upgrade all the @cardstack modules in lock step.
