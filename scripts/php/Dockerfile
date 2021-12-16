FROM php:8.1-cli

# in repo root run `docker build -t swissrets-phplint -f scripts/php/Dockerfile .`
# then run `docker run swissrets-phplint vendor/bin/xmllint ../../examples`

## Update package information
RUN apt-get update

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

## Install zip libraries and extension
RUN apt-get install --yes git zlib1g-dev libzip-dev \
    && docker-php-ext-install zip


